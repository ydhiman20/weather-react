import { WeatherData } from "../../type/weather";
import {
  formatDateString,
  getWeekday,
  roundTemperature,
} from "../../utils/helper/helper";

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
        <div className="w-full lg:w-1/2 flex rounded-lg bg-auto">
          <div className="rounded-lg py-6 pl-8 pr-32 w-full bg-white text-black">
            <div className="mb-5">
              <h2 className="font-bold text-2xl md:text-3xl leading-none pb-2">
                {getWeekday(curWeather.last_updated)}
              </h2>
              <h3 className="leading-none text-2xl pt-1 pb-3">
                {formatDateString(curWeather.last_updated)}
              </h3>
              <p className="flex align-center text-base opacity-75 text-gray-400">
                {curLocation.name}/{curLocation.region}
              </p>
            </div>
            <div>
              <div>
                <img
                  alt={curWeather.condition.text}
                  src={curWeather.condition.icon}
                />
              </div>
              <strong className="leading-none text-4xl md:text-7xl block my-4">
                {roundTemperature(curWeather.temp_c)}ºC
              </strong>
              <b className="text-base font-normal border inline-block px-4 py-2  md:px-8 md:py-4 rounded-full border-[#e7e7e7] mt-4">
                {curWeather.condition.text}
              </b>
            </div>
          </div>
        </div>

        {/* Weather Details and Forecast Section */}
        <div className="w-full lg:w-1/2 flex ml-0">
          <div className="bg-blue-500  text-white p-8 w-full">
            {/* Weather Stats */}
            <div className="flex justify-between mb-4 w-full px-2">
              <div className="w-auto font-bold uppercase text-90">Cloud</div>
              <div className="w-auto text-right">{curWeather.cloud} %</div>
            </div>
            <div className="flex justify-between mb-4 w-full px-2">
              <div className="w-auto font-bold uppercase text-90">Humidity</div>
              <div className="w-auto text-right">{curWeather.humidity} %</div>
            </div>
            <div className="flex justify-between mb-8 w-full px-2">
              <div className="w-auto font-bold uppercase text-90">Wind</div>
              <div className="w-auto text-right">{curWeather.wind_mph} Mph</div>
            </div>

            {/* Forecast */}
            <div className="flex md:flex-row">
              {curForecast.forecastday.map((item, index) => (
                <div
                  className={`flex flex-col w-1/3 bg-white m-1 md:m-2 text-black rounded-lg pb-4 ${
                    index === 0 ? "" : ""
                  }`}
                  key={index}
                >
                  <div className="text-center pt-2 mb-2">
                    <img
                      alt={item.day.condition.text}
                      className="mx-auto"
                      src={item.day.condition.icon}
                    />
                  </div>
                  <div className="text-center">
                    <b className="font-normal text-sm rounded-full border-[#e7e7e7] md:border md:py-2 md:px-3 md:mb-2 inline-block">
                      {getWeekday(item.date)}
                    </b>
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
