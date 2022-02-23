function toggleAdd() {
  document.getElementById("addbtn").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches(".addbtn")) {
    var dropdowns = document.getElementsByClassName("adddatabox");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
}


// ADD NEW ROW DATA IN THE TABLE -----------------------------------------

// create a new dataset
function addDataset() {
  // element of table
  var id = document.getElementById("id").value;
  var age = document.getElementById("age").value;
  var gender = document.getElementById("gender").value;
  var group = document.getElementById("group").value;
  var IQ = document.getElementById("IQ").value;
  var ICD10 = document.getElementById("ICD10").value;
  var date = document.getElementById("date").value;
  var annotator = document.getElementById("annotator").value;

  var displayImg = document.getElementById("mriImg").value;
    
  // table element + position of the insert row
  var table = document.getElementsByTagName("table")[0];
  var newData = table.insertRow(1);

  // position of the cells
  var cell1 = newData.insertCell(0);
  var cell2 = newData.insertCell(1);
  var cell3 = newData.insertCell(2);
  var cell4 = newData.insertCell(3);
  var cell5 = newData.insertCell(4);
  var cell6 = newData.insertCell(5);
  var cell7 = newData.insertCell(6);
  var cell8 = newData.insertCell(7);
  var cell9 = newData.insertCell(8);
  var cell10 = newData.insertCell(9);
    
  // and appear in HTML
  cell1.innerHTML = id;
  cell2.innerHTML = age;
  cell3.innerHTML = gender;
  cell4.innerHTML = group;
  cell5.innerHTML = IQ;
  cell6.innerHTML = ICD10;
  cell7.innerHTML = date;
  cell8.innerHTML = cell8.innerHTML + `<img src="${uploadedImg}"/>`;
  cell9.innerHTML = annotator;
  cell10.innerHTML = cell10.innerHTML +' <button type="button"  class="btn-medium" value="Remove" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);" /><small>Remove</small>';

  // and display to table
  // and add element
  // addTable.innerHTML += `
  //     <tr>
  //         <td>${id}</td>
  //         <td>${sex}</td>
  //         <td>${age}</td>
  //         <td>${annotator}</td>
  //         <td>${date}</td>
  //         <td>${mriImg}</td>
  //         <td><button class = "removeData">Remove</td>

  //     </tr>
  // `;
};


// STORE AND DISPLAY IMAGE -------------------------------------------------------

// access to input field
const upImg = document.querySelector("#mriImg"); // store in 'upImg' variiable - - get acess = querySelector
var uploadedImg; //store uploaded image

window.onload = function() {
    
  // what to do when an image is added
  upImg.addEventListener("change", function() {

    const reader = new FileReader(); // read file of user

    reader.addEventListener("load", () => {

      // image uploaded -> store in  'uploadedImg' variable
      // read file
      uploadedImg = reader.result;

      // display on screen; # = access
      document.querySelector("#displayImg")
      .style.backgroundImage = `url(${uploadedImg})`; // $ = equal
    });

    reader.readAsDataURL(this.files[0]); // without = die :)
  });
}


// EXPORT DATA TO CSV --------------------------------------------------

// -----------------------------------------------------------
// export dataset to CSV file
class exportCSV {
  
  // constructor, set as an instance variablev
  constructor (table, includeHeaders = true) { // include header in csv file

    // keep a reference to the table and rows
    this.table = table;
    this.rows = Array.from(table.querySelectorAll("tr"));

    if (!includeHeaders && this.rows[0].querySelectorAll("th").length) {
      this.rows.shift();
    }
  }

  // main method to create CSV file
  // access to the table through the constructor
  convertToCSV () {
    const lines = []; // array
    const numCol = this._findLongestRowLength();

    // loop through all rows in the table
    for (const row of this.rows) {
      let line = ""; // set a string variable 

      // loop as many time as number of collumn(s)
      for (let i = 0; i < numCol; i++) {

        if (row.children[i] !== undefined) { // check if it has value at index 'i'
          // children ~= list of data cells
          line += exportCSV.parseCell(row.children[i]);
                                  
        }

        // if it not the last collumn, append comma
        line += (i !== (numCol - 1)) ? "," : "";
      }

      // add line to line array
      lines.push(line);
    }

    return lines.join("\n");
  }


  // private method
  // need because: 
  //    when export to CSV, basically make up for longest row
  //    even if some row does not have max length
  //       make up for extra collumn
  _findLongestRowLength () {
    return this.rows.reduce((l, row) => row.childElementCount > l ? row.childElementCount : l, 0);
    // takt the rate, reduce to single value for each row
    // check the current childElementCount for tableData element
    // more than current longest length -> set as current and longest rolling
    // otherwise, use default value of 0
  }


  // don't need an instance of the table CSV exporter to parse a cell
  //      (take the text content of cell -> make it valid)\
  // dealing with double quotes, commas, line breaks
  // apply rules of CSV file
  static parseCell (tableCell) {
    let parsedValue = tableCell.textContent; // implement all rules of CSV file

    // replace: all double quotes = two double quotes
    parsedValue = parsedValue.replace(/"/g, `""`); // 'g' for regular expression

    // value contains commas, new-line or double-quote -> enclose in double quotes
    parsedValue = /[",\n]/.test(parsedValue) ? `"${parsedValue}"` : parsedValue;
    // test and watch out for duoble quote, comma, new-line
    // past value if contains any of these values
    // set new past value to double quotes
    // all good -> keep current positive value
      
    // ensure produce valid CSV
    return parsedValue;
  }
}

// Export and download csv file ----------------------------
const dataTable = document.getElementById("dataTable");
const exportData = document.getElementById("exportData");
            
// call exporter and download
exportData.addEventListener("click", () => {
  // create a new exporter
  const exporter = new exportCSV(dataTable);

  // new constant for output
  const csvOutput = exporter.convertToCSV();

  // create a blob
  const csvBlob = new Blob([csvOutput], { type: "text/csv" });
                    // blob constructor take in an array
  // => create a blob - container of data for CSV output

  // get a reference to the URL 
  // dowload
  const blobUrl = URL.createObjectURL(csvBlob);
  const anchorElement = document.createElement("a"); // making new 'a' element

  // and for the downloaded CSV file
  anchorElement.href = blobUrl;
  anchorElement.download = "dataset.csv";
  anchorElement.click();

  // tell browser to forget about the reference to the blob
  // else, may increase memory
  setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
  }, 500);
});


// READ DATASET -----------------------------------------------------------

function readData() {
  const x = document.querySelector("input");
  x.addEventListener("change", () => {
    const fr = new FileReader();
    fr.onloadend = e => {
      let r = fr.result.split("\n").map(e => {
        return e.split(",");
      });
      r.forEach(e => {
        let m = e.map(e => {
          return `<td>${e}</td>`;
        }).join("");
        const ce = document.createElement("tr");
        ce.innerHTML = m;

        if (ce.innerText !== "") {
          document.querySelector("table").append(ce);

        }


      });

      // console.log(r)
    }
    fr.readAsText(x.files[0]);

  })
}




// REMOVE ROW, THIS FUNCTION IS NOT USED IN THIS WEBSITE ----------------

// remove a dataset
function removeData() {
  // create an input type dynamically
  var btnRm = document.createElement("button");

  // Assign different attributes to the element. 
  btnRm.type = type;
  // btnRm.value = value; // Really? You want the default value to be the type string?
  // btnRm.name = name; // And the name too?
  btnRm.onclick = function() { // Note this is a function
  alert("blabla");
  var rm = row.parentNode.rowIndex;
  document.getElementById("dsTable").deleteRow(rm);
};
}








