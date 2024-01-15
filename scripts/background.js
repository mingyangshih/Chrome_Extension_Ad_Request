chrome.runtime.onInstalled.addListener(() => {
  let extensionActive = false
  setBadgeText()
  const openConsoleScript = {
    id: "openConsoleScript",
    js: ["scripts/content.js"],
    world: "MAIN",
    matches: ["https://*/*"]
  };
  chrome.action.onClicked.addListener(async (tab) => {
    let tabId = tab.id
    extensionActive = !extensionActive
    setBadgeText()
    if(extensionActive) {
      chrome.scripting.executeScript({
      target : {tabId : tabId},
      world: "MAIN",
      files : [ "scripts/content.js" ],
    })
    .then(() => console.log("injected script file"));
    }
  });
  function setBadgeText() {
    chrome.action.setBadgeText({
      text: extensionActive? "ON":"OFF",
    });
  };
});