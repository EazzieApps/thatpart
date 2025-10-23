function navigateTo(page) {
  window.location.href = `${page}.html`;
}

const playButton = document.getElementById("play-button");
const radioAudio = document.getElementById("radio-audio");
const nowPlayingEl = document.getElementById("nowPlaying");

if (playButton && radioAudio) {
  playButton.addEventListener("click", () => {
    if (radioAudio.paused) {
      radioAudio.play();
      playButton.textContent = "Pause";
    } else {
      radioAudio.pause();
      playButton.textContent = "Listen Live";
    }
  });
}

if (nowPlayingEl) {
  nowPlayingEl.textContent = "Now Playing: ThatPart Radio stream";
}
