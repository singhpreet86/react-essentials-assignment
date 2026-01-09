import './App.css';
import WeatherForm from './components/WeatherForm';
import WeatherInfo from './components/WeatherInfo';
import { useState, useEffect } from 'react';

function App() {

  const API_KEY = "8d1d55987e65fd7428680f71ad1ecb43";

  const [city, setCity] = useState("Mohali");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCityWeather, setCurrentCityWeather] = useState(null);
  const [inputCity, setInputCity] = useState(false);

  const fetchWeather =  async () => { 
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
      if (city === "Mohali"){
      setCurrentCityWeather(data);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setInputCity(false);
    } 
  };

  useEffect(() => {
    fetchWeather();
  }, [city]); 

  useEffect(() => {
    const timer = setInterval(() => {
      setCity(prev => prev);
    }, 10000);

    return () => clearInterval(timer);
  }, []);


  
  return (
    <div className="App">
      <div className="header">
        <h1> Mastering Weather Data With React  </h1>
      </div>
      <div className="content">
        <div className="side-content">
          <h2>Current Weather in Mohali</h2>
          {currentCityWeather && <WeatherInfo weather={currentCityWeather} />}          
        </div>
        <div className="main-content">
          <WeatherForm setCity={setCity} setInputCity={setInputCity} />    

          {loading && <p>Loading weather data...</p>}
          {error && <p className="error">{error}</p>}
          
          {weather && inputCity && <WeatherInfo weather={weather} />}   
        </div>
      </div>
    </div>
  );
}

export default App;
