const timeZone = "Asia/Kolkata";

export function getCurrentDate() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date());
}

export function getCurrentTime() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }).format(new Date());
}

export function getGreeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-IN", {
      timeZone,
      hour: "numeric",
      hour12: false
    }).format(new Date())
  );

  if (hour < 12) {
    return {
      text: "Good Morning",
      icon: "🌅"
    };
  }

  if (hour < 17) {
    return {
      text: "Good Afternoon",
      icon: "☀️"
    };
  }

  if (hour < 21) {
    return {
      text: "Good Evening",
      icon: "🌇"
    };
  }

  return {
    text: "Good Night",
    icon: "🌙"
  };
}