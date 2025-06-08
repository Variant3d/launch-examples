# Variant Launch Aframe example

## How to run

* Use a local web server to host the project, such as `npm install -g http-server && http-server`
* Use a cloudflared tunnel for mobile testing [see docs](https://launch.variant3d.com/docs/testing-on-launch-viewer), such as `cloudflared tunnel --url http://localhost:8080`

## Adding Launch to Aframe scenes

Add this script tag early in your `<head>`. It should run before your 3D engine code if you want WebXR support available when your other code runs.

`<script src="https://launchar.app/sdk/v1?key=YOUR_SDK_KEY&redirect=true"></script>`

The `redirect=true` means that iOS users will immediately be redirected to the Launch URL for the current page (where they will then open the Launch Viewer and be returned to the page with WebXR support).

You can remove `&redirect=true` if you want to handle the timing of redirecting iOS users to the Launch card yourself (e.g. if you want to use an explicit 'enter AR' button, or have users view some content on the page before Launching)

### Scene Properties

These [WebXR scene properties](https://aframe.io/docs/1.4.0/components/webxr.html) set the type of WebXR experience. For Launch you will want the referenceSpaceType to be local as that works best for AR (use hit-testing to find the 'floor').

`<a-scene device-orientation-permission-ui="enabled: false" webxr="requiredFeatures:hit-test,local;referenceSpaceType:local;">`

## Installation

1.  Clone or download this github repo
2.  Search for `YOUR_SDK_KEY` to find the script tag that requires your key to be set as a url parameter.
3.  Host the project on a server with a valid SSL (where the url begins with `https://` and the certificate is not self-signed).

## Help

Note iOS Launch viewer will only work with a [valid SSL certificate](https://launch.variant3d.com/docs/development-guide)

For quick hosting we recommend using Cloudflare's Pages as a fast and free way to host your sample code online. See our [Development Guide](https://launch.variant3d.com/docs/development-guide) for more information.

## Resources

[https://aframe.io/blog/webxr-ar-module/](https://aframe.io/blog/webxr-ar-module/)
[https://aframe.io/docs/1.4.0/introduction/vr-headsets-and-webxr-browsers.html](https://aframe.io/docs/1.4.0/introduction/vr-headsets-and-webxr-browsers.html)
[https://aframe.io/docs/1.4.0/components/webxr.html](https://aframe.io/docs/1.4.0/components/webxr.html)

## Adapted from 'A-Frame Spinosaurus for VR/AR'

Model: <a href="https://sketchfab.com/3d-models/spinosaurus-2135501583704537907645bf723685e7">Spinosaurus</a> by
<a href="https://sketchfab.com/VapTor">Vaptor-Studio</a>.

Powered by <a href="https://aframe.io/blog/aframe-v1.0.0/">A-Frame v1.0.0</a>.
