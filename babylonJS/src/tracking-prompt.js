import * as BABYLON from "@babylonjs/core";

export class TrackingPrompt {
  planeFound = false;

  //shows and hides the tracking prompt in WebXR based on whether a plane is detected (tracking is working).
  constructor(xr, xrTest, fm) {
    xr.baseExperience.sessionManager.onXRSessionInit.add(
      this.startSession.bind(this)
    );
    xr.baseExperience.sessionManager.onXRSessionEnded.add(() => {
      this.stopSession.bind(this);
    });

    xrTest.onHitTestResultObservable.add(this.hitTest.bind(this));

    // enable dom overlay to show tracking prompt
    const domOverlayFeature = fm.enableFeature(
      BABYLON.WebXRDomOverlay,
      "latest",
      { element: "#overlay" },
      undefined,
      false
    );
  }

  stopSession() {
    document.getElementById("tracking-prompt").style.display = "none";
  }

  startSession(session) {
    document.getElementById("tracking-prompt").style.display = "block";
    this.planeFound = false;
  }
  hitTest(results) {
    if (!this.planeFound && results.length) {
      document.getElementById("tracking-prompt").style.display = "none";
      this.planeFound = true;
    }
  }
}
