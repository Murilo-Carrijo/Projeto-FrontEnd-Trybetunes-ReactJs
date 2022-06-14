import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { MusicCard } from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';

import '../style/Album.css';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albumsReturned: [],
      artistName: '',
      albumName: '',
      albumImg: '',
    };
  }

  componentDidMount() {
    this.getApi();
  }

  getApi = async () => {
    const { match: { params: { id } } } = this.props;
    const albums = await getMusics(id);
    this.setState({
      albumsReturned: albums,
      artistName: albums[0].artistName,
      albumName: albums[0].collectionName,
      albumImg: albums[0].artworkUrl100,
    });
  }

  render() {
    const { albumsReturned, artistName, albumName, albumImg } = this.state;
    return (
      <section>
        <div data-testid="page-album">
          <Header />
          <div className="album">
            <div className="album-info">
              <img src={ albumImg } alt={ albumName } />
              <h2>Album</h2>
              <h5 data-testid="artist-name">{`Banda: ${artistName}`}</h5>
              <h4 data-testid="album-name">{`Artista: ${albumName}`}</h4>
            </div>
            <div className="music-card">
              {albumsReturned.slice(1).map((album) => (
                <MusicCard
                  key={ album.trackName }
                  tracks={ album }
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
