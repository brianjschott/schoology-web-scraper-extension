# resources/helpful links for this project
https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/

https://developer.chrome.com/docs/extensions/mv3/xhr/ - cross origin

# query selectors for each table row w/ rubric

I used SimpleScraper to identify the selectors that would target the individual rubric rows.
````
rubricRowName: tr.rubric-row.ng-scope th.rubric-row-title
rubricRowScore: .right-column > .rubric-table > :nth-child(2) td.rating-wrapper.ng-scope.selected div.rating-item
Total: div.s-slider.s-js-manage-focus.rubric-grades-edit.ng-scope.opened div.bottom
````

# Bugs
Rubrics without a selected column do not scrape properly. Instead, should...
- Get all table rows
- Iterate thru each, building the object as we go