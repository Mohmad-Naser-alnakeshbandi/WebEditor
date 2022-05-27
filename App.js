const frame = document.getElementById("output")
const textarea = document.getElementById("code")
function Run() {
    window.location.href = "#output";
    let Code = document.querySelector("#code").value;
    let output   = document.querySelector("#output");
    output.contentDocument.body.innerHTML= Code;

    if(Code.includes("<script>"))
    {
        console.log("JS");
        let InputCodeStart = Code.split("<script>");
        console.log(InputCodeStart[1]);
        let InputCodeEnd = InputCodeStart[1].split("</script>");
        console.log(InputCodeEnd[0]);
        output.contentWindow.eval(InputCodeEnd[0]);
    } 
}
function desktop_view()
{
    console.log("desktop_view");
    frame.style.width = "1900px"
    window.location.href = "#output";
}
function mobile_view()
{
    console.log("mobile_view");
    frame.style.width = "400px"
    window.location.href = "#output";
}
function tablet_view()
{
    console.log("tablet_view");
    frame.style.width = "800px"
    window.location.href = "#output";
}
function code_copy() {
   
    textarea.select();
    document.execCommand('copy');
    console.log('Copied Text');
}

    