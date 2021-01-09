let loca = document.getElementById("location");
let temperatureIcon = document.getElementById("temperature-icon");
let temperatureVal = document.getElementById("temperature-val");
let climate = document.getElementById("climate");
let iconFile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");



searchButton.addEventListener('click', (e)=> {
e.preventDefault();
getWeather(searchInput.value);
searchInput.value = '';
});


const getWeather = async (cityName) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=256e95601c76b42222329ed0c6216255`,
    {mode: 'cors'}
        );


        const weatherData = await response.json();
        console.log(weatherData);
        const{name} = weatherData;
        const{feels_like} = weatherData.main;
        const{id, main} = weatherData.weather[0];
        loca.textContent = name;
        climate.textContent = main;
        temperatureVal.textContent = Math.round(feels_like-273);
        if (id < 400 && id > 200) {
            temperatureIcon.src = "./icons/sun.svg"
        }
        else if(id < 300 && id > 300) {
            temperatureIcon.src = "./icons/cloudy.svg"
        }
        else if(id < 600 && id > 500) {
            temperatureIcon.src = "./icons/rain.svg"
        }
        else if(id < 700 && id > 600) {
            temperatureIcon.src = "./icons/snow.svg"
        }
        else if(id < 800 && id > 700) {
            temperatureIcon.src = "./icons/thunderstorm.svg"

        }

}
catch(error) {
    alert('Please enter a city to view its weather');
}
};





window.addEventListener("load",()=>{

    let long;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=> {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const cors = "https://cors-anywhere.herokuapp.com/";

            const api = `${cors}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=256e95601c76b42222329ed0c6216255`
            fetch(api).then((response)=>{
                return response.json();
            })

            .then (data => {
                const{name} = data;
                const{feels_like} = data.main;
                const{id, main} = data.weather[0];

                loca.textContent = name;
                climate.textContent = main;
                temperatureVal.textContent = Math.round(feels_like-273);
                if (id < 400 && id > 200) {
                    temperatureIcon.src = "./icons/sun.svg"
                }
                else if(id < 300 && id > 300) {
                    temperatureIcon.src = "./icons/cloudy.svg"
                }
                else if(id < 600 && id > 500) {
                    temperatureIcon.src = "./icons/rain.svg"
                }
                else if(id < 700 && id > 600) {
                    temperatureIcon.src = "./icons/snow.svg"
                }
                else if(id < 800 && id > 700) {
                    temperatureIcon.src = "./icons/thunderstorm.svg"

                }
                console.log(data);
            })
}

    )}
})
















