import React from 'react';
// import Header from '../Components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      artistDisabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      artistDisabled: value.length < 2,
    });
  }

  render() {
    const { artist, artistDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="artist">
            <input
              data-testid="search-artist-input"
              type="text"
              name="artist"
              id="artist"
              value={ artist }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ artistDisabled }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
