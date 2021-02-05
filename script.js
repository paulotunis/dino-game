const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const somHit = new Audio();
somHit.src = 'sounds/hit.mp3';
const somJump = new Audio();
somJump.src = 'sounds/jump.mp3';
let isJumping = false;
let isRunning = true;
let position = 0;
let points = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32 || event.keyCode === 38 || event.keyCode === 87) {
    if (!isJumping && isRunning) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;
  somJump.play();

  let upInterval = setInterval(() => {
    if (position >= 200) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 10;
          dino.style.bottom = position + 'px';
        }
      }, 10);

    } else {
      position += 10;
      dino.style.bottom = position + 'px';
    }
  }, 10);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 3000;
  let randomTime = Math.random() * 8000;
  cactus.classList.add('cactus');
  cactus.style.left = cactusPosition + 'px';
  background.appendChild(cactus);  

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {      
      clearInterval(leftTimer);
      background.removeChild(cactus);
      points++;      
      scoreboardRefresh();

    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {      
      clearInterval(leftTimer);
      somHit.play();  
      isRunning = false;
      document.body.innerHTML = '<h1 class="game-over" onclick="window.location.reload()"></h1>';
       
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);
  setTimeout(createCactus, randomTime);
}

let scoreboardRefresh = () => {
  document.getElementById("points").innerHTML = "PONTOS: " + points * 100;
}

document.addEventListener('keyup', handleKeyUp);
createCactus();