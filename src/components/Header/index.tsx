import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';

export default function Header() {
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsername = async () => {
      const user = await getUser();
      setUsername(user.name);
      setLoading(false);
    };
    getUsername();
  });

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <header data-testid="header-component">
        <NavLink to="/search" data-testid="link-to-search">
          Pesquisa
        </NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">
          Favoritas
        </NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">
          Perfil
        </NavLink>
      </header>
      <h2 data-testid="header-user-name">
        {`Olá, ${username}`}
      </h2>
    </div>
  );
}
