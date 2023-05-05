var projectFormEl = $("#project-form");

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.
$(document).ready(function () {
  var rightNow = dayjs().format("MMM DD, YYYY [at] hh:mm:ss a");
  $("#currentDay").text(rightNow);
  //var timer = setInterval(rightNow, 1000);
  //timer();
});

let btn9 = $("#btn9");
let btn10 = $("#btn10");
let btn11 = $("#btn11");
let btn12 = $("#btn12");
let btn1 = $("#btn1");
let btn2 = $("#btn2");
let btn3 = $("#btn3");
let btn4 = $("#btn4");
let btn5 = $("#btn5");

let txt9 = $("#txt9");
let txt10 = $("#txt10");
let txt11 = $("#txt11");
let txt12 = $("#txt12");
let txt1 = $("#txt1");
let txt2 = $("#txt2");
let txt3 = $("#txt3");
let txt4 = $("#txt4");
let txt5 = $("#txt5");

let btns = [btn9, btn10, btn11, btn12, btn1, btn2, btn3, btn4, btn5];
let txts = [txt9, txt10, txt11, txt12, txt1, txt2, txt3, txt4, txt5];
let entry = [
  "entry9",
  "entry10",
  "entry11",
  "entry12",
  "entry1",
  "entry2",
  "entry3",
  "entry4",
  "entry5",
];
for (let i = 0; i < btns.length; i++) {
  btns[i].on("click", function (event) {
    event.preventDefault;
    for (let i = 0; i < txts.length && entry.length; i++) {
      localStorage.setItem(entry[i], txts[i].val());
    }
  });
}

for (let i = 0; i < txts.length && entry.length; i++) {
  txts[i].val(localStorage.getItem(entry[i]));
}

//this will loop rightNow so that the time is always changing
//var timer = setInterval(rightNow, 1000);

// Reads projects from local storage and returns array of project objects.
// Returns an empty array ([]) if there aren't any projects.
function readProjectsFromStorage() {
  var projects = localStorage.getItem("projects");
  if (projects) {
    projects = JSON.parse(projects);
  } else {
    projects = [];
  }
  return projects;
}

// Takes an array of projects and saves them in localStorage.
function saveProjectsToStorage(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

//saves tp local storage
// Adds a project to local storage and prints the project data
function handleProjectFormSubmit(event) {
  event.preventDefault();

  // read user input from the form
  var projectName = projectNameInputEl.val().trim();
  var projectType = projectTypeInputEl.val(); // don't need to trim select input
  var projectDate = projectDateInputEl.val(); // yyyy-mm-dd format

  var newProject = {
    name: projectName,
    type: projectType,
    date: projectDate,
  };

  // add project to local storage
  var projects = readProjectsFromStorage();
  projects.push(newProject);
  saveProjectsToStorage(projects);

  // print project data
  printProjectData();

  // clear the form inputs
  projectNameInputEl.val("");
  projectTypeInputEl.val("");
  projectDateInputEl.val("");
}

projectFormEl.on("submit", handleProjectFormSubmit);

//this is where the color will change accordingly to the time
$("div[id|='hour']").each(function () {
  let id = $(this).attr("id");
  let hour = parseInt(id.split("-")[1]);
  var rightNow24 = dayjs().hour();
  if (rightNow24 == hour) {
    $(this).addClass("present");
  } else if (rightNow24 > hour) {
    $(this).addClass("past");
  } else {
    $(this).addClass("future");
  }
});
