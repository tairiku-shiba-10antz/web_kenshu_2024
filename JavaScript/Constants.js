//MinoData
const BLOCK_SIZE = 30;
const BLOCK_INLINE_SIZE = 18;
const MINO_SIZE = 4;

const MINO_COLORS = [
    "#000",//0-NULL-
    "#6cf",//1-I-LightBlue
    "#fa2",//2-L-Orange
    "#66f",//3-J-Blue
    "#c5c",//4-T-Purple
    "#fd2",//5-O-Yellow
    "#f44",//6-Z-Red
    "#5b5",//7-S-Green
]

const MINO_TYPES = [
    [//0-NULL

    ],
    [//1-I
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ],
    [//2-L
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [//3-J
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [//4-T
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
    ],
    [//5-O
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [//6-Z
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [//7-S
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
    ],
]

//FieldData
const FIELD_COLUMN = 10;
const FIELD_ROW = 20;

const SCREEN_WIDTH = BLOCK_SIZE * FIELD_COLUMN;
const SCREEN_HEIGHT = BLOCK_SIZE * FIELD_ROW;

const START_POS_X = (FIELD_COLUMN - MINO_SIZE) / 2;
const START_POS_Y = 0;