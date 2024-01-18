chrome.runtime.onInstalled.addListener(() => {
  let extensionActive = false;
  let extensionActiveUrl = {};
  // Tabs Query Options
  let queryOptions = { currentWindow: true, active: true };
  let openConsoleActiveUrl;

  // let openConsoleScript = {
  //   id: "openConsoleScript",
  //   js: ["scripts/content.js"],
  //   world: "MAIN",
  //   matches: [],
  //   runAt: "document_end",
  // };
  chrome.action.onClicked.addListener(async (tab) => {
    let tabId = tab.id;
    extensionActive = !extensionActive;

    extensionActiveUrl[tabId] = !extensionActiveUrl[tabId] ? true : false;
    setBadgeText(tabId);
    // Chrome query API
    chrome.tabs.query(queryOptions, (tab) => {
      // Get the current page's url.
      openConsoleActiveUrl = tab[0]["url"];
      // Run Before the page refresh.
      chrome.webNavigation.onBeforeNavigate.addListener(
        () => {
          extensionActiveUrl[tabId] = false;
          setBadgeText(tabId);
        },
        { url: [{ urlEquals: openConsoleActiveUrl }] }
      );
      if (extensionActive) {
        // Use execute Script run content js.
        chrome.scripting
          .executeScript({
            target: { tabId: tabId },
            world: "MAIN",
            files: ["scripts/content_openConsole.js"],
          })
          .then(() => console.log("injected script file"));
        // Use registerContentScripts
        // chrome.scripting.registerContentScripts([openConsoleScript], () => {

        // });
      } else {
        chrome.scripting
          .executeScript({
            target: { tabId: tabId },
            world: "MAIN",
            files: ["scripts/content_closeConsole.js"],
          })
          .then(() => console.log("injected script file"));
      }
    });
  });
  function setBadgeText(tabId) {
    chrome.action.setBadgeText({
      tabId,
      text: extensionActiveUrl[tabId] ? "ON" : "OFF",
    });
  }
});
