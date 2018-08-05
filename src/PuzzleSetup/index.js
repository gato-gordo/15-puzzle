import { fetchRandomImg } from '../UnsplashedClient'

export default class PuzzleSetup {
  constructor () {
    this.puzzleSrc = ''
    this.puzzleModel = []
  }
  async loadImage () {
    this.puzzleSrc = await fetchRandomImg()
  }
  cutPuzzle () {
  }
  arrangePuzzle () {
  }
}