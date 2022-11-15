chrome.action.onClicked.addListener((tab) => {
  console.log("On click event fired")
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['scripts/scrape.js']
  });
});

//borrowed from https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.rubricSaved) {
    //Pulled from stackexchange post, basically downloads data as a way to save it locally
    chrome.storage.local.get(null, function(items) { // null implies all items
      console.log(items)
      var result = convertJSONtoCSV(items.rubric)
      
      // Save as file
      var url = 'data:text/csv;;charset=utf-8,%EF%BB%BF,' + encodeURIComponent(result);
      chrome.downloads.download({
          url: url,
          filename: `rubrics/${msg.studentName}-${msg.assignmentName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")}.csv`
      }, (downloadID) => { //callback when download started not finished
          if (downloadID) { //if error starting download, downloadID is undefined
              chrome.storage.local.clear(); //empties for next rubric to be downloaded
          }
      });
  });
  }

  function convertJSONtoCSV(arrayOfJson) {
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(arrayOfJson[0])
    let csv = arrayOfJson.map(row => header.map(fieldName => 
    JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join('\r\n')
    return csv
  }
});