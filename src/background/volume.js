Array.from(document.querySelectorAll('video, audio')).forEach((media) => {
  media.volume = 0.5; // Set the volume to 50%
});
