import React, { useState } from "react";
import produce from "immer";
import "./App.css";

const numRows = 50;
const numColumns = 50;

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numColumns), () => 0));
    }
    return rows;
  });
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numColumns}, 20px)`,
      }}
    >
      {grid.map((rows, i) =>
        rows.map((col, j) => (
          <div
            // click sets value to 1 (alive). Immer 'produce' allows us to mutate a copy of the grid
            onClick={() => {
              const newGrid = produce(grid, (gridCopy) => {
                gridCopy[i][j] = 1;
              });
              setGrid(newGrid);
            }}
            key={`${i}-${j}`}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[i][j] ? "pink" : undefined,
              border: "solid 1px black",
            }}
          />
        ))
      )}
    </div>
  );
}

export default App;
