chrome.action.onClicked.addListener((tab) => {
  console.log("On click event fired")
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['scripts/scrape.js']
  });
});

  chrome.runtime.onMessage.addListener((msg, sender) => {
    // First, validate the message's structure.
    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
      // Enable the page-action for the requesting tab.
      chrome.pageAction.show(sender.tab.id);
    }
  });