import React from 'react';
import Header from '../Components/Header';

class Album extends React.Component {
  render() {
    return (
      <section>
        <div data-testid="page-album">
          <Header />
          <h1>Album</h1>
        </div>
      </section>
    );
  }
}

export default Album;
