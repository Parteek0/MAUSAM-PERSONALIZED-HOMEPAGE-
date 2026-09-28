import { useEffect, useState } from "react";

import weather from "../data/weather";
import { getWeatherIcon } from "../utils/weatherIcon";


const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


function toNumber(value) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const number =
    parseFloat(value);

  return Number.isFinite(number)
    ? number
    : null;
}


function formatDate(dateString) {

  if (!dateString) {
    return "";
  }

  const [
    year,
    month,
    day
  ] = dateString.split("-");


  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );


  return date.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short"
    }
  );

}


function addDays(
  dateString,
  days
) {

  if (!dateString) {
    return null;
  }

  const [
    year,
    month,
    day
  ] = dateString.split("-");


  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );


  date.setDate(
    date.getDate() + days
  );


  const newYear =
    date.getFullYear();

  const newMonth =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const newDay =
    String(
      date.getDate()
    ).padStart(2, "0");


  return `${newYear}-${newMonth}-${newDay}`;

}


function getDayName(
  dateString,
  index
) {

  if (index === 0) {
    return "Today";
  }


  if (!dateString) {
    return `Day ${index + 1}`;
  }


  const [
    year,
    month,
    day
  ] = dateString.split("-");


  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );


  return date.toLocaleDateString(
    "en-IN",
    {
      weekday: "long"
    }
  );

}


function Forecast({
  stationId = "42105",
  location = weather.location
}) {

  const [forecast, setForecast] =
    useState([]);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


  useEffect(() => {

    async function loadForecast() {

      try {

        setLoading(true);
        setError("");
        setForecast([]);


        const response =
          await fetch(
            `${API_BASE_URL}/forecast?stationId=${encodeURIComponent(
              stationId
            )}`
          );


        if (!response.ok) {

          throw new Error(
            `Forecast API returned ${response.status}`
          );

        }


        const data =
          await response.json();


        console.log(
          "LIVE IMD FORECAST:",
          data
        );


        if (
          !data.success ||
          !data.isLive ||
          !Array.isArray(
            data.raw
          ) ||
          data.raw.length === 0
        ) {

          throw new Error(
            "Live IMD forecast data unavailable."
          );

        }


        const imd =
          data.raw[0];


        const days = [

          {
            date: imd.Date,

            high: toNumber(
              imd.Todays_Forecast_Max_Temp
            ),

            low: toNumber(
              imd.Todays_Forecast_Min_temp
            ),

            condition:
              imd.Todays_Forecast

          },


          {
            date: addDays(
              imd.Date,
              1
            ),

            high: toNumber(
              imd.Day_2_Max_Temp
            ),

            low: toNumber(
              imd.Day_2_Min_temp
            ),

            condition:
              imd.Day_2_Forecast

          },


          {
            date: addDays(
              imd.Date,
              2
            ),

            high: toNumber(
              imd.Day_3_Max_Temp
            ),

            low: toNumber(
              imd.Day_3_Min_temp
            ),

            condition:
              imd.Day_3_Forecast

          },


          {
            date: addDays(
              imd.Date,
              3
            ),

            high: toNumber(
              imd.Day_4_Max_Temp
            ),

            low: toNumber(
              imd.Day_4_Min_temp
            ),

            condition:
              imd.Day_4_Forecast

          },


          {
            date: addDays(
              imd.Date,
              4
            ),

            high: toNumber(
              imd.Day_5_Max_Temp
            ),

            low: toNumber(
              imd.Day_5_Min_temp
            ),

            condition:
              imd.Day_5_Forecast

          },


          {
            date: addDays(
              imd.Date,
              5
            ),

            high: toNumber(
              imd.Day_6_Max_Temp
            ),

            low: toNumber(
              imd.Day_6_Min_temp
            ),

            condition:
              imd.Day_6_Forecast

          },


          {
            date: addDays(
              imd.Date,
              6
            ),

            high: toNumber(
              imd.Day_7_Max_Temp
            ),

            low: toNumber(
              imd.Day_7_Min_temp
            ),

            condition:
              imd.Day_7_Forecast

          }

        ];


        const validDays =
          days

            .filter(
              (day) =>
                day.high !== null &&
                day.low !== null &&
                day.condition
            )

            .map(
              (day, index) => ({

                ...day,

                day:
                  getDayName(
                    day.date,
                    index
                  ),

                date:
                  formatDate(
                    day.date
                  ),

                rain: null

              })
            );


        setForecast(
          validDays
        );


      } catch (err) {

        console.error(
          "Failed to load IMD forecast:",
          err
        );


        setError(
          "Live IMD forecast is currently unavailable."
        );


      } finally {

        setLoading(false);

      }

    }


    loadForecast();

  }, [stationId]);


  return (

    <section className="forecast-page">


      {/* HEADER */}

      <div className="content-card">

        <div className="forecast-header">


          <div>

            <h1>

              ☀️ 7-Day Forecast

            </h1>


            <p>

              Weather outlook for{" "}

              {location}

            </p>

          </div>


          <div className="forecast-location">

            📍 {location}

          </div>


        </div>


        {/* LOADING */}

        {loading && (

          <div className="forecast-loading">

            Loading live IMD forecast...

          </div>

        )}


        {/* ERROR */}

        {error &&
          !loading && (

            <div className="forecast-loading">

              ⚠️ {error}

            </div>

          )}


        {/* FORECAST */}

        {!loading &&
          !error &&
          forecast.length > 0 && (

            <div className="forecast-list">


              {forecast.map(
                (day, index) => {

                  const isToday =
                    index === 0;


                  return (

                    <div

                      className={
                        `forecast-day ${
                          isToday
                            ? "today"
                            : ""
                        }`
                      }

                      key={
                        `${day.date}-${index}`
                      }

                    >


                      {/* DATE */}

                      <div className="forecast-date">

                        <strong>

                          {day.day}

                        </strong>


                        <span>

                          {day.date}

                        </span>

                      </div>


                      {/* ICON */}

                      <div className="forecast-icon">

                        {
                          getWeatherIcon(
                            day.condition
                          )
                        }

                      </div>


                      {/* CONDITION */}

                      <div className="forecast-condition">

                        <strong>

                          {
                            day.condition
                          }

                        </strong>


                        <span>

                          🌧️ Rain chance unavailable

                        </span>

                      </div>


                      {/* TEMPERATURE */}

                      <div className="forecast-temperature">

                        <strong>

                          {day.high}°

                        </strong>


                        <span>

                          {day.low}°

                        </span>

                      </div>


                    </div>

                  );

                }
              )}

            </div>

          )}


      </div>


      {/* OVERVIEW */}

      <div className="content-card">

        <h2>

          🌦️ Forecast Overview

        </h2>


        <p>

          Mausam uses upcoming weather
          conditions to help personalize
          your plans and outdoor activities.

        </p>


        <div className="forecast-insights">


          <div>

            <span>
              🌡️
            </span>


            <strong>
              Temperature
            </strong>


            <p>

              Daily high and low
              temperatures help Mausam
              identify comfortable
              activity periods.

            </p>

          </div>


          <div>

            <span>
              🌧️
            </span>


            <strong>
              Rain Probability
            </strong>


            <p>

              Rain probability is not
              provided by this IMD
              forecast endpoint.

            </p>

          </div>


          <div>

            <span>
              ☀️
            </span>


            <strong>
              Weather Condition
            </strong>


            <p>

              Weather conditions are
              taken directly from the
              live IMD forecast.

            </p>

          </div>


        </div>

      </div>


      {/* PERSONALIZATION */}

      <div className="content-card">

        <h2>

          🎯 How Mausam Uses Forecasts

        </h2>


        <div className="forecast-insights">


          <div>

            <span>
              🏃
            </span>


            <strong>
              Activity Planning
            </strong>


            <p>

              Forecast conditions can
              influence when outdoor
              activities are recommended.

            </p>

          </div>


          <div>

            <span>
              📅
            </span>


            <strong>
              Future Planning
            </strong>


            <p>

              Upcoming weather helps
              you plan activities before
              heading outdoors.

            </p>

          </div>


          <div>

            <span>
              🤖
            </span>


            <strong>
              Personalization
            </strong>


            <p>

              Your interests are combined
              with weather conditions to
              create personalized suggestions.

            </p>

          </div>


        </div>

      </div>


      {/* DATA SOURCE */}

      <div className="content-card">

        <h2>

          🌐 Weather Data

        </h2>


        <p>

          Forecast values are provided
          by the live India Meteorological
          Department forecast service.

        </p>


        <div className="data-source-badge">

          <span className="data-source-dot" />


          <span>

            Weather source:{" "}

            <strong>
              IMD — Live
            </strong>

          </span>

        </div>

      </div>


    </section>

  );

}


export default Forecast;