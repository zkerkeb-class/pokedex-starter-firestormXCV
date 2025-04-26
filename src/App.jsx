import './App.css'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthScreen from './components/auth/AuthScreen';
import Pokedex from './components/pokedex';
import PokemonDetails from './components/pokemonDetails';
import PrivateRoute from './components/auth/PrivateRoute';
import Header from './components/header/Header';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public */}
          <Route path="/auth" element={<AuthScreen />} />

          {/* Protected */}
          <Route element={<PrivateRoute />}>
            {/* Wrap dans un fragment pour ajouter Header */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Pokedex />
                </>
              }
            />
            <Route
              path="/pokemon/:id"
              element={
                <>
                  <Header />
                  <PokemonDetails />
                </>
              }
            />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
