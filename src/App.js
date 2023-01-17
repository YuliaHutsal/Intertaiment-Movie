import { Container } from '@mui/system';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.js';
import SimpleBottomNavigation from './components/MainNav';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="App">
        <Container>
          <Routes>
            <Route exact path='/' element={Trending}/>
            <Route exact path='/movie' element={Movies}/>
            <Route exact path='/series' element={Series}/>
            <Route exact path='/search' element={Search}/>
          </Routes>
        </Container>
      </div>
      

      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
