import React from 'react'
import ModalWrapper from '../ModalWrapper'
import ModalClose from '../ModalClose'

const { siteTitle } = CONFIG

const AboutModal = (props) => (
  <ModalWrapper { ...props } title={`About ${siteTitle}`} width={500} >
    <article>
      <header>
      <span style={{ float: 'right'}}><ModalClose onClose={props.onClose} /></span>
        <h1>About <i>{ siteTitle}</i></h1>
      </header>
      <p>
        This site provides a picture puzzle variation on the 
        classic <a href="https://en.wikipedia.org/wiki/15_puzzle" target="_blank" style={{ color: 'rgba(0, 0, 0, 0.85)' }}>15-puzzle</a>
        .  A new puzzle is generated from a random image divided into 16 pieces.  The bottom right-hand corner piece is 
        then removed and the remaining pieces, including the emptied slot, are shuffled to initiate game play.
      </p>
      <p> To solve the 15-puzzle, drag pieces vertically or horizontally adjacent to 
        the empty slot and drop them into it. When the puzzle is solved, the pieces will compose the original 
        source image with the empty slot in the bottom right-hand corner. 
      </p>
    </article>
  </ModalWrapper>
)

export default AboutModal
