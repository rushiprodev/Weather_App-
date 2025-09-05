import { useEffect, useState } from "react";
import "./App.css";
import weatherImg from "./assets/weather.png"; // default image

function App() {
  const [city, setCity] = useState("Delhi");
  const [WeatherData, SetWeatherData] = useState(null);
  const [error, setError] = useState("");

  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formatedData = `${month} ${day}, ${year}`;

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


  const FetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();
      console.log(data);

      if (data.cod === "404") {
        setError("❌ City not found. Please try again.");
      } else {
        SetWeatherData(data);
        setError(""); // clear error if success
      }
    } catch (err) {
      console.log("Error occurred", err);
      setError("⚠️ Something went wrong. Please try again later.");
    }
  };

useEffect(() => {
  FetchWeatherData(); 
}, []); // sirf ek baar chalega on load


  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (city.trim() === "") {
      setError("⚠️ Please enter a city name.");
      return; // old data will remain, only error shown
    }

    FetchWeatherData();
  };

  return (
    <div className="App">
      <div className="container">
        {/* Date */}
        <h2 className="container_date">{formatedData}</h2>

        {/* Weather data */}
        {WeatherData && (
          <div className="weather_data">
            <h2 className="container_city">{WeatherData.name}</h2>

            {/* Weather image */}
            <img
              src={weatherImg}
              alt="Weather Icon"
              className="container_img"
            />

            <h2 className="container_degree">
              {WeatherData.main.temp} °C
            </h2>
            <h2 className="country_per">{WeatherData.weather[0].main}</h2>
          </div>
        )}

        {/* Search form */}
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Enter city name"
            onChange={handleInputChange}
          />
          <button type="submit">Get</button>
        </form>

        {/* Error below form */}
        {error && (
          <div className="error-box">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
