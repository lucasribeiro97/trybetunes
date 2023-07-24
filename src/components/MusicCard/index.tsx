import { SongType } from '../../types';

export default function MusicCard({ trackName, previewUrl } : SongType) {
  return (
    <div>
      <h3>{trackName }</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>
    </div>
  );
}
