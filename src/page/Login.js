import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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

  onInputChange({ target }) {
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
      <div data-testid="page-login">
        {loading && <Loading />}
        {redirect && <Redirect to="/search" />}
        <form className="login">
          <label htmlFor="login-name">
            <input
              data-testid="login-name-input"
              id="login-name"
              name="name"
              type="text"
              onChange={ this.onInputChange }
              value={ name }
            />
          </label>

          <button
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
