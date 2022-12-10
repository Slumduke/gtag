var rooms = {
    "start": {
        "name": "the observatory",
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
        "description": "You are in the observatory. The viewing window is closed. In a corner sits a desk that is littered with <b>papers</b>. A worn out <b>jacket</b> is laying on the ground. There is an exit to the east and a staircase to the west.",
        "directions": {
            "east": "clearing1",
            "west": "pier" 
        },
    },
    "pier": {
        "name": "the pier",
        "description": "You are in the pier. Nothing is in this room but the telescope. The exit is east.",
        "directions": {
            "east": "start"
        },
        "items": {

        },
    },
    "clearing1": {
        "name": "a hilltop",
        "description": "It is dark out. You are atop a large hill. There is a storage shed to the north; it is locked from the inside. Maybe you could open it if you had a key. A misty path leads down the hill to the south.",
        "directions": {
            "west": "start",
            "south": "basecamp",
        },
        "items": {

        },
    },
    "shed": {
        "name": "a storage shed",
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
        "description": "base camp",
        "directions": {
            "north": "clearing1",
        },
        "items": {

        },
    },
}

var commands = [
    "go [direction] - travel north, south, east, or west",
    "look - describe surroundings",
    "clear - clear terminal history",
    "inventory - list items in inventory",
    "use [item] - use specified item from inventory",
    "talk [NPC] - talk to specified NPC",
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