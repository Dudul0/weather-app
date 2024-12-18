import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header.jsx";
import Forecast from "./components/Forecast.jsx";
import { useSelector } from "react-redux";
import "./index.css";

function App() {
  const [locationState, setLocationState] = useState("Ashgabat");
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState(null);
  const count = useSelector((state) => state.unitsType.value);

  const getLL = async (city) => {
    const getCityConfig = {
      params: {
        q: city,
        units: count,
        appid: "d7bf56d0142f4575b0332fde8eba254d",
      },
    };
    const result = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?",
      getCityConfig
    );
    setCity(result);
    console.log(result, '434')
  };

  useEffect(() => {
    const fetchData = async () => {
      let getConfig;
      if (city) {
        getConfig = {
          params: {
            lat: city.data.coord.lat,
            lon: city.data.coord.lon,
            units: count,
            appid: "fbdb6935f61bfa06bacca83306b2b34a",
          },
        };
      } else {
        getConfig = {
          params: {
            lat: "51.5073219",
            lon: "0.1276474",
            units: count,
            appid: "fbdb6935f61bfa06bacca83306b2b34a",
          },
        };
      }
      const res = await axios.get(
        "http://api.openweathermap.org/data/2.5/forecast?",
        getConfig
      );
      setForecastData(res.data);
    };
    fetchData();
  }, [city, count]); // adding `count` to the dependency array to refetch if it changes

  useEffect(() => {
    console.log(forecastData); // log after the forecastData is updated
  }, [forecastData]);

  return (
    <>
      <Header getLL={getLL} />
      
      <Forecast forecastData={forecastData} />
    </>
  );
}

export default App;
