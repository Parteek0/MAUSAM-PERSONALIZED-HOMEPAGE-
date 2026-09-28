function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { id: "home", icon: "⌂", label: "Home" },
    { id: "forecast", icon: "☀", label: "Forecast" },
    { id: "activities", icon: "🏃", label: "Activities" },
    { id: "alerts", icon: "⚠", label: "Alerts" },
    { id: "plan", icon: "📅", label: "Plan My Day" },
    { id: "settings", icon: "⚙", label: "Settings" }
  ];

  return (
    <aside className="sidebar">

      <div className="logo">
        ☁️ <span>Mausam</span>
      </div>

      <nav className="sidebar-nav">

        {menuItems.map((item) => (

          <button
            key={item.id}
            type="button"
            className={
              activePage === item.id
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage(item.id)
            }
          >
            {item.icon} {item.label}
          </button>

        ))}

      </nav>

      <div className="sidebar-bottom">
        <p>Different people.</p>
        <p>Different weather.</p>
        <p>Better decisions.</p>
      </div>

    </aside>
  );
}

export default Sidebar;