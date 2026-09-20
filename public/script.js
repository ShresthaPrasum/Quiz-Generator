document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const click = new Audio('minecraft_click.mp3');
  const sounds = document.querySelectorAll('a, input[type="text"], input[type="radios"], input[type="number"], button, .box')
  sounds.forEach((sound)=>{
    sound.addEventListener('click', ()=>{
      click.currentTime = 0;
      click.play();
    })
<<<<<<< HEAD
    const canvas = document.getElementById("particle-canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particles = [];
        function createParticles() {
          particles = [];
          let particleCount = Math.floor(canvas.width / 40);
          for (let i = 0; i < particleCount; i++) {
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              vx: (Math.random() - 0.5) * 0.3,
              vy: (Math.random() - 0.5) * 0.3,
              radius: Math.random() * 2 + 1,
            });
          }
        }
        function animateParticles() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
            if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          }
          requestAnimationFrame(animateParticles);
        }
        window.addEventListener("resize", () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          createParticles();
        });

        createParticles();
        animateParticles();
})
=======
  })
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formdata = new FormData(form);
    const diff = formdata.get("diff");
    console.log(diff);
    const name = document.querySelector('input[type="text"]').value;
    const limit = document.querySelector('input[type="number"]').value;
    if (limit < 1 || limit > 5) {
      alert(`Please enter limit from 1 to 5, else it will crash!`);
      return;
    }

    fetch("/savee", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        limit: limit,
        diff: diff,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          const dataa = result.data;
          console.log(dataa);
          const clue1 = dataa.map((item) => item.clue1);
          const clue2 = dataa.map((item) => item.clue2);
          const clue3 = dataa.map((item) => item.clue3);
          const answer = dataa.map((item)=> item.player);
          document.getElementById("container").style.display = "none";
          document.getElementById("don-container").style.display = "flex";

          const todisplay = dataa.length;
          const boxs = document.querySelectorAll(".box");
          for (let i = 0; i < todisplay; i++) {
            boxs[i].style.display = "flex";
          }
          document.getElementById('h2').innerText = `Choose one box for one player, ${name}!`;
          boxs.forEach((box) => {
            box.addEventListener("click", (e) => {
              boxs.forEach((b) => b.classList.remove("active"));
              box.classList.add("active");
            });
          });

          const revealbtn = document.getElementById("revealll");

            guess.style.display="flex";
          revealbtn.addEventListener("click", () => {
            let selected_box = document.querySelector(".active");
            const s1 = selected_box.dataset.number;
            document.getElementById("clues").style.display = "flex";
          });
          let i = 0;
        let points = 0;
          function helo(){
             const guess = document.querySelector('#guess');
             const ansbtn = document.querySelector('#anssubmit')
          const reveal_clue = document.getElementById("reveal_clue");
          const cluess = Array.from(document.querySelectorAll(".cluess"));
          console.log(cluess);
          reveal_clue.addEventListener("click", () => {
              let s21 = document.querySelector(".active").dataset.number;
            if (i > 2) {
              alert(`You already have gotten the clues dawg!`);
              return;
            }
            cluess[i].style.display = "flex";
            if (i == 0) {
              cluess[i].innerHTML = `
                        ${i + 1}. ${clue1[s21 - 1]}
                        `;
            } else if (i == 1) {
              cluess[i].innerHTML = `
                            ${i + 1}. ${clue2[s21 - 1]}
                            `;
            } else if (i == 2) {
              cluess[i].innerHTML = `
                            ${i + 1}. ${clue3[s21 - 1]}
                            `;
            }
            i++;
            
        });
         
        
        let life = 3;
          ansbtn.addEventListener('click', ()=>{
              const guessed = document.querySelector('#guess').value.trim().toLowerCase();
              s21 = document.querySelector(".active").dataset.number;
              const realans = answer[s21-1].trim().toLowerCase();
              console.log(realans);   

               if(guessed==realans){
                if(i==0){
                  points += 250;
                  alert(`${name}, YOU NAILED IT!!! It was ${guessed} and you have ${points} points now which means +250 points cuz you did it WITHOUT ANY CLUE!!!`);
                }else if(i==1){
                  points += 150;
                  alert(`${name}, You SOLVED IT!, It was indeed ${guessed} and you have ${points} points now which means +150 points as you did it ONLY ONE CLUE!!`)
                }else if(i==2){
                  points += 100;
                  alert(`${name}, You DID IT!, It was ${guessed} and you have ${points} points now which means +100 as you did it with 2 clues ONLY!`);
                }else{
                  points +=50;
                  alert(`You guessed it! Well done, it was ${guessed}. You now have ${points} points which means +50 as you did it after 3 clues!`);
                }
                   life++;
                   
                   document.querySelector('.active').classList.add('disabled');
                   console.log(points)
                   hide();
                   
               }else if(guessed!=realans){
                 life--;
                   alert(`WRONG! It was ${realans}, better use some ball knowledge next time ${name} cuz you have only ${life} lives left!`);
                   document.querySelector('.active').classList.add('disabled');
                   hide();
                   if(life<=0){
                    alert(`You are eliminated cuz you have 0 lives!`);
                    life =3;
                    console.log(points);
                    window.location.href = "./football.html";
                   }
                   return;
                   
               }
          })
        }
        helo();
        function hide(){
          document.getElementById("clues").style.display = "none";
            document.getElementsByClassName("cluess").display = "revert";
            i=0;
            document.querySelectorAll('.cluess').forEach(el=>el.style.display="none");
            
       if (document.querySelectorAll('.box.disabled').length === todisplay) {
    document.getElementById('h2').innerText = `You got ${points} points in total!`;
}
        }
          const hidebtn = document.getElementById("hide");
          hidebtn.addEventListener("click", () => {
            document.getElementById("clues").style.display = "none";
            document.getElementsByClassName("cluess").display = "revert";
            i=0;
            document.querySelectorAll('.cluess').forEach(el=>el.style.display="none");

          });
      }
      });
  });
});
>>>>>>> 9cfba181093d2f9f1754dc34d579962c35ad8564
