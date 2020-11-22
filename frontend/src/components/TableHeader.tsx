import React from 'react';

import { StoreContext } from './Store';

import PartnerForm from './PartnerForm';

const TableHeader = () => {
  const { openModal } = React.useContext(StoreContext);

  const handleModalOpen = () => {
    if (openModal) openModal(<PartnerForm />);
  }

  return (
    <>
      <div className="col">
        <h4>Partners</h4>
      </div>
      <div className="col-auto">
        <button className="btn btn-success" onClick={handleModalOpen}>New partner</button>
      </div>
    </>
  )
}

export default TableHeader;