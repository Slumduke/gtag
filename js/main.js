// document.addEventListener("keyup", function(event) {
//     if (event.code === 'Enter') {
//         $("body").load("terminal.html");
//     }
// });

$(document).ready(function(){
    $(document).keyup(function(key){
        if (key.which === 13) {
            $("body").load("terminal.html");
        }
    })
})
