console.log("I am printing");

const onSubmit = (e) => {
  e.preventDefault();
  e.stopPropagation();
  errorMsg.textContent = "Loading";
  dataMsg.textContent = "";
  getWeather(input.value);
};

const getWeather = (address) => {
  const query = "/weather?address=" + address;
  fetch(query).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        errorMsg.textContent = data.error;
      } else {
        errorMsg.textContent = data.location;
        dataMsg.textContent = data.forecast;
      }
    });
  });
};

const input = document.getElementById("location-input");
const form = document.getElementById("form");
const errorMsg = document.getElementById("error-msg");
const dataMsg = document.getElementById("data-msg");

form.addEventListener("submit", onSubmit);
