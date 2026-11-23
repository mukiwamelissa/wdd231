document.addEventListener("DOMContentLoaded", () => {
  // Mobile Hamburger Menu
  const navMenu = document.getElementById("primary-nav");
  const hamburger = document.getElementById("hamburger-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  // Set Hidden Timestamp Field to Current Date and Time on Form Load
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

  // Allow clicking backdrop to close modal
  const dialogs = document.querySelectorAll(".membership-modal");
  dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });
});