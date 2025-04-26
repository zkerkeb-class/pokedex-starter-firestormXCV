import './Header.css';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from "../../services/api";

const Header = () => {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isOnPokemonDetailsPage = location.pathname.startsWith('/pokemon/');

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate('/auth');
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
  };

  return (
    <header className="app-header">
      

      {isOnPokemonDetailsPage && (
        <button className="back-button" onClick={() => navigate('/')}>
          ←
        </button>
      )}

      <h1 className="header-title">Pokédex</h1>

      {user && (
        <div className="header-user">
          <span className="header-username">👤 {user.username}</span>
          <button className="logout-button" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
