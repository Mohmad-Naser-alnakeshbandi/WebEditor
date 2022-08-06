

$(document).ready(function () {

  $("#code-tabs").tabs();

  $("#preview-tabs").tabs();
  PreviewTabColor(1);

  var width = document.getElementById("if-desktop").getBoundingClientRect().width;
  document.getElementById("if-desktop").style.height = (width * (10 / 16)) + "px";

  $("#b-html").click(function () {

    $("#code-tabs").tabs("option", "active", 0);
  });

  $("#b-desktop").click(function () {

    $("#preview-tabs").tabs("option", "active", 0);
    PreviewTabColor(0);
    var width = document.getElementById("if-desktop").getBoundingClientRect().width;
    document.getElementById("if-desktop").style.height = (width * (9 / 16)) + "px";
  });
  $("#b-mobile").click(function () {

    $("#preview-tabs").tabs("option", "active", 1);
    PreviewTabColor(1);
    var height = document.getElementById("if-mobile").getBoundingClientRect().height;
    document.getElementById("if-mobile").style.width = (height * (9 / 16)) + "px";
  });
  $("#b-tablet").click(function () {

    $("#preview-tabs").tabs("option", "active", 2);
    PreviewTabColor(2);
    var width = document.getElementById("if-tablet").getBoundingClientRect().width;
    document.getElementById("if-tablet").style.height = (width * 0.625) + "px";
  });




  if (navigator.userAgent.indexOf("Firefox") != -1) {
    window.location.href = "Document/UnsupportedBrowser.html";
  }


});
function PreviewTabColor(tab) {

  if (tab == 0) {

    document.getElementById("b-desktop").style.backgroundColor = "#1E1E1E";
    document.getElementById("b-mobile").style.backgroundColor = "#2C2C2C";
    document.getElementById("b-tablet").style.backgroundColor = "#2C2C2C";

  } else if (tab == 1) {

    document.getElementById("b-desktop").style.backgroundColor = "#2C2C2C";
    document.getElementById("b-mobile").style.backgroundColor = "#1E1E1E";
    document.getElementById("b-tablet").style.backgroundColor = "#2C2C2C";
  } else if (tab == 2) {

    document.getElementById("b-desktop").style.backgroundColor = "#2C2C2C";
    document.getElementById("b-mobile").style.backgroundColor = "#2C2C2C";
    document.getElementById("b-tablet").style.backgroundColor = "#1E1E1E";
  }
}

var ColorState = false;
function ColorChange() {

  var frames = document.getElementsByTagName("iframe");
  let Code = document.getElementById("editing-html").value;
  if (ColorState) {
    document.getElementById("preview-tabs").style.background = "#1E1E1E";
    document.querySelector("pre[class*='language-']").style.background = "#1E1E1E";
    document.querySelector("code[class*='language-']").style.background = "#1E1E1E";
    document.querySelector("code[class*='language-']").style.color = "white";
    document.querySelector("#switch i").classList.replace("fa-sun", "fa-moon");
    ColorState = false;
  } else {
    document.getElementById("preview-tabs").style.background = "#D7D7D7";
    document.querySelector("pre[class*='language-']").style.background = "#D7D7D7";
    document.querySelector("code[class*='language-']").style.background = "#D7D7D7";
    document.querySelector("code[class*='language-']").style.color = "black";
    document.querySelector("#switch i").classList.replace("fa-moon", "fa-sun");
    ColorState = true;
  }
}

const Codetemplate = '<!DOCTYPE html> \n<html lang="en"> \n<head> \n<meta charset="UTF-8"> \n<meta http-equiv="X-UA-Compatible" content="IE=edge"> \n<meta name="viewport" content="width=device-width, initial-scale=1.0"> \n<title>WebEditor</title>\n<style></style>\n</head>\n<body></body>\n<script type="text/javascript"></script>\n</html>';
document.addEventListener("keydown", function (event) {
  if (event.key === "F2") {
    document.getElementById("editing-html").value = Codetemplate;
    update(Codetemplate);
    Run();
  }
});

function Run() {

  let Code = document.getElementById("editing-html").value;
  let outputmobile = document.getElementById("if-mobile").contentWindow.document;
  let outputtablet = document.getElementById("if-tablet").contentWindow.document;
  let outputdesktop = document.getElementById("if-desktop").contentWindow.document;

  outputmobile.open();
  outputtablet.open();
  outputdesktop.open();

  outputmobile.write(Code);
  outputtablet.write(Code);
  outputdesktop.write(Code);

  outputmobile.close();
  outputtablet.close();
  outputdesktop.close();
}
function update(text) {
  let result_element = document.querySelector("#highlighting-content");
  if (text[text.length - 1] == "\n") {
    text += " ";
  }
  result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
  Prism.highlightElement(result_element);
}

function sync_scroll(element) {
  let result_element = document.querySelector("#highlighting");
  result_element.scrollTop = element.scrollTop;
  result_element.scrollLeft = element.scrollLeft;
}
function check_tab(element, event) {
  let code = element.value;
  if (event.key == "Tab") {
    event.preventDefault();
    let before_tab = code.slice(0, element.selectionStart);
    let after_tab = code.slice(element.selectionEnd, element.value.length);
    let cursor_pos = element.selectionEnd + 1;
    element.value = before_tab + "\t" + after_tab;
    element.selectionStart = cursor_pos;
    element.selectionEnd = cursor_pos;
    update(element.value);
  }
}


function code_copy() {
  document.getElementById("editing-html").select();
  document.execCommand('copy');
  Swal.fire(
    {
      title: "Copy",
      icon: "success",
      animation: true,
      showConfirmButton: false,
      timer: 1200
    }
  );

}
function code_delete() {
  document.getElementById("editing-html").select();
  document.execCommand('delete');

}
function copy_color() {
  let colorInput = document.querySelector('#color').value;
  navigator.clipboard.writeText(colorInput);
}


function save_browser() {
  Code = document.getElementById("editing-html").value;
  localStorage.setItem("code", Code);
  Swal.fire(
    {
      title: "Save ",
      icon: "success",
      animation: true,
      showConfirmButton: false,
      timer: 1200
    });
}
function load_code() {
  var code = localStorage.getItem("code");
  document.getElementById("editing-html").value = code;
  update(code);
}

function impressum(){
  Swal.fire({
    title: "<h1 id='titel'>Impressum</h1>", 
    html: "<div class='impressum'><h3>WebEditor</h3><p id='gray-color'>Angaben gemäß § 5 TMG </p><p>Anschrift: <b>Mohamad Naser Alnakeshbandi</b></p><p> Yorkstraße 13   <br> 75177 Pforzheim <br> </p><p>Telefon: +49 15164657673 </br>E-Mail: <a href='mailto:mhmdn1381@gmail.com'>mhmdn1381@gmail.com</a></p></div>",  
    confirmButtonText: "close", 
  });
}

function support(){
  Swal.fire({
    title: "<h1id='titel'>Help</h1>", 
    html: "<div id='dialog'<p>Press F2 to generate a Code template</p><p><i class='fas fa-play'></i> Run code</p><p><i class='fa-solid fa-copy'></i> Copy code</p><p><i class='fas fa-palette'></i> Select a color</p><p><i class='fas fa-trash-alt'></i> Delete code</p><p><i class='fa-solid fas fa-bookmark'></i> Save code in the browser</p><p><i class='fas fa-upload'></i> Upload code</p><p><i class='fa-solid fa-download'></i> Download code</p> </div>",  
    confirmButtonText: "close", 
  });
}
function copy_picker(){
  Swal.fire({
    title: "<h1 id='titel'>Color picker</h1>", 
    html: "<div id='color_dialog' title='Color dialog'><input type='color' name='' id='color' /> <button onclick='copy_color()'>Copy Color Code</button></div>    ",  
    showConfirmButton: false,
  });
}