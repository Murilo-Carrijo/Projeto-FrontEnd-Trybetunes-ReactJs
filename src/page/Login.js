import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../image/logo-trybetunes-removebg.png';

import '../style/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.inputValidation = this.inputValidation.bind(this);

    this.state = {
      name: '',
      loginDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value },
    () => this.inputValidation());
  }

  inputValidation = () => {
    const { name } = this.state;
    const nameMinimuSize = 3;
    this.setState({
      loginDisabled: name.length < nameMinimuSize,
    });
  }

  userName = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { loginDisabled, name, loading, redirect } = this.state;
    return (
      <div className="login-page" data-testid="page-login">
        {loading && <Loading />}
        {redirect && <Redirect to="/search" />}
        <img src={ logo } alt="logo" />
        <form className="login">
          <label htmlFor="login-name">
            <input
              className="login-name-input"
              data-testid="login-name-input"
              id="login-name"
              name="name"
              type="text"
              placeholder="Nome"
              onChange={ this.onInputChange }
              value={ name }
            />
          </label>

          <button
            className="login-submit-button"
            type="submit"
            data-testid="login-submit-button"
            disabled={ loginDisabled }
            onClick={ this.userName }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
