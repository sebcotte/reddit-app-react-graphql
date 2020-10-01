import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from '../constants'
import { cache } from '../cache'
import Cookies from 'js-cookie'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000', // GraphQL Server URL 
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
});

//
// Thanks to authLink, all request sent to GraphQL server will contain AUTH_TOKEN
//
const authLink = setContext((_, { headers }) => {
  const token = Cookies.get(AUTH_TOKEN)

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache
});

export default apolloClient
