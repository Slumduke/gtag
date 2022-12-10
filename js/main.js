// document.addEventListener("keyup", function(event) {
//     if (event.code === 'Enter') {
//         $("body").load("terminal.html");
//     }
// });
var started = false
$(document).ready(function(){
    $(document).keyup(function(key){
        if (key.which === 13 && started === false) {
            console.log('check')
            $("body").load("terminal.html");
            started = true
        }
    })
})
