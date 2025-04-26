import { useState } from 'react';
import { registerUser, getCurrentUser  } from '../../services/api';
import './AuthScreen.css';
import { useAuth } from '../../contexts/AuthContext';

const RegisterForm = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const result = await registerUser(username, password);
    if (result) {
        const user = await getCurrentUser();
      setUser(user); // met à jour le contexte
      onSuccess();
    } else {
      setError("Nom d'utilisateur déjà utilisé.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <h2>Inscription</h2>
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
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default RegisterForm;
