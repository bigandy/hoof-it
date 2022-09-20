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
