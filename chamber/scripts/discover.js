import { attractions } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementById("primary-nav");
  const hamburger = document.getElementById("hamburger-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  const visitMessageEl = document.getElementById("visit-message");
  const visitBanner = document.getElementById("visit-banner");
  const closeBannerBtn = document.getElementById("close-banner");

  const STORAGE_KEY = "jvc_last_visit_ms";
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const now = Date.now();
  const lastVisit = Number(localStorage.getItem(STORAGE_KEY));

  if (!lastVisit) {
    visitMessageEl.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const elapsedMs = now - lastVisit;
    if (elapsedMs < MS_PER_DAY) {
      visitMessageEl.textContent = "Back so soon! Awesome!";
    } else {
      const daysBetween = Math.floor(elapsedMs / MS_PER_DAY);
      const dayWord = daysBetween === 1 ? "day" : "days";
      visitMessageEl.textContent = `You last visited ${daysBetween} ${dayWord} ago.`;
    }
  }

  localStorage.setItem(STORAGE_KEY, String(now));

  if (closeBannerBtn && visitBanner) {
    closeBannerBtn.addEventListener("click", () => {
      visitBanner.style.display = "none";
    });
  }

  const gridContainer = document.getElementById("discover-grid");
  const modal = document.getElementById("attraction-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalAddress = document.getElementById("modal-address");
  const modalDesc = document.getElementById("modal-description");
  const closeModalBtn = document.getElementById("close-attraction-modal");

  if (gridContainer) {
    attractions.forEach((place, index) => {
      const card = document.createElement("article");
      card.className = `discover-card area-${place.id}`;

      card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
          <img src="${place.image}" alt="${place.name}" width="300" height="200" ${index > 1 ? 'loading="lazy"' : ""}>
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button type="button" class="learn-more-btn">learn more</button>
      `;

      const btn = card.querySelector(".learn-more-btn");
      btn.addEventListener("click", () => {
        if (modal) {
          modalTitle.textContent = place.name;
          modalAddress.textContent = place.address;
          modalDesc.textContent = place.description;
          modal.showModal();
        }
      });

      gridContainer.appendChild(card);
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
  }
});