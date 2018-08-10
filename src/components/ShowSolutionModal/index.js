import React from 'react'
import ModalWrapper from '../ModalWrapper'
import ModalClose from '../ModalClose'

const ShowSolutionModal = (props) => (
  <ModalWrapper {... props} title="Completed Picture Puzzle" width={700}>
    <article>
      <span style={{ float: 'right'}}><ModalClose onClose={props.onClose} /></span>
      <header>
        <h1 style={{ textAlign: 'center' }}>Completed Picture Puzzle</h1>
      </header>
      <div>
        <img
          style={{ display: 'block', margin: '0 auto'}}
          height="500"
          src={props.srcUrl}
          alt="Completed Picture Puzzle"
        />
      </div>
    </article>
  </ModalWrapper>
)

export default ShowSolutionModal