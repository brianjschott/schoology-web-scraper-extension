

console.log("Scraper file loaded")

 
console.log("Scraping rubric...")
const schoologyAssignmentPage = "https://classroom.cgps.org/assignment"
// `tab` will either be a `tabs.Tab` instance or `undefined`.
const rubricRowName = document.querySelectorAll(`tr.rubric-row.ng-scope th.rubric-row-title`)
const rubricRowScore = document.querySelectorAll(`.right-column > .rubric-table > :nth-child(2) td.rating-wrapper.ng-scope.selected div.rating-item`)
const totalScore = document.querySelector(`div.s-slider.s-js-manage-focus.rubric-grades-edit.ng-scope.opened .assigned-grades-total span`).innerHTML
console.log(rubricRowName[0])
console.log(rubricRowScore[0])
console.log(totalScore)
    


