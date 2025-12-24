console.log("app.js chargé");

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-sidebar");
  const sidebar = document.getElementById("sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  const loginDiv = document.getElementById("login");
  const appDiv = document.getElementById("app");

  window.login = function() {
    loginDiv.style.display = "none";
    appDiv.style.display = "block";
  };

  window.logout = function() {
    appDiv.style.display = "none";
    loginDiv.style.display = "block";
  };
});
