
import { useState } from 'react';
import './App.css';
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios"

const apiKey = '840de593b7028de6e424162454790fe5';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + apiKey;


function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const searchWeather = () => {
    if (city.trim() === '') {
      alert('Please enter a city name.');
      return;
    }

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=`+apiKey, { params: { q: city } })
      .then((response) => {
        const data = response.data;
        if (data.cod === 200) {
          setWeatherData(data);
        } else {
          alert('City not found. Please enter a valid city name.');
        }
      })
      .catch((error) => {
        alert('An error occurred while fetching weather data.');
      });
  };

  const closePopup = () => {
    setWeatherData(null);
  };

  return (
    <div className='App'>
      <div className='searchbar'>
        <input placeholder="Type to Search" value={city}
          onChange={(e) => setCity(e.target.value)}/>
        <div onClick={searchWeather}>
          <AiOutlineSearch />
        </div>
      </div>
      {weatherData && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={closePopup}>Close</button>
            <span className="city-name">City: {weatherData.name}</span>
            <span className="temperature">Temperature: {weatherData.main.temp}°C</span>
            <span className="weather-description">
              {weatherData.weather[0].main}: {weatherData.weather[0].description}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
