const dino = document.getElementById("dino");
const game = document.getElementById("game");
const scoreElement = document.getElementById("score");

let isJumping = false;
let position = 0;
let score = 0;

// Função de pular
function jump() {
  if (isJumping) return;
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 120) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 5;
        dino.style.bottom = position + "px";
      }, 20);
    }
    position += 5;
    dino.style.bottom = position + "px";
  }, 20);
}

// Criar cactos
function createCactus() {
  const cactus = document.createElement("div");
  cactus.classList.add("cactus");
  game.appendChild(cactus);

  let cactusPosition = 800;
  let randomTime = Math.random() * 3000 + 1000;

  let moveInterval = setInterval(() => {
    if (cactusPosition < -20) {
      clearInterval(moveInterval);
      game.removeChild(cactus);
      score++;
      scoreElement.textContent = score;
    } else if (
      cactusPosition > 60 &&
      cactusPosition < 90 &&
      position < 40
    ) {
      alert("💀 você morreu! Pontuação: " + score);
      document.location.reload();
    }
    cactusPosition -= 5;
    cactus.style.left = cactusPosition + "px";
  }, 30);

  setTimeout(createCactus, randomTime);
}

// Controles
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});

// Iniciar jogo
createCactus();
