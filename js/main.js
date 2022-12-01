var i = 0;
var started = false
document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter' && i < 1 && started == false) {
        i++
        console.log('check')
        started == true
        $("body").load("terminal.html");
    }
});



