console.log("Scraper file loaded")


//get HTML elements
const rubricRowNameList = document.querySelectorAll(`tr.rubric-row.ng-scope th.rubric-row-title`)
const rubricRowScoreList = document.querySelectorAll(`.right-column > .rubric-table > :nth-child(2) td.rating-wrapper.ng-scope.selected div.rating-item`)
const totalScore = document.querySelector(`div.s-slider.s-js-manage-focus.rubric-grades-edit.ng-scope.opened .assigned-grades-total span`).innerHTML
const studentName = document.querySelector(`.enrollment-dd-name`)
const assignmentNumber = window.location.pathname.substring(window.location.pathname.indexOf("assignment/")+11,window.location.pathname.lastIndexOf('/'));

let rubric = []
//for (item of rubricRowNameList) 
for (let i = 0; i < rubricRowNameList.length; i++)
{
    //get rubric-row-title element and description, adds to list
    const rubricRowTitle = rubricRowNameList[i].querySelector(".rubric-row-title .input-top").innerHTML
    const rubricSkillDescription = rubricRowNameList[i].querySelector(".rubric-row-title .input-bottom").innerHTML
    const rubricScoreValue = rubricRowScoreList[i].querySelector(".rating-item .input-top").innerHTML
    const rubricScoreDescription = rubricRowScoreList[i].querySelector(".rating-item .input-bottom").innerHTML

    rubric.push({
        rubricRowTitle: rubricRowTitle,
        rubricSkillDescription: rubricSkillDescription,
        rubricScoreValue: rubricScoreValue,
        rubricScoreDescription: rubricScoreDescription
    })

}

chrome.storage.local.set({rubric: rubric}, function() {
    downloadData()
}) //add object formed above here 


function downloadData() {
    //Pulled from stackexchange post, basically downloads data as a way to save it locally
    chrome.storage.local.get(null, function(items) { // null implies all items
        // Convert object to a string.
        var result = JSON.stringify(items);
        console.log(result)
        // Save as file
        var url = 'data:application/json;base64,' + btoa(result);
        chrome.downloads.download({
            url: url,
            filename: `${studentName}-${assignmentNumber}` //update to student name
        }, (downloadID) => { //callback when download started not finished
            if (downloadID) { //if error starting download, downloadID is undefined
                chrome.storage.local.clear(); //empties for next rubric to be downloaded
            }
        });
    });
}

