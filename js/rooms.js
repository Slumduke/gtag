var rooms = {
    "start": {
        "name": "the observatory",
        "image": "assets/images/obs.jpeg",
        "items": {
            "papers": {
                "canGrab": true,
                "name": "papers",
                "description": 'The papers are littered with technical jargon. The phrases "Artificial general intelligence" and "singularity" stand out.',
            },
            "jacket": {
                "canGrab": false,
                "name": "jacket",
                "description": 'The right sleeve is embroidered with a patch labeled "AGI Research Labs." There is a <b>key</b> inside the flap pocket.'
            },
            "key": {
                "canGrab": true,
                "name": "key",
                "description": 'A silver key. What does it open?'
            }
        },
        "description": "You are in the observatory. The viewing window is closed. In a corner sits a desk that is littered with <b>papers</b>. A worn out <b>jacket</b> is laying on the ground.",
        "directions": {
            "east": "clearing1", 
        },
    },
    "clearing1": {
        "name": "a hilltop",
        "image": "assets/images/clearing.jpeg",
        "description": "It is middle of the day. You are atop a large hill. There is a storage shed to the north; it is locked from the inside. Maybe you could open it if you had a key. A misty path leads down the hill to the south.",
        "directions": {
            "west": "start",
            "south": "basecamp",
        },
        "items": {

        },
    },
    "shed": {
        "name": "a storage shed",
        "image": "assets/images/shed.jpeg",
        "description": "It is dark and musty. The room is lit by a single bulb. The light reveals a <b>workbench</b> sitting in the middle of the room.",
        "directions": {
            "south": "clearing1"
        },
        "items": {
            "workbench": {
                "canGrab": false,
                "name": "workbench",
                "description": 'It is clear someone was in a hurry. The tools on the workbench have been rummaged. On the floor, underneath the bench, lies a <b>keycard</b>.'
            },
            "keycard": {
                "canGrab": true,
                "name": "keycard",
                "description": 'The keycard is blue and made of metal. It is labeled "AGI LABS LEVEL 3."'
            },
        },
    },
    "basecamp": {
        "name": "a basecamp",
        "image": "assets/images/basecamp.webp",
        "description": "You are surrounded by lots of tents. There is a <b>backpack</b> sitting on the floor near the entrance to the main tent. You can barely make out a tower to the west. The east is blocked by a large fence. There is a <b>gate</b>.",
        "directions": {
            "north": "clearing1",
            "west": "watchtower",
            "south": "helipad",
        },
        "items": {
            "gate": {
                "canGrab": false,
                "name": "gate",
                "description": 'You walk to the gate. It looks like there is a card reader.'
            },
            "backpack": {
                "canGrab": false,
                "name": "backpack",
                "description": 'The backpack is worn and unwearable. Inside is a <b>letter</b> and a <b>handgun</b>.'
            },
            "letter": {
                "canGrab": true,
                "name": "letter",
                "description": 'The letter reads: SOMETHING HAS GONE WRONG WITH THE EXPERIMENT. I OVERHEARD SOMEONE SAY WE FINALLY ACHIEVED GENERAL INTELLIGENCE. ARMED GUARDS HAVE BEEN EVACUATING THE FACILITY. I DO NOT KNOW WHERE THEY ARE TAKING US. SOMETHING IS WRONG. '
            },
            "handgun": {
                "canGrab": true,
                "name": "handgun",
                "description": 'The handgun is in working condition. You check the magazine; it is empty.'
            },
        },
    },
    "watchtower": {
        "name": "a watchtower",
        "image": "assets/images/watchtower.jpeg",
        "description": "The watchtower overlooks the mountain; there is lots of fog. You see a helipad south of the basecamp. There is a <b>map</b> on the inside.",
        "directions": {
            "east": "basecamp"
        },
        "items": {
            "map": {
                "canGrab": true,
                "name": "map",
                "description": 'The map details the entire outdoor section of the facility. You notice the map pays special attention to the laboratory.'
            },
        },
    },
    "checkpoint": {
        "name": "a checkpoint",
        "image": "assets/images/checkpoint.jpeg",
        "description": "There are armored vehicles parked next to the gate entrance. There is an armory to the north. To the east is a road that leads into the mountain. A sign next to it reads: LABORATORY.",
        "directions": {
            "west": "basecamp",
            "east": "laboratory",
            "north": "armory",
        },
        "items": {

        },
    },
    "armory": {
        "name": "an armory",
        "image": "assets/images/armory.webp",
        "description": "The armory is a mess. The weapon cabinets are empty except for one red box of <b>ammo</b>.",
        "directions": {
            "south": "checkpoint",
        },
        "items": {
            "ammo": {
                "canGrab": true,
                "name": "ammo",
                "description": 'It is a box of 9mm ammunition.'
            },
        },
    },
    "laboratory": {
        "name": "a laboratory",
        "image": "assets/images/laboratory.webp",
        "description": "There are rows of computers. An armed guard is stationed at a door to the south. He does not see you.",
        "directions": {
            "west": "checkpoint"
        },
    },
    "room2": {
        "name": "a strange room",
        "image": "assets/images/room2.jpeg",
        "description": "The room is ominous and dimly lit. There is a <b>computer</b> in the middle of the room. ",
        "directions": {
            "north": "laboratory"
        },
        "items": {
            "computer": {
                "canGrab": false,
                "name": "computer",
                "description": 'The computer lists lots of options, one of them reads: helicopter.'
            },
        },
    },
    "helipad": {
        "name": "a helipad",
        "image": "assets/images/helipad.webp",
        "description": "There is a <b>helicopter</b> in the middle of the helipad.",
        "directions": {
            "north": "basecamp"
        },
        "items": {
            "helicopter": {
                "canGrab": false,
                "name": "helicopter",
                "description": 'The helicopter appears fully operational. Maybe you can use this to escape.'
            },
        },
    },
}

var commands = [
    "go [direction] - travel north, south, east, or west",
    "look - describe surroundings",
    "clear - clear terminal history",
    "inventory - list items in inventory",
    "use [item] - use specified item from inventory",
    "examine [item] - describe specified item in more detail (must be in current room)",
    "grab [item] - add specified item to inventory"
]

var outsideMap = 
`
+------------------------------------------------------------------------------------+
|                                                                                    |
|                         +------------+                                             |
|                         |Storage Shed|                                             |
|                         +------+-----+                                             |
|                                |                                                   |
|                                |                                                   |
|                                |                                                   |
| +-----------+              +---+---+                                               |
| |Observatory+--------------+Hilltop|                                               |
| +-----------+              +---+---+                                               |
|                                |                                                   |
|                                |                                                   |
|                                |                                                   |
|                                |                                                   |
|     +----------+          +----+----+           +----------+          +----------+ |
|     |Watchtower+----------+Base Camp+-----------+Checkpoint+----------+Laboratory| |
|     +----------+          +----+----+           +----------+          +----------+ |
|                                |                                                   |
|                                |                                                   |
|                                |                                                   |
|                            +---+---+                                               |
|                            |Helipad|                                               |
|                            +-------+                                               |
|                                                                                    |
+------------------------------------------------------------------------------------+
`