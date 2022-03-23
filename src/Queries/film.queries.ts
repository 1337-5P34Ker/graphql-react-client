import { gql } from '@apollo/client';

export const GET_ALL_FILMS = gql`
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

export const GET_FILM = gql`
query Film($id: ID) {
  film(id: $id) {
    title
    director
    producers
    openingCrawl
    id
    characterConnection {
      edges {
        node {
          name
          id
        }
      }
    }
  }
}
`;