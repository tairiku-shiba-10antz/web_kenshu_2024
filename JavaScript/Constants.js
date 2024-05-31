//#region MinoData
const MAIN_BLOCK_SIZE = 30;
const MAIN_BLOCK_INLINE_SIZE = 18;

const SUB_BLOCK_SIZE = 24;
const SUB_BLOCK_INLINE_SIZE = 14.4;
const MINO_SIZE = 4;

const MINO_QUEUE_NUM = 4;

const MINO_COLORS = [
    "#fff",//0-NULL-
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
//#endregion

//#region FieldData
const FIELD_COLUMN = 10;
const FIELD_ROW = 22;

const SCREEN_WIDTH = MAIN_BLOCK_SIZE * FIELD_COLUMN;
const SCREEN_HEIGHT = MAIN_BLOCK_SIZE * FIELD_ROW;

const HOLD_CANVAS_SIZE = (MINO_SIZE + 1) * SUB_BLOCK_SIZE;

const NEXT_CANVAS_WIDTH = HOLD_CANVAS_SIZE;
const NEXT_CANVAS_HEIGHT = HOLD_CANVAS_SIZE * MINO_QUEUE_NUM;

const START_POS_X = (FIELD_COLUMN - MINO_SIZE) / 2;
const START_POS_Y = 0;
//#endregion

//#region TitleData
const TITLE_MAIN_CANVAS_WIDTH = 1200;
const TITLE_MAIN_CANVAS_HEIGHT = 300;
//#endregion

//#region AudioData
const BGM = new Audio('../Resource/BGM/tetrisBGM.mp3');
const MAX_BGM_SPEED = 2;
BGM.loop = true;

const rotateSE = new Audio('../Resource/SE/rotateSE.mp3');
const dropSE = new Audio('../Resource/SE/dropSE.mp3');
const completeLineSE = new Audio('../Resource/SE/completeLineSE.mp3');
completeLineSE.volume = 0.5;
//#endregion

//#region SystemData
const DEFAULT_GAME_SPEED = 500;
const MAX_GAME_SPEED = 200;
const UP_GAME_SPEED = 50;

const SPEEDUP_INTERVAL = 6;
//#endregion