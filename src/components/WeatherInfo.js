const WeatherInfo = ({ weather }) => {
  return (
    <div className="weather-card">
      <h2>{weather.name} {weather.sys.country}</h2>

    <p className={weather.main.temp > 25 ? "hot" : "cold"}>
      <strong>🌡 Temperature: </strong> {weather.main.temp}°C
    </p>
    <p><strong>☁ Condition:</strong> {weather.weather[0].description}</p>
    <p><strong>💧 Humidity:</strong> {weather.main.humidity}%</p>
    <p><strong>🌬 Wind:</strong> {weather.wind.speed} m/s</p>

    <p><strong>🤒 Feels Like:</strong> {weather.main.feels_like}°C</p>

    </div>
  );
};

export default WeatherInfo;
