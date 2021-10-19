import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <section>
        <div data-testid="page-not-found">
          <h1>Ops! A pagina que você está procurando não foi encontrada.</h1>
        </div>
      </section>
    );
  }
}

export default NotFound;
