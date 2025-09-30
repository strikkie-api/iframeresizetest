// index.js (Temporary Debugging Code)
console.log("✅ Sprinklr widget loaded (Debug mode)");

export async function init() {
  if (!window.Sprinklr) {
    console.error("❌ Sprinklr SDK not injected");
    return;
  }
  const sdk = await window.Sprinklr.init();
  console.log("✅ SDK initialized and ready. No iframe loaded.");
  // DO NOT add any other code here yet.
}
