const stars = document.querySelectorAll('.star');
const messageBox = document.getElementById('messageBox');
const starMessage = document.getElementById('starMessage');
const canvas = document.getElementById('constellationCanvas');
const finalMessage = document.getElementById('finalMessage');
const ctx = canvas.getContext('2d');
const introOverlay = document.getElementById('introOverlay');


// Start button hides intro overlay
function startExperience() {
  introOverlay.style.display = "none";
}

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const starPositions = [];
const connectedStars = [];

// Get star screen positions after page load (so positions are correct)
window.onload = () => {
  stars.forEach((star, index) => {
    const rect = star.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    starPositions.push({ x, y });

    star.addEventListener('click', () => {
      const message = star.getAttribute('data-message');
      starMessage.textContent = message;
      messageBox.classList.remove('hidden');

      if (!connectedStars.includes(index)) {
        connectedStars.push(index);
        drawConstellation();
      }

      if (connectedStars.length === stars.length) {
        setTimeout(() => {
          finalMessage.classList.remove('hidden');
        }, 1000);
      }
    });
  });
};

function drawConstellation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;

  if (connectedStars.length < 2) return;

  ctx.beginPath();
  for (let i = 0; i < connectedStars.length - 1; i++) {
    const from = starPositions[connectedStars[i]];
    const to = starPositions[connectedStars[i + 1]];
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
  }

  // Connect last star to first star to close the heart shape
  if (connectedStars.length === stars.length) {
    const first = starPositions[connectedStars[0]];
    const last = starPositions[connectedStars[connectedStars.length - 1]];
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(first.x, first.y);
  }

  ctx.stroke();
}

function closeMessage() {
  messageBox.classList.add('hidden');
}

function closeFinalMessage() {
  finalMessage.classList.add('hidden');
}


function goToNextPage() {
  window.location.href = "quiz.html"; // Change to your desired page
}