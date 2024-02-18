//when extension is installed for the first time, go to user sign up
chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === 'install') {
    chrome.tabs.create({
      url: "https://github.com/svmnikhil"
    });
  }
});


// when a tab is opened, it fires the content script
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    // Check if the URL starts with "chrome://" and exit if it does
    if (tab.url?.startsWith("chrome://")) {
        return;
    }
    // Inject the content script into the newly active tab if it's not a chrome:// URL
    chrome.scripting.executeScript({
        files: ["scripts/content.ts"],
        target: {tabId: tab.id}
    });
});
});


// when a tab is updated, it fires the content script then too
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

function renderWidgetOnWebpage(data, tab) {
  console.log("performing action with: ", data);
  // chrome.scripting.executeScript({
  //   files: ["components/content.ts"],
  //   target: {tabId: tab.id }
  // });
}

//if the content script returns a valid out of stock product, we will save this object and notify the user of the discovery by changing the icon color
chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{

    if (sender.tab && sender.tab.id && message != null) {
      // Include the tab ID with the message
      const dataObj = {
        tabId: sender.tab.id,
        ...message
      };

      chrome.storage.local.set({ dataObj: dataObj }, () => {
        console.log("Data saved to chrome.storage.local", dataObj);
        chrome.action.setIcon({
          path: {
            "16": "logos/16px-logo.png",
            "48": "logos/48px-logo.png",
            "128": "logos/128px-logo.png"
          },
          tabId: sender.tab.id 
        });
      });

      renderWidgetOnWebpage(dataObj, sender.tab.id);
    }
    sendResponse({ reply: "Got your message!" });
    return true;
});


// chrome.runtime.onConnect.addListener((port) => {
//   console.assert(port.name === "popup-background-connection");
//   port.onMessage.addListener((msg) => {
//     // Handle messages received from the popup
//     if (msg.request === "getTabInfo") {
//       // Check if this connection has a tab ID
//       const tabId = port.sender.tab ? port.sender.tab.id : null;
//       console.log("this is the tabId: ", tabId);
//       if (tabId !== null) {
//         chrome.storage.local.get("dataObj", (result) => {
//           // Ensure the dataObj is for the current tab
//           if (result.dataObj && result.dataObj.tabId === tabId) {
//             port.postMessage({ tabInfo: result.dataObj });
//           } else {
//             port.postMessage({ error: "No data found for current tab" });
//           }
//         });
//       } else {
//         port.postMessage({ error: "This message does not come from a tab." });
//       }
//     }
//   });

//   port.onDisconnect.addListener(() => {
//     console.log('Disconnected');
//   });
// });


chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  // Retrieve dataObj from storage
  chrome.storage.local.get("dataObj", (result) => {
    if (result.dataObj && result.dataObj.tabId === tabId) {
      // If the closed tab matches the tab ID stored in dataObj, delete dataObj from storage
      chrome.storage.local.remove("dataObj", () => {
        console.log("dataObj removed from storage because its tab was closed.");
      });
    }
  });
});

