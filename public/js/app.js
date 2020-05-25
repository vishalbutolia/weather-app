const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationField = document.querySelector('#location');
const iconDiv = document.querySelector('#weather-icon');
const summaryField = document.querySelector('#weather-summary');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const location = search.value;

  locationField.textContent = '...loading';
  iconDiv.innerHTML = '';
  summaryField.textContent = '';

  fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
      if(data.error){
        messageOne.textContent = data.error;
      } else {
        const { temperature, precip, feelslike, humidity, weather_icons } = data.forecast;
        var img = document.createElement("img");
        img.src = weather_icons[0];
        iconDiv.appendChild(img);
        locationField.textContent = data.location;
        summaryField.textContent = `It is currently ${temperature} degree out but feels like ${feelslike} degree. There is ${precip}% chance of rain.`;
      }
    });
  });
});