import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import { UserType } from '../../types';
import { getUser, updateUser } from '../../services/userAPI';

function ProfileEdit() {
  const [loading, setLoading] = useState(true);
  const [userInfos, setUserInfos] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  const isEmailValid = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isFormValid = () => {
    const { name, email } = userInfos;
    return name.trim() !== '' && isEmailValid(email);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfos(() => ({
      ...userInfos,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await updateUser(userInfos);
    setLoading(false);
    navigate('/profile');
  };

  useEffect(() => {
    const getUserInfos = async () => {
      const user = await getUser();
      setUserInfos(user);
      setLoading(false);
    };
    getUserInfos();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <form onSubmit={ handleSave }>
      <label htmlFor="input-name">Nome</label>
      <input
        type="text"
        id="input-name"
        data-testid="edit-input-name"
        name="name"
        value={ userInfos.name }
        onChange={ handleInputChange }
      />
      <label htmlFor="input-email">E-mail</label>
      <input
        type="text"
        id="input-email"
        data-testid="edit-input-email"
        name="email"
        value={ userInfos.email }
        onChange={ handleInputChange }
      />
      <label htmlFor="input-description">Descrição</label>
      <input
        type="text"
        id="input-description"
        data-testid="edit-input-description"
        name="description"
        value={ userInfos.description }
        onChange={ handleInputChange }
      />
      <input
        type="text"
        name="image"
        id="image"
        data-testid="edit-input-image"
        value={ userInfos.image }
        onChange={ handleInputChange }
      />
      <button
        data-testid="edit-button-save"
        disabled={ !isFormValid() }
      >
        Salvar alterações
      </button>
    </form>
  );
}

export default ProfileEdit;
