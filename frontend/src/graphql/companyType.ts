import { gql } from '@apollo/client';

export const GET_COMPANY_TYPES = gql`
  query getCompanyTypes {
    companyTypes {
      id
      name
    }
  }
`;

export const GET_COMPANY_TYPE = gql`
  query getCompanyType($id: ID!) {
    companyType(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_COMPANY_TYPE = gql`
  mutation createCompanyType($name: String) {
    createCompanyType(createCompanyTypeInput: {
      name: $name
    }) {
      id
      name
    }
  }
`;