import React from 'react'
import Cell from '../Cell'

const Row = ({ pieces, rowIndex, width, height, onDrag, onDrop }) => (
    <div className="row" style={{ height }}>
      { 
        pieces.map((piece, i) => (
          <Cell
            key={`row-${rowIndex}-col-${i}`}
            width={width}
            height={height}
            piece={piece}
            onDrag={onDrag}
            onDrop={onDrop}
            cellX={rowIndex}
            cellY={i}
          />
        ))
      }
    </div>
  )

export default Row