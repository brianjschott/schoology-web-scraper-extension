

console.log("Scraper file loaded")

 
console.log("Scraping rubric...")
const schoologyAssignmentPage = "https://classroom.cgps.org/assignment"
// `tab` will either be a `tabs.Tab` instance or `undefined`.
const rubricRowName = document.querySelector(`tr.rubric-row.ng-scope th.rubric-row-title`).innerHTML
const rubricRowScore = document.querySelector(`.right-column > .rubric-table > :nth-child(2) td.rating-wrapper.ng-scope.selected div.rating-item`).innerHTML
const totalScore = document.querySelector(`div.s-slider.s-js-manage-focus.rubric-grades-edit.ng-scope.opened div.bottom`).innerHTML
console.log(rubricRowName, rubricRowScore, totalScore)
    


