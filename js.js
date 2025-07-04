// === VIDEO & FORM HANDLERS ===
const video                 = document.getElementById("video");
const playOverlay           = document.getElementById("play");
const playButton            = document.getElementById("playButton");
const progressBar           = document.getElementById("progressBar");
const progressBarContainer  = document.getElementById("progressBarContainer");
const orderForm             = document.getElementById("order");
const videoSection          = document.getElementById("container_video");



// === TIMER ELEMENTS ===
const timerWrapper = document.querySelector(".formFb__timer");
const timerDisplay = document.getElementById("timer");
let formTimerInterval;

// Utility: формат mm:ss
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m < 10 ? "0"+m : m}:${s < 10 ? "0"+s : s}`;
}

// Запуск обратного отсчёта (duration в секундах)
function startFormTimer(duration) {
  let time = duration;
  timerDisplay.textContent = formatTime(time);
  formTimerInterval = setInterval(() => {
    time--;
    if (time < 0) {
      clearInterval(formTimerInterval);
      return;
    }
    timerDisplay.textContent = formatTime(time);
  }, 1000);
}

// Скрываем таймер до конца видео
timerWrapper.style.display = "none";

// Функция воспроизведения
function playVideo() {
  video.play();
  video.muted = false;
  playOverlay.style.display = "none";
  playButton.style.display  = "none";
}

// Навешиваем события
playOverlay.addEventListener("click", playVideo);
playButton.addEventListener("click", playVideo);

video.addEventListener("click", () => {
 {
    if (!video.paused) {
      video.pause();
      playButton.style.display = "block";
    } else {
      playVideo();
    }
  }
});

video.addEventListener("timeupdate", () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = progress + "%";
});

// Когда видео заканчивается
video.addEventListener("ended", () => {
  hideVideoAndShowForm();
  console.log('Video ended, order form displayed.');
});

// Блокировка перемотки
video.addEventListener("seeking", e => {
  e.preventDefault();
  video.currentTime = Math.max(0, video.currentTime);
});

// Скрываем видео, показываем форму и запускаем таймер
function hideVideoAndShowForm() {
  playOverlay.style.display         = "none";
  playButton.style.display          = "none";
  progressBarContainer.style.display= "none";
  video.style.display               = "none";
  videoSection.style.display        = "none";
  

  orderForm.style.display           = "block";
  timerWrapper.style.display        = "block";      // показываем таймер
  startFormTimer(600);                          // 600 сек = 10 минут
}

// Пропуск видео
function skipVideo() {
  console.log('skipVideo() called. Skipping to the end of the video.');
  video.currentTime = video.duration;
  video.pause();
  hideVideoAndShowForm();
}

window.skipVideo = skipVideo;
