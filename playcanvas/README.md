# Variant Launch PlayCanvas example

How to use the Variant Launch SDK with PlayCanvas. Adapted from the [WebXR Starter Kit template](https://playcanvas.com/project/984974/overview/webxr-ar-starter-kit]). Note iOS Launch viewer will only work with a [valid SSL certificate](https://launch.variant3d.com/docs/development-guide)

## Setup

1.  Fork this project from the project dashboard at [https://playcanvas.com/project/1053688/overview/variant-launch-webxr-starter-kit]
2.  Add your SDK key. Find the Variant Launch button script under `/PlayCanvas/Scripts/VariantLaunchInit.js`. Search for `VLaunch.init` and replace with your key.
3.  Be sure to add the preview domain (usually `playcanv.as`) to your authorized domains on [https://launchar.app]
4.  When sharing published builds hosted on playcanvas, add `/e` to the start of the URL path to avoid using iframes, which will stop Variant Launch from working. For example if your public build address is `https://playcanv.as/p/AOYF3YyG/` use `https://playcanv.as/e/p/AOYF3YyG/`

## Troubleshooting

### Can't see camera feed

Please ensure your body and html elements are set to transparent while running the AR experience. The camera view is rendered under the webpage, so there must be visibility 'through' the canvas to the camera. For this reason you should also have 'Transparent Canvas' enabled in render settings, and must not clear the camera with a solid color as it will draw over the camera.

### Page reloads multiple times on load

Refer to #4 in the setup section. If hosting on playcanv.as the url must start with `https://playcanv.as/e/p/`.

### Below is the original WebXR Starter Kit README:

## WebXR Augmented Reality Starter Kit

# Overview

An application to get you started in working with Augmented Reality using WebXR in PlayCanvas. This project features:

- 3D Model Viewer with default camera controls for non-AR experience;
- Easily customizable UI for toggling AR session using WebXR, and notifying Users of any action (i.e. to move the device for tracking to start
- A transparent 'Shadow Catcher' plane, which renders only the shadow of the Scene's main directional light;
- (if available on device) Usage of the LightEstimation API for controlling the Scene's main directional light color, rotation and intensity;
- (if available on device) Usage of the LightEstimation API for controlling material's ambient lighting using spherical harmonics for extra realism;
- (if available on device) Usage of the HitTest API for capturing hits with real-world geometry.

For more information, refer to PlayCanvas Manual:
https://developer.playcanvas.com/en/user-manual/xr/using-webxr/

# Getting started

## Changing AugmentedReality Settings and Features

On the Hierarchy panel, select `Root`, and explore the available properties on the `AugmentedRealityManager` script.

## Changing the main focused entity

In order to customize the main focused entity (which is by default the PlayCanvas Cube), navigate to the `Root/AR Positioner/Model` in Hierarchy panel, and put your custom models there.

## Customizing the Code

The WebXR Augmented Reality flow is managed on the `AugmentedRealityManager` script. It uses Events to control and notify other scripts of changes and updates to the WebXR context. A full list of all 'app' level Events is as follows:

    'ar:available'(isAvailable)
        Notify device's AR capabilities. Fired at postInitialize and whenever the device's capabilities change.

    'ar:onStart'
        Fired as soon as the AR session starts, but before tracking begins.

    'ar:onTracking'
        Fired the first frame the AR session starts tracking the world.

    'ar:hit:disabled'
        Fired after 'ar:onStart', notifies that the HitTest system is disabled.

    'ar:hit:start'
        Fired when the HitTest API has started.
        This Event does not necessarily mean that an actual Hit has been found. For that, use 'ar:hit'

    'ar:hit'(position, rotation)
        Fired every frame the HitTest API has detected real world geometry.

    'ar:onEnd'
        Fired when the AR session terminates.

    'ar:lightEstimation:available'(isAvailable)
        Notify device's LightEstimation API capabilities.

    'ar:positioner:place'
        Fired by the EntityPositioner script to notify when the Entity was placed.

    'ar:request:start'
        Fired whenever the AR scene should start.

    'ar:request:end'
        Fired whenever the AR scene should end.

# Project Settings Notes

- By default, the scene Skybox is used as the Camera's background and reflected on all materials. When switching to AR, the Skybox stops being rendered as the background (as the camera becomes the camera feed), but the Skybox is still used as reflection on all materials.

- Clustered Lights is turned off mostly for the ShadowCatcher material to work properly.
