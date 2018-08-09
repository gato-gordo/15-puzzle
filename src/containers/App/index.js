import React, { Component} from 'react'
import Puzzle from '../../services/Puzzle'
import Fetch from '../../services/Fetch'

class App extends Component {
  static isGoodTarget (srcIdx, targetIdx) {
    return targetIdx === srcIdx + 1 ||
      targetIdx === srcIdx - 1 ||
      targetIdx === srcIdx + 4 ||
      targetIdx === srcIdx - 4
  }
  constructor (props) {
    super(props)
    this.state = {
      puzzleInPlay: []
    }
  }
  async componentDidMount () {
    this.puzzle = new Puzzle(await Fetch.randomImg())
    await this.puzzle.slice()
    this.puzzle.shuffle()
    this.setState({
      puzzleInPlay: this.puzzle.startModel,
      beingDragged: null,
    })
  }
  onDrag (idxToVacate) {
    this.setState({
      beingDragged: idxToVacate
    })
  }
  onDrop (idxToFill) {
    const { beingDragged: idxToVacate, puzzleInPlay } = this.state
    if (App.isGoodTarget(idxToVacate, idxToFill)) {
      const newPuzzle = puzzleInPlay.slice()
      newPuzzle[idxToFill] = newPuzzle[idxToVacate]
      newPuzzle[idxToVacate] = null
      this.setState({
        puzzleInPlay: newPuzzle,
        beingDragged: null,
      }, () => {
        if (this.puzzle.isSolved(this.state.puzzleInPlay)) {
          alert('solved!')
        }
      })
    }
  }
  renderRow (start) {
    const cells = []
    for (let i = start; i < start + 4; i++) {
      const puzzlePiece = this.state.puzzleInPlay[i]
      cells.push(
        <div 
          className="cell" 
          key={`cell-${i}`} 
          style={{
            display: 'inline-block',
            width: 100,
            height: 100,
          }} 
        >
           <img
              onDrop={(e) => {
                e.preventDefault()
                if (!puzzlePiece) {
                  this.onDrop(i)
                }
              }}
              onDragOver={(e) => {
                e.preventDefault()
              }}
              onDrag={(e) => {
                e.preventDefault()
                this.onDrag(i)
              }}
              draggable={ puzzlePiece ? true : false /* don't allow drag of blank */}
              src={puzzlePiece} 
              width="100" 
              height="100"
              style={{
                cursor: 'pointer'
              }}
            />
        </div>
      )
    }
    return (
      <div className="row" style={{ height: 100 }}>
        { cells }
      </div>
    )
  }
  render() {
    if (this.state.puzzleInPlay.length < 15) {
      return <div />
    }
    return (
      <div className="grid">
        {
          this.renderRow(0)
        }
        {
          this.renderRow(4)
        }
        {
          this.renderRow(8)
        }
        {
          this.renderRow(12)
        }
      </div>
    )
  }
}

export default App