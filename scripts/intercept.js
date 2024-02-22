chrome.runtime.onInstalled.addListener(() => {
  let active = false;
  chrome.action.onClicked.addListener(async (tab) => {
    let tabId = tab.id;
    active = !active;
    chrome.action.setBadgeText({
      tabId,
      text: active ? 'ON' : 'OFF',
    });
    console.log('here');
    chrome.webRequest.onBeforeRequest.addListener(
      function (details) {
        console.log('here');
        console.dir(details);
      },
      { urls: ['<all_urls>'] }
    );
  });
});
