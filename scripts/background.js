chrome.runtime.onInstalled.addListener(() => {
  let extensionActive = false;
  let extensionActiveUrl = {};
  // Tabs Query Options
  let queryOptions = { currentWindow: true, active: true };
  let openConsoleActiveUrl;

  chrome.action.onClicked.addListener(async (tab) => {
    let tabId = tab.id;

    extensionActiveUrl[tabId] = !extensionActiveUrl[tabId] ? true : false;
    extensionActive = extensionActiveUrl[tabId];

    setBadgeText(tabId);
    // Chrome query API
    chrome.tabs.query(queryOptions, async (tab) => {
      // Get the current page's url.
      openConsoleActiveUrl = tab[0]["url"];

      // Run Before the page refresh.
      chrome.webNavigation.onBeforeNavigate.addListener(
        async () => {
          // Remove CSS Script
          await removeCSS("/styles/openConsole.css", tabId);
          // Use execute Script run content js.
          await executeScript("scripts/content_closeConsole.js", tabId);
          extensionActive = !extensionActive;
          extensionActiveUrl[tabId] = false;
          setBadgeText(tabId);
        },
        { url: [{ urlEquals: openConsoleActiveUrl }] }
      );
      if (extensionActive) {
        // Insert CSS Script
        await insertCSS("/styles/openConsole.css", tabId);
        // Use execute Script run content js.
        await executeScript("scripts/content_openConsole.js", tabId);
      } else {
        // Remove CSS Script
        await removeCSS("/styles/openConsole.css", tabId);
        // Use execute Script run content js.
        await executeScript("scripts/content_closeConsole.js", tabId);
      }
    });
  });
  function disableConsole() {}
  function setBadgeText(tabId) {
    chrome.action.setBadgeText({
      tabId,
      text: extensionActiveUrl[tabId] ? "ON" : "OFF",
    });
  }
  function insertCSS(path, tabId) {
    return new Promise((r, j) => {
      chrome.scripting
        .insertCSS({
          files: [path],
          target: { tabId },
        })
        .then(() => {
          r("done");
        });
    });
  }
  function removeCSS(path, tabId) {
    return new Promise((r, j) => {
      chrome.scripting
        .removeCSS({
          files: [path],
          target: { tabId },
        })
        .then(() => {
          r("done");
        });
    });
  }
  function executeScript(path, tabId) {
    return new Promise((r, j) => {
      chrome.scripting
        .executeScript({
          target: { tabId },
          world: "MAIN",
          files: [path],
        })
        .then(() => {
          r("done");
        });
    });
  }
});
