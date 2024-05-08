$(document).ready(function() {
    let mainCanvas = document.getElementById("titleMain");
    let mainContext = mainCanvas.getContext("2d");
    mainCanvas.width = TITLE_MAIN_CANVAS_WIDTH;
    mainCanvas.height = TITLE_MAIN_CANVAS_HEIGHT;

    for(let y = 0; y < TITLE_MAIN_CANVAS_HEIGHT / MAIN_BLOCK_SIZE; y++) {
        for(let x = 0; x < TITLE_MAIN_CANVAS_WIDTH / MAIN_BLOCK_SIZE; x++) {
            DrawBlock(
                mainContext,
                x, y,
                Math.floor(Math.random() * MINO_TYPES.length),
                MAIN_BLOCK_SIZE, MAIN_BLOCK_INLINE_SIZE);
        }
    }
});