import React from "react";

function Square({ clickedArray, handleClick }) {
    return (
        <div className="board">
            {clickedArray.map((item, index) => {
                return (
                    <div key={index} className="square" onClick={handleClick}></div>
                );
            })}
        </div>
    )
}

export default Square;