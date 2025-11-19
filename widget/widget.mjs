function Sightcall({ sdk }) {
  var root = document.getElementById("root");

  var wrapper = document.createElement("div");
  wrapper.style.padding = "8px";
  wrapper.style.width = "100%";

  var title = document.createElement("h2");
  title.innerText = "SightCall Widget";
  wrapper.appendChild(title);

  var container = document.createElement("div");
  container.id = "sightcall-container";
  container.style.width = "100%";
  container.style.height = "350px";
  container.style.border = "1px solid #ccc";
  container.style.overflow = "hidden";
  container.style.transition = "height 0.3s ease";

  var iframe = document.createElement("iframe");
  iframe.id = "sightcall-frame";
  iframe.src = "https://strikkie-api.github.io/iframeresizetest/content.html";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  container.appendChild(iframe);
  wrapper.appendChild(container);
  root.appendChild(wrapper);

  window.addEventListener("message", function(event) {
    var data = event.data;
    if (!data) return;

    if (data.type === "sessionStarted") {
      container.style.height = "650px";
    }

    if (data.type === "sessionEnded") {
      container.style.height = "250px";
    }
  });
}

Sprinklr.renderWidget(Sightcall);
