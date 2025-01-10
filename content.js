(() => {
  const links = [];

  // Get image links
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (img.src) links.push(img.src);
  });

  // Get video links
  const videos = document.querySelectorAll("video, source");
  videos.forEach((video) => {
    if (video.src) links.push(video.src);
  });

  return links;
})();
