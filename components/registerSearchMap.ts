import { registerComponent } from "@plasmicapp/host";
import SearchMap from "./SearchMap";

/**
 * Registration helper for the SearchMap component.  Import this file from
 * your Plasmic host application (e.g. in `plasmic-init.ts`) and call
 * `registerSearchMap()` to make the component available in the Plasmic
 * design tool.  After registering, you can drag the `SearchMap` component
 * onto any page or component and configure its props from the Plasmic UI.
 */
export function registerSearchMap() {
  registerComponent(SearchMap, {
    name: "SearchMap",
    displayName: "Search Map",
    description:
      "Displays an interactive Leaflet map alongside a search field that sends queries to your backend.",
    props: {
      /**
       * You can expose props here if you need to customize the component from
       * Plasmic, e.g. the API endpoint, default zoom level, etc.  For now no
       * props are required because the endpoint is hardcoded in the
       * component itself.  See SearchMap.tsx for details.
       */
    },
  });
}
