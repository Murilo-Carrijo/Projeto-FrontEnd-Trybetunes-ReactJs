import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { MusicCard } from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albumsReturned: [],
      artistName: '',
      albumName: '',
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
    });
  }

  render() {
    const { albumsReturned, artistName, albumName } = this.state;
    return (
      <section>
        <div data-testid="page-album">
          <Header />
          <h1>Album</h1>
          <h5 data-testid="artist-name">{`Banda: ${artistName}`}</h5>
          <h4 data-testid="album-name">{`Artista: ${albumName}`}</h4>
          {albumsReturned.slice(1).map((album) => (
            <MusicCard
              key={ album.trackName }
              tracks={ album }
            />
          ))}
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
