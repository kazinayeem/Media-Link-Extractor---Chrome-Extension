document.getElementById("fetch-links").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ["content.js"]
      },
      (results) => {
        if (results && results[0]?.result) {
          const mediaList = document.getElementById("media-list");
          mediaList.innerHTML = "";
          results[0].result.forEach((link) => {
            const li = document.createElement("li");

            // Create a preview image/video thumbnail
            const preview = document.createElement("img");
            preview.src = link;
            preview.style.maxWidth = "150px";
            preview.style.borderRadius = "4px";
            preview.onerror = () => {
              preview.src = "icons/video-placeholder.png"; // Placeholder for videos
            };

            // Create a clickable download button
            const downloadButton = document.createElement("button");
            downloadButton.textContent = "Download";
            downloadButton.className = "download-button";
            downloadButton.onclick = () => {
              const anchor = document.createElement("a");
              anchor.href = link;
              anchor.download = link.split("/").pop() || "media";
              anchor.click();
            };

            // Add preview and download button to the list item
            li.appendChild(preview);
            li.appendChild(document.createElement("br"));
            li.appendChild(downloadButton);
            mediaList.appendChild(li);
          });
        }
      }
    );
  });
});
