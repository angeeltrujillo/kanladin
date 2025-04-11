import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create an HTTP link to connect to the GraphQL server
const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql',
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true, // Enable Apollo DevTools in development
});

export default client;
