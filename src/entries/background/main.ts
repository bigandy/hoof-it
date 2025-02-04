import browser from "webextension-polyfill";
import { messages } from "../consts/messages";

browser.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

browser.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  // read changeInfo data and do something with it
  // like send the new url to contentscripts.js
  if (changeInfo.status === "complete") {
    browser.tabs.sendMessage(tabId, {
      message: messages.URL_UPDATED,
    });
  }
});

browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.get(["hoofItValue"]).then((result) => {
    if (result.hoofItValue) {
      console.log("Hoof it value is already set", {
        hoofitValue: result.hoofItValue,
      });
    } else {
      console.log("no hoof it value");
      browser.storage.sync.set({
        hoofItValue: "all",
      });
    }
  });
});

browser.storage.onChanged.addListener(function (changes, area) {
  // console.log(changes, area);
  if (
    area === "sync" &&
    changes.hoofItValue?.newValue !== changes.hoofItValue?.oldValue
  ) {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(function (tabs) {
        if (tabs[0].id) {
          browser.tabs.sendMessage(tabs[0].id, {
            message: messages.SETTING_UPDATED,
            value: changes.hoofItValue?.newValue,
          });
        }
      });
  }
});
