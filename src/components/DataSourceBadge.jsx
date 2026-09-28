function DataSourceBadge({
  source = "Prototype Data",
  isLive = false,
  error = false
}) {
  let label = "Prototype Data";
  let dotClass = "";

  if (isLive) {
    label = "Live IMD Data";
    dotClass = "live";
  } else if (error) {
    label = "Prototype Data · IMD integration pending";
  }

  return (
    <div className="data-source-badge">

      <span
        className={`data-source-dot ${dotClass}`}
      />

      <span>
        Weather source:{" "}
        <strong>{label}</strong>
      </span>

    </div>
  );
}

export default DataSourceBadge;