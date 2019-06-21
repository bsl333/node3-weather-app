
const form = document.querySelector('form');
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  message1.textContent = 'Loading...';
  message2.textContent = '';
  const address = document.getElementById('address').value
  fetch(`http://localhost:3003/weather?address=${address}`)
    .then(res => res.json())
    .then(res => {
      if(res.error) {
        message1.textContent = res.error;
        return
      }

      message1.textContent = res.location;
      message2.textContent = `Summary: ${res.summary} With a temperature of ${res.temperature}`
    });
})
