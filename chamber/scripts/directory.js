document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("members-container");
  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");
  const navMenu = document.getElementById("primary-nav");
  const hamburger = document.getElementById("hamburger-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  async function getMembers() {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) throw new Error("Failed to load JSON data.");
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error("Error fetching member data:", error);
      container.innerHTML = "<p>Unable to load member directory at this time.</p>";
    }
  }

  const membershipLevels = {
    1: { label: "Member", class: "badge-member" },
    2: { label: "Silver", class: "badge-silver" },
    3: { label: "Gold", class: "badge-gold" }
  };
  function displayMembers(members) {
    container.innerHTML = ""; 

    members.forEach((member) => {
      const section = document.createElement("section");
      section.classList.add("member-card");

      const levelInfo = membershipLevels[member.membership] || membershipLevels[1];

      section.innerHTML = `
         <div class="member-card-top">
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <span class="tag">${member.tag}</span>
      </div>
      <div class="member-card-body">
        <img src="${member.image}" alt="${member.name} logo" loading="lazy">
        <ul>
          <li><b>EMAIL:</b> ${member.email}</li>
          <li><b>PHONE:</b> ${member.phone}</li>
          <li><b>URL:</b> ${member.website}</li>
        </ul>
      </div>
      <span class="badge ${levelInfo.class}">${levelInfo.label} Member</span>
      `;

      container.appendChild(section);
    });
  }

  gridBtn.addEventListener("click", () => {
    container.classList.add("grid-layout");
    container.classList.remove("list-layout");
    gridBtn.classList.add("active-view");
    listBtn.classList.remove("active-view");
  });

  listBtn.addEventListener("click", () => {
    container.classList.add("list-layout");
    container.classList.remove("grid-layout");
    listBtn.classList.add("active-view");
    gridBtn.classList.remove("active-view");
  });

  getMembers();
});