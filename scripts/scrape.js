

console.log("Scraper file loaded")

//get HTML elements
const rubricRowNameList = document.querySelectorAll(`tr.rubric-row.ng-scope th.rubric-row-title`)
const rubricRowScoreList = document.querySelectorAll(`.right-column > .rubric-table > :nth-child(2) td.rating-wrapper.ng-scope.selected div.rating-item`)
const totalScore = document.querySelector(`div.s-slider.s-js-manage-focus.rubric-grades-edit.ng-scope.opened .assigned-grades-total span`).innerHTML
console.log(rubricRowNameList[0])
console.log(rubricRowScoreList[0])
console.log(totalScore)

//get the inner HTML of each element. we just want the plaintext. totalScore already plaintext
const rubricRowNameListAsPlaintext = [],  rubricRowScoreListAsPlaintext = []

for (item of rubricRowNameList) {
    //get rubric-row-title element and description, adds to list
    const rubricTitle = item.querySelector(".rubric-row-title .input-top").innerHTML
    const rubricSkillDescription = item.querySelector(".rubric-row-title .input-bottom").innerHTML
    rubricRowNameListAsPlaintext.push(`${rubricTitle}: ${rubricSkillDescription}`)
}

for (item of rubricRowScoreList) {
    const rubricScoreValue = item.querySelector(".rating-item .input-top").innerHTML
    const rubricScoreDescription = item.querySelector(".rating-item .input-bottom").innerHTML
    rubricRowScoreListAsPlaintext.push(`${rubricScoreValue} - ${rubricScoreDescription}`)
}

console.log(rubricRowNameListAsPlaintext)
console.log(rubricRowScoreListAsPlaintext)

//not sure I need this, can probably form the objects up above. Change later
function saveRubricItemObjects() {
    if (rubricRowNameList.length == rubricRowScoreList.length) {
        for (let i = 0; i < rubricRowNameList.length; i++) {
            //chrome.storage.local.set({[`row${i}`]:) //add object formed above here 
        }
    }
    else {
        throw "name and score lists are of different lengths"
    }
}

function downloadData() {
    //Pulled from stackexchange post, basically downloads data as a way to save it locally
    chrome.storage.local.get(null, function(items) { // null implies all items
        // Convert object to a string.
        var result = JSON.stringify(items);

        // Save as file
        var url = 'data:application/json;base64,' + btoa(result);
        chrome.downloads.download({
            url: url,
            filename: 'filename_of_exported_file.json' //update to student name
        }, (downloadID) => { //callback when download started not finished
            if (downloadID) { //if error starting download, downloadID is undefined
                chrome.storage.local.clear(); //empties for next rubric to be downloaded
            }
        });
    });
}

