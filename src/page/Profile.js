import React from 'react';
import Header from '../Components/Header';

class Profile extends React.Component {
  render() {
    return (
      <section>
        <div data-testid="page-profile">
          <h1>Perfil</h1>
          <Header />
        </div>
      </section>
    );
  }
}

export default Profile;
