import React from 'react';
import { gql, useQuery } from '@apollo/client';

//import { LaunchTile, Header, Button, Loading } from '../components';
import { RouteComponentProps } from '@reach/router';
import { Card } from 'react-bootstrap';
import { title } from 'process';

const GET_ALL_FILMS = gql`
query Query {
  allFilms {
    films {
      title
      director
      releaseDate      
    }
  }
}
`;

interface MoviesProps extends RouteComponentProps {}

const Movies: React.FC<MoviesProps> = () => {
  const {
    data,
    loading,
    error
  } = useQuery(GET_ALL_FILMS);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>ERROR</p>;

  return (
    <>
      {data.allFilms && 
      data.allFilms.films &&
      data.allFilms.films.map(({title, director}: any, index: number) => (

        <Card style={{ width: '18rem', margin: '2rem' }} key={index}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{director} </Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Card.Link href="#">more</Card.Link>
        </Card.Body>
      </Card>
        ))}
     
    </>
  );
}

export default Movies;
