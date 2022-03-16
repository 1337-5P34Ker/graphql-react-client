import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { cache } from './cache';

import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
  InMemoryCache
} from '@apollo/client';


const cache = new InMemoryCache();

// ApolloClient nutzt den SWAPI GraphQL Wrapper von https://swapi.dev/ 
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index'
});

// Explorer: https://studio.apollographql.com/sandbox/explorer

const ALL_FILMS = gql`
query Query {
  allFilms {
    films {
      title
      director
      releaseDate  
      id    
    }
  }
}
`;

client.query({
  query: ALL_FILMS
}).then(response => {
  console.log(response);
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
