import React from 'react'

const Cell = ({ width, height, onDrag, onDrop, piece, cellX, cellY }) => (
    <div 
        className="cell" 
        style={{
          cursor: 'pointer',
          height,
          width,
          display: 'inline-block'
        }} 
      >
        {
          piece ? 
        <img
          onDrag={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDrag(cellX, cellY)
          }}
          draggable={ piece ? true : false /* don't allow drag of empty cell */}
          style={{display: 'inline-block',}}
          src={piece}
        />
        :
        <div
          onDrop={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDrop(cellX, cellY)
          }}
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          style={{width: '100%', height: '100%'}}
        >
        </div>
        }
    </div>
  )

export default Cell