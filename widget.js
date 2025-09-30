// widget.js (Formerly index.js)
console.log("✅ Sprinklr widget loaded via HTML wrapper");

const IFRAME_SRC = "https://strikkie-api.github.io/iframeresizetest/content.html";
const CHILD_ORIGIN = "https://strikkie-api.github.io"; 

export async function init() {
  // ... (Paste all the rest of your original index.js code here)
  // ... (iframe creation, postMessage listener, sdk.resize)
  // ...
  if (!window.Sprinklr) {
    console.error("❌ Sprinklr SDK not injected");
    return;
  }
  
  const sdk = await window.Sprinklr.init();
  console.log("✅ SDK initialized", sdk);

  // ... (rest of the iframe logic)
}
