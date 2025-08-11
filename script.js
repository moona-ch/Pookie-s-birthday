window.addEventListener("DOMContentLoaded", () => {
    const letter = document.getElementById("letter");
    const proposal = document.getElementById("proposal");
    const yesBtn = document.getElementById("yesBtn");
    const confettiCanvas = document.getElementById("confetti-canvas");
  
    setTimeout(() => {
      letter.classList.remove("hidden");
    }, 300);
  
    setTimeout(() => {
      proposal.classList.remove("hidden");
    }, 9500);
  
    yesBtn.addEventListener("click", () => {
      startConfetti();
      yesBtn.innerText = "💞 Happy Birthday, my love!";
    
      // Show the next page button after 2 seconds (or instantly if you prefer)
      setTimeout(() => {
        const nextPageBtn = document.getElementById("nextPageBtn");
        nextPageBtn.style.display = "inline-block";
      }, 2000); // delay optional
    });
  
    // Basic confetti
    function startConfetti() {
      const ctx = confettiCanvas.getContext("2d");
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
      confettiCanvas.classList.remove("hidden");
  
      const confetti = [];
      for (let i = 0; i < 100; i++) {
        confetti.push({
          x: Math.random() * confettiCanvas.width,
          y: Math.random() * confettiCanvas.height - confettiCanvas.height,
          r: Math.random() * 6 + 4,
          d: Math.random() * 100,
          color: `hsl(${Math.random() * 360}, 100%, 70%)`,
          tilt: Math.random() * 10 - 10,
          tiltAngleIncrement: Math.random() * 0.1 + 0.05,
          tiltAngle: 0
        });
      }
  
      function drawConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confetti.forEach(c => {
          ctx.beginPath();
          ctx.lineWidth = c.r;
          ctx.strokeStyle = c.color;
          ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
          ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
          ctx.stroke();
        });
        update();
        requestAnimationFrame(drawConfetti);
      }
  
      function update() {
        confetti.forEach(c => {
          c.y += Math.cos(c.d) + 1 + c.r / 2;
          c.x += Math.sin(c.d);
          c.tiltAngle += c.tiltAngleIncrement;
          c.tilt = Math.sin(c.tiltAngle) * 15;
  
          if (c.y > confettiCanvas.height) {
            c.y = -10;
            c.x = Math.random() * confettiCanvas.width;
          }
        });
      }
  
      drawConfetti();
    }
  });
  
  document.getElementById("nextPageBtn").addEventListener("click", () => {
    window.location.href = "linktree.html"; 
  });
  