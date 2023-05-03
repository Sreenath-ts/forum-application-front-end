console.log('Umfiiiiiiiiiiiiiii..............');

import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
document
  .getElementById("UploadButton")
  .addEventListener("click", StartUpload);
  let s = document.getElementById("FileBox")
  console.log(s,'fileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
document.getElementById("FileBox").addEventListener("change", FileChosen);
let SelectedFile;
function FileChosen(evnt) {
  console.log('file choosen...............');
  SelectedFile = evnt.target.files[0];
  document.getElementById("NameBox").value = SelectedFile.name;
}
const socket = io.connect("https://localhost:3000");
let FReader;
let Name;
function StartUpload() {
  console.log('start upload...........................')
  if (document.getElementById("FileBox").value != "") {
    FReader = new FileReader();
    Name = document.getElementById("NameBox").value;
    let Content =
      "<span id='NameArea'>Uploading " +
      SelectedFile.name +
      " as " +
      Name +
      "</span>";
    Content +=
      '<div id="ProgressContainer"><div id="ProgressBar"></div></div><span id="percent">0%</span>';
    Content +=
      "<span id='Uploaded'> - <span id='MB'>0</span>/" +
      Math.round(SelectedFile.size / 1048576) +
      "MB</span>";
    document.getElementById("UploadArea").innerHTML = Content;
    FReader.onload = function (evnt) {
      socket.emit("Upload", { Name: Name, Data: evnt.target.result });
    };
    socket.emit("Start", { Name: Name, Size: SelectedFile.size });
  } else {
    alert("Please Select A File");
  }
}
socket.on("MoreData", function (data) {
  UpdateBar(data["Percent"]);
  var Place = data["Place"] * 524288; //The Next Blocks Starting Position
  var NewFile; //The Variable that will hold the new Block of Data
  if (SelectedFile.webkitSlice)
    NewFile = SelectedFile.webkitSlice(
      Place,
      Place + Math.min(524288, SelectedFile.size - Place)
    );
  else
    NewFile = SelectedFile.mozSlice(
      Place,
      Place + Math.min(524288, SelectedFile.size - Place)
    );
  FReader.readAsBinaryString(NewFile);
});

function Refresh() {
  location.reload(true);
}
function UpdateBar(percent) {
  document.getElementById("ProgressBar").style.width = percent + "%";
  document.getElementById("percent").innerHTML =
    Math.round(percent * 100) / 100 + "%";
  var MBDone = Math.round(
    ((percent / 100.0) * SelectedFile.size) / 1048576
  );
  document.getElementById("MB").innerHTML = MBDone;
}

























var oDoc, sDefTxt;
var btnStore = document.getElementById("btnStore");
var  oPre;
function initDoc() {
  oDoc = document.getElementById("textBox");
  sDefTxt = oDoc.innerHTML;
  if (document.compForm.switchMode.checked) { setDocMode(true); }
}

function formatDoc(sCmd, sValue) {
  if (validateMode()) { document.execCommand(sCmd, false, sValue); oDoc.focus(); }
}

function validateMode() {
  if (!document.compForm.switchMode.checked) { return true ; }
  alert("Uncheck \"Show HTML\".");
  oDoc.focus();
  return false;
}

function setDocMode(bToSource) {
var sbmtBtn = document.getElementById('sbmtBtn');
var errTxt = document.getElementById('errorText1');
  var oContent;
  if (bToSource) {
    oContent = document.createTextNode(oDoc.innerHTML);
    oDoc.innerHTML = "";
    oPre = document.createElement("pre");
    oDoc.contentEditable = false;
    oPre.id = "sourceText";
    oPre.contentEditable = false;
    oPre.appendChild(oContent);
    oDoc.appendChild(oPre);
    document.execCommand("defaultParagraphSeparator", false, "div");
    sbmtBtn.style="display:none;";
    oDoc.contentEditable = false;
  } else {
    if (document.all) {
      oDoc.innerHTML = oDoc.innerText;
    } else {
      oContent = document.createRange();
      oContent.selectNodeContents(oDoc.firstChild);
      oDoc.innerHTML = oContent.toString();
    }
    oDoc.contentEditable = true;
    sbmtBtn.style="display:block;";
    errTxt.innerHTML  = " ";
  }
  oDoc.focus();
}

function printDoc() {
  if (!validateMode()) { return; }
  var oPrntWin = window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
  oPrntWin.document.open();
  oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + oDoc.innerHTML + "<\/body><\/html>");
  oPrntWin.document.close();
}
function submitBtn() {
   var secondDiv = document.getElementById('second-div');
   var secondDivCont = document.getElementById('second-divCont');
   var divContents = document.getElementById('textBox');
   if(divContents.innerHTML==""){
       secondDivCont.innerHTML = "<h3 style=\" opacity:.6;text-align:center;\">There is nothing to show you here </h3><br><h1 style=\"font-size:100px;text-align:center;\"> 🥴</h1>";
   }else{
   secondDivCont.innerHTML = divContents.innerHTML ;
   }
   secondDiv.style= "display:block;"
}
function contEdit(){
    var secondDiv = document.getElementById('second-div');
    secondDiv.style= "display:none;"
}
function hideModel(mdlNane){
    document.getElementById(mdlNane).style="display:none";
}
function checkValue(){
var txtBox = document.getElementById("textBox");
var errTxt = document.getElementById('errorText1');
    if(txtBox.contentEditable == true || txtBox.contentEditable == 'true'){
        errTxt.innerHTML  = " ";
    }else{
        errTxt.innerHTML  = "Please uncheck this to continue editing!";
    }
}

setTimeout(()=>{

  initDoc()
},500)



// edit

// let body = document.body
// let themeBtn = document.getElementById('#themeButton')

// let savedTheme = localStorage.getItem('theme')

// // if (savedTheme) {
// //     body.className = savedTheme
// // }



 


// let themes = ['light', 'solar', 'dark']

// let count = (savedTheme !== undefined || null) ? themes.indexOf(savedTheme) : 0;

// themeBtn.onclick = function () {
//   console.log('theme changeer.................')
//     count++
//     let selected
//     if (count === 0) {
//         selected = themes[0]
//     }
//     if (count === 1) {
//         selected = themes[1]
//     } if (count === 2) {
//         selected = themes[2]
//     }
//     if (count > 2) {
//         selected = themes[0]
//         count = 0
//     }
//     localStorage.setItem('theme', selected)
//     body.className = selected
// }

// document.addEventListener(
//   "click",
//   function(event) {
//       var target = event.target;
//       var replyForm;
//       if (target.matches("[data-toggle='reply-form']")) {
//           replyForm = document.getElementById(target.getAttribute("data-target"));
//           replyForm.classList.toggle("d-none");
//       }
//   },
//   false
// );

// modal

// modal end

// chat




// chat_btn.click(() => {
//   chat_btn.toggleClass("expanded");
//   setTimeout(() => {
//     chat_box.toggleClass("expanded");
//   }, 100);
// });



