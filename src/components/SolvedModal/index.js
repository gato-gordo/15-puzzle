import React from 'react'
import ModalWrapper from '../ModalWrapper'
import ModalClose from '../ModalClose'

const SolvedModal = (props) => (
  <ModalWrapper { ...props } title="You've Solved It!" width={300}>
    <article>
      <header>
        <span style={{ float: 'right'}}><ModalClose onClose={props.onClose} /></span>
        <h1 style={{ textAlign: 'center'}}>You've Solved It!</h1>
      </header>
      <div>
        <img
          style={{
            display: 'block',
            margin: '0 auto',
          }}
          height="300"
          src="https://media1.tenor.com/images/b1767be682ba2662dda5a09dcb86a3f0/tenor.gif?itemid=11572987"
          alt="Puzzle solver gif"
        />
      </div>
    </article>
  </ModalWrapper>
)

export default SolvedModal
