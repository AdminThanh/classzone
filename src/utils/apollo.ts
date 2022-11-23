import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import JWTManager from 'utils/jwt';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_API,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from JWTManager if it exists
  const token = JWTManager.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default client;