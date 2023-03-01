// This element needs to be targeted so we can display the current day under the lead.
var currentDay = $("#currentDay");
var timeblocks = $("#businessHours");
var userEvent = $("#userInput");
var clickToSave = $("#saveEvent");
// var timeblocksContainer = $(".container");
var timeblockRow = $(".row");

var eventArea = $(".input");
var events = [];

// This function takes advantage of moment() to target the element we assigned to the currentDay variable.
// This will result in the current day being dynamically displayed when the page is opened.
function displayCurrentDay() {
  var currentDayAtPageOpen = moment().format("dddd, MMMM Do YYYY");
  currentDay.text(currentDayAtPageOpen);
}

displayCurrentDay();

// This functions allow us to set a day start and a day end, which we can then use to append a div for each hour in our day scheduler.
function createTimeblocks() {
  var dayStarts = moment("9am", "h:a");
  var workHours = 8 + 1;

  for (var i = 0; i < workHours; i++) {
    var hourlyTimeblock = moment(dayStarts)
      .add(1 * i, "hours")
      .format("h A");

    timeblockRow.addClass("row");
    // console.log("hourlyTimeblock", hourlyTimeblock);
    timeblocks.append(
      `<div class="time-block hour" id="businessHours${i}">${hourlyTimeblock}</div>`
    );
    userEvent.append(
      `<textarea class="description input" id="userInputSave" rows="4" cols="100"></textarea>`
    );
    clickToSave.append(
      `<button class="btn saveBtn save" id="saveMyEvent" type="submit">Save</button>`
    );
  }
}

createTimeblocks();

var clickToSaveButton = $(".save");

function saveMyEvent() {
  localStorage.setItem("myEvents", JSON.stringify(myEvents));
}

clickToSaveButton.addEventListener("click", addToMySavedEvents);

function addToMySavedEvents(event) {
  event.preventDefault();
  console.log(event, eventArea);

  var addEvent = eventArea;
  console.log(addEvent);
  var savedEvents = JSON.parse(localStorage.getItem("myEvents")) || [];

  if (savedEvents !== null) {
    myEvents = savedEvents;
  }

  myEvents.push(addEvent);
  saveMyEvent();
}

addToMySavedEvents();

function colorByTime() {}

colorByTime;
