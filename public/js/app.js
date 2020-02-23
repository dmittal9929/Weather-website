const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messagetwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    const url = "/weather?search="+location;
    messageOne.textContent = " loading";
    messagetwo.textContent="";
    fetch(url).then((resposne)=>{
        resposne.json().then((data)=>{
            if (data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.location;
                messagetwo.textContent = data.forecast
            }
        })
    })
});
