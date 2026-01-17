import './App.css';
import WeatherForm from './components/WeatherForm';
import WeatherInfo from './components/WeatherInfo';
import { useState, useEffect } from 'react';

function App() {

  const API_KEY = "8d1d55987e65fd7428680f71ad1ecb43";
  const [city, setCity] = useState("mohali");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found...");
      }
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setWeather(null);
    }
  };

  useEffect(() => {
    if (!city || city === "null") return;

    fetchWeather(); 


    const timer = setInterval(() => {
       fetchWeather(); 
    }, 60000);

    return () => clearInterval(timer);

    
  }, [city]);

  const CityNotFound = () => {
    return(
    <div className="weather-card error">
      <h2>City not Found </h2>
      <h2>Please try another city</h2>
    </div>
    )
  }

  const getWeatherTheme = () => {

  if (!weather) 
    return "default";
  const condition = weather.weather[0].main.toLowerCase();

  if (condition.includes("clear")) 
    return "sunny";
  if (condition.includes("cloud")) 
    return "cloudy";
  if (condition.includes("rain") || condition.includes("drizzle")) 
    return "rainy";
  if (condition.includes("snow")) 
    return "snowy";
  if (condition.includes("thunder")) 
    return "stormy";

  return "default";
};



  return (
    <div className={`App ${getWeatherTheme()}`}>

      <div className="header">
        <h1> Mastering Weather Data With React  </h1>
      </div>
      <div className="content">
        <div className="main-content">
          <WeatherForm setCity={setCity} />

          {loading && <p>Loading weather data...</p>}
          {error && <CityNotFound />}

          {weather && city && <WeatherInfo className="weather-info" weather={weather} />}
        </div>
      </div>
    </div>
  );
}

export default App;
