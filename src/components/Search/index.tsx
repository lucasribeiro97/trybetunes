import { Link } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../Loading';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';

export default function Search() {
  const [artist, setArtist] = useState<string>('');
  const [inputArtist, setInputArtist] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [searchResult, setSearchResult] = useState<boolean>(false);

  const handleChangeArtist = (event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement | HTMLTextAreaElement>) => {
    setInputArtist(event.target.value);
  };

  const isArtistValid = () => {
    if (inputArtist.length >= 2) {
      return true;
    }
  };

  const handleSearchArtist = async () => {
    setLoading(true);
    setArtist(inputArtist);
    const data = await searchAlbumsAPI(inputArtist);
    setLoading(false);
    setAlbums(data);
    setSearchResult(true);
    setInputArtist('');
  };

  return (
    <div>
      {loading
        ? <Loading />
        : (
          <form>
            <input
              type="text"
              name="artist"
              id="artist"
              placeholder="Nome do artista"
              data-testid="search-artist-input"
              value={ inputArtist }
              onChange={ handleChangeArtist }
            />
            <button
              data-testid="search-artist-button"
              disabled={ !isArtistValid() }
              onClick={ handleSearchArtist }
            >
              Procurar
            </button>
          </form>
        )}

      {searchResult && albums.length > 0 ? (
        <div>
          <p>
            {`Resultado de álbuns de: ${artist}`}
          </p>
          <ul>
            {albums.map((album) => (
              <li key={ album.collectionId }>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  {album.collectionName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Nenhum álbum foi encontrado</p>
      )}
    </div>
  );
}
