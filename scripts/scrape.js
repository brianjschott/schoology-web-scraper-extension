//get HTML elements
var rubricRowNameList = document.querySelectorAll(`tr.rubric-row.ng-scope th.rubric-row-title`)
var rubricRowScoreList = document.querySelectorAll(`.right-column > .rubric-table > :nth-child(2) td.rating-wrapper.ng-scope.selected div.rating-item`)
var totalScore = document.querySelector(`div.s-slider.s-js-manage-focus.rubric-grades-edit.ng-scope.opened .assigned-grades-total span`).innerHTML
var studentName = document.querySelector(`.enrollment-dd-name`).textContent
var assignmentNumber = window.location.pathname.substring(window.location.pathname.indexOf("assignment/")+11,window.location.pathname.lastIndexOf('/'));
var assignmentName = document.querySelector(`#center-top .page-title`).textContent
var rubric = []

//get HTML table. For each row that doesn't include the header row, 
//get the title and description (borrow from the original queries),
//and check to see if a selected cell in that row exists
//if so, use that description and score
//if not, make the description a default and set score to whatever is in the input box

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
    console.log("Saving to local storage")
    chrome.runtime.sendMessage({rubricSaved: true, studentName: studentName, assignmentNumber: assignmentNumber, assignmentName: assignmentName})
}) 