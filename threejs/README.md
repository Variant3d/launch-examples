# launch-threejs-example

How to use the Variant Launch SDK with the web's most popular 3D engine. Note iOS Launch viewer will only work with a [valid SSL certificate](https://launch.variant3d.com/docs/development-guide)

## Installation

1.  Clone or download this github repo
2.  Replace the existing SDK script tag with your SDK tag (from the [Launch Admin UI](https://launchar.app/projects)) in the index HTML file.
3.  Host the project on a server with a valid SSL (where the url begins with `https://` and the certificate is not self-signed).

## Development

- run `npm install` to install dependencies
- run `npm run serve-public` to run a public server with Cloudflare SSL. You can find the randomly generated domain in the console output. It will look something like: https://frontier-richard-grammar-example.trycloudflare.com
- Visit the URL on your device to begin testing

## Adding Launch to other threeJS projects

Add this script tag early in your `<head>`. It should run before your 3D engine code if you want WebXR support available when your other code runs.

`<script src="https://launchar.app/sdk/v1?key=YOUR_SDK_KEY&redirect=true"></script>`

The `redirect=true` means that iOS users will immediately be redirected to the Launch URL for the current page (where they will then open the Launch Viewer and be returned to the page with WebXR support).

You can remove `&redirect=true` if you want to handle the timing of redirecting iOS users to the Launch card yourself (e.g. if you want to use an explicit 'enter AR' button, or have users view some content on the page before Launching). Use `VLaunch.getLaunchUrl(targetURL)` to [generate the launch URL](https://launch.variant3d.com/docs/using-the-sdk) when needed.

## Help

[ThreeJS WebXR Docs](https://threejs.org/docs/#api/en/renderers/webxr/WebXRManager)

[ThreeJS WebXR Examples](https://threejs.org/examples/?q=webxr)

For quick hosting we recommend using Cloudflare's Pages as a fast and free way to host your sample code online with SSL. See our [Development Guide](https://launch.variant3d.com/docs/development-guide) for more information.

Adapted from an example at [https://threejs.org/examples/](https://threejs.org/examples/).

Verbena Flower model CC BY 4.0 by [Jeremy Grayson](https://sketchfab.com/3d-models/verbena-flower-low-poly-02aa97bd5a934b0fbfa5a87835d23ca0)
