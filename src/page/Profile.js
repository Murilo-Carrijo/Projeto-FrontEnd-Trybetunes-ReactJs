import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

import '../style/Profile.css';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      image: '',
      email: '',
      description: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.setUser();
  }

  setUser = async () => {
    const userLoging = await getUser();
    this.setState({
      name: userLoging.name,
      image: userLoging.image,
      email: userLoging.email,
      description: userLoging.description,
      loading: false,
    });
  }

  render() {
    const { name, image, email, description, loading } = this.state;
    const user = (
      <div className="profile-container">
        <div className="profifle-header">
          <img
            className="profile-image"
            data-testid="profile-image"
            src={ image }
            alt={ name }
          />
          <Link className="button-redirect" to="/profile/edit">Editar perfil</Link>
        </div>
        <h3>{name}</h3>
        <h4>
          Email:
          {' '}
          {email}
        </h4>
        <p>
          Descrição:
          {' '}
          {description}
        </p>
      </div>
    );

    return (
      <section>
        <div data-testid="page-profile">
          <Header />
          { loading ? <Loading /> : user }
        </div>
      </section>
    );
  }
}

export default Profile;
