import { dateToDay } from "../../utils/helper/helper";

function CastCard({ weather }) {
  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-sm text-center">
      <p className="font-semibold">{dateToDay(weather.date)}</p>
      <img
        src={weather.day.condition.icon}
        alt="weather icon"
        className="mx-auto my-2"
      />
      <p>{weather.day.avgtemp_c}°C</p>
      <p>{weather.day.condition.text}</p>
    </div>
  );
}

function Renderweather({ weather }) {
  const { country, name, region } = weather.location;
  const { condition } = weather.current;
  const { forecastday } = weather.forecast;

  return (
    <div className="">
      <div className="container mx-auto">
        <section className="bg-white text-black text-center rounded-lg  shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">Current Weather</h2>
          <div className="text-center">
            <img src={condition?.icon} alt="weather icon" className="mx-auto" />
            <div>
              <p className="text-xl">
                {name} | {region} | {country}
              </p>
              <p className="text-lg">
                Temperature: {weather?.current?.temp_c}°C
              </p>
              <p>Conditions: {condition?.text}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            {forecastday.length} Days Forecast
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {forecastday.map((cast) => (
              <CastCard weather={cast} key={cast.date} /> // Use a unique key
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Renderweather;
