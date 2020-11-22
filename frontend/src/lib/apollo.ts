import { ApolloClient, InMemoryCache } from '@apollo/client';

const {
  REACT_APP_BACKEND_URL: backendUrl
} = process.env;

if (!backendUrl) throw new Error('Environment variable: REACT_APP_BACKEND_URL is not set');

export const client = new ApolloClient({
  uri: `${backendUrl}/graphql`,
  cache: new InMemoryCache()
});
