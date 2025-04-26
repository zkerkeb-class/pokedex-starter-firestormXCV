import { useState } from 'react';
import { loginUser, getCurrentUser } from '../../services/api';
import './AuthScreen.css';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const result = await loginUser(username, password);
    if (result) {
      const user = await getCurrentUser();
      setUser(user); // met à jour le contexte
      onSuccess();
    } else {
      setError('Identifiants incorrects.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Connexion</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="auth-error">{error}</p>}
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginForm;
