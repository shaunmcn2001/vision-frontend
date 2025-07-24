import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";


export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "h42MnFfunV6NuM7DiBS4sk",
      token: "piM62AH3D3k7tZdMI4C6hT78fMzHOQUq8E2hZdVgldh9zkzjfuwgZ0nM0nypjAS6kXSsvnWii7M6h5nleNfw",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: false,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-hos
// 


const { registerSearchMap } = require("./components/registerSearchMap");
registerSearchMap();
