import { getRecommendations } from "../utils/recommendations";

function ActivitiesPage({ weather }) {
  const recommendations = getRecommendations(
    [],
    weather
  );

  return (
    <section className="content-card">
      <h1>🏃 Activities</h1>

      <p>
        Weather-based activity recommendations
        for your day.
      </p>

      {recommendations.length > 0 ? (
        <div className="recommendations">
          {recommendations.map(
            (recommendation, index) => (
              <div
                className={`recommend ${
                  recommendation.className || ""
                }`}
                key={`${recommendation.title}-${index}`}
              >
                <span>
                  {recommendation.type}
                </span>

                <h3>
                  {recommendation.icon}{" "}
                  {recommendation.title}
                </h3>

                <p>
                  {recommendation.time}
                </p>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="recommend yellow-card">
          <span>Weather Based</span>

          <h3>🌦️ Check today's conditions</h3>

          <p>
            Activity recommendations will appear
            here based on the current weather.
          </p>
        </div>
      )}
    </section>
  );
}

export default ActivitiesPage;