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
          const widthOfOnePiece = 200
          const heightOfOnePiece = 200
          const numColsToCut = 4
          const numRowsToCut = 4
          const imagePieces = []
          for(var x = 0; x < numColsToCut; ++x) {
            for(var y = 0; y < numRowsToCut; ++y) {
                var canvas = document.createElement('canvas');
                canvas.width = widthOfOnePiece;
                canvas.height = heightOfOnePiece;
                var context = canvas.getContext('2d');
                context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
                imagePieces.push(canvas.toDataURL());
            }
          }
          this.solutionModel = imagePieces.slice()
          this.solutionModel.pop() 
          resolve()
        }
      } catch (e) {
        reject(e)
      }
    })
  }
  shuffle () {
    const cloneModel = this.solutionModel.slice()
    for (var i = 0; i < 16; i++) {
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
