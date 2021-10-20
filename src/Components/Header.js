import React from 'react';
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
      </header>
    );
  }
}

export default Header;
