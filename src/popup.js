import "./styles/style.css";

const form = document.querySelector("#settings");

form.addEventListener("change", (e) => {
  console.log("form has been Changed", e.target.id);

  chrome.storage.sync.set({ hoofItValue: e.target.id });
});

const getSettings = () => {
  chrome.storage.sync.get(
    "hoofItValue",
    ({ hoofItValue }) => {
      // console.log("settings are", hoofItValue);

      document.getElementById(hoofItValue).checked = true;
    }
  );
};

document.addEventListener("DOMContentLoaded", function () {
  getSettings();
});
