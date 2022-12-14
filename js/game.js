var currentRoom = "start";
var main = $('#main')
var invalidCounter = 0
var inventory = [];
var descriptions = [];
var loaded = false;
var helicopter = false;
var guardDead = false;

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
    } else if (rooms[currentRoom].directions[dir] == undefined && rooms[currentRoom].name === "a laboratory" && guardDead === false) {
        $("body").load("guard.html");
    } else {
        print("You can not go " + dir)
    }
}

function look() {
    if (rooms[currentRoom].image !== undefined) {
        showImage(rooms[currentRoom].image, 500, 300, "image")
    }
    print(rooms[currentRoom].description);
}

function examine(item) {
    if (rooms[currentRoom].items[item] !== undefined) {
        print(rooms[currentRoom].items[item].description)
    }  else {
        print("Not a valid item")
    }
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

function use(item) {
    //print('test')
    if (inventory.includes(item) === true && item === 'key' && rooms[currentRoom].name === 'a hilltop') {
        print('You unlock the storage shed.')
        rooms[currentRoom].directions.north = "shed";
    } else if (inventory.includes(item) === true && item === 'map') {
        printMap(outsideMap)
    } else if (inventory.includes(item) === true && item === 'keycard' && rooms[currentRoom].name === 'a basecamp') {
        print('You scan the keycard at the gate. The console replies: ACCESS GRANTED')
        rooms[currentRoom].directions.east = "checkpoint";
    } else if (inventory.includes(item) === true && item === 'ammo') {
        print('You load the handgun with the 9mm ammo.')
        loaded = true
    } else if (inventory.includes(item) === true && item === 'handgun' && loaded === true && rooms[currentRoom].name === 'a laboratory') {
        print('You fire the gun at the guard. He falls dead.')
        guardDead = true;
        rooms[currentRoom].directions.south = "room2";
    } else if (inventory.includes(item) === true && item === 'handgun' && loaded === false && rooms[currentRoom].name === 'a laboratory') {
        print('The gun is not loaded.')
    } else if (item === 'computer' && rooms[currentRoom].name === 'a strange room') {
        print('You navigate to the helicopter option and disable the override. The computer responds: HELICOPTER ACTIVE')
        helicopter = true
    } else if (item === 'helicopter' && rooms[currentRoom].name === 'a helipad' && helicopter === true) {
        $("body").load("win.html");
    } else if (item === 'helicopter' && rooms[currentRoom].name === 'a helipad' && helicopter === false) {
        print('You enter the helicopter and attempt to turn it on, it fails. The console reads: HELICOPTER OVERRIDE ACTIVE')
    } else {
        print('Can not use ' + item)
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
            look();
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
        case "use":
            var item = input.split(" ")[1];
            use(item);
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