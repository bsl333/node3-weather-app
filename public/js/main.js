
const form = document.querySelector('form');
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  message1.textContent = 'Loading...';
  message2.textContent = '';
  const address = document.getElementById('address').value
  fetch(`/weather?address=${address}`)
    .then(res => res.json())
    .then(res => {
      if(res.error) {
        message1.textContent = res.error;
        return
      }

      message1.textContent = res.location;
      message2.textContent = `${res.summary} It is currently ${res.temperature} degrees out. The high is ${res.temperatureMax} with a low of ${res.temperatureMin}. There is a currenlty a ${res.precipProbability * 100}% chance of rain.`
    });
})
