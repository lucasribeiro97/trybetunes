import { useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';
import { UserType } from '../../types';
import { createUser } from '../../services/userAPI';
import Loading from '../Loading';

const INITAL_STATE = {
  name: '',
  email: '',
  image: '',
  description: '',
};

export default function Login() {
  const [user, setUser] = useState<UserType>(INITAL_STATE);
  const [loading, setLoading] = useState<boolean>(false);
  const { name } = user;

  function handleChange(event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement | HTMLTextAreaElement>) {
    setUser(() => ({
      ...INITAL_STATE,
      [event.target.name]: event.target.value,
    }));
  }

  function isLoginValid() {
    if (name.length >= 3) {
      return true;
    }
  }

  const navigate = useNavigate();

  const handleSubmitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await createUser(user);
    navigate('/search');
    setLoading(false);
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>
          <span className="trybe">trybe</span>
          <span className="tunes">tunes</span>
        </h1>
        <form className="form-login" onSubmit={ handleSubmitLogin }>
          <input
            className="input-name"
            type="text"
            name="name"
            id="name"
            placeholder="qual é o seu nome?"
            required
            value={ name }
            onChange={ handleChange }
            data-testid="login-name-input"
          />
          <button
            className="submit-button"
            type="submit"
            data-testid="login-submit-button"
            disabled={ !isLoginValid() }
          >
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}
