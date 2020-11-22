import React from 'react';
import { useFormik } from 'formik';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Yup from 'yup';

import { StoreContext } from './Store';
import { CitiesData, CompanyTypesData, PartnerData, PartnerVars } from '../lib/types';
import { CREATE_PARTNER, GET_PARTNER, UPDATE_PARTNER } from '../graphql/partner';
import { GET_CITIES } from '../graphql/city';
import { GET_COMPANY_TYPES } from '../graphql/companyType';

import CityForm from './CityForm';
import CompanyTypeForm from './CompanyTypeForm';

const PartnerForm = ({
  id
}: {
  id?: number;
}) => {
  const { closeModal } = React.useContext(StoreContext);

  const [getPartner, {
    data: partner,
    loading: partnerLoading,
    error: partnerError,
  }] = useLazyQuery<PartnerData, PartnerVars>(GET_PARTNER, {
    variables: {
      id,
    }
  });

  const [
    createPartner, {
      loading: createPartnerLoading,
      error: createPartnerError,
    }] = useMutation(CREATE_PARTNER);

  const [
    updatePartner, {
      loading: updatePartnerLoading,
      error: updatePartnerError
    }] = useMutation(UPDATE_PARTNER);

  const {
    data: cities,
    loading: citiesLoading,
    error: citiesError} = useQuery<CitiesData>(GET_CITIES);

  const {
    data: companyTypes,
    loading: companyTypesLoading,
    error: companyTypesError} = useQuery<CompanyTypesData>(GET_COMPANY_TYPES);

  const initialValues = {
    name: partner?.partner.name || '' ,
    companyType: partner?.partner.companyType?.id || '',
    taxNumber: partner?.partner.taxNumber || '',
    companyRegistrationNumber: partner?.partner.companyRegistrationNumber || '',
    city: partner?.partner.city?.id || '',
    address: partner?.partner.address || '',
    phoneNumber: partner?.partner.phoneNumber || '',
    bankAccountNumber: partner?.partner.bankAccountNumber || '',
    comment: partner?.partner.comment || '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    companyType: Yup.number().optional(),
    taxNumber: Yup.string().optional(),
    companyRegistrationNumber: Yup.string().optional(),
    city: Yup.number().required(),
    address: Yup.string().optional(),
    phoneNumber: Yup.string().optional(),
    bankAccountNumber: Yup.string().optional(),
    comment: Yup.string().optional(),
  });

  const {
    getFieldProps,
    handleSubmit,
    touched,
    status,
    errors,
    isValid,
    dirty: isDirty,
  } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const variables = {
        ...values,
        ...(id && { id }),
      }
      if (id) {
        await updatePartner({
          variables,
        })
        if (closeModal) closeModal();
      } else {
        await createPartner({
          variables,
        });
        if (closeModal) closeModal();
      }
    },
  });

  React.useEffect(() => {
    if (id) getPartner();
  }, [
    id,
    getPartner
  ]);

  if (partnerError || citiesError || companyTypesError) {
    return (
      <>
        <p>error</p>
        <p>
          {
            JSON.stringify({
              partnerError, citiesError, companyTypesError
            }, null, 2)
          }
        </p>
      </>
    )
  }

  if (partnerLoading || citiesLoading || companyTypesLoading) {
    return (
      <p>loading</p>
    )
  }

  return (
    <div className="row">
      <div className="col-12 col-md-8">
        <h4>{id ? `Edit partner: ${partner?.partner.name} (id: ${id})` : 'New partner'}</h4>123123123
        <form onSubmit={handleSubmit}>
        {
          Object.keys(initialValues).map((field) => {
            switch (field) {
              case 'city':
                return (
                  <div className="mb-1" key={field}>
                    <label htmlFor={`formControlInput_${field}`} className="form-label">{field}</label>
                    <select
                      {...getFieldProps(field)}
                      className={`${touched[field] && errors[field] ? 'form-select is-invalid' : 'form-select'}`}
                      id={`formControlInput_${field}`}
                    >
                      <option value="" disabled>Please select</option>
                      {
                        cities?.cities.map((city) => {
                          return (
                            <option
                              key={city.name}
                              defaultValue={id ? getFieldProps('city').value : undefined}
                              value={city.id}>
                                {city.name}
                            </option>
                          )
                        })
                      }
                    </select>
                    {touched[field] && errors[field] && (
                      <div className="invalid-feedback">
                        {errors[field]}
                    </div>
                    )}
                  </div>
                )
              case 'companyType':
                return (
                  <div className="mb-1" key={field}>
                    <label htmlFor={`formControlInput_${field}`} className="form-label">{field}</label>
                    <select
                      {...getFieldProps(field)}
                      className={`${touched[field] && errors[field] ? 'form-select is-invalid' : 'form-select'}`}
                      id={`formControlInput_${field}`}
                    >
                      <option value="" disabled>Please select</option>
                      {
                        companyTypes?.companyTypes.map((companyType) => {
                          return (
                            <option
                              key={companyType.name}
                              defaultValue={id ? getFieldProps('companyType').value : undefined}
                              value={companyType.id}>
                                {companyType.name}
                            </option>
                          )
                        })
                      }
                    </select>
                    {touched[field] && errors[field] && (
                      <div className="invalid-feedback">
                        {errors[field]}
                    </div>
                    )}
                  </div>
                )
              case 'name':
                return (
                  <div className="mb-1" key={field}>
                    <label htmlFor={`formControlInput_${field}`} className="form-label">{field}</label>
                    <input
                      {...getFieldProps(field)}
                      type="text"
                      className={`${touched[field] && errors[field] ? 'form-control is-invalid' : 'form-control'}`}
                      id={`formControlInput_${field}`}
                    />
                    {touched[field] && errors[field] && (
                      <div className="invalid-feedback">
                        {errors[field]}
                      </div>
                    )}
                  </div>
                )
              default: 
                return (
                  <div className="mb-1" key={field}>
                    <label htmlFor={`formControlInput_${field}`} className="form-label">{field}</label>
                    {
                      field === 'comment' ? (
                        <textarea
                          {...getFieldProps(field)}
                          className="form-control"
                          id={`formControlInput_${field}`}
                          rows={5}
                        />
                      ) : (
                        <input
                          {...getFieldProps(field)}
                          type='text'
                          className="form-control"
                          id={`formControlInput_${field}`}
                        />
                      )
                    }
                  </div>
                )
            }
          })
        }
        <div className="mb-1">
          {
            (createPartnerError || updatePartnerError) && (
              <div className="alert alert-danger" role="alert">
                {createPartnerError?.message || createPartnerError?.message}
              </div>
            )
          }
          {
            !updatePartnerError && !createPartnerError && status && status.type === 'success' && (
              <div className="alert alert-success" role="alert">
                {JSON.stringify(status.message, null, 2)}
              </div>
            )
          }
        </div>
        <button className="btn btn-success" disabled={!isDirty || !isValid || createPartnerLoading || updatePartnerLoading} type="submit">Submit</button>
      </form>
      </div>
      <div className="col-12 col-md-4">
        <div className="row pb-4">
          <div className="col-12">
            <h4>Add new Company Type</h4>
            <CompanyTypeForm />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h4>Add new City</h4>
            <CityForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerForm;