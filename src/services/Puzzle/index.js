
/**
 * Takes a src image into a constructor and 
 * provides the logic that view layer will lead
 * for starting and completing game play.
 */
class Puzzle {
  constructor ({ width, height, url }) {
    this.srcUrl = url
    this.sliceHeight = height / 4
    this.sliceWidth = width / 4
    this.pieceHeight = 125
    this.pieceWidth = 125 * (width / height)
    this.solutionModel = [[]]
    this.startModel = [[]]
  }
  /**
   * Uses the Canvas Web API to slice an image into 16 pieces.  Removes bottom right piece and stores
   * pieces in a 2-D array on puzzle instance as instance.solutionModel 
   * 
   * Logic in method adapted from https://stackoverflow.com/a/8913024
   */
  slice () {
    return new Promise((resolve, reject) => {
      try {
        const image = new Image()
        image.src = this.srcUrl
        image.crossOrigin='Anonymous'
        image.onload = () => {
          const imagePieces = [
            [],
            [],
            [],
            []
          ]
          for(let x = 0; x < 4; ++x) {
            for(let y = 0; y < 4; ++y) {
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
                context.drawImage(
                  image, 
                  x * this.sliceWidth, 
                  y * this.sliceHeight,
                  this.sliceWidth,
                  this.sliceHeight, 
                  0, 
                  0, 
                  this.pieceWidth,
                  this.pieceHeight, 
                )
                imagePieces[y][x] = canvas.toDataURL()
            }
          }
          this.solutionModel = imagePieces.map(row => row.slice())
          this.solutionModel[3][3] = null // set last piece to empty
          resolve()
        }
      } catch (e) {
        reject(e)
      }
    })
  }
  /**
   * Randomizes the pieces in the solutionModel to initialize game play.  Stores
   * initial puzzle in this.startModel
   */
  shuffle () {
    const toShuffle = this.solutionModel.reduce((flattened, row) => flattened.concat(row), [])
    const shuffled = []
    for (let x = 0; x < 16; x++) {
      const randomIndex = Math.floor(Math.random() * toShuffle.length)
      shuffled.push(toShuffle[randomIndex])
      toShuffle.splice(randomIndex, 1)
    }
    this.startModel = [
      shuffled.slice(0, 4),
      shuffled.slice(4, 8),
      shuffled.slice(8, 12),
      shuffled.slice(12)
    ]
  }
  /**
   * Guarantees 5-step, step-ladder solution
   */
  simplify () {
    const cloneModel = this.solutionModel.map(row => row.slice())
    cloneModel[3][3] = cloneModel[3][2]
    cloneModel[3][2] = cloneModel[2][2]
    cloneModel[2][2] = cloneModel[2][1]
    cloneModel[2][1] = cloneModel[1][1]
    cloneModel[1][1] = null
    this.startModel = cloneModel
  }
  /**
   * Takes a 2D array of pieces and tests if it matches the instance.solutionModel
   * piece for piece.  Returns boolean that determines if game has been solved.
   */
  isSolved (puzzleInPlay) {
    return this.solutionModel.every((row, r) => row.every((val, c) => val === puzzleInPlay[r][c]))
  }
}

export default Puzzle
