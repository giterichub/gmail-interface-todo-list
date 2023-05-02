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
    console.log(tasks);

    // Loop through the tasks and add them to the list
    tasks.forEach(task => {
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
        cellHeader.innerText = task.task;
        cellTent.innerText = task.task;
        time.innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
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
    });
  }



addButton.addEventListener("click", function(){
    var inputValue = document.getElementById("inputContent");
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
    deleteAbsoluteDiv.src = "images/trash.png"
     // console.log(new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false }));
    if(inputValue.value == ""){
        alert("Please add a note!");
    }else{
        localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: inputValue.value, completed: false }]));
        cellHeader.innerText = inputValue.value;
        cellTent.innerText = inputValue.value;
        time.innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
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
        inputValue.value = "";

    }
});

allTabs.forEach(eachTab => {
    eachTab.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        eachTab.classList.add("active");
    });
});

table.addEventListener("click", function(evt){
    if(evt.target.tagName === "DIV"){
        evt.target.classList.toggle("checked");
    }
});

table.addEventListener("click", function(evt){
    if(evt.target.tagName === "IMG"){
        evt.target.parentNode.parentNode.parentNode.parentNode.remove();
    }
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      tasks.forEach(task => {
        if (task.task === evt.target.parentNode.parentNode.childNodes[2].childNodes[1].outerText) {
          // delete task
          tasks.splice(tasks.indexOf(task), 1);
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
});



selectAllCheckboxes.addEventListener("click", function(event){
    var checkboxes = document.querySelectorAll(".data_cell_container .checkbox_box");
    if (event.type === 'touchstart') event.preventDefault();
    if(document.querySelector(".checkbox_box").classList.contains("checked")){
        document.querySelector(".checkbox_box").classList.remove("checked");
        checkboxes.forEach(checkbox => {
            if(checkbox.classList.contains("checked")){
                    checkbox.classList.remove("checked");;
            }
        })
    }
    else{
        document.querySelector(".checkbox_box").classList.add("checked");
        checkboxes.forEach(checkbox => {
                checkbox.classList.add("checked");;
        })
    }
})