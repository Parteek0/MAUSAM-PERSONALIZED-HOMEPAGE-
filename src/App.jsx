import { useEffect, useState } from "react";

import {
  getPersonalizedInsights
} from "./utils/personalization";

import {
  getRecommendations
} from "./utils/recommendations";

import {
  getPersonalizationScore
} from "./utils/personalizationScore";

import {
  generateDayPlan
} from "./utils/dayPlanner";

import {
  getCurrentDate,
  getCurrentTime,
  getGreeting
} from "./utils/dateTime";

import {
  getWeatherIcon
} from "./utils/weatherIcon";

import weatherData from "./data/weather";
import { fetchWeather } from "./services/weatherService";

import Sidebar from "./components/Sidebar";
import Forecast from "./components/Forecast";
import ActivitiesPage from "./components/ActivitiesPage";
import AlertsPage from "./components/AlertsPage";
import DataSourceBadge from "./components/DataSourceBadge";


/* =========================================================
   AVAILABLE INTERESTS
========================================================= */

const availableInterests = [
  {
    name: "Running",
    icon: "🏃"
  },
  {
    name: "Photography",
    icon: "📸"
  },
  {
    name: "Travel",
    icon: "✈️"
  },
  {
    name: "Walking",
    icon: "🚶"
  },
  {
    name: "Cycling",
    icon: "🚴"
  },
  {
    name: "Agriculture",
    icon: "🌾"
  },
  {
    name: "Outdoor Fitness",
    icon: "🏋️"
  },
  {
    name: "Outdoor Study",
    icon: "📚"
  }
];


/* =========================================================
   OFFICIAL IMD LOCATIONS
========================================================= */

const locationOptions = [
  {
    name: "Chandigarh, India",
    stationId: "42105"
  },
  {
    name: "Delhi, India",
    stationId: "42182"
  },
  {
    name: "Ahmedabad, India",
    stationId: "42647"
  },
  {
    name: "Ambala, India",
    stationId: "42103"
  },
  {
    name: "Gurgaon, India",
    stationId: "42178"
  },
  {
    name: "Hisar, India",
    stationId: "42131"
  },
  {
    name: "Karnal, India",
    stationId: "42137"
  }
];


/* =========================================================
   APP
========================================================= */

function App() {

  /* =======================================================
     INTERESTS
  ======================================================= */

  const [interests, setInterests] = useState(() => {

    const saved =
      localStorage.getItem(
        "mausam_interests"
      );

    if (!saved) {
      return [
        "Running",
        "Photography",
        "Travel"
      ];
    }

    try {
      return JSON.parse(saved);
    } catch {
      return [
        "Running",
        "Photography",
        "Travel"
      ];
    }

  });


  /* =======================================================
     USER NAME
  ======================================================= */

  const [userName, setUserName] =
    useState(() =>
      localStorage.getItem(
        "mausam_name"
      ) || "User"
    );


  /* =======================================================
     SELECTED LOCATION
  ======================================================= */

  const [selectedLocation, setSelectedLocation] =
    useState(() =>
      localStorage.getItem(
        "mausam_location"
      ) || "Chandigarh, India"
    );


  /* =======================================================
     ACTIVE PAGE
  ======================================================= */

  const [activePage, setActivePage] =
    useState("home");


  /* =======================================================
     PROFILE MESSAGE
  ======================================================= */

  const [profileMessage, setProfileMessage] =
    useState("");


  /* =======================================================
     WEATHER
  ======================================================= */

  const [weather, setWeather] =
    useState(weatherData);


  const [weatherLoading, setWeatherLoading] =
    useState(true);


  const [weatherError, setWeatherError] =
    useState(false);


  /* =======================================================
     DATE / TIME
  ======================================================= */

  const [currentDate, setCurrentDate] =
    useState(
      getCurrentDate()
    );


  const [currentTime, setCurrentTime] =
    useState(
      getCurrentTime()
    );


  const [greeting, setGreeting] =
    useState(
      getGreeting()
    );


  /* =======================================================
     LOCATION OBJECT
  ======================================================= */

  const selectedLocationData =
    locationOptions.find(
      (location) =>
        location.name ===
        selectedLocation
    ) ||
    locationOptions[0];


  /* =======================================================
     DATE / TIME CLOCK
  ======================================================= */

  useEffect(() => {

    const timer =
      setInterval(() => {

        setCurrentDate(
          getCurrentDate()
        );

        setCurrentTime(
          getCurrentTime()
        );

        setGreeting(
          getGreeting()
        );

      }, 1000);


    return () =>
      clearInterval(timer);

  }, []);


  /* =======================================================
     LOAD WEATHER
  ======================================================= */

  useEffect(() => {

    async function loadWeather() {

      setWeatherLoading(true);
      setWeatherError(false);


      const data =
        await fetchWeather(
          selectedLocationData.stationId
        );


      if (
        data?.success &&
        data?.isLive
      ) {

        setWeather(data);

      }


      if (
        data?.error ||
        data?.success === false
      ) {

        setWeatherError(true);

      }


      setWeatherLoading(false);

    }


    loadWeather();

  }, [
    selectedLocationData.stationId
  ]);


  /* =======================================================
     SAVE PROFILE + LOCATION
  ======================================================= */

  const saveProfile = () => {

    const cleanName =
      userName.trim() ||
      "User";


    setUserName(
      cleanName
    );


    localStorage.setItem(
      "mausam_name",
      cleanName
    );


    localStorage.setItem(
      "mausam_location",
      selectedLocation
    );


    setProfileMessage(
      "Profile and location saved successfully."
    );


    setTimeout(() => {

      setProfileMessage("");

    }, 2500);

  };


  /* =======================================================
     TOGGLE INTEREST
  ======================================================= */

  const toggleInterest =
    (interest) => {

      let updatedInterests;


      if (
        interests.includes(
          interest
        )
      ) {

        updatedInterests =
          interests.filter(
            (item) =>
              item !== interest
          );

      } else {

        updatedInterests = [
          ...interests,
          interest
        ];

      }


      setInterests(
        updatedInterests
      );


      localStorage.setItem(
        "mausam_interests",
        JSON.stringify(
          updatedInterests
        )
      );

    };


  /* =======================================================
     WEATHER ICON
  ======================================================= */

  const weatherIcon =
    getWeatherIcon(
      weather?.current?.condition ||
      "Unknown"
    );


  /* =======================================================
     WEATHER FOR PERSONALIZATION ENGINE
  ======================================================= */

  const weatherForEngine = {

    temperature:
      weather?.current
        ?.temperature ?? null,

    rainChance:
      weather?.atmosphere
        ?.rainChance ?? null,

    windSpeed:
      weather?.atmosphere
        ?.windSpeed ?? null,

    uvIndex:
      weather?.atmosphere
        ?.uvIndex ?? null

  };


  /* =======================================================
     PERSONALIZATION
  ======================================================= */

  const insights =
    getPersonalizedInsights(
      interests,
      weatherForEngine
    );


  const recommendations =
    getRecommendations(
      interests,
      weatherForEngine
    );


  const personalizationScore =
    getPersonalizationScore(
      interests,
      weatherForEngine
    );


  const dayPlan =
    generateDayPlan(
      interests,
      weatherForEngine
    );


  /* =======================================================
     PLAN BUTTON
  ======================================================= */

  const goToPlan = () => {

    setActivePage(
      "plan"
    );


    setTimeout(() => {

      document
        .getElementById(
          "plan-my-day"
        )
        ?.scrollIntoView({
          behavior: "smooth"
        });

    }, 50);

  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <div className="app">


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        activePage={
          activePage
        }
        setActivePage={
          setActivePage
        }
      />


      <main className="main">


        {/* =================================================
            TOPBAR
        ================================================= */}

        <header className="topbar">

          <div className="mobile-logo">
            ☁️ Mausam
          </div>


          <div className="location">

            📍{" "}

            {weather?.location ||
              selectedLocationData.name}

            {weather?.country
              ? `, ${weather.country}`
              : ""}

          </div>


          <div className="profile">

            👤 {userName}

          </div>

        </header>


        {/* =================================================
            HOME
        ================================================= */}

        {activePage === "home" && (

          <>

            {/* HERO */}

            <section className="hero">

              <div>

                <p className="date">

                  {currentDate}

                </p>


                <h1>

                  {greeting.text},{" "}

                  {userName}{" "}

                  {greeting.icon}

                </h1>


                <p className="hero-text">

                  Here's what your weather
                  means for your day.

                </p>


                <DataSourceBadge
                  source={
                    weather.source
                  }
                  isLive={
                    weather.isLive
                  }
                  error={
                    weatherError
                  }
                />

              </div>


              <div className="hero-time">

                <span>

                  {weather?.location ||
                    selectedLocationData.name}

                </span>


                <strong>

                  {currentTime}

                </strong>

              </div>

            </section>


            {/* INTERESTS */}

            <section className="content-card">

              <h2>

                🎯 My Interests

              </h2>


              <p>

                Choose activities you care
                about. Mausam will personalize
                your weather recommendations.

              </p>


              <div className="interests">

                <div className="interest-options">

                  {availableInterests.map(
                    (interest) => {

                      const selected =
                        interests.includes(
                          interest.name
                        );


                      return (

                        <button

                          key={
                            interest.name
                          }

                          type="button"

                          className={
                            `interest-button ${
                              selected
                                ? "selected"
                                : ""
                            }`
                          }

                          onClick={() =>
                            toggleInterest(
                              interest.name
                            )
                          }

                        >

                          <span>

                            {
                              interest.icon
                            }

                          </span>


                          {
                            interest.name
                          }


                          {selected && (

                            <span>
                              ✓
                            </span>

                          )}

                        </button>

                      );

                    }
                  )}

                </div>


                <p className="selected-interests">

                  Selected:{" "}

                  {interests.length > 0

                    ? interests.join(
                        ", "
                      )

                    : "No interests selected"}

                </p>

              </div>

            </section>


            {/* WEATHER GRID */}

            <section className="weather-grid">


              <div className="card current-weather">

                <p>
                  Current Weather
                </p>


                <div className="temperature">

                  {weatherIcon}{" "}

                  {
                    weather?.current
                      ?.temperature ??
                    "—"
                  }

                  °C

                </div>


                <h3>

                  {
                    weather?.current
                      ?.condition ||
                    "Weather unavailable"
                  }

                </h3>


                <p>

                  Feels like{" "}

                  {
                    weather?.current
                      ?.feelsLike ??
                    "—"
                  }

                  °C

                </p>

              </div>


              <div className="card">

                <p>
                  Air Quality
                </p>


                <div className="metric">

                  {
                    weather?.airQuality
                      ?.value ?? "—"
                  }

                </div>


                <span className="status">

                  {
                    weather?.airQuality
                      ?.status ||
                    "Unavailable"
                  }

                </span>

              </div>


              <div className="card">

                <p>
                  UV Index
                </p>


                <div className="metric">

                  {
                    weather?.atmosphere
                      ?.uvIndex ?? "—"
                  }

                </div>


                <span className="status yellow">

                  {
                    weather?.atmosphere
                      ?.uvIndex != null
                      ? "Available"
                      : "Unavailable"
                  }

                </span>

              </div>

            </section>


            {/* PERSONALIZATION SCORE */}

            <section className="content-card">

              <h2>

                🎯 Mausam Personalization Score

              </h2>


              <p>

                How well today's weather
                matches your selected activities.

              </p>


              <div className="score-container">

                <div className="score-number">

                  {
                    personalizationScore
                  }

                  <span>
                    /100
                  </span>

                </div>


                <div className="score-bar">

                  <div

                    className="score-fill"

                    style={{
                      width:
                        `${personalizationScore}%`
                    }}

                  />

                </div>


                <p>

                  Based on your interests
                  and current weather conditions.

                </p>

              </div>

            </section>


            {/* WEATHER CONDITIONS */}

            <section className="content-card">

              <h2>

                🌦️ Weather Conditions

              </h2>


              <div className="insights">


                <div>

                  🌡️

                  <strong>
                    Temperature
                  </strong>

                  <p>

                    {
                      weather?.current
                        ?.temperature ??
                      "—"
                    }

                    °C

                  </p>

                </div>


                <div>

                  💧

                  <strong>
                    Humidity
                  </strong>

                  <p>

                    {
                      weather?.atmosphere
                        ?.humidity ??
                      "—"
                    }

                    %

                  </p>

                </div>


                <div>

                  🌧️

                  <strong>
                    Rain Chance
                  </strong>

                  <p>

                    {
                      weather?.atmosphere
                        ?.rainChance ??
                      "—"
                    }

                    %

                  </p>

                </div>


                <div>

                  💨

                  <strong>
                    Wind Speed
                  </strong>

                  <p>

                    {
                      weather?.atmosphere
                        ?.windSpeed ??
                      "—"
                    }

                    {" "}km/h

                  </p>

                </div>


                <div>

                  ☀️

                  <strong>
                    UV Index
                  </strong>

                  <p>

                    {
                      weather?.atmosphere
                        ?.uvIndex ??
                      "—"
                    }

                  </p>

                </div>

              </div>

            </section>


            {/* INSIGHTS */}

            <section className="content-card">

              <h2>

                ✨ Your Weather Today

              </h2>


              <div className="insights">

                {insights.length > 0 ? (

                  insights.map(
                    (insight) => (

                      <div
                        key={
                          insight.title
                        }
                      >

                        <span>
                          {insight.icon}
                        </span>


                        <strong>

                          {" "}

                          {
                            insight.title
                          }

                        </strong>


                        <p>

                          {
                            insight.message
                          }

                        </p>

                      </div>

                    )
                  )

                ) : (

                  <div>

                    <strong>

                      No interests selected

                    </strong>


                    <p>

                      Select activities above
                      to get personalized
                      recommendations.

                    </p>

                  </div>

                )}

              </div>

            </section>


            {/* RECOMMENDATIONS */}

            <section className="content-card">

              <h2>

                🌤️ What should you
                plan today?

              </h2>


              <div className="recommendations">

                {recommendations.length > 0 ? (

                  recommendations.map(
                    (
                      recommendation,
                      index
                    ) => (

                      <div

                        className={
                          `recommend ${
                            recommendation
                              .className
                          }`
                        }

                        key={
                          `${recommendation.title}-${index}`
                        }

                      >

                        <span>

                          {
                            recommendation.type
                          }

                        </span>


                        <h3>

                          {
                            recommendation.icon
                          }{" "}

                          {
                            recommendation.title
                          }

                        </h3>


                        <p>

                          {
                            recommendation.time
                          }

                        </p>

                      </div>

                    )
                  )

                ) : (

                  <div className="recommend yellow-card">

                    <span>
                      Select interests
                    </span>


                    <h3>

                      🎯 Personalize your day

                    </h3>


                    <p>

                      Select activities above
                      to receive recommendations.

                    </p>

                  </div>

                )}

              </div>

            </section>


            {/* PLAN */}

            <section className="content-card">

              <h2>

                📅 Ready to plan your day?

              </h2>


              <p>

                Let Mausam create a
                personalized schedule using
                your interests and weather.

              </p>


              <button

                className="plan-button"

                type="button"

                onClick={
                  goToPlan
                }

              >

                ✨ Plan My Day

              </button>

            </section>

          </>

        )}


        {/* =================================================
            FORECAST
        ================================================= */}

        {activePage === "forecast" && (

          <Forecast
            stationId={
              selectedLocationData.stationId
            }
            location={
              selectedLocationData.name
            }
          />

        )}


        {/* =================================================
            ACTIVITIES
        ================================================= */}

        {activePage === "activities" && (

          <ActivitiesPage
            weather={
              weatherForEngine
            }
          />

        )}


        {/* =================================================
            PLAN MY DAY
        ================================================= */}

        {activePage === "plan" && (

          <section
            className="content-card"
            id="plan-my-day"
          >

            <h1>

              📅 Plan My Day

            </h1>


            <p>

              Your personalized activity
              schedule based on your
              interests and weather.

            </p>


            <div className="plan-weather-summary">


              <div>

                🌡️

                <strong>

                  {
                    weather?.current
                      ?.temperature ??
                    "—"
                  }

                  °C

                </strong>

                <span>
                  Temperature
                </span>

              </div>


              <div>

                🌧️

                <strong>

                  {
                    weather?.atmosphere
                      ?.rainChance ??
                    "—"
                  }

                  %

                </strong>

                <span>
                  Rain Chance
                </span>

              </div>


              <div>

                💨

                <strong>

                  {
                    weather?.atmosphere
                      ?.windSpeed ??
                    "—"
                  }

                  {" "}km/h

                </strong>

                <span>
                  Wind
                </span>

              </div>


              <div>

                ☀️

                <strong>

                  {
                    weather?.atmosphere
                      ?.uvIndex ??
                    "—"
                  }

                </strong>

                <span>
                  UV Index
                </span>

              </div>

            </div>


            {dayPlan.length > 0 ? (

              <div className="day-plan">

                {dayPlan.map(
                  (item, index) => (

                    <div

                      className="day-plan-item"

                      key={
                        `${item.activity}-${index}`
                      }

                    >

                      <div className="day-plan-time">

                        {
                          item.time
                        }

                      </div>


                      <div className="day-plan-icon">

                        {
                          item.icon
                        }

                      </div>


                      <div className="day-plan-content">

                        <h3>

                          {
                            item.activity
                          }

                        </h3>


                        <p>

                          {
                            item.reason
                          }

                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            ) : (

              <div className="day-plan-empty">

                <h3>

                  🎯 Build your personal plan

                </h3>


                <p>

                  Go to Home and select
                  some interests first.

                </p>

              </div>

            )}

          </section>

        )}


        {/* =================================================
            ALERTS
        ================================================= */}

        {activePage === "alerts" && (

          <AlertsPage
            weather={
              weatherForEngine
            }
          />

        )}


        {/* =================================================
            SETTINGS
        ================================================= */}

        {activePage === "settings" && (

          <section className="content-card">

            <h1>

              ⚙️ Settings

            </h1>


            <p>

              Manage your Mausam
              preferences.

            </p>


            {/* PROFILE */}

            <div className="settings-option profile-editor">

              <h3>
                👤 Your Profile
              </h3>


              <label htmlFor="mausam-name">

                Name

              </label>


              <input

                id="mausam-name"

                type="text"

                value={
                  userName
                }

                onChange={
                  (event) =>
                    setUserName(
                      event.target.value
                    )
                }

                placeholder="Enter your name"

              />


              <label htmlFor="mausam-location">

                Location

              </label>


              <select

                id="mausam-location"

                value={
                  selectedLocation
                }

                onChange={
                  (event) =>
                    setSelectedLocation(
                      event.target.value
                    )
                }

              >

                {locationOptions.map(
                  (location) => (

                    <option

                      key={
                        location.stationId
                      }

                      value={
                        location.name
                      }

                    >

                      {
                        location.name
                      }

                    </option>

                  )
                )}

              </select>


              <button

                type="button"

                className="settings-save-button"

                onClick={
                  saveProfile
                }

              >

                Save Profile & Location

              </button>


              {profileMessage && (

                <p className="settings-success">

                  {profileMessage}

                </p>

              )}

            </div>


            {/* CURRENT LOCATION */}

            <div className="settings-option">

              <h3>

                📍 Current Location

              </h3>


              <p>

                {
                  weather?.location ||
                  selectedLocationData.name
                }

                {weather?.country
                  ? `, ${weather.country}`
                  : ""}

              </p>


              <small>

                IMD station ID:{" "}

                {
                  selectedLocationData.stationId
                }

              </small>

            </div>


            {/* INTERESTS */}

            <div className="settings-option">

              <h3>

                🎯 Selected Interests

              </h3>


              <p>

                {interests.length > 0

                  ? interests.join(
                      ", "
                    )

                  : "No interests selected"}

              </p>

            </div>


            {/* WEATHER SOURCE */}

            <div className="settings-option">

              <h3>

                🌐 Weather Source

              </h3>


              <DataSourceBadge

                source={
                  weather.source
                }

                isLive={
                  weather.isLive
                }

                error={
                  weatherError
                }

              />

            </div>

          </section>

        )}


        {/* =================================================
            LOADING
        ================================================= */}

        {weatherLoading && (

          <div className="weather-loading">

            Connecting to Mausam
            weather service...

          </div>

        )}

      </main>

    </div>

  );

}


export default App;