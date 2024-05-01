let gameSpeed = 1000;

let can = document.getElementById("can");
let con = can.getContext("2d");

can.width = SCREEN_WIDTH;
can.height = SCREEN_HEIGHT;
can.style.border = "4px solid #555";


let minoType = Math.floor(Math.random() * (MINO_TYPES.length - 1)) + 1;
let mino = MINO_TYPES[minoType];

let field = [];

let minoPosX = START_POS_X;
let minoPosY = START_POS_Y;

let gameOver = false;

Init();
DrawAll();

setInterval(DropMino, 1000);

function Init() {
    for (let y = 0; y < FIELD_ROW; y++) {
        field[y] = [];
        for (let x = 0; x < FIELD_COLUMN; x++) {
            field[y][x] = 0;
        }
    }
}

function DrawBlock(x, y, minoColorType) {
    let px = x * BLOCK_SIZE;
    let py = y * BLOCK_SIZE;

    con.fillStyle = MINO_COLORS[minoColorType];
    con.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);

    con.strokeStyle = "black";
    con.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);

    let drawMidDiff = (BLOCK_SIZE - BLOCK_INLINE_SIZE) / 2;
    con.strokeStyle = MINO_COLORS[minoColorType] + "#333";
    con.strokeRect(px + drawMidDiff, py + drawMidDiff, BLOCK_INLINE_SIZE, BLOCK_INLINE_SIZE);
}

function DrawField() {
    for (let y = 0; y < FIELD_ROW; y++) {
        for (let x = 0; x < FIELD_COLUMN; x++) {
            if (field[y][x]) {
               DrawBlock(x, y, field[y][x]);
            }
        }
    }
}

function CheckLine() {
    let lineCount = 0;
    for(let y = 0; y < FIELD_ROW; y++) {
        let flag = true;
        for(let x = 0; x < FIELD_COLUMN; x++) {
            if(!field[y][x]) {
                flag = false;
                break;
            }
        }

        if (flag) {
            lineCount++;

            for (let ny = y; ny > 0; ny--) {
                for (let nx = 0; nx < FIELD_COLUMN; nx++) {
                    field[ny][nx] = field[ny - 1][nx];
                }
            }
        }
    }
}

function DrawMino() {
    for(let y = 0; y < MINO_SIZE; y++) {
        for(let x = 0; x < MINO_SIZE; x++) {
            if(mino[y][x]) {
                DrawBlock(minoPosX + x, minoPosY + y, minoType);
            }
        }
    }
}

function DrawAll() {
    con.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    DrawField();
    DrawMino();

    if(gameOver) {
        let s = "GameOver";
        con.font = "40px 'MSゴシック'";
        let w = con.measureText(s).width;
        let x = SCREEN_WIDTH / 2 - w / 2;
        let y = SCREEN_HEIGHT / 2 - 20;
        con.lineWidth = 4;
        con.strokeText(s, x, y);
        con.fillStyle = "white";
        con.fillText(s, x, y);
    }
}

function CheckMove(mx, my, newMino) {
    if(newMino == undefined) {
        newMino = mino;
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

function Rotate() {
    let newMino = [];

    for (let y = 0; y < MINO_SIZE; y++) {
        newMino[y] = [];
        for (let x = 0; x < MINO_SIZE; x++) {
            newMino[y][x] = mino[MINO_SIZE - x - 1][y];
        }
    }

    return newMino;
}

function FixMino() {
    for (let y = 0; y < MINO_SIZE; y++) {
        for (let x = 0; x < MINO_SIZE; x++) {
            if(mino[y][x]) {
                field[minoPosY + y][minoPosX + x] = minoType;
            }
        }
    }
}

function DropMino() {
    if(gameOver) {
        return;
    }
    if(CheckMove(0, 1)) {
        minoPosY++;
    }
    else
    {
        FixMino();
        CheckLine();
        minoType = Math.floor(Math.random() * (MINO_TYPES.length - 1)) + 1;
        mino = MINO_TYPES[minoType];
        minoPosX = START_POS_X;
        minoPosY = START_POS_Y;

        if(!CheckMove(0, 0)) {
            gameOver = true;
        }
    }
    DrawAll();
}

document.onkeydown = function(e) {
    if(gameOver) {
        return;
    }

    switch(e.key)
    {
        case "ArrowLeft":
            if(CheckMove(-1, 0)) {
                minoPosX--;
            }
            break;
        case "ArrowUp":
            while (CheckMove(0, 1)) {
                minoPosY++;
            }
            break;
        case "ArrowRight":
            if (CheckMove(1, 0)) {
                minoPosX++;
            }
        DrawMino();
            break;
        case "ArrowDown":
            if (CheckMove(0, 1)) {
                minoPosY++;
            }
            break;
        case " "://Space
            let newMino = Rotate();

            if(CheckMove(0, 0, newMino)) {
            mino = Rotate();
            }
            break;
    }
    DrawAll();
}