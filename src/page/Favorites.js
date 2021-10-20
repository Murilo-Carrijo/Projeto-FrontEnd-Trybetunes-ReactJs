import React from 'react';
import Header from '../Components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <section>
        <div data-testid="page-favorites">
          <h1>Favoritos</h1>
          <Header />
        </div>
      </section>
    );
  }
}

export default Favorites;
