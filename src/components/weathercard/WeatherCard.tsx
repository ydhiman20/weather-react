import {
  formatDateString,
  getWeekday,
  roundTemperature,
} from "../../utils/helper/helper";
import { WeatherData } from "../../type/weather";

interface DataObj {
  data: WeatherData;
}

function WeatherCard({ data }: DataObj) {
  const {
    forecast: curForecast,
    current: curWeather,
    location: curLocation,
  } = data;

  return (
    <div className="w-full container mx-auto">
      <div className="flex flex-wrap w-full lg:w-auto">
        {/* Current Weather Section */}
        <div className="w-full lg:w-1/2 flex rounded-lg bg-auto shadow-2xl">
          <div className="rounded-lg py-6 pl-8 pr-32 w-full bg-white text-black">
            <div className="mb-20">
              <h2 className="font-bold text-3xl leading-none pb-2">
                {getWeekday(curWeather.last_updated)}
              </h2>
              <h3 className="leading-none pb-2">
                {formatDateString(curWeather.last_updated)}
              </h3>
              <p className="flex align-center opacity-75">
                {curLocation.name}/{curLocation.region}
              </p>
            </div>
            <div>
              <div>
                <img
                  alt={curWeather.condition.text}
                  className=""
                  src={curWeather.condition.icon}
                />
              </div>
              <strong className="leading-none text-6xl block font-weight-bolder">
                {roundTemperature(curWeather.temp_c)}ºC
              </strong>
              <b className="text-2xl block font-bold">
                {curWeather.condition.text}
              </b>
            </div>
          </div>
        </div>

        {/* Weather Details and Forecast Section */}
        <div className="w-full lg:w-1/2 flex ml-0">
          <div className="lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg w-full shadow-2xl">
            {/* Weather Stats */}
            <div className="flex justify-between mb-4 w-full">
              <div className="w-auto font-bold uppercase text-90">Cloud</div>
              <div className="w-auto text-right">{curWeather.cloud} %</div>
            </div>
            <div className="flex justify-between mb-4 w-full">
              <div className="w-auto font-bold uppercase text-90">Humidity</div>
              <div className="w-auto text-right">{curWeather.humidity} %</div>
            </div>
            <div className="flex justify-between mb-8 w-full">
              <div className="w-auto font-bold uppercase text-90">Wind</div>
              <div className="w-auto text-right">{curWeather.wind_mph} Mph</div>
            </div>

            {/* Forecast */}
            <div className="flex flex-row">
              {curForecast.forecastday.map((item, index) => (
                <div
                  className={`flex flex-col w-1/3 bg-gray-100 text-black rounded-lg pb-4 ${
                    index === 0
                      ? "bg-white text-black"
                      : "bg-gray-900 text-white"
                  }`}
                  key={index}
                >
                  <div className="text-center pt-2 mb-2">
                    <img
                      alt={item.day.condition.text}
                      className="mx-auto grayscale"
                      src={item.day.condition.icon}
                    />
                  </div>
                  <div className="text-center">
                    <b className="font-normal">{getWeekday(item.date)}</b>
                    <br />
                    <strong className="text-xl">
                      {roundTemperature(item.day.avgtemp_c)}ºC
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
