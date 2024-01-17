chrome.runtime.onInstalled.addListener(() => {
  let extensionActive = false;
  let queryOptions = { currentWindow: true, active: true };
  let openConsoleActiveUrl;

  setBadgeText();
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
    setBadgeText();
    // Get the current page's url.
    chrome.tabs.query(queryOptions, (tab) => {
      openConsoleActiveUrl = tab[0]["url"];
      // Run Before the page refresh.
      chrome.webNavigation.onBeforeNavigate.addListener(
        () => {
          extensionActive = false;
          setBadgeText();
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
      }
    });
  });
  function setBadgeText() {
    chrome.action.setBadgeText({
      text: extensionActive ? "ON" : "OFF",
    });
  }
});
