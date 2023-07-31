import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

const INITIAL_STATE = {
  name: '',
  email: '',
  image: '',
  description: '',
};

function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType>(INITIAL_STATE);

  useEffect(() => {
    const getUsername = async () => {
      const userData = await getUser();
      setUser(userData);

      const id = setTimeout(() => {
        setLoading(false);
      }, 1.5);

      return () => clearTimeout(id);
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
      <div>
        <img
          src={ user.image }
          alt="Imagem do perfil"
          data-testid="profile-image"
        />
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.description}</p>
      </div>
    </div>
  );
}

export default Profile;
