chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url.includes("netflix")) {
      chrome.tabs.remove(tabId);
    }
  });