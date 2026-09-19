
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
        
        fetch('/save',{
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

        })
    })
})