import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Weahter_image from "../../../static/images/Cloud-and-sun-clipart.jpeg";
import Wind_sock from "../../../static/images/wind_sock.png";
import Thermomter from "../../../static/images/thermometer.jpg";
import pressure from "../../../static/images/presure.jpg";
import humidity from "../../../static/images/humidity.png";
import {GETWEATHER} from '../../../module/CRUD'
import "react-toastify/dist/ReactToastify.min.css";
import Location from "../../../static/images/location_pin.png";
import { Cloud } from "react-bootstrap-icons";

//weather component that displays weather details using users location data
class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      lat: "",
      long: "",
      data: {},
      noData: true,
      error: "Refresh to get data",
    };
  }
  //function for getting the users location through the browser
  getLocation = () => {
    this.setState({ isLoading: true });
    if (navigator.geolocation) {
      //return position object to arrow function and set coords
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        this.getWeatherData();
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  //function for get the weather data using the users GPS coords
  getWeatherData = async () => {
    const { lat, long } = this.state;
    if (lat === "" && long === "") {
      this.setState({ noData: true, error: "Did not get location data" });
    } else {
      try {
        const response = await GETWEATHER(long,lat);
        this.setState({ data: response.data, isLoading: false, noData: false });
      } catch (e) {
        this.setState({ error: e, noData: true });
      }
    }
  };
  //function for converting direction in degrees to compass bearings
  degToCompass = (num) => {
    let val = Math.floor(num / 22.5 + 0.5);
    let arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[val % 16];
  };
  render() {
    const { lat, long, data, isLoading, noData, error } = this.state;
    return (
      <Card
        className="weather"
        style={{ width: "25rem", height: "fit-content",borderRadius:'15px' }}
      >
        <Card.Img
         style={{borderRadius:'15px'}}
          variant="top"
          src={Weahter_image}
          width="250px"
          height="150px"
        />
        <Card.Body>
          <Card.Title>
            <h2 className="weather-details">Weather at your location </h2>

            <button
              style={buttonStyle}
              className="btn btn-medium waves-effect waves-light hoverable white accent-3 black-text"
              onClick={this.getLocation}
            >
              <i className="fa fa-refresh"></i>
            </button>
          </Card.Title>
        </Card.Body>

        {noData ? (
          <ListGroup className="flush">
            <ListGroup.Item  style={{borderRadius:'15px'}}>
              <h3 className="weather-details">{error}</h3>
            </ListGroup.Item>
          </ListGroup>
        ) : isLoading ? (
          <div
            class="loader"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          ></div>
        ) : (
          <div>
            <ListGroup className="flush">
              <ListGroup.Item>
                <h4 className="weather-details">
                  <img src={Location} width="30px" height="30px" alt="pin" />
                  {data.name}, {data.sys.country}
                </h4>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup className="flush">
              <ListGroup.Item>
                <h4 className="weather-details">
                 
                  Lat: {lat} Long: {long}
                </h4>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup className="flush">
              <ListGroup.Item style={{ background: "rgb(192,237,236)" }}>
                <h4 className="weather-details">
                  Visiblity: {data.visibility / 1000} km
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    width="50px"
                    height="50px"
                    alt="weather"
                  />
                  {data.weather[0].description}
                </h4>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="flush">
              <ListGroup.Item>
                <h4 className="weather-details">
                  <Cloud color="black" size={50} /> Clouds : {data.clouds.all} %
                </h4>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="flush">
              <ListGroup.Item>
                <h4 className="weather-details">
                  <img
                    src={Wind_sock}
                    width="50px"
                    height="50px"
                    alt="wind sock"
                  />
                  {this.degToCompass(data.wind.deg)}°,{data.wind.speed} m/s
                  
                </h4>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="flush">
              <ListGroup.Item>
             
                <h4 className="weather-details">
                 
                  <img
                    src={Thermomter}
                    width="30px"
                    height="30px"
                    alt="Thermomter"
                  />
                  Feels like: {data.main.feels_like}°C
                </h4>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="flush">
              <ListGroup.Item>
             
                <h4 className="weather-details">
                  
                  <img
                    src={Thermomter}
                    width="30px"
                    height="30px"
                    alt="Thermomter"
                  />
                  Temp: {data.main.temp}°C
                </h4>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="flush">
              <ListGroup.Item>
              
                <h4 className="weather-details">
               
                  <img
                    src={Thermomter}
                    width="30px"
                    height="30px"
                    alt="Thermomter"
                  />
                  Max: {data.main.temp_max}°C
                </h4>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="flush">
              <ListGroup.Item>
              
                <h4 className="weather-details">
                
                  <img
                    src={Thermomter}
                    width="30px"
                    height="30px"
                    alt="Thermomter"
                  />
                  Min: {data.main.temp_min}°C
                </h4>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="flush">
              <ListGroup.Item>
              
                <h4 className="weather-details">
                
                  <img
                    src={pressure}
                    width="30px"
                    height="30px"
                    alt="Thermomter"
                  />
                  QNH: {data.main.pressure} hPa
                </h4>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="flush">
              <ListGroup.Item style={{borderRadius:'15px'}}>
               <h4 className="weather-details">
                 <img
                    src={humidity}
                    width="30px"
                    height="30px"
                    alt="Thermomter"
                  />
                  Humidity: {data.main.humidity}%
                </h4>
              </ListGroup.Item>
            </ListGroup>
          </div>
        )}
      </Card>
    );
  }
}

const buttonStyle = {
  width: "fit-content",
  borderRadius: "3px",
  letterSpacing: "1.5px",
  marginTop: "1rem",
  float: "right",
};
export default Weather;
