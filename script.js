const apiKey = "8c14f05a1c1652b7e513af91639cbacb";

console.log("Script Started");

async function getWeather(cityFromHistory) {

console.log("Function getWeather started");

let city = cityFromHistory || document.getElementById("city").value;

if(city === ""){
alert("Enter city name");
return;
}

try{

console.log("Before fetch");

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

console.log("After fetch");

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

document.getElementById("weather").innerHTML =
`
City: ${data.name} <br>
Temperature: ${data.main.temp} °C <br>
Condition: ${data.weather[0].main}
`;

saveHistory(city);

}catch(error){

console.log("Error caught");

document.getElementById("weatherResult").innerHTML =
"Error: City not found or network issue";

}

}

function saveHistory(city){

let history = JSON.parse(localStorage.getItem("cities")) || [];

if(!history.includes(city)){
history.push(city);
localStorage.setItem("cities", JSON.stringify(history));
}

showHistory();

}

function showHistory(){

let history = JSON.parse(localStorage.getItem("cities")) || [];

let list = document.getElementById("history");

list.innerHTML = "";

history.forEach(city => {

let li = document.createElement("li");

li.textContent = city;

li.onclick = () => getWeather(city);

list.appendChild(li);

});

}

showHistory();

console.log("Script Ended");