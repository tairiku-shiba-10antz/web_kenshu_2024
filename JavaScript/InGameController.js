//#region Variable Declaration
let gameSpeed = DEFAULT_GAME_SPEED;

let mainCanvas = document.getElementById("mainCanvas");
let mainCanvasContext = mainCanvas.getContext("2d");

mainCanvas.width = SCREEN_WIDTH;
mainCanvas.height = SCREEN_HEIGHT;

let holdCanvas = document.getElementById("holdCanvas");
let holdContext = holdCanvas.getContext("2d")
holdCanvas.width = HOLD_CANVAS_SIZE;
holdCanvas.height = HOLD_CANVAS_SIZE;

let nextCanvas = document.getElementById("nextCanvas");
let nextContext = nextCanvas.getContext("2d");
nextCanvas.width = NEXT_CANVAS_WIDTH;
nextCanvas.height = NEXT_CANVAS_HEIGHT;

let lineCountCanvas = document.getElementById("lineCount");

let field = [];

let currentMinoType = Math.floor(Math.random() * (MINO_TYPES.length - 1)) + 1;
let holdingMinoType;
let currentMino = MINO_TYPES[currentMinoType];

let minoTypeQueue = [];

let minoPosX = START_POS_X;
let minoPosY = START_POS_Y;

let pause = false;
let gameOver = false;

let flameCount = 0;
let fixCount = 0;
let lineCount = 0;
//#endregion

//#region Processing
$(document).ready(InitAll());

$(setInterval(Update, UP_GAME_SPEED));

//#endregion

//#region DynamicProcessing
$(window).keydown(function (e) {
    //Pauseは独立させた方が都合がいいのでif文で処理
    if(e.key == "Escape") {
        SwitchPause();
    }

    if (gameOver || pause) {
        return;
    }

    switch (e.key) {
        case "a":
        case "ArrowLeft":
            MoveMino(-1, 0);
            break;
        case "w":
        case "ArrowUp":
            while (MoveMino(0, 1));
            CheckGameOver();
            break;
        case "d":
        case "ArrowRight":
            MoveMino(1, 0);
            break;
        case "s":
        case "ArrowDown":
            MoveMino(0, 1);
            break;
        case "Enter":
        case " "://Space
            RotateMino();
            break;
        case "Shift":
            HoldMino();
            break;
        case "r":
            InitAll();
            break;
    }
    DrawAll();
});
//#endregion