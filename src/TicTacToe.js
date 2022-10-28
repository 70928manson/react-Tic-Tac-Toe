import React, { useState } from "react";

import Square from "./Square";

const INITIAL = "";
const X_PLAYER = "X";
const O_PLAYER = "O";
const winCombination = [
    //提供3個index，如果o或x在這些位置上，他就連成一條線
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

//點擊給他O 或 X  -> 判斷o x 用useState ?
//點擊完後重新render array
//判斷遊戲結束的邏輯

function TicTacToe() {
    const [grid, setGrid] = useState(Array(9).fill(INITIAL));
    const [player, setPlayer] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [draw, setDraw] = useState(false);

    const isGameOver = () => {
        //if game is not finish
        if(!gameFinished) {
            //draw check: 沒有空格
            if(!grid.includes(INITIAL)) {
                setDraw(true);
                setGameFinished(true);
                console.log("Draw");
            }
            //X win check
            for(let i=0; i < 8; i++) {
                if (
                    grid[winCombination[i][0]] === X_PLAYER &&
                    grid[winCombination[i][1]] === X_PLAYER &&
                    grid[winCombination[i][2]] === X_PLAYER
                ) {
                    setGameFinished(true);
                    console.log('x win');
                    return;
                }
            }
        }
    }

    isGameOver();

    const handleClick = (id) => {
        // console.log("click");
        setGrid(
            grid.map((item, index) => {
                if (index === id) {
                    if(player) {
                        return X_PLAYER;
                    }else {
                        return O_PLAYER;
                    }
                }else {
                    return item;
                }
            })
        )
        setPlayer(!player);
    }

    return (
        <div>
            <Square clickedArray={grid} handleClick={handleClick} />
        </div>
    )
}

export default TicTacToe;