// localStorage
var appointments = {};
var periods = 9;
// var currentTime = moment("2023-03-17 13:59", "YYYY-MM-DD HH:mm");
var currentTime = moment();
var currentDate = currentTime.format("YYYY-MM-DD");
// var currentDate = currentTime.format("dddd, MMMM Do YYYY");

// Current day is dynamically displayed when page is opened.
function displayCurrentDay() {
  $("#currentDay").prepend(moment().format("dddd, MMMM Do YYYY"));
}

// Example of what our agenda rows will look like and contain
function generateDailyPlannerRow(index, rowColor, timeslot, text) {
  $(".container").append(`
  <div class="row time-block">
    <div class="col-md-1 hour">${timeslot}</div>
      <textarea id="textarea-${index}" class="col-md-10 description ${rowColor}" ></textarea>
        <button class="col-md-1 btn saveBtn" data-value="${index}"><i class="fas fa-save"></i></button>
  </div>
  `);

  $(`#textarea-${index}`).text(text);
}

// Replicate logic from `generateDailyPlannerRow` to generate a full page of appointments
function generateDailyPlannerPage() {
  // create relative to current date
  let dayStarts = currentTime.clone().set({ hour: 9, minute: 0, seconds: 0 });

  let events = appointments[currentDate] || [];

  for (var i = 0; i < periods; i++) {
    let timeslot = dayStarts.clone().add(i, "hours");
    let rowColor = rowColorForTime(timeslot);
    let text = events[i];

    generateDailyPlannerRow(i, rowColor, timeslot.format("h A"), text);
  }
}

// Manage time and change textarea/description color based on time.
function rowColorForTime(timeslot) {
  if (timeslot.isBefore(currentTime, "hours")) {
    return "past";
  } else if (timeslot.isAfter(currentTime, "hours")) {
    return "future";
  } else {
    return "present";
  }
}

// Save to localStorage
function storeAppointments() {
  localStorage.setItem("appointments", JSON.stringify(appointments));
}

// Load from localStorage
function loadAppointments() {
  appointments = JSON.parse(localStorage.getItem("appointments")) || {};
}

// Trigger the initial set up for planner
function loadPlanner() {
  loadAppointments();
  displayCurrentDay();
  generateDailyPlannerPage();
}

loadPlanner();

// What occurs once one of the save buttons is clicked.
// Had to find a way (index) to be able to target each specific one in use
$(".saveBtn").on("click", function () {
  event.preventDefault();

  let index = $(this).attr("data-value");
  let value = $(`#textarea-${index}`).val();

  let events = appointments[currentDate] || Array(periods);
  events[index] = value;
  appointments[currentDate] = events;

  storeAppointments();
});
