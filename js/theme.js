
// =========================
// THEME SWITCH
// =========================

// Load saved preference
const savedTheme = localStorage.getItem("website-theme") || "light";

// Apply theme
document.documentElement.setAttribute("data-theme", savedTheme);

// Get switch button
const themeToggle = document.getElementById("theme-toggle");

// Update button label
function updateThemeButton(theme) {
    themeToggle.textContent =
        theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode";
}

// Initialize button
updateThemeButton(savedTheme);

// Toggle theme
themeToggle.addEventListener("click", () => {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const newTheme =
        currentTheme === "dark" ? "light" : "dark";

    // Apply new theme
    document.documentElement.setAttribute("data-theme", newTheme);

    // Save preference
    localStorage.setItem("website-theme", newTheme);

    // Update button
    updateThemeButton(newTheme);

});
