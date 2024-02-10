/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUF5QyxPQUFPO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixLQUFLO0FBQ0wsQ0FBQztBQUNELENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsS0FBSztBQUNMO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3ByZS1vcmRlci8uL3NyYy9iYWNrZ3JvdW5kL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKHtyZWFzb259KSA9PiB7XG4gIGlmIChyZWFzb24gPT09ICdpbnN0YWxsJykge1xuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7XG4gICAgICB1cmw6IFwiaHR0cHM6Ly9naXRodWIuY29tL3N2bW5pa2hpbFwiXG4gICAgfSk7XG4gIH1cbn0pO1xuXG5jaHJvbWUudGFicy5vbkFjdGl2YXRlZC5hZGRMaXN0ZW5lcihmdW5jdGlvbihhY3RpdmVJbmZvKSB7XG4gIFxuICBjaHJvbWUudGFicy5nZXQoYWN0aXZlSW5mby50YWJJZCwgZnVuY3Rpb24odGFiKSB7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIFVSTCBzdGFydHMgd2l0aCBcImNocm9tZTovL1wiIGFuZCBleGl0IGlmIGl0IGRvZXNcbiAgICBpZiAodGFiLnVybC5zdGFydHNXaXRoKFwiY2hyb21lOi8vXCIpKSB7XG4gICAgICAgIHJldHVybjsgLy8gRG8gbm90aGluZyBpZiBpdCdzIGEgY2hyb21lOi8vIFVSTFxuICAgIH1cbiAgICAvLyBJbmplY3QgdGhlIGNvbnRlbnQgc2NyaXB0IGludG8gdGhlIG5ld2x5IGFjdGl2ZSB0YWIgaWYgaXQncyBub3QgYSBjaHJvbWU6Ly8gVVJMXG4gICAgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcbiAgICAgICAgZmlsZXM6IFtcInNjcmlwdHMvY29udGVudC50c1wiXSxcbiAgICAgICAgdGFyZ2V0OiB7dGFiSWQ6IHRhYi5pZH1cbiAgICB9KS5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcignSW5qZWN0aW9uIGZhaWxlZCcsIGVycikpO1xufSk7XG59KTtcblxuY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpIHtcbiAgXG4gIGlmICh0YWIudXJsPy5zdGFydHNXaXRoKFwiY2hyb21lOi8vXCIpKXtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBDaGVjayBpZiB0aGUgdGFiIGlzIGFjdGl2ZSBhbmQgdGhlIGNoYW5nZSBpcyB0aGF0IHRoZSBwYWdlIGhhcyBiZWVuIGxvYWRlZCBjb21wbGV0ZWx5XG4gIGlmICh0YWIuYWN0aXZlICYmIGNoYW5nZUluZm8uc3RhdHVzID09PSAnY29tcGxldGUnKSB7XG4gICAgLy8gSW5qZWN0IHRoZSBjb250ZW50IHNjcmlwdCBpbnRvIHRoZSBhY3RpdmUgdGFiXG4gICAgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcbiAgICAgIGZpbGVzOiBbXCJzY3JpcHRzL2NvbnRlbnQudHNcIl0sXG4gICAgICB0YXJnZXQ6IHt0YWJJZDogdGFiLmlkIH1cbiAgICB9KTtcbiAgfVxufSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==