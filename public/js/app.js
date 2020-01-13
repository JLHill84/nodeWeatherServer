const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const cityName = search.value;

  messageOne.textContent = "loading";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${cityName}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = "error...error";
        messageTwo.textContent = data.error;
      } else {
        messageOne.textContent = "Location: " + data.cityName;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});