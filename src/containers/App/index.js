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
    const puzzle = new Puzzle(await Fetch.randomImg())
    await puzzle.slice()
    puzzle.shuffle()
    this.setState({
      puzzleInPlay: puzzle.startModel,
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
                this.onDrop(i)
              }}
              onDragOver={(e) => {
                e.preventDefault()
              }}
              onDrag={(e) => {
                e.preventDefault()
                this.onDrag(i)
              }}
              draggable 
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
      <div className="row">
        { cells }
      </div>
    )
  }
  render() {
    if (this.state.puzzleInPlay.length < 15) {
      return <div />
    }
    return (
      <div class="grid">
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