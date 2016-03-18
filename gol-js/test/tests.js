describe('Game of Life', function() {

    function toBoards(boards) {
        boards.forEach(function(board) {
            for (var i = 0; i < board.length; i++) {
                for (var j = 0; j < board[i].length; j++) {
                    board[i][j] = {
                        value: !!board[i][j]
                    }
                }
            }
        });
        return boards;
    }

    describe('#nextState', function () {

        var boards = toBoards([
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [1, 1, 0],
                [0, 0, 0]
            ],
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 1, 0]
            ],
            [
                [1, 0, 1],
                [0, 1, 0],
                [1, 0, 1]
            ],
            [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ],
            [
                [1, 0, 0],
                [0, 0, 0],
                [0, 0, 1]
            ],
            [
                [1, 0, 1],
                [0, 0, 0],
                [1, 0, 1]
            ]
        ]);

        boards.forEach(function(board) {
            it('should evaluate next state as not active for ' + board, function () {
                assert.equal(false, nextState(board, 1, 1));
            });
        });
    });

    describe('#nextState', function () {

        var boards = toBoards([
            [
                [1, 1, 0],
                [0, 1, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [0, 1, 0],
                [1, 0, 1]
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1]
            ],
            [
                [1, 0, 0],
                [1, 1, 0],
                [1, 0, 0]
            ],
            [
                [1, 0, 0],
                [1, 0, 0],
                [1, 0, 0]
            ]
        ]);

        boards.forEach(function(board) {
            it('should evaluate next state as active for ' + board, function () {
                assert.equal(true, nextState(board, 1, 1));
            });
        });
    });
});