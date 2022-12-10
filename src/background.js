import { messages } from "./consts/messages";

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  // read changeInfo data and do something with it
  // like send the new url to contentscripts.js
  if (changeInfo.status === "complete") {
    chrome.tabs.sendMessage(tabId, {
      message: messages.URL_UPDATED,
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["hoofItValue"]).then((result) => {
    if (result.hoofItValue) {
      console.log("Hoof it value is already set", {
        hoofitValue: result.hoofItValue,
      });
    } else {
      console.log("no hoof it value");
      chrome.storage.sync.set({
        hoofItValue: "all",
      });
    }
  });
});

chrome.storage.onChanged.addListener(function (changes, area) {
  console.log(changes, area);
  if (
    area === "sync" &&
    changes.hoofItValue?.newValue !== changes.hoofItValue?.oldValue
  ) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        message: messages.SETTING_UPDATED,
        value: changes.hoofItValue?.newValue,
      });
    });
  }
});
