const api_key = "2aa3ccdbea77c33c02ae63efe95196da";
const base_url = "https://api.openweathermap.org/data/2.5";
const imgUrl = "https://openweathermap.org/img/wn";
const cityInput = document.querySelector("#cityInput");
const addCity = document.querySelector("#addCity");
const footer = document.getElementById("footer");

let weatherArray = [];

async function getWeatherData(base_url, api_key) {
  const response = await fetch(
    `${base_url}/weather?q=${cityInput.value}&appid=${api_key}&&units=metric`
  );
  const result = await response.json();

  if (cityInput.value && !isLocationPresent(result.name)) {
    renderItem(result);
    weatherArray.push(result);
    console.log(weatherArray[0].main.temp);
    console.log("this");
    console.log(result);
  }
}

addCity.addEventListener("click", () => {
  getWeatherData(base_url, api_key);
  if (cityInput.value === "") {
    alert("Enter City First");
  }
});

function isLocationPresent(location) {
  return weatherArray.some((weather) => weather.name === location);
}

function renderItem(dataObj) {
  const card = document.createElement("div");
  card.setAttribute("class", "card mb-3");
  card.style.maxWidth = "540px";

  let src = `${imgUrl}/${dataObj.weather[0].icon}@2x.png`;

  card.innerHTML = `
    <div class="row g-0 h-100">
        <div class="col-md-8">
            <div class="card-body">
                <h1 class="card-title">${Math.round(dataObj.main.temp)}°C</h1>
                <div>
                    <p class="card-text">
                      <small class=" text-info">
                        Humidity: ${dataObj.main.humidity}° 
                        <br>
                        Pressure: ${dataObj.main.pressure}
                      </small>
                    </p>
                    <p class="card-text">${
                      dataObj.name + ", " + dataObj.sys.country
                    }</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <img src="${src}" height="100%" class="img-fluid rounded-5" alt="no-image">
            <p class="text-center">${dataObj.weather[0].main}</p>
        </div>
    </div>
  
  `;

  const temperature = Math.round(dataObj.main.temp);
  updateFooterUI(card, temperature);
}

function updateFooterUI(card, temperature) {
  let index = 0;
  while (
    index < footer.children.length &&
    temperature < getTemperature(footer.children[index])
  ) {
    index++;
  }

  footer.insertBefore(card, footer.children[index]);
}

function getTemperature(card) {
  return parseInt(card.querySelector(".card-title").innerText);
}
