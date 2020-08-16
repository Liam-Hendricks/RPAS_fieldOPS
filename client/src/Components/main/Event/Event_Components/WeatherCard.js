import React, { useState } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import { GPS, GETWEATHER } from "../../../../module/CRUD";

import isEmpty from "is-empty";
import { Search } from "react-bootstrap-icons";
import { toast } from "react-toastify";
//component for whowing weather data at Location in a more raw format
const WeatherCard = (props) => {
  const [values, setValues] = useState({
    weatherData: {},
    Loading: false,
  });
  const { weatherData, Loading } = values;
  const { Location } = props;
  //Function for converting time in milliseconds to standard time
  const msToTime = (milliseconds) => {
    var date = new Date(milliseconds * 1000);
    // Hours part from the timestamp

    var hours = date.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  };
  //Function for getting the GPS coordinates of a Location
  const GPSlocation = async () => {
    setValues((prevState) => ({
      ...prevState,
      Loading: true,
    }));
    if (Location !== "") {
      try {
        const response = await GPS(Location);
        getWeatherData(response.data);
      } catch (e) {
        console.log(e);
      }
    } else {
      setValues((prevState) => ({
        ...prevState,
        Loading: false,
      }));
      toast.warning("Enter a Location");
    }
  };
  //Function for gettting weather data using the coordinates
  const getWeatherData = async (data) => {
    const x = data.candidates[0].location.x;
    const y = data.candidates[0].location.y;
    try {
      const response = await GETWEATHER(x, y);
      setValues((prevState) => ({
        ...prevState,
        weatherData: response.data,
        Loading: false,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card style={{ width: "fit-content", padding: "20px", marginLeft: "auto" }}>
      <Card.Title>Weather data at location</Card.Title>
      <Card.Body style={style}>
        {Loading === true ? (
          <div>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : isEmpty(weatherData) === true ? (
          <div>
            <p>Search Location </p>
          </div>
        ) : (
          <div>
            <p style={{ textAlign: "left" }}>
              Area: {weatherData.name}
              <br />
              {weatherData.weather[0].description}, covering{" "}
              {weatherData.clouds.all} % of sky
              <br />
              Wind is {weatherData.wind.speed} m/s Bearing{" "}
              {weatherData.wind.deg}° <br />
              Visibility {weatherData.visibility / 1000} km <br />
              Pressure: {weatherData.main.pressure} hPa
              <br />
              Air Humidity: {weatherData.main.humidity} %<br />
              Current Temp: {weatherData.main.temp}°C
              <br />
              Max Temp: {weatherData.main.temp_max}°C | Min Temp:{" "}
              {weatherData.main.temp_max}°C
              <br />
              Sunrise: {msToTime(weatherData.sys.sunrise)} UTC | Sunset:{" "}
              {msToTime(weatherData.sys.sunset)} UTC
            </p>
          </div>
        )}
      </Card.Body>

      <Button variant="outline-secondary" onClick={GPSlocation}>
        <Search color="black" size={15} />
        Weather
      </Button>
    </Card>
  );
};
const style = {
  paddingRight: "0",
  paddingLeft: "0",
  paddingBottom: "0",
  marginLeft: "auto",
  marginRight: "auto",
};
export default WeatherCard;
