import React from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: [],
      isChecked: true,
    };
  }

  componentDidMount() {
    this.renderFavorites();
  }

  renderFavorites = async () => {
    const savedSongs = await getFavoriteSongs();
    this.setState({
      favorite: savedSongs,
    });
  }

  render() {
    const { favorite, isChecked } = this.state;
    console.log(favorite);
    return (
      <section>
        <div data-testid="page-favorites">
          <Header />
          <h1>Favoritos</h1>
          { favorite.map((s) => (
            <div key={ favorite.trackId }>
              <h5>{ s.trackName }</h5>
              <audio data-testid="audio-component" src={ favorite.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ favorite.trackName }>
                Favorita
                <input
                  name={ favorite.trackName }
                  id={ favorite.trackId }
                  type="checkbox"
                  checked={ isChecked }
                  // onChange={ this.toggleChange }
                  data-testid={ `checkbox-music-${favorite.trackId}` }
                />
              </label>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default Favorites;
