import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import broken_clouds from "../Assets/broken-clouds.png";
import shower_rain from "../Assets/shower_rain.png";
import mist from "../Assets/mist.png";
import error_icon from "../Assets/error.png";

const WeatherApp = () => {
  let dataConatainer = document.getElementsByClassName("data-container");
  let temp = document.getElementsByClassName("weather-temp");
  let weatherlocation = document.getElementsByClassName("weather-location");
  let api_key = "6d112f5994b5f8c658d1f1095965b5cf";
  const [wicon, setWicon] = useState();
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let responce = await fetch(url);
    let data = await responce.json();
    console.log(data);

    if (data.cod === "404") {
      setWicon(error_icon);
      weatherlocation[0].style.display = "none";
      dataConatainer[0].style.display = "none";
      temp[0].style.fontSize = "30px";
      temp[0].innerHTML = "Something went wrong!";
    } else {
      dataConatainer[0].style.display = "flex";
      temp[0].style.fontSize = "110px";

      /* selecting sutable weather icon using conditions  */
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(broken_clouds);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(shower_rain);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snow_icon);
      } else if (
        data.weather[0].icon === "50d" ||
        data.weather[0].icon === "50n"
      ) {
        setWicon(mist);
      }

      /* This code is selecting elements with specific class names from the DOM and updating their
 innerHTML with data from the API response. */
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-speed");
      const temprature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
      humidity[0].innerHTML = data.main.humidity + "%";
      wind[0].innerHTML = data.wind.speed + " km/h";
      temprature[0].innerHTML = Math.round(data.main.temp) + "°C";
      location[0].innerHTML = data.name;
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search city"
          onKeyDown={(e) => {
            if (e.key === "Enter") search();
          }}
        />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="search icon" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp"></div>
      <div className="weather-location"></div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent"></div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-speed"></div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default WeatherApp;
