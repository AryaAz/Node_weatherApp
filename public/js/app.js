const weatherForm = document.querySelector('form');
const search      = document.querySelector('input');
const messageOne  = document.querySelector('#message-1');
const messageTwo  = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents to refresh the page when press submit

    const location = search.value;
    const qString  = 'http://localhost:3000/weather?address=' + location;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(qString).then((response) => 
    {
            response.json().then((data) => {
                if(data.error)
                {
                    console.log(data.error);
                    messageOne.textContent = data.error;
                }
                else{
                    console.log();
                    messageOne.textContent = data.place_name;
                    console.log(data.forecast)
                    messageTwo.textContent = data.forecast;
                }
            })
    })
})