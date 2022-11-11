

console.log("Scraper file loaded")

 
console.log("Scraping rubric...")
const schoologyAssignmentPage = "https://classroom.cgps.org/assignment"

const rubricRowNameList = document.querySelectorAll(`tr.rubric-row.ng-scope th.rubric-row-title`)
const rubricRowScoreList = document.querySelectorAll(`.right-column > .rubric-table > :nth-child(2) td.rating-wrapper.ng-scope.selected div.rating-item`)
const totalScore = document.querySelector(`div.s-slider.s-js-manage-focus.rubric-grades-edit.ng-scope.opened .assigned-grades-total span`).innerHTML
console.log(rubricRowNameList[0])
console.log(rubricRowScoreList[0])
console.log(totalScore)

if (rubricRowNameList.length == rubricRowScoreList.length) {
    for (let i = 0; i < rubricRowNameList.length; i++) {

    }
}
else {
    throw "name and score lists are of different lengths"
}
    
chrome.storage.local.get(null, function(items) { // null implies all items
    // Convert object to a string.
    var result = JSON.stringify(items);

    // Save as file
    var url = 'data:application/json;base64,' + btoa(result);
    chrome.downloads.download({
        url: url,
        filename: 'filename_of_exported_file.json'
    });
});