// This element needs to be targeted so we can display the current day under the lead.
var currentDay = $("#currentDay");
var timeblocks = $("#businessHours");

// This function takes advantage of moment() to target the element we assigned to the currentDay variable.
// This will result in the current day being dynamically displayed when the page is opened.
function displayCurrentDay() {
  var currentDayAtPageOpen = moment().format("dddd, MMMM Do YYYY");
  currentDay.text(currentDayAtPageOpen);
}

displayCurrentDay();

// This functions allow us to set a day start and a day end, which we can then use to append a div for each hour in our day scheduler.
function createTimeblocks() {
  var dayStarts = moment("9:00am", "h:mma");
  var workHours = 8 + 1;

  for (var i = 0; i < workHours; i++) {
    var hourlyTimeblock = moment(dayStarts)
      .add(1 * i, "hours")
      .format("hh:mm A");

    console.log("hourlyTimeblock", hourlyTimeblock);
    timeblocks.append(
      `<div class="col-sm" id="businessHours${i}">${hourlyTimeblock}</div>`
    );
  }
}

createTimeblocks();
