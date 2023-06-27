import QRCode from "qrcode";

async function generateQRCode(text) {
  //apply to #qr-code
  document.getElementById("qr-code").src = await QRCode.toDataURL(text, {
    margin: 2,
    color: {
      dark: "#fe007d",
      light: "#FFFFFF",
    },
  });
}

async function generateLaunchCode() {
  let url = await VLaunch.getLaunchUrl(window.location.href);
  generateQRCode(url);
  console.log("Launch Code Generated");
}

//If we have a valid Variant Launch SDK, we can generate a Launch Code. This will allow iOS users to jump right into the app without having to visit the Launch Card page.
window.addEventListener("vlaunch-initialized", (e) => {
  generateLaunchCode();
});

if (VLaunch.initialized) {
  generateLaunchCode(); // generate a Launch Code for this url
} else {
  generateQRCode(window.location.href); // generate regular QR code for this url
}
