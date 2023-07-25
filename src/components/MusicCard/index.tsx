import { useState } from 'react';
import { SongType } from '../../types';

export default function MusicCard({ trackName, previewUrl, trackId } : SongType) {
  const [favorite, setFavorite] = useState(false);

  function handleFavorite() {
    setFavorite(!favorite);
  }

  return (
    <div>
      <h3>{trackName }</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>
      <button
        data-testid={ `checkbox-music-${trackId}` }
        onClick={ handleFavorite }
      >
        {favorite
          ? <img src="/src/images/checked_heart.png" alt="favorite" />
          : <img src="/src/images/empty_heart.png" alt="favorite" />}
      </button>
    </div>
  );
}
