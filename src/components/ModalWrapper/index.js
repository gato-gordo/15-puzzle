import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#app')

const ModalWrapper = ({ open, onClose, theme, title, width, children }) => (
  <Modal
    isOpen={open}
    onRequestClose={onClose}
    contentLabel={title}
    style={{
      content: Object.assign({}, theme.modalStyle.content, {
        fontFamily: theme.fontFamily,
        fontSize: theme.textSize,
        color: theme.textColor,
        width,
      }),
      overlay: theme.modalStyle.overlay
    }}
  >
    { children }
  </Modal>
)

export default ModalWrapper
