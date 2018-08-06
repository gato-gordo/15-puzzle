import React, { Component} from 'react'
import Puzzle from '../../services/Puzzle'
import Fetch from '../../services/Fetch'

class App extends Component {
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
      puzzleInPlay: puzzle.startModel
    })
  }
  render() {
    if (this.state.puzzleInPlay.length < 15) {
      return <div />
    }
    return (
      <div>
        <div>
        <img id="img-0" src={this.state.puzzleInPlay[0]} width="200" height="200" />
        <img id="img-1" src={this.state.puzzleInPlay[1]} width="200" height="200" />
        <img id="img-2" src={this.state.puzzleInPlay[2]} width="200" height="200" />
        <img id="img-3" src={this.state.puzzleInPlay[3]} width="200" height="200" />
      </div>
      <div>
        <img id="img-4" src={this.state.puzzleInPlay[4]} width="200" height="200" />
        <img id="img-5" src={this.state.puzzleInPlay[5]} width="200" height="200" />
        <img id="img-6" src={this.state.puzzleInPlay[6]} width="200" height="200" />
        <img id="img-7" src={this.state.puzzleInPlay[7]} width="200" height="200" />
      </div>
      <div>
        <img id="img-8" src={this.state.puzzleInPlay[8]} width="200" height="200" />
        <img id="img-9" src={this.state.puzzleInPlay[9]} width="200" height="200" />
        <img id="img-10" src={this.state.puzzleInPlay[10]} width="200" height="200" />
        <img id="img-11" src={this.state.puzzleInPlay[11]} width="200" height="200" />
      <div>
      </div>
        <img id="img-12" src={this.state.puzzleInPlay[12]} width="200" height="200" />
        <img id="img-13" src={this.state.puzzleInPlay[13]} width="200" height="200" />
        <img id="img-14" src={this.state.puzzleInPlay[14]} width="200" height="200" />
      </div>
    </div>
    )
  }
}

export default App