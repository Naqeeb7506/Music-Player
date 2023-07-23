let music = document.querySelector("audio");
let play = document.getElementById("play");
let img = document.querySelector("img");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let progress = document.getElementById("progress");
let current_duration = document.getElementById("current_duration");
let total_duration = document.getElementById("total_duration");
let progress_div = document.getElementById("progress_div");

// songs
let songs = [
  {
    name: "song1",
    title: "Closer",
    artist: "The Chainsmoker",
  },
  {
    name: "song2",
    title: "Perfect",
    artist: "Ed Sheeran",
  },
  {
    name: "song3",
    title: "Night Changes",
    artist: "One Direction",
  },
  {
    name: "song4",
    title: "Shape Of You",
    artist: "Ed Sheeran",
  },
];

let isplaying = false;

// for playing the music
let playmusic = () => {
  isplaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};

// for pausing the music
pausemusic = () => {
  isplaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  //   if (isplaying) {
  //     pausemusic();
  //   } else {
  //     playmusic();
  //   }
  isplaying ? pausemusic() : playmusic();
});

// chnaging the music
let loadsong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = `music/${songs.name}.mp3`;
  img.src = `images/${songs.name}.jpeg`;
};

songindex = 0;

loadsong(songs[songindex]);

let nextsong = () => {
  songindex = (songindex + 1) % songs.length;
  loadsong(songs[songindex]);
  playmusic();
};

let prevsong = () => {
  songindex = (songindex - 1 + songs.length) % songs.length;
  loadsong(songs[songindex]);
  playmusic();
};

// progress bar js
music.addEventListener("timeupdate", (event) => {
  let { currentTime, duration } = event.target;
  let progress_time = (currentTime / duration) * 100;
  progress.style.width = `${progress_time}%`;

  // total duration update
  let minutes = Math.floor(duration / 60);
  let seconds = Math.floor(duration % 60);
  console.log(minutes, seconds);

  if (duration) {
    total_duration.textContent = `${minutes} : ${seconds}`;
  }

  // current duration update
  let current_min = Math.floor(currentTime / 60);
  let current_sec = Math.floor(currentTime % 60);

  if (current_sec < 10) {
    current_sec = `0${current_sec}`;
  }

  current_duration.textContent = `${current_min} : ${current_sec}`;
});

// onclick functionality
progress_div.addEventListener("click", (event) => {
  // console.log(event);
  let { duration } = music;
  let move_progress = (event.offsetX / event.target.clientWidth) * duration;
  console.log(move_progress);

  music.currentTime = move_progress;
});

music.addEventListener("ended", nextsong);

next.addEventListener("click", nextsong);
prev.addEventListener("click", prevsong);
