$(document).ready(function() {
    console.log("ready!");
    $("#play").click(onPlayClick);
    $("#refresh").click(onRefreshClick);
    $("#shuffle").click(onShuffleClick);
    drawBoard();
});

var CARDINALITY_DEFAULT = 60;
var DELAY_DEFAULT = 1000;
var gameIsOn = false;
var board;
var boardCardinality = CARDINALITY_DEFAULT;
var gameId;

function drawBoard(cardinality) {
    cardinality = +cardinality;

    if (!cardinality) cardinality = CARDINALITY_DEFAULT;
    else if (cardinality < 10) cardinality = 10;
    else if (cardinality > 200) cardinality = 200;

    boardCardinality = cardinality;

    $("#board").remove();
    var table = $("<table id='board'></table>");
    for (var i = 0; i < cardinality; i++) {
        var row = $("<tr></tr>", {
            "class": "gol-row",
            "row-num": i
        });
        for (var j = 0; j < cardinality; j++) {
            var cell = $("<td></td>", {
                "class": "gol-col gol-col-" + ((j + i) % 2 ? 'even' : 'odd'),
                "col-num": j,
                on: {
                    click: onCellClick
                }
            });
            cell.appendTo(row);
        }
        row.appendTo(table);
    }
    $(".game").append(table);
    readBoard();
}

function onShuffleClick(event) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j].el.toggleClass("active", !!Math.floor(Math.random() + 0.5));
        }
    }
}

function onPlayClick(event) {
    gameIsOn ? pause() : play();
}

function toggleGameState(state) {
    gameIsOn = state;
    var icon = $("#play span");
    icon.toggleClass("glyphicon-play", !gameIsOn);
    icon.toggleClass("glyphicon-pause", gameIsOn);
    gameIsOn ? $("#shuffle").prop('disabled', true) : $("#shuffle").prop('disabled', false);;
}

function onRefreshClick(event){
    if (gameIsOn) {
        pause();
    }
    drawBoard($("#cardinality").val());
}

function onCellClick(event) {
    if (gameIsOn) return;
    $(event.target).toggleClass("active");
}

function play() {
    toggleGameState(true);
    readBoard();

    var delay = +$("#speed").val();
    delay = delay || DELAY_DEFAULT;
    gameId = setInterval(tick, delay);
}

function pause() {
    toggleGameState(false);
    clearInterval(gameId);
}

function readBoard() {
    board = [];
    $(".gol-row").each(function(){
        var rowNum = $(this).attr("row-num");
        board[rowNum] = [];

        $(".gol-col", this).each(function(){
            var colNum = $(this).attr("col-num");
            board[rowNum][colNum] = {
                el: $(this),
                value: $(this).hasClass("active")
            }
        });
    });
}

function tick() {
    nextBoard();
    updateBoard();
}

function nextBoard() {
    var next = [];
    for (var i = 0; i < board.length; i++) {
        next[i] = [];
        for (var j = 0; j < board[i].length; j++) {
            next[i][j] = {
                el: board[i][j].el,
                value: nextState(board, i, j)
            };
        }
    }
    board = next;
}

function nextState(board, rowIndex, colIndex) {
    var neighborsCount = 0;
    for (var i = rowIndex - 1; i <= rowIndex + 1; i++) {
        if (i < 0 || i >= boardCardinality) continue;
        for (var j = colIndex - 1; j <= colIndex + 1; j++) {
            if (j < 0 || j >= boardCardinality || (i == rowIndex && j == colIndex)) continue;
            if (board[i][j].value) {
                neighborsCount++;
            }
        }
    }
    return neighborsCount == 3 || (neighborsCount == 2 && board[rowIndex][colIndex].value);
}

function updateBoard() {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j].el.toggleClass("active", board[i][j].value);
        }
    }
}