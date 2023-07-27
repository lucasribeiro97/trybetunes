import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Layout from './components/Layout';
import Favorites from './components/Favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
      </Route>
    </Routes>
  );
}

export default App;
