//#region SystemFunction
function Update() {
    DebugLogs();
    if (gameOver || pause) {
        return;
    }
    flameCount++;
    if(flameCount % (gameSpeed / UP_GAME_SPEED) == 0) {
        DropMino();
    }
}

function SwitchPause() {
    pause = !pause;

    DrawAll();
}

function DebugLogs() {
    console.log(flameCount);
    console.log(gameSpeed);
    console.log(BGM.playbackRate);
    for(let i = 0; i < MINO_QUEUE_NUM; i++) {
        console.log(MINO_TYPES[minoTypeQueue[i]]);
    }
}

function InitAndPlaySE(SE) {
    SE.pause();
    SE.currentTime = 0;
    SE.play();
}
//#endregion

//#region InitializeFunction
function InitAll() {
    InitField();
    InitMinoQueue();
    InitMino();
    DrawAll();
    gameOver = false;
    BGM.playbackRate = 1;
    flameCount = 0;
}

function InitField() {
    for (let y = 0; y < FIELD_ROW; y++) {
        field[y] = [];
        for (let x = 0; x < FIELD_COLUMN; x++) {
            field[y][x] = 0;
        }
    }
}

function InitMino(initPos = true) {
    currentMinoType = minoTypeQueue[0];
    currentMino = MINO_TYPES[currentMinoType];

    minoTypeQueue.shift();
    minoTypeQueue.push(Math.floor(Math.random() * (MINO_TYPES.length - 1)) + 1);

    if(initPos) {
        minoPosX = START_POS_X;
        minoPosY = START_POS_Y;
    }
}

function InitMinoQueue() {
    while(minoTypeQueue.length > 0) {
        minoTypeQueue.shift();
    }

    for(let i = 0; i < MINO_QUEUE_NUM; i++) {
        minoTypeQueue.push(Math.floor(Math.random() * (MINO_TYPES.length - 1)) + 1);
    }
}
//#endregion

//#region DrawFunction
function DrawString(str) {
    mainCanvasContext.font = "40px 'MSゴシック'";
    let w = mainCanvasContext.measureText(str).width;
    let x = SCREEN_WIDTH / 2 - w / 2;
    let y = SCREEN_HEIGHT / 2 - 20;
    mainCanvasContext.lineWidth = 4;
    mainCanvasContext.strokeText(str, x, y);
    mainCanvasContext.fillStyle = "white";
    mainCanvasContext.fillText(str, x, y);
}

function DrawBlock(context, x, y, minoColorType, blockSize, blockInlineSize, isGuessMino = false) {
    let px = x * blockSize;
    let py = y * blockSize;

    if(isGuessMino) {
        color = "#fff";
    }
    else {
        color = MINO_COLORS[minoColorType];
    }
    context.fillStyle = color;
    context.fillRect(px, py, blockSize, blockSize);
    if (minoColorType != 0) {
        context.lineWidth = 1;
        context.strokeStyle = "black";
        context.strokeRect(px, py, blockSize, blockSize);

        let drawMidDiff = (blockSize - blockInlineSize) / 2;
        context.strokeStyle = color + "#333";
        context.strokeRect(px + drawMidDiff, py + drawMidDiff, blockInlineSize, blockInlineSize);
    }
}

function DrawField() {
    for (let y = 0; y < FIELD_ROW; y++) {
        for (let x = 0; x < FIELD_COLUMN; x++) {
            if (field[y][x]) {
               DrawBlock(mainCanvasContext, x, y, field[y][x], MAIN_BLOCK_SIZE, MAIN_BLOCK_INLINE_SIZE);
            }
        }
    }
}

function DrawMino() {
    for(let y = 0; y < MINO_SIZE; y++) {
        for(let x = 0; x < MINO_SIZE; x++) {
            if(currentMino[y][x]) {
                DrawBlock(mainCanvasContext, minoPosX + x, minoPosY + y, currentMinoType, MAIN_BLOCK_SIZE , MAIN_BLOCK_INLINE_SIZE);
            }
        }
    }
}

function DrawGuessDropMino() {
    for(let i = 0; i < FIELD_ROW; i++) {
        if(!CheckMove(0, i)) {
            for (let y = 0; y < MINO_SIZE; y++) {
                for (let x = 0; x < MINO_SIZE; x++) {
                    if (currentMino[y][x]) {
                        DrawBlock(mainCanvasContext, minoPosX + x, minoPosY + y + i - 1, currentMinoType, MAIN_BLOCK_SIZE, MAIN_BLOCK_INLINE_SIZE, true);
                    }
                }
            }
            break;
        }
    }
}

function DrawHoldMino() {
    if(holdingMinoType == null) {
        return;
    }

    holdContext.clearRect(0, 0, HOLD_CANVAS_SIZE, HOLD_CANVAS_SIZE);

    for (let y = 0; y < MINO_SIZE; y++) {
        for (let x = 0; x < MINO_SIZE; x++) {
            if (MINO_TYPES[holdingMinoType][y][x]) {
                DrawBlock(holdContext, x + 1 / 2, y + 1 / 2, holdingMinoType, SUB_BLOCK_SIZE, SUB_BLOCK_INLINE_SIZE)
            }
        }
    }
}

function DrawMinoQueue() {
    if(minoTypeQueue.length < MINO_QUEUE_NUM) {
        return;
    }

    nextContext.clearRect(0, 0, NEXT_CANVAS_WIDTH, NEXT_CANVAS_HEIGHT);

    for(let i = 0; i < MINO_QUEUE_NUM; i++) {
        for(let y = 0; y < MINO_SIZE; y++) {
            for(let x = 0; x < MINO_SIZE; x++) {
                if(MINO_TYPES[minoTypeQueue[i]][y][x]) {
                    DrawBlock(nextContext, x + 1 / 2, y + i * (MINO_QUEUE_NUM + 1) + 1 / 2, minoTypeQueue[i], SUB_BLOCK_SIZE, SUB_BLOCK_INLINE_SIZE);
                }
            }
        }
    }
}

function DrawAll() {
    mainCanvasContext.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    DrawField();
    DrawGuessDropMino();
    DrawMino();
    DrawHoldMino();
    DrawMinoQueue();
    if(pause) {
        DrawString("Pause");
    }
    else if(gameOver) {
        DrawString("GameOver!");
    }
}
//#endregion

//#region MinoMovementFunction
function CheckMove(mx, my, newMino) {
    if(newMino == undefined) {
        newMino = currentMino;
    }

    for(let y = 0; y < MINO_SIZE; y++) {
        for(let x = 0; x < MINO_SIZE; x++) {
            if(newMino[y][x]) {
                let nx = minoPosX + mx + x;
                let ny = minoPosY + my + y;

                if (ny < 0 || nx < 0 || ny >= FIELD_ROW || nx >= FIELD_COLUMN || field[ny][nx]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function CheckLine() {
    let lineCount = 0;
    for (let y = 0; y < FIELD_ROW; y++) {
        let flag = true;
        for (let x = 0; x < FIELD_COLUMN; x++) {
            if (!field[y][x]) {
                flag = false;
                break;
            }
        }

        if (flag) {
            lineCount++;
            InitAndPlaySE(completeLineSE);
            for (let ny = y; ny > 0; ny--) {
                for (let nx = 0; nx < FIELD_COLUMN; nx++) {
                    field[ny][nx] = field[ny - 1][nx];
                }
            }
        }
    }
}

function CheckGameOver() {
    FixMino();
    CheckLine();
    InitMino();

    if (!CheckMove(0, 0)) {
        gameOver = true;
    }
}

function MoveMino(x, y) {
    let flag = CheckMove(x, y);
    if(flag) {
        minoPosX += x;
        minoPosY += y;
    }

    return flag;
}

function RotateMino() {
    let newMino = [];
    for (let y = 0; y < MINO_SIZE; y++) {
        newMino[y] = [];
        for (let x = 0; x < MINO_SIZE; x++) {
            newMino[y][x] = currentMino[MINO_SIZE - x - 1][y];
        }
    }

    if (CheckMove(0, 0, newMino)) {
        InitAndPlaySE(rotateSE);
        currentMino = newMino;
    }
}

function HoldMino() {
    if(holdingMinoType == null) {
        holdingMinoType = currentMinoType;
        InitMino(false);
    }
    else {
        let tmpMinoType = currentMinoType;
        currentMinoType = holdingMinoType;
        holdingMinoType = tmpMinoType;

        currentMino = MINO_TYPES[currentMinoType];
    }
    DrawAll();
}

function DropMino() {
    if(CheckMove(0, 1)) {
        minoPosY++;
    }
    else
    {
       CheckGameOver();
    }
    DrawAll();
}

function FixMino() {
    InitAndPlaySE(dropSE);
    for (let y = 0; y < MINO_SIZE; y++) {
        for (let x = 0; x < MINO_SIZE; x++) {
            if (currentMino[y][x]) {
                field[minoPosY + y][minoPosX + x] = currentMinoType;
            }
        }
    }

    fixCount++;

    if (fixCount % SPEEDUP_INTERVAL == 0 && gameSpeed > MAX_GAME_SPEED) {
        gameSpeed -= UP_GAME_SPEED;
        BGM.playbackRate = 1 + (fixCount / SPEEDUP_INTERVAL) / ((DEFAULT_GAME_SPEED - MAX_GAME_SPEED) / UP_GAME_SPEED) * (MAX_BGM_SPEED - 1);
    }
}
//#endregion