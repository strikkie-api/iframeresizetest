// index.js (Hosted on GitHub Pages)
console.log("✅ Sprinklr widget loaded");

// The external URL of the content to load inside the iframe.
// We'll use content.html hosted on the same GitHub Pages domain for this test.
const IFRAME_SRC = "https://strikkie-api.github.io/iframeresizetest/content.html";
const CHILD_ORIGIN = "https://strikkie-api.github.io"; // Origin is the full GitHub username.github.io part

export async function init() {
  if (!window.Sprinklr) {
    console.error("❌ Sprinklr SDK not injected");
    return;
  }
  
  const sdk = await window.Sprinklr.init();
  console.log("✅ SDK initialized", sdk);

  // --- 1. Render the Iframe ---
  const container = document.body; 
  const iframe = document.createElement('iframe');
  
  iframe.setAttribute('id', 'resizable-content-frame');
  iframe.setAttribute('src', IFRAME_SRC);
  iframe.style.width = '100%';
  iframe.style.height = '300px'; 
  iframe.style.border = 'none';
  iframe.setAttribute('scrolling', 'no'); 
  
  container.appendChild(iframe);
  sdk.resize({ height: 300 }); // Initial resize of the parent widget
  
  // --- 2. Set up PostMessage Listener ---
  window.addEventListener('message', (event) => {
      // ⚠️ SECURITY CHECK: The child's origin must match the expected origin.
      // We check for the root domain, as the path might be stripped.
      if (!event.origin.startsWith(CHILD_ORIGIN)) {
          console.warn('PostMessage blocked: Unknown origin', event.origin);
          return;
      }

      // We expect a number representing the new height
      const newHeight = parseInt(event.data, 10);
      
      if (!isNaN(newHeight)) {
          console.log(`Received new height from child: ${newHeight}px`);
          
          // A. Resize the IFRAME element inside the widget
          iframe.style.height = `${newHeight}px`;

          // B. Resize the Sprinklr widget container itself via the SDK
          sdk.resize({ height: newHeight }); 
      }
  });
}
