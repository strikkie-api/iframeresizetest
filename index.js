// index.js (The Parent)
console.log("✅ Sprinklr widget loaded");

// IMPORTANT: Replace this with the *real* URL of your external application.
const IFRAME_SRC = "https://my-external-app-with-postmessage.com/content.html";
const CHILD_ORIGIN = "https://my-external-app-with-postmessage.com"; 

export async function init() {
  if (!window.Sprinklr) {
    console.error("❌ Sprinklr SDK not injected");
    return;
  }
  
  const sdk = await window.Sprinklr.init();
  console.log("✅ SDK initialized", sdk);

  // --- 1. Render the Iframe ---
  // Sprinklr widgets typically place content in the <body>
  const container = document.body; 

  const iframe = document.createElement('iframe');
  iframe.setAttribute('id', 'resizable-content-frame');
  iframe.setAttribute('src', IFRAME_SRC);
  iframe.style.width = '100%';
  iframe.style.height = '300px'; // Set initial height
  iframe.style.border = 'none';
  iframe.setAttribute('scrolling', 'no'); // Prevent double scrollbars
  
  container.appendChild(iframe);
  
  // Resize the *parent widget* itself to 300px initially
  sdk.resize({ height: 300 }); 
  
  // --- 2. Set up PostMessage Listener ---
  window.addEventListener('message', (event) => {
      // ⚠️ SECURITY CHECK: Always verify the origin
      if (event.origin !== CHILD_ORIGIN) {
          console.warn('PostMessage blocked: Unknown origin', event.origin);
          return;
      }

      // We expect a number representing the new height
      const newHeight = parseInt(event.data, 10);
      
      if (!isNaN(newHeight)) {
          console.log(`Received new height from child: ${newHeight}px`);
          
          // A. Resize the IFRAME element inside the widget
          iframe.style.height = `${newHeight}px`;

          // B. Resize the Sprinklr widget container itself
          // Use the Sprinklr SDK for the containing widget resize
          sdk.resize({ height: newHeight }); 
      }
  });
}
