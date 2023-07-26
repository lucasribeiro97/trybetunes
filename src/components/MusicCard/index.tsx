import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

export default function MusicCard({ trackName, previewUrl, trackId } : SongType) {
  const [favorite, setFavorite] = useState(false);

  function handleFavoriteChange(event: { target: { checked: any; }; }) {
    const isFavorite = event.target.checked;
    setFavorite(isFavorite);

    const songData = {
      trackName,
      previewUrl,
      trackId,
    };

    if (isFavorite) {
      addSong(songData);
    } else {
      removeSong(songData);
    }
  }

  useEffect(() => {
    const getFavorite = async () => {
      const favoriteSongs = await getFavoriteSongs();
      favoriteSongs.filter(
        (song: SongType) => song.trackId === trackId && setFavorite(true),
      );
    };
    getFavorite();
  });

  return (
    <div>
      <h3>{trackName }</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>
      <label data-testid={ `checkbox-music-${trackId}` }>
        {favorite
          ? <img src="/src/images/checked_heart.png" alt="favorite" />
          : <img src="/src/images/empty_heart.png" alt="favorite" />}
        <input
          type="checkbox"
          checked={ favorite }
          onChange={ handleFavoriteChange }
        />
      </label>
    </div>
  );
}
