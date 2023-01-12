import './App.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/Header/Header.js';

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <Router>
        <Header />
          <Routes>
            <Route index element={<h1>Movie App</h1>}></Route>
            <Route path="movie/:id" element={<h1>Movie detail page</h1>}></Route>
            <Route path="movies/:type" element={<h1>Movies list page</h1>}></Route>
            <Route path="/*" element={<h1>Error Page</h1>}></Route>
          </Routes>
      </Router> */}
    </div>
  );
}

export default App;
