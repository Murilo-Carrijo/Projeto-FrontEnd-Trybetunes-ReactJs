import React from 'react';
import Header from '../Components/Header';

class Profile extends React.Component {
  render() {
    return (
      <section>
        <div data-testid="page-profile">
          <Header />
          <h1>Perfil</h1>
        </div>
      </section>
    );
  }
}

export default Profile;
