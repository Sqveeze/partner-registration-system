import { gql } from '@apollo/client';

export const GET_CITIES = gql`
  query getCities {
    cities {
      id
      name
    }
  }
`;

export const GET_CITY = gql`
  query getCity($id: ID!) {
    city(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_CITY = gql`
  mutation createCity($name: String) {
    createCity(createCityInput: {
      name: $name
    }) {
      id
      name
    }
  }
`;