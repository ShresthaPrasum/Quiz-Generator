
document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById('form');
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        formdata = new FormData(form);
        const diff = formdata.get('diff');
        console.log(diff);
        const name = document.querySelector('input[type="text"]').value;
        const limit = document.querySelector('input[type="number"]').value;
        if(limit < 1 || limit > 5){
            alert(`Please enter limit from 1 to 5, else it will crash!`);
        }
        
        fetch('/savee',{
            method: 'POST',
            headers:{"Content-type": "application/json"},
            body:JSON.stringify({
                name:name,
                limit: limit,
                diff: diff
            })

        })
        .then(response=>response.json())
        .then(result=>{
            if(result.success){
                const dataa = result.data;
                console.log(dataa);
                const clue1 = dataa.map(item=>item.clue1);
                const clue2 = dataa.map(item=>item.clue2);
                const clue3 = dataa.map(item=>item.clue3);
                document.getElementById('container').style.display = "none";
                document.getElementById('don-container').style.display = "flex";
                const todisplay = dataa.length;
                const boxs = document.querySelectorAll('.box');
                for(let i=0; i<todisplay;i++){
                    boxs[i].style.display = "flex";
                }
                boxs.forEach(box=>{
                    box.addEventListener('click',(e)=>{
                        boxs.forEach(b=> b.classList.remove('active'));
                        box.classList.add('active');
                    })
                })
                const revealbtn = document.getElementById('revealll');
                revealbtn.addEventListener('click', ()=>{
                    const selected_box = document.querySelector('.active');
                    const s1 = selected_box.dataset.number;
                    document.getElementById('clues').style.display="flex";
                    console.log(dataa[s1-1]);
                })
                const reveal_clue = document.getElementById('reveal_clue');
                const cluess = Array.from(document.querySelectorAll('.cluess'));
                console.log(cluess);
                let i=0;
                reveal_clue.addEventListener('click',()=>{
                    const s21 = document.querySelector('.active').dataset.number;
                    if(i>2){
                        alert(`You already have gotten the clues dawg!`);
                    }
                        cluess[i].style.display = 'flex';
                        if(i==0){
                        cluess[i].innerHTML = `
                        ${i+1}. ${clue1[s21-1]}
                        `;
                        }else if(i==1){
                            cluess[i].innerHTML = `
                            ${i+1}. ${clue2[s21-1]}
                            `;
                        }else if(i==2){
                            cluess[i].innerHTML = `
                            ${i+1}. ${clue3[s21-1]}
                            `;
                        }
                        i++;

                })
            }
        })
    })
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