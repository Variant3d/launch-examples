# launch-babylonJS-example

How to use the Variant Launch SDK with BabylonJS. Note iOS Launch viewer will only work with a [valid SSL certificate](https://launch.variant3d.com/docs/development-guide)

## Installation

1.  Clone or download this github repo
2.  Replace the existing SDK script tag with your SDK tag (from the [Launch Admin UI](https://launchar.app/projects)) in the index HTML file.
3.  Host the project on a server with a valid SSL (where the url begins with `https://` and the certificate is not self-signed).

## Development

- run `npm install` to install dependencies
- run `npm run serve-public` to run a public server with Cloudflare SSL. You can find the randomly generated domain in the console output. It will look something like: https://frontier-richard-grammar-example.trycloudflare.com
- Visit the URL on your device to begin testing

## Adding Launch to other BabylonJS projects

Add your SDK script tag early in your `<head>`. It should run before your 3D engine code if you want WebXR support available when your other code runs.

`<script src="https://launchar.app/sdk/v1?key=YOUR_SDK_KEY&redirect=true"></script>`

The `redirect=true` means that iOS users will immediately be redirected to the Launch URL for the current page (where they will then open the Launch Viewer and be returned to the page with WebXR support).

You can remove `&redirect=true` if you want to handle the timing of redirecting iOS users to the Launch card yourself (e.g. if you want to use an explicit 'enter AR' button, or have users view some content on the page before Launching). Use `VLaunch.getLaunchUrl(targetURL)` to [generate the launch URL](https://launch.variant3d.com/docs/using-the-sdk) when needed.

## Help

[BabylonJS WebXR Docs](https://doc.babylonjs.com/features/featuresDeepDive/webXR/introToWebXR)

[BabylonJS WebXR Examples](https://doc.babylonjs.com/features/featuresDeepDive/webXR/webXRDemos)

For quick hosting we recommend using Cloudflare's Pages as a fast and free way to host your sample code online with SSL. See our [Development Guide](https://launch.variant3d.com/docs/development-guide) for more information.

CyberPunk Speeder model CC BY 4.0 by [Piotr Pisiak](https://sketchfab.com/3d-models/cyberpunk-speeder-78cf4a37a1604ddeb99651d531d7a0ff)
