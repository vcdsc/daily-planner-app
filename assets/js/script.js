// This element needs to be targeted so we can display the current day under the lead.
var currentDay = $("#currentDay");

// This function takes advantage of moment() to target the element we assigned to the currentDay variable.
// This will result in the current day being dynamically displayed when the page is opened.
function displayCurrentDay() {
  var currentDayAtPageOpen = moment().format("dddd, MMMM Do YYYY");
  currentDay.text(currentDayAtPageOpen);
}

displayCurrentDay();
