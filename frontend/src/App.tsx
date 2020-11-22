import React from 'react';

import Table from './components/Table';
import TableHeader from './components/TableHeader';
import Modal from './components/Modal';

const App = () => {
  return (
    <React.Fragment>
    <Modal />
    <div className="container pt-4">
      <div className="row align-items-center pb-4">
        <TableHeader />
      </div>
      <div className="row align-items-center">
        <div className="col-12">
          <Table />
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}

export default App;
