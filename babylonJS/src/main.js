import "./qr.js";
import "./style.css";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { TrackingPrompt } from "./tracking-prompt.js";

var engine,
  scene,
  engineMat,
  mats,
  canvas = null;
let placed,
  placeRequest = false;
let time = 0;

// check for webxr session support
if ("xr" in navigator) {
  navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
    if (supported) {
      //hide "ar-not-supported"
      document.getElementById("ar-not-supported").style.display = "none";
      init();
    }
  });
}

const init = async () => {
  canvas = document.getElementById("renderCanvas");

  engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });

  engine.displayLoadingUI();

  scene = new BABYLON.Scene(engine);
  await createScene();

  engine.runRenderLoop(function () {
    if (scene && scene.activeCamera) {
      scene.render();
    }
  });

  // Resize
  window.addEventListener("resize", () => {
    if (!engine) return;
    engine.resize();
  });
};

const createScene = async () => {
  const camera = new BABYLON.ArcRotateCamera(
    "camera1",
    2,
    1,
    5,
    new BABYLON.Vector3(0.3, -0.5, 0),
    scene
  );

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    "/environmentSpecular.env",
    scene
  );
  scene.environmentTexture = hdrTexture;

  scene.environmenTexture = null;
  // This creates a light
  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, -1, 1),
    scene
  );

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.5;

  var xr = await scene.createDefaultXRExperienceAsync({
    uiOptions: {
      sessionMode: "immersive-ar",
    },
    optionalFeatures: true,
  });

  //remove VR laser pointers for AR
  xr.pointerSelection.displayLaserPointer = false;
  xr.pointerSelection.displaySelectionMesh = false;

  const fm = xr.baseExperience.featuresManager;
  const sm = xr.baseExperience.sessionManager;

  // enable hit test
  const xrTest = fm.enableFeature(BABYLON.WebXRHitTest, "latest");

  // enable dom overlay
  const domOverlayFeature = fm.enableFeature(
    BABYLON.WebXRDomOverlay,
    "latest",
    { element: "#overlay" },
    undefined,
    false
  );

  // setup prompt to move phone if no planes found
  const trackingPrompt = new TrackingPrompt(xr, xrTest, fm);

  //load speeder.glb

  const model = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "",
    "speeder.glb",
    scene
  );

  engine.hideLoadingUI();

  // detect touch
  scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
      //check if not in xr session or already placed
      if (!xr.baseExperience.state === BABYLON.WebXRState.IN_XR || placed)
        return;
      placeRequest = true;
    }
  });

  mats = [];
  let speeder = model.meshes[0];
  // get materials from each mesh
  model.meshes.forEach((mesh) => {
    if (mesh.material) {
      mats.push(mesh.material);
    }
  });

  //create dummy object and add speeder as child
  const speederParent = new BABYLON.Mesh("speederParent", scene);
  speeder.parent = speederParent;

  //offset to make it feel like speeder is in center of screen when placing
  speeder.position.z = -1;
  speederParent.position.z = 1;

  // start hidden until we find a  hittest
  speederParent.isVisible = false;

  // remove duplicates
  mats = [...new Set(mats)];

  //make speeder transparent until placed
  setTransparency(true);

  //get material named "Engine"
  engineMat = scene.getMaterialByName("engines");

  //set texture mode to mirror
  engineMat.emissiveTexture.wrapU = BABYLON.Texture.MIRROR_ADDRESSMODE;
  engineMat.emissiveTexture.wrapV = BABYLON.Texture.MIRROR_ADDRESSMODE;
  engineMat.albedoTexture.wrapU = BABYLON.Texture.MIRROR_ADDRESSMODE;
  engineMat.albedoTexture.wrapV = BABYLON.Texture.MIRROR_ADDRESSMODE;

  //animate engine material UV offsets
  scene.registerBeforeRender(() => {
    engineMat.emissiveTexture.vOffset += scene.deltaTime / 500;
    time += scene.deltaTime / 100;
  });

  //create bob up and down hovering animation
  const bob = new BABYLON.Animation(
    "bob",
    "position.y",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );

  //apply to speeder
  const keys = [];
  keys.push({
    frame: 0,
    value: speeder.position.y, // Start from current y position
  });
  keys.push({
    frame: 30,
    value: speeder.position.y + 0.1, // Go up
  });
  keys.push({
    frame: 60,
    value: speeder.position.y, // Back to original y position
  });
  bob.setKeys(keys);

  // Create an easing function
  const easingFunction = new BABYLON.SineEase();

  // Set the easing function to loop
  easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

  // Assign the easing function to the animation
  bob.setEasingFunction(easingFunction);

  speeder.animations = speeder.animations || []; // Ensure animations array exists
  speeder.animations.push(bob);

  scene.beginAnimation(speeder, 0, 60, true);

  xrTest.onHitTestResultObservable.add((results) => {
    if (results.length) {
      // update speeder to hit point if not placed
      if (!placed) {
        speederParent.isVisible = true;
        var hitTest = results[0];
        hitTest.transformationMatrix.decompose(
          speederParent.scaling,
          speederParent.rotationQuaternion,
          speederParent.position
        );
        // if the user has requested placement, place the speeder
        if (placeRequest) {
          setTransparency(false);
          placed = true;
          placeRequest = false;
        }
      }
    } else {
      // hide speeder if no hit and not placed
      if (!placed) speederParent.isVisible = false;
    }
  });

  return scene;
};

const setTransparency = (transparent) => {
  mats.forEach((mat) => {
    if (mat.name !== "engines") mat.alpha = transparent ? 0.5 : 1;
  });
};
