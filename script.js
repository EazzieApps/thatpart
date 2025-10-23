// Song data
const songs = [
  {
    title: "Feel Good",
    artist: "Syn Cole",
    src:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/SynCole-FeelGood.mp3",
    image:
      "https://github.com/user-attachments/assets/d80e6b68-b67a-4e27-86ee-e00581883d5c"
  },
  {
    title: "Castle",
    artist: "Clarx & Harddope",
    src:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/HarddopeClarx-Castle.mp3",
    image:
      "https://github.com/user-attachments/assets/9240f7ff-1b8e-4e62-a2d1-df78b285c7e0"
  },
  {
    title: "Play Dead",
    artist: "Neffex",
    src:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/PlayDead-NEFFEX.mp3",
    image:
      "https://github.com/user-attachments/assets/6e5ba953-49c5-4634-a1c5-4caf310cba86"
  },
  {
    title: "Know Myself",
    artist: "Patrick Patrikios",
    src:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/KnowMyself-PatrickPatrikios.mp3",
    image:
      "https://github.com/user-attachments/assets/a2ca0dfd-e53f-4e79-b8b0-288847e59b9a"
  },
  {
    title: "Redemption",
    artist: "Besomorph & Coopex",
    src:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/BesomorphCoopex-Redemption.mp3",
    image:
      "https://github.com/user-attachments/assets/b286d7ff-52a1-452d-9cd9-5920c937b16e"
  }
];

// DOM elements
const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const progressBar = document.getElementById("progress-bar");
const progressFill = document.getElementById("progressFill");
const volumeRange = document.getElementById("volume-range");
const volumeFill = document.getElementById("volumeFill");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const currentSongTitle = document.getElementById("currentSongTitle");
const currentArtist = document.getElementById("currentArtist");
const currentAlbumArt = document.getElementById("currentAlbumArt");
const playlistItems = document.querySelectorAll(".playlist-item");
const likeBtns = document.querySelectorAll(".like-btn");

let currentSongIndex = 2;
let isPlaying = false;
let isShuffled = false;

// Initialize Swiper
const swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  },
  initialSlide: 2,
  speed: 600
});

// Load and display song
function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.src;
  currentSongTitle.textContent = song.title;
  currentArtist.textContent = song.artist;
  currentAlbumArt.src = song.image;

  updatePlaylistHighlight(index);
  swiper.slideTo(index);
}

// Update playlist highlight
function updatePlaylistHighlight(index) {
  playlistItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

// Play song
function playSong() {
  audioPlayer.play();
  playPauseIcon.classList.remove("fa-play");
  playPauseIcon.classList.add("fa-pause");
  isPlaying = true;
}

// Pause song
function pauseSong() {
  audioPlayer.pause();
  playPauseIcon.classList.remove("fa-pause");
  playPauseIcon.classList.add("fa-play");
  isPlaying = false;
}

// Toggle play/pause
function togglePlayPause() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

// Next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) playSong();
}

// Previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) playSong();
}

// Shuffle
function shuffleSong() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * songs.length);
  } while (randomIndex === currentSongIndex);

  currentSongIndex = randomIndex;
  loadSong(currentSongIndex);
  if (isPlaying) playSong();
}

// Format time
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Update progress
function updateProgress() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressFill.style.width = `${progress}%`;
  progressBar.value = progress;
  currentTime.textContent = formatTime(audioPlayer.currentTime);
}

// Update volume display
function updateVolumeDisplay() {
  volumeFill.style.width = `${volumeRange.value}%`;
}

// Event listeners
playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
shuffleBtn.addEventListener("click", shuffleSong);

// Progress bar
progressBar.addEventListener("input", () => {
  const seekTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
});

// Volume control
volumeRange.addEventListener("input", () => {
  audioPlayer.volume = volumeRange.value / 100;
  updateVolumeDisplay();
});

// Audio events
audioPlayer.addEventListener("loadedmetadata", () => {
  totalTime.textContent = formatTime(audioPlayer.duration);
  progressBar.max = 100;
});

audioPlayer.addEventListener("timeupdate", updateProgress);
audioPlayer.addEventListener("ended", nextSong);

// Playlist items
playlistItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
  });
});

// Like buttons
likeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.classList.toggle("fas");
    btn.classList.toggle("far");
  });
});

// Swiper slide change event
swiper.on("slideChange", function () {
  currentSongIndex = swiper.activeIndex;
  loadSong(currentSongIndex);
  if (isPlaying) playSong();
});

// Load initial song
loadSong(currentSongIndex);
updateVolumeDisplay();
audioPlayer.volume = volumeRange.value / 100;

// Set initial volume display
volumeRange.addEventListener("input", updateVolumeDisplay);

document.addEventListener("DOMContentLoaded", () => {
  const audioPlayer = document.getElementById("audioPlayer");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playPauseIcon = document.getElementById("playPauseIcon");
  const volumeRange = document.getElementById("volume-range");
  const volumeFill = document.getElementById("volumeFill");
  const progressBar = document.getElementById("progress-bar");
  const progressFill = document.getElementById("progressFill");
  const currentTimeDisplay = document.getElementById("currentTime");
  const totalTimeDisplay = document.getElementById("totalTime");
  const playlistItems = document.querySelectorAll(".playlist-item");

  // Autoplay on load
  audioPlayer.autoplay = false;

  // Volume fading
  audioPlayer.volume = 1;
  function fadeOutVolume() {
    let vol = audioPlayer.volume;
    const interval = setInterval(() => {
      if (vol > 0.1) {
        vol -= 0.05;
        audioPlayer.volume = vol;
        volumeRange.value = vol * 100;
        volumeFill.style.width = `${vol * 100}%`;
      } else {
        clearInterval(interval);
        audioPlayer.pause();
        playPauseIcon.classList.replace("fa-pause", "fa-play");
      }
    }, 100);
  }

  // Play/pause toggle
  playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseIcon.classList.replace("fa-play", "fa-pause");
    } else {
      fadeOutVolume();
    }
  });

  // Volume control
  volumeRange.addEventListener("input", () => {
    const vol = volumeRange.value / 100;
    audioPlayer.volume = vol;
    volumeFill.style.width = `${volumeRange.value}%`;
  });

  // Progress bar update
  audioPlayer.addEventListener("timeupdate", () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
    progressFill.style.width = `${progress}%`;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
  });

  // Seek on progress bar
  progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
  });

  // Format time
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  }

  // Playlist switching
  playlistItems.forEach(item => {
    item.addEventListener("click", () => {
      playlistItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const index = item.getAttribute("data-index");
      const sources = [
        "audio/feel-good.mp3",
        "audio/castle.mp3",
        "audio/play-dead.mp3",
        "audio/know-myself.mp3",
        "audio/redemption.mp3"
      ];
      audioPlayer.src = sources[index];
      audioPlayer.play();
      playPauseIcon.classList.replace("fa-play", "fa-pause");
    });
  });
});


