import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Get the API URL from environment variables, with a fallback for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/graphql';

// Create an HTTP link to connect to the GraphQL server
const httpLink = new HttpLink({
  uri: API_URL,
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true, // Enable Apollo DevTools in development
});

export default client;
