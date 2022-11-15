const json2csv = require('json2csv')

chrome.action.onClicked.addListener((tab) => {
  console.log("On click event fired")
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['scripts/scrape.js']
  });
});

// chrome.downloads.onCreated.addListener((item) => {
  
// })


chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.rubricSaved) {
    //Pulled from stackexchange post, basically downloads data as a way to save it locally
    chrome.storage.local.get(null, function(items) { // null implies all items
      // Convert object to a string.
      var result = json2csv.parse(result);
      
      // Save as file
      var url = 'data:text/csv;base64,' + btoa(result);
      chrome.downloads.download({
          url: url,
          filename: `rubrics/${msg.studentName}-${msg.assignmentNumber}.csv`
      }, (downloadID) => { //callback when download started not finished
          if (downloadID) { //if error starting download, downloadID is undefined
              chrome.storage.local.clear(); //empties for next rubric to be downloaded
          }
      });
  });
  }
});