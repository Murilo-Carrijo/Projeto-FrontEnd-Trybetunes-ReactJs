import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../page/Loading';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        {loading ? <Loading /> : (<p data-testid="header-user-name">{ name }</p>)}
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Pesquisa</Link>
        <Link data-testid="link-to-profile" to="/profile">Pesquisa</Link>
      </header>
    );
  }
}

export default Header;
