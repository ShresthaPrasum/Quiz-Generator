
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
                    if(i>2){
                        alert(`You already have gotten the clues dawg!`);
                    }
                        cluess[i].style.display = 'flex'
                        i++;
                    
                    // cluess.forEach((clues, index)=>{
                    //     console.log(2);
                    //     cluess[index].display = "revert";
                    //     console.log(1);
                    // })
                })
            }
        })
    })
})