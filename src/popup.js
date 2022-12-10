import "./styles/style.css";

const form = document.querySelector("#settings");

form.addEventListener("change", (e) => {
  chrome.storage.sync.set({ hoofItValue: e.target.id });
});

const getSettings = () => {
  chrome.storage.sync.get("hoofItValue", ({ hoofItValue }) => {
    document.getElementById(hoofItValue).checked = true;
  });
};

document.addEventListener("DOMContentLoaded", function () {
  getSettings();
});
