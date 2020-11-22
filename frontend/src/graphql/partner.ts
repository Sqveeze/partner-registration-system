import { gql } from '@apollo/client';

export const GET_PARTNERS = gql`
  query {
    partners {
      id
      name
      companyType {
        id
        name
      }
      taxNumber
      companyRegistrationNumber
      city {
        id
        name
      }
      address
      phoneNumber
      bankAccountNumber
      comment
    }
  }
`;

export const GET_PARTNER = gql`
  query partner($id: ID!) {
    partner(id: $id) {
      id
      name
      companyType {
        id
        name
      }
      taxNumber
      companyRegistrationNumber
      city {
        id
        name
      }
      address
      phoneNumber
      bankAccountNumber
      comment
    }
  }
`;

export const CREATE_PARTNER = gql`
  mutation createPartner(
    $name: String!
    $companyType: ID
    $taxNumber: String
    $companyRegistrationNumber: String
    $city: ID
    $address: String
    $phoneNumber: String
    $bankAccountNumber: String
    $comment: String
  ) {
    createPartner(
      createPartnerInput: {
        name: $name
        companyType: $companyType
        taxNumber: $taxNumber
        companyRegistrationNumber: $companyRegistrationNumber
        city: $city
        address: $address
        phoneNumber: $phoneNumber
        bankAccountNumber: $bankAccountNumber
        comment: $comment
      }
    ) {
      id
      name
      companyType {
        id
        name
      }
      taxNumber
      companyRegistrationNumber
      city {
        id
        name
      }
      address
      phoneNumber
      bankAccountNumber
      comment
    }
  }
`;

export const UPDATE_PARTNER = gql`
  mutation updatePartner(
    $id: ID!
    $name: String!
    $companyType: ID
    $taxNumber: String
    $companyRegistrationNumber: String
    $city: ID
    $address: String
    $phoneNumber: String
    $bankAccountNumber: String
    $comment: String
  ) {
    updatePartner(updatePartnerInput: {
      id: $id
      name: $name
      companyType: $companyType
      taxNumber: $taxNumber
      companyRegistrationNumber: $companyRegistrationNumber
      city: $city
      address: $address
      phoneNumber: $phoneNumber
      bankAccountNumber: $bankAccountNumber
      comment: $comment
    }) {
      id
      name
      companyType {
        id
        name
      }
      taxNumber
      companyRegistrationNumber
      city {
        id
        name
      }
      address
      phoneNumber
      bankAccountNumber
      comment
    }
  }
`;

export const DELETE_PARTNER = gql`
  mutation deletePartner($id: ID!) {
    removePartner(id: $id) {
      id
      name
    }
  }
`;