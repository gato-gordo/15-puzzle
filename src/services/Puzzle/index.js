class Puzzle {
  constructor (url) {
    this.srcUrl = url
    this.solutionModel = []
    this.startModel = []
  }
  slice () {
    return new Promise((resolve, reject) => {
      try {
        const image = new Image()
        image.src = this.srcUrl
        image.crossOrigin='Anonymous'
        image.onload = () => {
          const widthOfOnePiece = 100
          const heightOfOnePiece = 100
          const numColsToCut = 4
          const numRowsToCut = 4
          const imagePieces = []
          for(let x = 0; x < numColsToCut; ++x) {
            for(let y = 0; y < numRowsToCut; ++y) {
                const canvas = document.createElement('canvas');
                canvas.width = widthOfOnePiece;
                canvas.height = heightOfOnePiece;
                const context = canvas.getContext('2d');
                context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
                imagePieces.push(canvas.toDataURL());
            }
          }
          this.solutionModel = imagePieces.slice()
          this.solutionModel.splice(15, 1, null) // set last piece to empty
          resolve()
        }
      } catch (e) {
        reject(e)
      }
    })
  }
  shuffle () {
    const cloneModel = this.solutionModel.slice()
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * cloneModel.length)
      this.startModel[i] = cloneModel[randomIndex]
      cloneModel.splice(randomIndex, 1)
    }
  }
  isSolved (puzzleInPlay) {
    return this.solutionModel.every((img, idx) => img === puzzleInPlay[idx])
  }
}

export default Puzzle
