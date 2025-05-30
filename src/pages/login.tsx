import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase'; // asegúrate de importar desde tu archivo firebase.js
import '../assets/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMsg('¡Inicio de sesión exitoso!');
      setErrorMsg('');
      navigate('/dashboard')
      // Redirige o actualiza estado global aquí
    } catch (error: any) {
      setErrorMsg('Email o contraseña incorrectos');
      setSuccessMsg('');
    }
  };

  return (
    <div className="full-screen-container">
      <div className="login-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className={`input-group ${successMsg ? 'success' : errorMsg ? 'error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="msg">{successMsg ? 'Email válido' : ''}</span>
          </div>

          <div className={`input-group ${errorMsg ? 'error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="msg">{errorMsg}</span>
          </div>

          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
