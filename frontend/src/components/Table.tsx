import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { Partner, PartnersData } from '../lib/types';
import { DELETE_PARTNER, GET_PARTNERS } from '../graphql/partner';

import { StoreContext } from './Store';

import PartnerForm from './PartnerForm';

const Table = () => {
  const { openModal } = React.useContext(StoreContext);

  const {
    data: partners,
    loading: partnersLoading,
    error: partnersError,
    refetch: partnersRefetch,
  } = useQuery<PartnersData>(GET_PARTNERS, {
    pollInterval: 5000,
  });
  
  const [deletePartner, {
    loading: deletePartnerLoading,
    error: deletePartnerError
  }] = useMutation(DELETE_PARTNER);

  // Remove __typename
  const tableHeaders = partners ? Object.keys(partners?.partners[0]).slice(1) : [];

  const handleEditPartner = (id: number) => {
    if (openModal) openModal(<PartnerForm id={id} />);
  }

  const handleDeletePartner = async (name: string, id: number) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Delete user: ${name} (id: ${id})`);

    if (result) {
      await deletePartner({
        variables: {
          id,
        }
      });
      await partnersRefetch();
    }
  }

  if (partnersLoading) {
    return (
      <p>Loading</p>
    )
  }

  if (partnersError) {
    return (
      <>
        <p>error</p>
        <p>
          {
            JSON.stringify({
              partnersError
            }, null, 2)
          }
        </p>
      </>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="table-dark">
          <tr>
            {
              tableHeaders.map((header) => <th key={header} scope="col">{header}</th>)
            }
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {
            partners?.partners.map((row: Partner) => {
              return (
                <tr key={`${row.id}_${row.name}`}>
                  <th>{row.id}</th>
                  <td>{row.name}</td>
                  <td>{row.companyType?.name}</td>
                  <td>{row.taxNumber}</td>
                  <td>{row.companyRegistrationNumber}</td>
                  <td>{row.city.name}</td>
                  <td>{row.address}</td>
                  <td>{row.phoneNumber}</td>
                  <td>{row.bankAccountNumber}</td>
                  <td>{row.comment?.substr(0, 50)}...</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => handleEditPartner(row.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDeletePartner(row.name, row.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table;
