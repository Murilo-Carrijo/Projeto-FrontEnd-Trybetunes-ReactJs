import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../Components/Header';
import Loading from './Loading';

import '../style/Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      artistDisabled: true,
      searchInputButton: true,
      albuns: [],
      albunsSearched: false,
      artistSearched: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      artistDisabled: value.length < 2,
    });
  }

  searchAlbum = async () => {
    const { artist } = this.state;
    this.setState({
      searchInputButton: false,
    });
    const albumRequest = await searchAlbumsAPI(artist);
    this.setState({
      artist: '',
      searchInputButton: true,
      albuns: albumRequest,
      albunsSearched: true,
      artistSearched: artist,
    });
  }

  inputAndButton() {
    const { artist, artistDisabled } = this.state;
    return (
      <form className="search-container">
        <label htmlFor="artist">
          <input
            data-testid="search-artist-input"
            type="text"
            name="artist"
            id="artist"
            value={ artist }
            onChange={ this.onInputChange }
            placeholder="Nome do artista"
          />
        </label>
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ artistDisabled }
          onClick={ this.searchAlbum }
        >
          Pesquisar

        </button>
      </form>
    );
  }

  showAlbum() {
    const { albuns, artistSearched } = this.state;
    const result = `Resultado de álbuns de: ${artistSearched}`;
    console.log(albuns);
    return (
      <div>
        <h2 className="title-result">
          { albuns.length ? result : '' }
        </h2>
        <div className="result-container">
          { albuns.length
            ? albuns.map((album) => (
              <section className="album-container" key={ album.collectionId }>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <h3>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    { album.collectionName }
                  </Link>
                </h3>
                {album.artistName}
              </section>
            ))
            : <h2>Nenhum álbum foi encontrado</h2>}
        </div>
      </div>
    );
  }

  render() {
    const { searchInputButton, albunsSearched } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { searchInputButton ? this.inputAndButton() : <Loading /> }
        { albunsSearched ? this.showAlbum() : '' }
      </div>
    );
  }
}

export default Search;
