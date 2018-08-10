import React from 'react'
import Row from '../Row'

const PuzzleGrid = ({ width, height, puzzle, onDrag, onDrop }) => {
  return (
    <div className="puzzleGrid">
      {
        puzzle.map((rowPieces, rowIndex) => (
          <Row
            key={`row-${rowIndex}`} 
            pieces={rowPieces}
            onDrag={onDrag}
            onDrop={onDrop}
            rowIndex={rowIndex}
            width={width}
            height={height}
          />
        ))
      }
    </div>
  )}

export default PuzzleGrid
