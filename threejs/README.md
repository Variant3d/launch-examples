# launch-threejs-example

How to use the Variant Launch SDK with the web's most popular 3D engine. Adapted from the examples at [https://threejs.org/examples/](https://threejs.org/examples/). Note iOS Launch viewer will only work with a [valid SSL certificate](https://launch.variant3d.com/docs/development-guide)

## Installation

 1. Clone or download this github repo
 2. Add your SDK key in each example HTML file. Search for `YOUR_SDK_KEY` to find the initialisation calls that require your key.
 3. Upload the project to a server with SSL (where the url begins with `https://`).

 ## Examples

 `threejs-arpaint.html` 'Painting' a mesh in the air when the user touches the screen.

  `threejs-hittest.html` Demonstrates the use of the [WebXR hit-test API](https://developer.mozilla.org/en-US/docs/Web/API/XRHitTestResult) to place cylinders on tracked planes.

 ## Help

 For quick hosting we recommend using Cloudflare's Pages as a fast and free way to host your sample code online. See our [Development Guide](https://launch.variant3d.com/docs/development-guide) for more information.
