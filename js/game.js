var currentRoom = "start";
var main = $('#main')
var invalidCounter = 0
var inventory = [];
var descriptions = [];

function print(text) {
    var p = document.createElement('p');
    p.innerHTML = text;
    $('#main').append(p);
    p.scrollIntoView();
}

function printMap(text) {
    var pre = document.createElement('pre');
    pre.innerHTML = text;
    $('#main').append(pre);
    pre.scrollIntoView();
}

function showHelp(text) { // there isn't really a point to having this be its own function I just needed a reason to use a for loop, wait separate description
    for (var i = 0; i < commands.length; i++) {
        print(commands[i])
    }
}

function showInv(text) { // there isn't really a point to having this be its own function I just needed a reason to use a for loop, wait separate description
    if (inventory.length !== 0) {
        for (var i = 0; i < inventory.length; i++) {
            print(inventory[i])
            // print(JSON.stringify(rooms[currentRoom].items[item]));
        }
    } else {
        print("Inventory is empty")
    }
}

function showImage(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    $('#main').append(img);
    $('#main').append("<br>");
}

function warn(text) {
    var p = document.createElement('p');
    p.className = "warn";
    p.innerHTML = "<span style='color: red;'>" + text + "</span>";
    $('#main').append(p);
    p.scrollIntoView();
}

function move(dir) {
    if (rooms[currentRoom].directions[dir] !== undefined /* and boolean value in the checkpoint is true or something*/) {
        currentRoom = rooms[currentRoom].directions[dir];
        print("You enter " + (rooms[currentRoom].name))
    } else {
        print("You can not go " + dir)
    }
}

function examine(item) {
    if (rooms[currentRoom].items[item] !== undefined) {
        print(rooms[currentRoom].items[item].description)
    } else if (inventory.includes(item)) {
        print(rooms.items[item].description)
    } else {
        print("Not a valid item")
    }
}

function toggleCrt() {
    //test
}

function grab(item) {
    if (rooms[currentRoom].items[item] !== undefined && rooms[currentRoom].items[item].canGrab == true && inventory.includes(item) !== true) {
        inventory.push(rooms[currentRoom].items[item].name);
        // inventory.push(rooms[currentRoom].items[item].description);
        print("added " + item + " to inventory")
    } else if (rooms[currentRoom].items[item] !== undefined && rooms[currentRoom].items[item].canGrab == false) {
        print("Can not grab " + item)
    } else if (inventory.includes(item) === true) {
        print(item + " is already in your inventory")
    } else {
        print("Not a valid item")
    }
}

function parseCommand(input) {
    var command = input.split(" ")[0];
    switch (command) {
        case "go":
            var dir = input.split(" ")[1];
            move(dir);
            break;
        case "help":
            showHelp()
            //print(commands.join('<br><br>'));
            break;
        case "clear":
            main.empty();
            break;
        case "look":
            print(rooms[currentRoom].description);
            break;
        case "map":
            // showImage(rooms[currentRoom].currentMap, 100, 100, "test");
            printMap(outsideMap)
            break;
        case "inventory":
            showInv();
            break;
        case "examine":
            var item = input.split(" ")[1];
            examine(item);
            break;
        case "grab":
            var item = input.split(" ")[1];
            grab(item);
            break;
        default:
            if (input === "" && invalidCounter >= 10 && invalidCounter <= 25) {
                print("Stop Spamming!")
            } else if (input === "" && invalidCounter >= 25 && invalidCounter <= 50) {
                warn("I AM WARNING YOU!!!")
            } else if (input === "" && invalidCounter >= 50) {
                $("body").load("why.html");
            } else {
                print("zsh: command not found: " + input.split(" ")[0])
        }
    }
}

$(document).ready(function(){
    $(document).keyup(function(key){
        if (key.which === 13) {
            var input = $('#input').val().toLowerCase();
            $('#input').val("");
            parseCommand(input)
        }
        if (input === "") {
        invalidCounter++
            console.log(invalidCounter)
        } else {
            invalidCounter = 0;
        }
    })
})

print('./gtag.sh')
print('G.T.A.G. v3.0')
print('G.T.A.G. is a text-based adventure game. It takes places in an abandoned research site. Your goal is to escape using a variety of text commands. If a word is highlighted in <b>blue</b> it usually means it can be interacted with. Type "help" for a list of commands.')