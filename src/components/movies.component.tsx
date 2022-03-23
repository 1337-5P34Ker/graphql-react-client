import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_ALL_FILMS } from '../Queries/film.queries';

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
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {data.allFilms && 
      data.allFilms.films &&
      data.allFilms.films.map(({title, director, id}: any, i: number) => (

        <Card style={{ width: '30rem', margin: '1rem' }} key={i}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{director} </Card.Subtitle>
          <Card.Link href={`/movie/${id}`}>more infos</Card.Link>
        </Card.Body>
      </Card>
        ))}
     
    </div>
  );
}

export default Movies;
