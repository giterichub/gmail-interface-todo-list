// The original code:

const addButton = document.querySelector(".search_add_container button");
const table = document.querySelector("table");

addButton.addEventListener("click", function() {
  var inputValue = document.getElementById("inputContent");
  var tableRow = document.createElement("tr");
  var dataCell = document.createElement("td");
  var dataCellInnerContainer = document.createElement("div");
  dataCellInnerContainer.className = "data_cell_container";
  var tableCheckboxes = document.createElement("div");
  tableCheckboxes.className = "checkbox_box";
  var img = document.createElement("img");
  img.src = "starGrey.png";
  img.alt = "starGrey";
  var cellHeader = document.createElement("h5");
  cellHeader.className = "cell_header";
  var cellTent = document.createElement("h5");
  cellTent.className = "cell_tent";
  var time = document.createElement("p");



  if (inputValue.value == "") {
    alert("Please add a note!");
  } else {
    cellHeader.innerText = inputValue.value;
    cellTent.innerText = inputValue.value;
    time.innerText = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: "2-digit"
    });
    table.appendChild(tableRow);
    tableRow.appendChild(dataCell);
    dataCell.appendChild(dataCellInnerContainer);
    dataCellInnerContainer.appendChild(tableCheckboxes);
    dataCellInnerContainer.appendChild(img);
    dataCellInnerContainer.appendChild(cellHeader);
    dataCellInnerContainer.appendChild(cellTent);
    dataCellInnerContainer.appendChild(time);

    inputValue.value = "";

  }

  var checkboxes = document.querySelectorAll(".data_cell_container .checkbox_box");
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", () => {
      if (checkbox.classList.contains("checked")) {
        checkbox.classList.remove("checked");
      } else {
        checkbox.classList.add("checked");
      }
    });
  });

  inputValue.value = "";
});

// The code wasn't working here because we everytime we clicked on the add button it multiple eventListeners were added
// to the checkbox. So if we clicked twice 2 event eventListeners for the first checkbox and so on.


// So one solution is to remove that function out of the addButton function like so:

table.addEventListener("click", function(evt){
    if(evt.target.tagName === "DIV"){
        evt.target.classList.toggle("checked");
    }
});

// Here since table already exists irrespective of tr element we add eventlistener to it. 
// Then we check if someone clicked on the div and toggle the targeted elements classList


// Other Solutions:

var checkboxes = document.querySelectorAll(".data_cell_container .checkbox_box");
  var checkbox = checkboxes[checkboxes.length - 1]
    checkbox.addEventListener("click", () => {
      if (checkbox.classList.contains("checked")) {
        checkbox.classList.remove("checked");
      } else {
        checkbox.classList.add("checked");
      }
    });

  inputValue.value = "";

  // Using this method this code still exists in the addButton function


  // Solution 2:

  var checkboxes = document.querySelectorAll(".data_cell_container .checkbox_box");
    let checkBoxIndex=0;
    checkboxes.forEach(checkbox => {
      if(checkBoxIndex===(checkboxes.length)-1){
        checkbox.addEventListener("click", () => {
            if(checkbox.classList.contains("checked")){
                checkbox.classList.remove("checked");
            }
            else{
                checkbox.classList.add("checked");
            }
        });
      }
      checkBoxIndex++;
    });
  
    inputValue.value = "";

  // This is basically similar to the above solution except here a seperate index check or counter
  // is kept. Again this code also is in the addButton function