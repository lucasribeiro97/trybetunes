import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import Loading from '../Loading';
import MusicCard from '../MusicCard';
import { AlbumType, SongType } from '../../types';
import './album.css';

export default function Album() {
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState<AlbumType | undefined>();
  const [musics, setMusics] = useState<SongType[]>([]);
  const { id } = useParams();

  const favoriteMusics = () => {
    setLoading(false);
  };

  useEffect(() => {
    const getAlbum = async () => {
      const data = await getMusics(id);
      const [albumArtist, ...allMusics] = data;
      setArtist(albumArtist);
      setMusics(allMusics);
      setLoading(false);
    };
    getAlbum();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="album-container">
      <h2 data-testid="artist-name">{ artist?.artistName }</h2>
      <h3 data-testid="album-name">{ artist?.collectionName }</h3>

      {musics.map((music) => (
        <MusicCard
          trackId={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          key={ music.trackId }
          onRemove={ () => favoriteMusics() }
        />
      ))}
    </div>
  );
}
