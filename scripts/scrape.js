//get HTML elements
const rubricRowNameList = document.querySelectorAll(`tr.rubric-row.ng-scope th.rubric-row-title`)
const rubricRowScoreList = document.querySelectorAll(`.right-column > .rubric-table > :nth-child(2) td.rating-wrapper.ng-scope.selected div.rating-item`)
const totalScore = document.querySelector(`div.s-slider.s-js-manage-focus.rubric-grades-edit.ng-scope.opened .assigned-grades-total span`).innerHTML
const studentName = document.querySelector(`.enrollment-dd-name`).textContent
const assignmentNumber = window.location.pathname.substring(window.location.pathname.indexOf("assignment/")+11,window.location.pathname.lastIndexOf('/'));

let rubric = []

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
    chrome.runtime.sendMessage({rubricSaved: true, studentName: studentName, assignmentNumber: assignmentNumber})
}) //add object formed above here 