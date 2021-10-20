import React from 'react';
import Header from '../Components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <section>
        <div data-testid="page-favorites">
          <Header />
          <h1>Favoritos</h1>
        </div>
      </section>
    );
  }
}

export default Favorites;
