document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementById("primary-nav");
  const hamburger = document.getElementById("hamburger-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    const now = new Date();
    timestampField.value = now.toLocaleString("en-ZA", {
      dateStyle: "medium",
      timeStyle: "medium"
    });
  }

  // Modal Open & Close Controls
  const infoButtons = document.querySelectorAll(".info-btn");
  infoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const dialog = document.getElementById(modalId);
      if (dialog) {
        dialog.showModal();
      }
    });
  });

  const closeButtons = document.querySelectorAll(".close-modal");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = button.closest("dialog");
      if (dialog) {
        dialog.close();
      }
    });
  });

  const dialogs = document.querySelectorAll(".membership-modal");
  dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });
});