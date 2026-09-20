document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formdata = new FormData(form);
    const diff = formdata.get("diff");
    console.log(diff);
    const name = document.querySelector('input[type="text"]').value;
    const limit = document.querySelector('input[type="number"]').value;
    if (limit < 1 || limit > 5) {
      alert(`Please enter limit from 1 to 5, else it will crash!`);
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
          boxs.forEach((box) => {
            box.addEventListener("click", (e) => {
              boxs.forEach((b) => b.classList.remove("active"));
              box.classList.add("active");
            });
          });

          const revealbtn = document.getElementById("revealll");

            guess.style.display="flex";
          revealbtn.addEventListener("click", () => {
            const selected_box = document.querySelector(".active");
            const s1 = selected_box.dataset.number;
            document.getElementById("clues").style.display = "flex";
          });
          let i = 0;

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
         
        
          ansbtn.addEventListener('click', ()=>{
              const guessed = document.querySelector('#guess').value.trim().toLowerCase();
              s21 = document.querySelector(".active").dataset.number;
              const realans = answer[s21-1].trim().toLowerCase();
              console.log(realans);   

               if(guessed==realans){
                   alert(`You GUESSED IT!!! It was ${guessed}`);
               }else if(guessed!=realans){
                   alert(`WRONG! It was ${realans}`);
                   return;
               }
            
          })
        }
        helo();
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