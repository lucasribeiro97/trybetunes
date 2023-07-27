import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../Loading';
import { SongType } from '../../types';
import MusicCard from '../MusicCard';

function Favorites() {
  const [loading, setLoading] = useState(true);
  const [favoriteMusics, setFavoriteMusics] = useState<SongType[]>([]);

  useEffect(() => {
    const getFavorite = async () => {
      const favoriteSongs = await getFavoriteSongs();
      setLoading(false);
      setFavoriteMusics(favoriteSongs);
    };
    getFavorite();
  });

  if (loading) {
    return (
      <Loading />
    );
  }

  function handleRemove(trackId: number) {
    setFavoriteMusics((prevFavorite) => prevFavorite
      .filter((song) => song.trackId !== trackId));
  }

  return (
    <div>
      <h2>Músicas Favoritas</h2>
      {favoriteMusics.map((song) => (
        <MusicCard
          key={ song.trackId }
          trackId={ song.trackId }
          trackName={ song.trackName }
          previewUrl={ song.previewUrl }
          onRemove={ () => handleRemove(song.trackId) }
        />
      ))}
    </div>
  );
}

export default Favorites;
