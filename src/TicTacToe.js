import React, { useState } from "react";

import Square from "./Square";
import EndGame from "./EndGame";

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
    const [player, setPlayer] = useState(false); //預設o起手
    const [gameFinished, setGameFinished] = useState(false);
    const [draw, setDraw] = useState(false);
    const [winCount, setWinCount] = useState({ X: 0, O: 0, });

    const isGameOver = () => {
        //if game is not finish
        if(gameFinished === false) {
            console.log('1');
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
                    setWinCount({...winCount, X: winCount.X + 1});  //深拷貝
                    console.log('X win');
                    return;
                }
            }
            //O win check
            for(let i=0; i < 8; i++) {
                if (
                    grid[winCombination[i][0]] === O_PLAYER &&
                    grid[winCombination[i][1]] === O_PLAYER &&
                    grid[winCombination[i][2]] === O_PLAYER
                ) {
                    setGameFinished(true);
                    setWinCount({...winCount, O: winCount.O + 1});  //深拷貝
                    console.log('O win');
                    return;
                }
            }
        }
    }
    const restartGame = () => {
        //若重新開始遊戲，將狀態與表格恢復預設值
        setGrid(Array(9).fill(INITIAL));
        setGameFinished(false);
        setPlayer(false);
        setDraw(false);
    }

    const clearHistory = () => {
        setWinCount({ X: 0, O: 0, });
        restartGame();
    }

    isGameOver();

    const handleClick = (id) => {
        // console.log("click");
        setGrid(
            grid.map((item, index) => {
                if (index === id) {
                    if(player) {
                        console.log(player, X_PLAYER);
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
            { gameFinished && <EndGame clearHistory={clearHistory} winCount={winCount} restartGame={restartGame} player={player} draw={draw} /> }
            <Square clickedArray={grid} handleClick={handleClick} />
        </div>
    )
}

export default TicTacToe;