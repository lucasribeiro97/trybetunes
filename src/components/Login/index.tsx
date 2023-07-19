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
  const [loading, setLoading] = useState<boolean>(true);
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
    if (isLoginValid()) {
      setLoading(false);
      const username = await createUser(user);
      if (username) {
        setTimeout(() => {
          navigate('/search');
        }, 1000);
      }
    }
  };

  return (
    <div>
      <h1>TrybeTunes</h1>
      {loading
        ? (
          <form onSubmit={ handleSubmitLogin }>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nome"
              required
              value={ name }
              onChange={ handleChange }
              data-testid="login-name-input"
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ !isLoginValid() }
            >
              ENTRAR
            </button>
          </form>
        ) : <Loading />}

    </div>
  );
}
