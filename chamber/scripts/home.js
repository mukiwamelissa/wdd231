document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementById("primary-nav");
  const hamburger = document.getElementById("hamburger-menu");

 hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  async function loadSpotlights() {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) throw new Error("Failed to load members JSON");
      const members = await response.json();

      const qualifiedMembers = members.filter(m => m.membership === 2 || m.membership === 3);

      const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);

      const container = document.getElementById("spotlights-container");
      if (!container) return;
      container.innerHTML = "";

      const membershipLabels = { 2: "Silver Member", 3: "Gold Member" };
      const membershipClasses = { 2: "badge-silver", 3: "badge-gold" };

      selected.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");
        card.innerHTML = `
          <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
          <h4>${member.name}</h4>
          <span class="badge ${membershipClasses[member.membership]}">${membershipLabels[member.membership]}</span>
          <p>${member.description || ""}</p>
          <p class="spotlight-contact"><strong>Phone:</strong> ${member.phone}</p>
          <p class="spotlight-contact"><strong>Address:</strong> ${member.address}</p>
          <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;
        container.appendChild(card);
      });
    } catch (error) {
      console.error("Error loading spotlights:", error);
    }
  }

  const apiKey = "YOUR_API_KEY_HERE"; 
  const lat = -26.2041;
  const lon = 28.0473;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  async function getWeather() {
    try {
      const response = await fetch(weatherUrl);
      if (!response.ok) throw new Error("Weather data fetch failed");
      const data = await response.json();

      const currentWeather = data.list[0];
      const tempCurrent = Math.round(currentWeather.main.temp);
      const descCurrent = currentWeather.weather[0].description;
      const iconCode = currentWeather.weather[0].icon;

      document.getElementById("temp-value").innerHTML = `${tempCurrent}&deg;C`;
      document.getElementById("weather-desc").textContent = descCurrent.charAt(0).toUpperCase() + descCurrent.slice(1);
      document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.getElementById("weather-icon").alt = descCurrent;

      const forecastList = document.getElementById("forecast-list");
      forecastList.innerHTML = "";

      const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

      dailyForecasts.forEach(day => {
        const dateObj = new Date(day.dt * 1000);
        const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;
        const desc = day.weather[0].main;

        const dayDiv = document.createElement("div");
        dayDiv.classList.add("forecast-item");
        dayDiv.innerHTML = `
          <span>${dayName}</span>
          <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
          <span>${temp}&deg;C</span>
        `;
        forecastList.appendChild(dayDiv);
      });

    } catch (error) {
      console.error("Weather API error:", error);
      const weatherCard = document.querySelector(".weather-card");
      if (weatherCard) {
        weatherCard.innerHTML += `<p class="error-msg">Weather data unavailable.</p>`;
      }
    }
  }

  loadSpotlights();
  getWeather();
});