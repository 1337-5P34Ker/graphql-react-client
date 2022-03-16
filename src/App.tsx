
import { Router } from '@reach/router';
import './App.css';
import Movie from './components/movie.component';
import Movies from './components/movies.component';

function App() {
  return (

    <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem' }}>   
     <Router>
      <Movies path='/' />
      <Movie path='/movie/:id'/>
    </Router>
    </div>





  );
}
export default App;
