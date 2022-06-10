import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../page/Loading';
import { getUser } from '../services/userAPI';
import logo from '../image/logo-white.png';

import '../style/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getName();
  }

  async getName() {
    const username = await getUser();
    const { name } = username;
    this.setState({ name, loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header className="header-component" data-testid="header-component">
        <div className="header-first-container">
          <img src={ logo } alt="logo" />
          {
            loading ? <Loading />
              : <p className="header-user-name" data-testid="header-user-name">
                { name }
              </p>
          }
        </div>

        <div className="links-container">
          <Link
            className="link"
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisa
          </Link>
          <Link
            className="link"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritos
          </Link>
          <Link
            className="link"
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
