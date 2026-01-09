import './App.css';
import WeatherForm from './components/WeatherForm';
import WeatherInfo from './components/WeatherInfo';
import { useState, useEffect } from 'react';

function App() {

  const API_KEY = "8d1d55987e65fd7428680f71ad1ecb43";
  const currentCity = "Mohali";
  const [city, setCity] = useState("null");
  const [weather, setWeather] = useState(null);
  const [currentCityWeather, setCurrentCityWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cityWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error(`Http Error! status ${response.status}`);
      }
      const data = await response.json();
      setCurrentCityWeather(data);
    } catch (err) {
        setError(err.message);
    }
  };


  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error(`Http Error! status ${response.status}`);
      }
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    cityWeather();
  }, []);


  useEffect(() => {
    if (!city || city === "null") return;
    fetchWeather();
  }, [city]);


  useEffect(() => {
    const timer = setInterval(() => {
      if (city && !error){
      console.log(`Fetching weather data... for ${city}`);
      fetchWeather(); }
    }, 60000);

    return () => clearInterval(timer);
  }, [city, error]);



  return (
    <div className="App">
      <div className="header">
        <h1> Mastering Weather Data With React  </h1>
      </div>
      <div className="content">
        <div className="side-content">
          <h2>Current Weather in {currentCity}</h2>
          {currentCityWeather && <WeatherInfo weather={currentCityWeather} />}
        </div>
        <div className="main-content">
          <WeatherForm setCity={setCity} />

          {loading && <p>Loading weather data...</p>}
          {error && <p className="error">{error}</p>}

          {weather && city && <WeatherInfo className="weather-info" weather={weather} />}
        </div>
      </div>
    </div>
  );
}

export default App;
