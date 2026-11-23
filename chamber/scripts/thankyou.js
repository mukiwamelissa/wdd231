document.addEventListener("DOMContentLoaded", () => {
  // Mobile Hamburger Menu
  const navMenu = document.getElementById("primary-nav");
  const hamburger = document.getElementById("hamburger-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  // Parse Query String Parameters from GET Submission
  const params = new URLSearchParams(window.location.search);
  const resultsList = document.getElementById("results-list");

  const membershipNames = {
    np: "NP Membership (Non-Profit)",
    bronze: "Bronze Membership",
    silver: "Silver Membership",
    gold: "Gold Membership"
  };

  if (resultsList) {
    const fields = [
      { label: "First Name", value: params.get("firstName") },
      { label: "Last Name", value: params.get("lastName") },
      { label: "Email Address", value: params.get("email") },
      { label: "Mobile Phone Number", value: params.get("phone") },
      { label: "Business / Organization Name", value: params.get("orgName") },
      {
        label: "Selected Membership Level",
        value: membershipNames[params.get("membership")] || params.get("membership")
      },
      { label: "Application Timestamp", value: params.get("timestamp") }
    ];

    resultsList.innerHTML = fields
      .map(
        (item) => `
        <div class="detail-row">
          <dt>${item.label}:</dt>
          <dd>${item.value ? escapeHTML(item.value) : "Not provided"}</dd>
        </div>
      `
      )
      .join("");
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
});