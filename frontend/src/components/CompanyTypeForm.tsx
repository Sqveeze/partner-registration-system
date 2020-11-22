import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';

import { CompanyType, NewCompanyType } from '../lib/types';
import { CREATE_COMPANY_TYPE } from '../graphql/companyType';

const CompanyTypeForm = () => {
  const [
    createCompanyType, {
      loading: createCompanyTypeLoading,
      error: createCompanyTypeError,
    }] = useMutation<CompanyType, NewCompanyType>(CREATE_COMPANY_TYPE);

  const initialValues = {
    name: '' ,
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
  });

  const {
    getFieldProps,
    handleSubmit,
    status,
    touched,
    errors,
    isValid,
    dirty: isDirty,
  } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setStatus }) => {
      await createCompanyType({
        variables: {
          ...values,
        }
      });
      setStatus({
        type: 'success',
        message: `Successfully created new Company Type: ${values.name}`
      })
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-1">
        {
          createCompanyTypeError && (
            <div className="alert alert-danger" role="alert">
              {createCompanyTypeError.message}
            </div>
          )
        }
        {
          !createCompanyTypeError && status && status.type === 'success' && (
            <div className="alert alert-success" role="alert">
              {JSON.stringify(status.message, null, 2)}
            </div>
          )
        }
      </div>
      <div className="mb-2">
        <label htmlFor={`formControlInputNewCity`} className="form-label">Name</label>
        <input
          {...getFieldProps('name')}
          className={`${touched.name && errors.name ? 'form-control is-invalid' : 'form-control'}`}
          type='text'
          id={`formControlInputNewCity`}
        />
        {touched.name && errors.name && (
          <div className="invalid-feedback">
            {errors.name}
          </div>
        )}
      </div>
      <button className="btn btn-success" disabled={!isDirty || !isValid || createCompanyTypeLoading} type="submit">{createCompanyTypeLoading ? 'Loading...' : 'Submit'}</button>
    </form>
  );
}

export default CompanyTypeForm;