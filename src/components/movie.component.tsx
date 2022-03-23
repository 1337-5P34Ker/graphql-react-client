import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card, Nav } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_FILM } from '../Queries/film.queries';
interface MovieProps extends RouteComponentProps {
  id?: string;
}

const Movie: React.FC<MovieProps> = (props) => {
  const { id } = props; 
  const { data, loading, error } = useQuery(GET_FILM, { variables: { id: id } });

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>ERROR</p>;

  const { title, director, openingCrawl, characterConnection } = data.film;
  const { edges } = characterConnection;
  const characters: [any] = edges.map(({node}: any) => node);
  const sorted = characters.sort((a,b) =>  {return a.name.localeCompare(b.name)});

  return (
    <>
      <Card style={{ width: '80vw' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Director: {director} </Card.Subtitle>
          <Card.Text as='div'>
            {openingCrawl}
            <Card.Subtitle className="mb-2 text-muted mt-3">Characters</Card.Subtitle>
            <Nav> 
            { sorted.map(({id, name}) => (  
                <Nav.Item key={id}><Nav.Link href={`/character/${id}`}>{name}</Nav.Link></Nav.Item>
              ))}
         </Nav>
          </Card.Text>
          <Card.Link href={`/`}>back</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default Movie;
