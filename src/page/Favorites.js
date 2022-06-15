import React from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

import '../style/Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: [],
      isChecked: true,
      loading: true,
    };
  }

  componentDidMount() {
    this.renderFavorites();
  }

  renderFavorites = async () => {
    const savedSongs = await getFavoriteSongs();
    this.setState({
      favorite: savedSongs,
      loading: false,
    });
  }

  toggleChange = async (music) => {
    await removeSong(music);
    this.setState({
      loading: true,
    });
    this.renderFavorites();
  }

  render() {
    const { favorite, isChecked, loading } = this.state;
    return (
      <section>
        <div data-testid="page-favorites">
          <Header />
          <div className="favorites-container">
            <h3>Musicas favoritas</h3>
            { loading ? <Loading /> : favorite.map((s) => (
              <div className="music-container" key={ s.trackId }>
                <h5>{ s.trackName }</h5>
                <audio data-testid="audio-component" src={ s.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={ s.trackName }>
                  Favorita
                  <input
                    name={ s.trackName }
                    id={ s.trackId }
                    type="checkbox"
                    checked={ isChecked }
                    onChange={ () => this.toggleChange(s) }
                    data-testid={ `checkbox-music-${s.trackId}` }
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Favorites;
