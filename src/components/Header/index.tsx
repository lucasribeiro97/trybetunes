import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
import './header.css';

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
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <header data-testid="header-component" className="header-container">
        <h1 className="title">
          <span className="trybe">trybe</span>
          <span className="tunes">tunes</span>
        </h1>
        <div className="icons-container">
          <NavLink
            to="/search"
            data-testid="link-to-search"
            className="search-link"
          >
            <FaSearch className="search-icon" />
            Pesquisa
          </NavLink>
          <NavLink
            to="/favorites"
            data-testid="link-to-favorites"
            className="favorites-link"
          >
            <BsStarFill className="favorites-icon" />
            Favoritas
          </NavLink>
          <NavLink
            to="/profile"
            data-testid="link-to-profile"
            className="profile-link"
          >
            <MdAccountCircle className="profile-icon" />
            Perfil
          </NavLink>
        </div>
        <div className="profile-view">
          <div className="imagePreview">
            <img
              className="previewImage"
              src="/src/images/imagem-perfil.jpg"
              alt="imagem do perfil"
            />
          </div>
          <span data-testid="header-user-name" className="username">
            {username}
          </span>
        </div>
      </header>
    </div>
  );
}
