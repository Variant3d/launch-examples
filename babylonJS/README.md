# Variant Launch BabylonJS Example

How to use the Variant Launch SDK with BabylonJS. Note iOS Launch viewer will only work with a [valid SSL certificate](https://launch.variant3d.com/docs/development-guide)

## Installation

1.  Clone or download this github repo
2.  Add your SDK key in index.html. Search for `YOUR_SDK_KEY` to find the `<script>` tag that requires your key as one of the url parameters.
3.  Host the project on a server with a valid SSL (where the url begins with `https://` and the certificate is not self-signed).

## Adding Launch to other BabylonJS projects

Add this script tag early in your `<head>`. It should run before your 3D engine code if you want WebXR support available when your other code runs.

`<script src="https://launchar.app/sdk/v1?key=YOUR_SDK_KEY&redirect=true"></script>`

The `redirect=true` means that iOS users will immediately be redirected to the Launch URL for the current page (where they will then open the Launch Viewer and be returned to the page with WebXR support).

You can remove `&redirect=true` if you want to handle the timing of redirecting iOS users to the Launch card yourself (e.g. if you want to use an explicit 'enter AR' button, or have users view some content on the page before Launching)

## Help

For quick hosting we recommend using Cloudflare's Pages as a fast and free way to host your sample code online. See our [Development Guide](https://launch.variant3d.com/docs/development-guide) for more information.
