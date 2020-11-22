import React from 'react';
// @ts-ignore
import Rodal from 'rodal';
import noScroll from 'no-scroll';

import { StoreContext } from './Store';

const Modal = () => {
  const { isModalOpen, closeModal, modalContent } = React.useContext(StoreContext);

  const handleModalClose = () => {
    if (closeModal) closeModal();
  }

  React.useEffect(() => {
    if (isModalOpen) {
      noScroll.on()
    }
    return () => noScroll.off()
  })

  return (
    <Rodal
      visible={isModalOpen}
      onClose={() => handleModalClose()}
      customStyles={{
        width: 'auto',
        height: 'auto',
        overflowY: 'auto'
      }}
    >
      {modalContent}
    </Rodal>
  )
}

export default Modal;
