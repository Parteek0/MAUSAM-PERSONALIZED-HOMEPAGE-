import { getWeatherAlerts } from "../utils/alerts";

function AlertsPage({ weather }) {
  const alerts = getWeatherAlerts(weather);

  return (
    <section className="alerts-page">

      {/* HEADER */}

      <div className="content-card">

        <h1>
          ⚠️ Weather Alerts
        </h1>

        <p>
          Mausam monitors important weather conditions
          that may affect your outdoor plans.
        </p>

      </div>


      {/* ALERTS */}

      <div className="content-card">

        <div className="alerts-header">

          <div>
            <h2>
              Today's Alerts
            </h2>

            <p>
              Based on current weather conditions
            </p>
          </div>

          <div className="alerts-count">
            {alerts.length}{" "}
            {alerts.length === 1
              ? "Alert"
              : "Alerts"}
          </div>

        </div>


        {alerts.length > 0 ? (

          <div className="alerts-list">

            {alerts.map((alert, index) => (

              <div
                className={`weather-alert ${alert.level}`}
                key={`${alert.title}-${index}`}
              >

                <div className="alert-icon">
                  {alert.icon}
                </div>

                <div className="alert-content">

                  <div className="alert-title-row">

                    <h3>
                      {alert.title}
                    </h3>

                    <span className="alert-level">
                      {alert.level === "danger"
                        ? "Danger"
                        : "Warning"}
                    </span>

                  </div>

                  <p>
                    {alert.message}
                  </p>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="alerts-empty">

            <div className="alerts-empty-icon">
              ✓
            </div>

            <h3>
              No Weather Alerts
            </h3>

            <p>
              Current conditions do not indicate
              any major weather concerns.
            </p>

          </div>

        )}

      </div>


      {/* WEATHER CONDITIONS */}

      <div className="content-card">

        <h2>
          🌦️ Conditions Being Monitored
        </h2>

        <p>
          Mausam continuously evaluates key weather
          factors to identify conditions that may
          affect your plans.
        </p>

        <div className="alert-condition-grid">

          <div className="alert-condition">

            <span>
              🌡️
            </span>

            <strong>
              Temperature
            </strong>

            <p>
              {weather.temperature}°C
            </p>

          </div>


          <div className="alert-condition">

            <span>
              🌧️
            </span>

            <strong>
              Rain Probability
            </strong>

            <p>
              {weather.rainChance}%
            </p>

          </div>


          <div className="alert-condition">

            <span>
              💨
            </span>

            <strong>
              Wind Speed
            </strong>

            <p>
              {weather.windSpeed} km/h
            </p>

          </div>


          <div className="alert-condition">

            <span>
              ☀️
            </span>

            <strong>
              UV Index
            </strong>

            <p>
              {weather.uvIndex}
            </p>

          </div>

        </div>

      </div>


      {/* HOW ALERTS WORK */}

      <div className="content-card">

        <h2>
          🤖 How Mausam Detects Alerts
        </h2>

        <div className="forecast-insights">

          <div>

            <span>
              📊
            </span>

            <strong>
              Analyze Weather
            </strong>

            <p>
              Mausam evaluates temperature, rainfall,
              wind and UV conditions.
            </p>

          </div>


          <div>

            <span>
              ⚠️
            </span>

            <strong>
              Detect Risk
            </strong>

            <p>
              Thresholds are used to identify potentially
              uncomfortable or hazardous conditions.
            </p>

          </div>


          <div>

            <span>
              🔔
            </span>

            <strong>
              Inform You
            </strong>

            <p>
              Important conditions are presented as
              clear weather alerts.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AlertsPage;