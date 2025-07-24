import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/**
 * A search-enabled map component.  Users can enter one or more search terms
 * (for example property identifiers like `QLD 3RP123456\nNSW 4/DP765432`) and
 * then click the search button.  The component will POST the query to your
 * backend and expects a JSON response containing an array of result objects
 * with `lat`/`lng` properties (optionally `latitude`/`longitude`) and an
 * optional `name` or `label` field.  These results will be plotted on the
 * OpenStreetMap-based Leaflet map.  The map recenters on the first result
 * returned.
 */
export default function SearchMap() {
  // state for the user's query text and the results returned from the API
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<
    { lat: number; lng: number; name?: string }[]
  >([]);
  // Brisbane default centre in [latitude, longitude] form
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    -27.4698,
    153.0251,
  ]);

  /**
   * Invoked when the user clicks the search button.  It sends the current
   * `query` value to the back‑end and updates the local state with any
   * coordinates received.  Adjust the fetch URL and JSON parsing logic to
   * match your API’s actual contract.
   */
  const handleSearch = async () => {
    // avoid sending empty queries
    if (!query.trim()) {
      return;
    }
    try {
      const response = await fetch("https://vision-0j3n.onrender.com/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        throw new Error(`Query failed: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      // The API is expected to return an object with a `results` array.
      const records = Array.isArray(data.results)
        ? data.results
        : Array.isArray(data)
        ? data
        : [];
      // Normalise result objects to have lat/lng fields
      const markers = records
        .map((item: any) => {
          const lat = item.lat ?? item.latitude;
          const lng = item.lng ?? item.longitude;
          if (typeof lat === "number" && typeof lng === "number") {
            return {
              lat,
              lng,
              name: item.name ?? item.label ?? undefined,
            };
          }
          return null;
        })
        .filter(Boolean) as { lat: number; lng: number; name?: string }[];
      setResults(markers);
      // Reposition the map on the first marker returned
      if (markers.length > 0) {
        setMapCenter([markers[0].lat, markers[0].lng]);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Sidebar for search input */}
      <div
        style={{
          width: "300px",
          maxWidth: "100%",
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          boxSizing: "border-box",
        }}
      >
        <h3>Search</h3>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={4}
          placeholder={"QLD 3RP123456\nNSW 4/DP765432"}
          style={{ width: "100%", boxSizing: "border-box" }}
        />
        <button
          onClick={handleSearch}
          style={{ marginTop: "0.5rem", width: "100%", padding: "0.5rem" }}
        >
          Search
        </button>
      </div>
      {/* Map panel occupies the remaining width */}
      <div style={{ flex: 1, height: "100%" }}>
        <MapContainer center={mapCenter} zoom={6} style={{ height: "100%", width: "100%" }}>
          {/* Use a free OpenStreetMap tileset */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* Render a marker for each result returned */}
          {results.map((result, idx) => (
            <Marker key={idx} position={[result.lat, result.lng]}>
              <Popup>{result.name ?? `Result ${idx + 1}`}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
  
}
