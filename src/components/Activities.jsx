import { useUser } from "../context/UserContext";

function Activities() {
  const { interests } = useUser();

  return (
    <section className="content-card">

      <h2>🏃 My Activities</h2>

      <p>
        Your selected activities are used by Mausam
        to personalize your weather experience.
      </p>

      {interests.length === 0 ? (
        <div className="activity-empty">
          <h3>🎯 No activities selected</h3>

          <p>
            Go to My Interests and select activities
            you enjoy.
          </p>
        </div>
      ) : (
        <div className="activity-list">

          {interests.map((interest) => (
            <div
              className="activity-item"
              key={interest}
            >
              <span>✓</span>
              <strong>{interest}</strong>
            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default Activities;