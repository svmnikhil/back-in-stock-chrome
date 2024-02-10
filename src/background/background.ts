chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === 'install') {
    chrome.tabs.create({
      url: "https://github.com/svmnikhil"
    });
  }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    // Check if the URL starts with "chrome://" and exit if it does
    if (tab.url.startsWith("chrome://")) {
        return; // Do nothing if it's a chrome:// URL
    }
    // Inject the content script into the newly active tab if it's not a chrome:// URL
    chrome.scripting.executeScript({
        files: ["scripts/content.ts"],
        target: {tabId: tab.id}
    }).catch(err => console.error('Injection failed', err));
});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  
  if (tab.url?.startsWith("chrome://")){
    return null;
  }
  // Check if the tab is active and the change is that the page has been loaded completely
  if (tab.active && changeInfo.status === 'complete') {
    // Inject the content script into the active tab
    chrome.scripting.executeScript({
      files: ["scripts/content.ts"],
      target: {tabId: tab.id }
    });
  }
});

