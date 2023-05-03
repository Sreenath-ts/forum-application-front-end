var oDoc, sDefTxt;
var btnStore = document.getElementById("btnStore");

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
    var oPre = document.createElement("pre");
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

