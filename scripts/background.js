chrome.action.onClicked.addListener((tab) => {
    console.log("On click event fired")
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['scripts/scrape.js']
    });
  });
