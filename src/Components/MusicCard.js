import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../page/Loading';

export class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.isFavorite();
  }

  isFavorite = async () => {
    const { tracks } = this.props;
    const savedSong = await getFavoriteSongs();
    await savedSong.forEach((savedSongs) => {
      if (savedSongs.trackId === tracks.trackId) {
        this.setState({
          isChecked: true,
        });
      }
    });
  }

  toggleChange = async () => {
    const { isChecked } = this.state;
    const { tracks } = this.props;
    if (!isChecked) {
      this.setState({
        isChecked: true,
        loading: true,
      });
      await addSong(tracks);
      this.setState({
        loading: false,
      });
    } else {
      this.setState({
        loading: true,
      });
      await removeSong(tracks);
      this.setState({
        isChecked: false,
        loading: false,
      });
    }
  }

  render() {
    const { tracks } = this.props;
    const { isChecked, loading } = this.state;
    console.log(isChecked);
    const formMusic = (
      <section className="music-components" key={ tracks.trackName }>
        <audio data-testid="audio-component" src={ tracks.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ tracks.trackName }>
          Favorita
          <input
            name={ tracks.trackName }
            id={ tracks.trackId }
            type="checkbox"
            checked={ isChecked }
            onChange={ this.toggleChange }
            data-testid={ `checkbox-music-${tracks.trackId}` }
          />
        </label>
      </section>
    );
    return (
      <div className="music">
        <h5>{ tracks.trackName }</h5>
        { loading ? <Loading /> : formMusic }
      </div>
    );
  }
}

MusicCard.propTypes = {
  isChecked: PropTypes.bool,
  tracks: PropTypes.shape,
  id: PropTypes.string,
}.isRequired;

export default MusicCard;
