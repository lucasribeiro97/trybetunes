import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

export default function MusicCard(song : SongType & { onRemove: () => void }) {
  const { trackName, previewUrl, trackId, onRemove } = song;
  const [favorite, setFavorite] = useState(false);

  function handleFavoriteChange(event: { target: { checked: any; }; }) {
    const isFavorite = event.target.checked;
    setFavorite(isFavorite);
    onRemove();

    if (isFavorite) {
      addSong(song);
    } else {
      removeSong(song);
    }
  }

  useEffect(() => {
    const getFavorite = async () => {
      const favoriteSongs = await getFavoriteSongs();
      favoriteSongs.filter(
        (music: SongType) => music.trackId === trackId && setFavorite(true),
      );
    };
    getFavorite();
  });

  return (
    <div>
      <h3>{trackName}</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>
      <label data-testid={ `checkbox-music-${trackId}` }>
        <input
          type="checkbox"
          checked={ favorite }
          onChange={ handleFavoriteChange }
        />
        {favorite
          ? <img src="/src/images/checked_heart.png" alt="favorite" />
          : <img src="/src/images/empty_heart.png" alt="favorite" />}
      </label>
    </div>
  );
}
