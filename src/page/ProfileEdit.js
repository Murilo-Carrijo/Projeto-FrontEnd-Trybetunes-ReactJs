import React from 'react';
import { Redirect } from 'react-router';
import Header from '../Components/Header';
import { updateUser } from '../services/userAPI';

import '../style/ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      saveDisabled: true,
      buttonColor: '#72757e',
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
      saveDisabled: name.length < nameMinimuSize,
    }, () => this.enablebutton());
  }

  enablebutton = () => {
    const { name, email, image, description } = this.state;
    if (name && email && image && description) {
      this.setState({
        saveDisabled: false,
        buttonColor: '#1b1bff',
      });
    }
  }

  saveInfo = (user) => {
    updateUser(user);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { name, email, image, description, saveDisabled, buttonColor, redirect,
    } = this.state;
    const user = { name, email, image, description };
    console.log('redirect', redirect);
    return (
      <section>
        <div data-testid="page-profile-edit">
          <Header />
          <h3 className="profile-title">Editar Perfil</h3>
          <div className="inputs-container">
            <label htmlFor="edit-input-image">
              <input
                data-testid="edit-input-image"
                type="text"
                name="image"
                id="edit-input-image"
                placeholder="url da imagem"
                onChange={ this.onInputChange }
                value={ image }
                required
              />
            </label>

            <label htmlFor="edit-input-name">
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                id="edit-input-name"
                placeholder="Nome"
                onChange={ this.onInputChange }
                value={ name }
                required
              />
            </label>

            <label htmlFor="edit-input-email">
              <input
                data-testid="edit-input-email"
                type="text"
                name="email"
                id="edit-input-email"
                placeholder="email"
                onChange={ this.onInputChange }
                value={ email }
                required
              />
            </label>

            <label htmlFor="edit-input-descriptio">
              <textarea
                data-testid="edit-input-description"
                type="text"
                name="description"
                id="edit-input-descriptio"
                placeholder="Descrição"
                onChange={ this.onInputChange }
                value={ description }
                required
              />
            </label>

            <button
              type="button"
              disabled={ saveDisabled }
              style={ { backgroundColor: buttonColor } }
              onClick={ () => this.saveInfo(user) }
            >
              Salvar Alterações
            </button>
            { redirect === true && <Redirect to="/profile" /> }
          </div>
        </div>
      </section>
    );
  }
}

export default ProfileEdit;
