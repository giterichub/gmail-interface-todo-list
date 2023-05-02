window.onload = loadTasks;
const allTabs = document.querySelectorAll(".each_tab");
const selectAllCheckboxes = document.querySelector(".checkbox_box");
const addButton = document.querySelector(".search_add_container button");
const table = document.querySelector("table");

function loadTasks() {
  // check if localStorage has any tasks
  // if not then return
  if (localStorage.getItem("tasks") == null) return;

  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // Loop through the tasks and add them to the list
  tasks.forEach((task) => {
    createTaskElement(task.task);
  });
}

//Create element on clicking add button, also re-rendering elements on load page using cookies
function createTaskElement(inputValue) {
  //create all elements and assign classes/image sources
  var tableRow = document.createElement("tr");
  var dataCell = document.createElement("td");
  var dataCellInnerContainer = document.createElement("div");
  dataCellInnerContainer.className = "data_cell_container";
  var tableCheckboxes = document.createElement("div");
  tableCheckboxes.className = "checkbox_box";
  var divImg = document.createElement("div");
  divImg.className = "divImg";
  var dataCellTextWrapper = document.createElement("div");
  dataCellTextWrapper.className = "dataCellTextWrapper";
  var cellHeader = document.createElement("h5");
  cellHeader.className = "cell_header";
  var cellTent = document.createElement("h5");
  cellTent.className = "cell_tent";
  var time = document.createElement("p");
  var absoluteDiv = document.createElement("div");
  absoluteDiv.className = "absoluteDiv";
  var deleteAbsoluteDiv = document.createElement("img");
  deleteAbsoluteDiv.src = "images/trash.png";

  //assign values to Header, Description and time.
  cellHeader.innerText = inputValue;
  cellTent.innerText = inputValue;
  time.innerText = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  //append all children to respective parent. First child always appended to parent table.
  table.appendChild(tableRow);
  tableRow.appendChild(dataCell);
  dataCell.appendChild(dataCellInnerContainer);
  dataCellInnerContainer.appendChild(tableCheckboxes);
  dataCellInnerContainer.appendChild(divImg);
  dataCellInnerContainer.appendChild(dataCellTextWrapper);
  dataCellTextWrapper.appendChild(cellHeader);
  dataCellTextWrapper.appendChild(cellTent);
  dataCellInnerContainer.appendChild(time);
  dataCellInnerContainer.appendChild(absoluteDiv);
  absoluteDiv.appendChild(deleteAbsoluteDiv);
}
function clearInputValue(inputValue) {
  inputValue.value = "";
}

function setLocalStorageItem(inputValue) {
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { task: inputValue.value, completed: false },
    ])
  );
}

addButton.addEventListener("click", function () {
  // console.log(new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false }));
  var inputValue = document.getElementById("inputContent");
  if (inputValue.value == "") {
    alert("Please add a note!");
  } else {
    setLocalStorageItem(inputValue);
    createTaskElement(inputValue.value);
    clearInputValue(inputValue);
  }
});

//Switch between tabs
allTabs.forEach((eachTab) => {
  eachTab.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    eachTab.classList.add("active");
  });
});

//for all checkboxes and star elements to toggle between checked or starred.
table.addEventListener("click", function (evt) {
  if (evt.target.tagName === "DIV") {
    evt.target.classList.toggle("checked");
  }
});

//For the delete image if you click on it then delete the main parent that is the whole row
//evt.target.parentNode.parentNode.parentNode.parentNode.remove()
//Which is delete image(evt.target) -> absolute div(pN) -> div container(pN) -> td(pN) -> tr(pN);
table.addEventListener("click", function (evt) {
  if (evt.target.tagName === "IMG") {
    evt.target.parentNode.parentNode.parentNode.parentNode.remove();
  }
  //get all items(tasks) from local storage
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (
      task.task ===
      evt.target.parentNode.parentNode.childNodes[2].childNodes[1].outerText
    ) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

//If top checkbox is selected or deselected then all the checkboxes should be selected or deselected respectively.
selectAllCheckboxes.addEventListener("click", function (event) {
  var checkboxes = document.querySelectorAll(
    ".data_cell_container .checkbox_box"
  );
  if (event.type === "touchstart") event.preventDefault();
  if (document.querySelector(".checkbox_box").classList.contains("checked")) {
    document.querySelector(".checkbox_box").classList.remove("checked");
    checkboxes.forEach((checkbox) => {
      if (checkbox.classList.contains("checked")) {
        checkbox.classList.remove("checked");
      }
    });
  } else {
    document.querySelector(".checkbox_box").classList.add("checked");
    checkboxes.forEach((checkbox) => {
      checkbox.classList.add("checked");
    });
  }
});
