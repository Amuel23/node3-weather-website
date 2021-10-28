// fetch(`http://puzzle.mead.io/puzzle`).then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msgOne");
const msg2 = document.querySelector("#msgTwo");

// msg1.textContent = `From Javascript`;

weatherForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const location = search.value;
  msg1.textContent = `Loading...`;
  msg2.textContent = ``;

  fetch(`/weather?location=` + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forecast.temperature;
        msg2.textContent = data.forecast.weather_description;
      }
    });
  });
});
