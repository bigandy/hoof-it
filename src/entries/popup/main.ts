import browser from "webextension-polyfill";

import "../styles/style.css";

const form = document.querySelector("#settings");

form?.addEventListener("change", (e: any) => {
  browser.storage.sync.set({ hoofItValue: e.target.id });
});

const getSettings = () => {
  browser.storage.sync.get("hoofItValue").then(({ hoofItValue }) => {
    // @ts-ignore
    document.getElementById(hoofItValue).checked = true;
  });
};

document.addEventListener("DOMContentLoaded", getSettings);
