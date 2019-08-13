import React from "react";
import Button from "./Button";
import classnames from "classnames";

function Board({ squares, onClick, winnerLine }) {
  return (
    <div className="table">
      {(() => {
        const rows = [];

        squares.forEach((square, i) => {
          const classes = classnames("table-cell", {
            "table-cell__winner": winnerLine.includes(i)
          });

          const rowIndex = Math.floor(i / 3);

          if (!rows[rowIndex]) rows.push([]);

          rows[rowIndex].push(
            <Button className={classes} onClick={() => onClick(i)} key={i}>
              {square}
            </Button>
          );
        });

        return rows.map((row, i) => (
          <div className="table-row" key={i}>
            {row}
          </div>
        ));
      })()}
    </div>
  );
}

export default Board;
