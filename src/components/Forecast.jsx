import { useState } from "react";
import { BsClouds, BsSun, BsCloudSun, BsCloudRain, BsSnow } from "react-icons/bs";
import Graphic from './Graphic.js';

export default function Forecast({ forecastData }) {
  const [index, setIndex] = useState(0);
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      temperature: "Temperature",
      feelsLike: "Feels Like",
      weather: "Weather",
      windSpeed: "Wind Speed",
      humidity: "Humidity",
      pressure: "Pressure",
      time: "Time",
      noData: "No forecast data available.",
      prev: "Prev",
      next: "Next",
      appName: "WeatherApp",
    },
    ru: {
      temperature: "Температура",
      feelsLike: "Ощущается как",
      weather: "Погода",
      windSpeed: "Скорость ветра",
      humidity: "Влажность",
      pressure: "Давление",
      time: "Время",
      noData: "Нет данных о прогнозе.",
      prev: "Назад",
      next: "След.",
      appName: "ПрогнозПогоды",
    },
  };

  const t = translations[language];

  const weatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <BsSun className="inline" />;
      case "Clouds":
        return <BsClouds className="inline" />;
      case "Cloudy":
        return <BsCloudSun className="inline" />;
      case "Rain":
        return <BsCloudRain className="inline" />;
      case "Snow":
        return <BsSnow className="inline" />;
      default:
        return <BsClouds className="inline" />;
    }
  };

  const handleNext = () => {
    if (index < forecastData.list.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const toggleLanguage = () => {
    setLanguage((lang) => (lang === 'en' ? 'ru' : 'en'));
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
          <span className="inline">{t.appName}</span>
        </h1>
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          {language === 'en' ? 'EN' : 'RU'}
        </button>
      </header>
      {forecastData ? (
        <div className="border border-gray-300 bg-white shadow-md p-6 rounded-xl md:p-8 lg:p-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-wrap gap-4">
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold">{t.temperature}:</span>{" "}
                  {forecastData.list[index].main.temp}&#8451;
                </span>
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold">{t.feelsLike}:</span>{" "}
                  {forecastData.list[index].main.feels_like}&#8451;
                </span>
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold block">{t.weather}:</span>
                  {forecastData.list[index].weather[0].main}{" "}
                  {weatherIcon(forecastData.list[index].weather[0].main)}
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold">{t.windSpeed}:</span>{" "}
                  {forecastData.list[index].wind.speed} m/s
                </span>
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold">{t.humidity}:</span>{" "}
                  {forecastData.list[index].main.humidity}%
                </span>
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold">{t.pressure}:</span>{" "}
                  {forecastData.list[index].main.pressure} Pa
                </span>
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold">{t.time}:</span>{" "}
                  {forecastData.list[index].dt_txt}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <iframe
                frameBorder="1"
                allowFullScreen
                src={`https://yandex.com/map-widget/v1/?ll=${forecastData.city.coord.lon}%2C${forecastData.city.coord.lat}.827217&z=8`}
                className="border rounded-lg w-11/12 h-[200px] sm:h-[250px] md:w-4/5 md:h-[300px]"
              ></iframe>
            </div>
          </div>
          <Graphic forecastData={forecastData} className="hidden" />

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-600 md:text-base md:py-4 md:px-8"
            >
              {t.prev}
            </button>
            <button
              onClick={handleNext}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-600  md:text-base md:py-4 md:px-8 sm:w-auto"
            >
              {t.next}
            </button>
          </div>
        </div>
      ) : (
        <span className="text-center text-gray-500 text-lg mt-6 block">
          {t.noData}
        </span>
      )}
    </section>
  );
}
