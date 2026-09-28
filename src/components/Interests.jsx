import { useUser } from "../context/UserContext";

const availableInterests = [
  { name: "Running", icon: "🏃" },
  { name: "Photography", icon: "📸" },
  { name: "Travel", icon: "✈️" },
  { name: "Walking", icon: "🚶" },
  { name: "Cycling", icon: "🚴" },
  { name: "Nature", icon: "🌳" },
  { name: "Outdoor Fitness", icon: "🏋️" },
  { name: "Outdoor Study", icon: "📚" }
];

function Interests() {
  const { interests, setInterests } = useUser();

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  return (
    <div className="interests">

      <div className="interest-options">

        {availableInterests.map((interest) => {
          const selected = interests.includes(interest.name);

          return (
            <button
              key={interest.name}
              className={`interest-button ${
                selected ? "selected" : ""
              }`}
              onClick={() => toggleInterest(interest.name)}
            >
              <span>{interest.icon}</span>
              {interest.name}
              {selected && <span>✓</span>}
            </button>
          );
        })}

      </div>

      <p className="selected-interests">
        Selected:{" "}
        {interests.length > 0
          ? interests.join(", ")
          : "No interests selected"}
      </p>

    </div>
  );
}

export default Interests;