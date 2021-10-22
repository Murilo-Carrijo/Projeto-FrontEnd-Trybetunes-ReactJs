import React from 'react';
import Header from '../Components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <section>
        <div data-testid="page-profile-edit">
          <Header />
          <h1>Editar Perfil</h1>
        </div>
      </section>
    );
  }
}

export default ProfileEdit;
