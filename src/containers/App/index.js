import React, { Component} from 'react'
import { GridLoader } from 'react-spinners'
import Puzzle from '../../services/Puzzle'
import Fetch from '../../services/Fetch'
import PuzzleGrid from '../../components/PuzzleGrid'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SolvedModal from '../../components/SolvedModal'
import AboutModal from '../../components/AboutModal'
import ShowSolutionModal from '../../components/ShowSolutionModal'

const theme = {
  textColor: 'rgba(0,0,0,.65)',
  textSize: 16,
  font: '"Open Sans", sans-serif',
  modalStyle: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '5%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
    }
  }
}

class App extends Component {
  /**
   * Tests whether drop site is valid for piece
   */
  static isGoodTarget (source, target) {
    return source[0] - 1  == target[0] && source[1] === target[1] || // left
      source[0] + 1 === target[0] && source[1] === target[1] || // right
      source[0] === target[0] && source[1] + 1 === target[1] || // down
      source[0] === target[0] && source[1] - 1 === target[1] // up
  }
  constructor (props) {
    super(props)
    this.state = {
      puzzleInPlay: [],
      pieceHeight: 125,
      pieceWidth: 125,
      aboutOpen: false,
      solvedOpen: false,
      showSolutionOpen: false,
    }
    this.onDrag = this.onDrag.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.renderEasy = this.renderEasy.bind(this)
    this.loadNewPuzzle = this.loadNewPuzzle.bind(this)
  }
  componentDidMount () {
    this.loadNewPuzzle()
  }
  async loadNewPuzzle () {
    this.setState({
      puzzleInPlay: []
    })
    this.puzzle = new Puzzle(await Fetch.randomImg())
    await this.puzzle.slice()
    this.puzzle.shuffle()
    this.setState({
      pieceWidth: this.puzzle.pieceWidth,
      pieceHeight: this.puzzle.pieceHeight,
      puzzleInPlay: this.puzzle.startModel,
      beingDragged: null,
    })
  }
  renderEasy (){
    this.setState({
      puzzleInPlay: null,
    })
    this.puzzle.simplify()
    this.setState({
      puzzleInPlay: this.puzzle.startModel
    })
  }
  toggleModal (key, isOpen) {
    this.setState({
      [key]: isOpen
    })
  }
  onDrag (x, y) {
    this.setState({
      beingDragged: [x, y]
    })
  }
  onDrop (x, y) {
    const { beingDragged, puzzleInPlay } = this.state
    if (App.isGoodTarget(beingDragged, [x, y])) {
      const newPuzzle = puzzleInPlay.map(row => row.slice())
      newPuzzle[x][y] = newPuzzle[beingDragged[0]][beingDragged[1]]
      newPuzzle[beingDragged[0]][beingDragged[1]] = null
      this.setState({
        puzzleInPlay: newPuzzle,
        beingDragged: null,
      }, () => {
        if (this.puzzle.isSolved(this.state.puzzleInPlay)) {
          this.toggleModal('solvedOpen', true)
        }
      })
    }
  }
  render() {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        fontFamily: theme.font,
      }}>
        <Header
          theme={theme}
          aboutAction={this.toggleModal.bind(this,'aboutOpen', true)}
          newPuzzleAction={this.loadNewPuzzle}
          showSolutionAction={this.toggleModal.bind(this, 'showSolutionOpen', true)}
          makeEasyAction={this.renderEasy}
        />
        <div height={500}>
          <AboutModal
            theme={theme}
            open={this.state.aboutOpen}
            onClose={this.toggleModal.bind(this, 'aboutOpen', false)}
          />
          <SolvedModal
            theme={theme}
            open={this.state.solvedOpen} 
            onClose={this.toggleModal.bind(this, 'solvedOpen', false)}
          />
          <ShowSolutionModal
            theme={theme}
            open={this.state.showSolutionOpen}
            srcUrl={this.puzzle ? this.puzzle.srcUrl : '' }
            onClose={this.toggleModal.bind(this, 'showSolutionOpen', false)}
          />
          <GridLoader 
            color={theme.textColor}
            loading={!this.state.puzzleInPlay.length}
            size={100}
            loaderStyle={{
              margin: '75px auto',
            }}
          />
          <PuzzleGrid
            puzzle={this.state.puzzleInPlay} 
            onDrag={this.onDrag} 
            onDrop={this.onDrop}
            width={this.state.pieceWidth}
            height={this.state.pieceHeight}
          />
        </div>
        <Footer theme={theme} />
      </div>
    )
  }
}

export default App
