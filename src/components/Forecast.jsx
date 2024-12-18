import { useState } from "react";
import { BsClouds, BsSun, BsCloudSun, BsCloudRain, BsSnow } from "react-icons/bs";

export default function Forecast({ forecastData }) {
  const [index, setIndex] = useState(0);

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

  return (
    <section className="container mx-auto px-4 py-6">
      {forecastData ? (
        <div className="border border-gray-300 bg-white shadow-md p-6 rounded-xl md:p-8 lg:p-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-wrap gap-4">
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold">Temperature:</span>{" "}
                  {forecastData.list[index].main.temp}&#8451;
                </span>
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold">Feels Like:</span>{" "}
                  {forecastData.list[index].main.feels_like}&#8451;
                </span>
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold block">Weather:</span>
                  {forecastData.list[index].weather[0].main}{" "}
                  {weatherIcon(forecastData.list[index].weather[0].main)}
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold">Wind Speed:</span>{" "}
                  {forecastData.list[index].wind.speed} m/s
                </span>
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold">Humidity:</span>{" "}
                  {forecastData.list[index].main.humidity}%
                </span>
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold">Pressure:</span>{" "}
                  {forecastData.list[index].main.pressure} Pa
                </span>
                <span className="w-full text-base sm:text-lg md:text-xl">
                  <span className="font-semibold">Time:</span>{" "}
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
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-600 md:text-base md:py-4 md:px-8"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-600  md:text-base md:py-4 md:px-8 sm:w-auto"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <span className="text-center text-gray-500 text-lg mt-6 block">
          No forecast data available.
        </span>
      )}
    </section>
  );
}
