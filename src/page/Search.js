import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  render() {
    return (
      <section>
        <div data-testid="page-search">
          <h1>Pesquisar</h1>
          <Header />
        </div>
      </section>
    );
  }
}

export default Search;
