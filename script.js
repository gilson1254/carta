const intro = document.getElementById("intro");
const inside = document.getElementById("inside");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const moreBtn = document.getElementById("moreBtn");
const moreContent = document.getElementById("moreContent");
const musicBtn = document.getElementById("musicBtn");
const songName = document.getElementById("songName");

let opened = false;
let player = null;
let youtubeReady = false;


/* ================================
   ABRIR CARTA
================================ */

openBtn.addEventListener("click", () => {
  if (opened) return;

  opened = true;

  intro.classList.add("opening");

  setTimeout(() => {
    intro.classList.remove("active");
    inside.classList.add("active");
  }, 1250);
});


/* ================================
   FECHAR CARTA
================================ */

closeBtn.addEventListener("click", () => {

  // Para a música
  if (player && youtubeReady) {
    player.pauseVideo();
    player.seekTo(0, true);
  }

  musicBtn.textContent = "▶";

  inside.classList.remove("active");
  intro.classList.add("active");
  intro.classList.remove("opening");

  moreContent.classList.remove("show");

  moreBtn.querySelector("span").textContent = "→";

  opened = false;
});


/* ================================
   BOTÃO "THERE'S MORE HERE"
================================ */

moreBtn.addEventListener("click", () => {

  moreContent.classList.toggle("show");

  moreBtn.querySelector("span").textContent =
    moreContent.classList.contains("show")
      ? "↓"
      : "→";
});


/* ================================
   YOUTUBE API
================================ */

function onYouTubeIframeAPIReady() {

  player = new YT.Player("youtube-player", {

    height: "1",
    width: "1",

    videoId: "cyX-BUNcCqs",

    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,

      // Faz a música repetir
      loop: 1,
      playlist: "cyX-BUNcCqs"
    },

    events: {

      onReady: () => {

        youtubeReady = true;

        songName.textContent =
          "Uma música para você";
      },

      onStateChange: (event) => {

        // Música terminou
        if (
          event.data === YT.PlayerState.ENDED
        ) {
          musicBtn.textContent = "▶";
        }

        // Música começou
        if (
          event.data === YT.PlayerState.PLAYING
        ) {
          musicBtn.textContent = "Ⅱ";
        }

        // Música pausada
        if (
          event.data === YT.PlayerState.PAUSED
        ) {
          musicBtn.textContent = "▶";
        }
      },

      onError: () => {

        songName.textContent =
          "Não foi possível carregar a música";
        
        musicBtn.textContent = "▶";
      }

    }

  });

}


/* ================================
   BOTÃO DA MÚSICA
================================ */

musicBtn.addEventListener("click", () => {

  if (!youtubeReady || !player) {

    songName.textContent =
      "A música ainda está carregando...";

    return;
  }


  const state = player.getPlayerState();


  // Se estiver tocando → pausa
  if (state === YT.PlayerState.PLAYING) {

    player.pauseVideo();

    musicBtn.textContent = "▶";

  }

  // Se estiver pausado ou parado → toca
  else {

    player.playVideo();

    musicBtn.textContent = "Ⅱ";

  }

});


/* ================================
   PÉTALAS QUE CAEM
================================ */

const petals =
  document.querySelector(".falling-petals");


for (let i = 0; i < 18; i++) {

  const p =
    document.createElement("span");

  p.textContent =
    Math.random() > 0.5
      ? "✿"
      : "·";

  p.style.left =
    `${Math.random() * 100}%`;

  p.style.top =
    `${-10 - Math.random() * 20}%`;

  p.style.fontSize =
    `${8 + Math.random() * 12}px`;

  p.style.animationDelay =
    `${Math.random() * 8}s`;

  p.style.animationDuration =
    `${6 + Math.random() * 6}s`;

  petals.appendChild(p);
}
