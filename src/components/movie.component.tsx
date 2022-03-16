import React from 'react';
import { gql, useQuery } from '@apollo/client';

//import { LaunchTile, Header, Button, Loading } from '../components';
import { RouteComponentProps } from '@reach/router';
import { Card } from 'react-bootstrap';


const GET_FILM = gql`
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

interface MovieProps extends RouteComponentProps {
  id?: string;
}

const Movie: React.FC<MovieProps> = (props) => {
  console.log(props);
  const {id} = props;
  const {
    data,
    loading,
    error
  } = useQuery(GET_FILM, {variables:{id: id}});

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>ERROR</p>;
  const {title, director, openingCrawl} = data.film;
  return (
    <>
        <Card style={{ width: '80vw' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{director} </Card.Subtitle>
          <Card.Text>
            {openingCrawl}
          </Card.Text>
          <Card.Link href={`/`}>back</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default Movie;
