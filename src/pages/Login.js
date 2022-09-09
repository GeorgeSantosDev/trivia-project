import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getTokenAPI from '../services/fetchToken';
import { addPlayerInfos } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
    loading: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const token = await getTokenAPI();
    localStorage.setItem('token', token);

    const { dispatch } = this.props;
    const { name, email } = this.state;
    dispatch(addPlayerInfos({ name, email }));

    this.setState({ loading: false });
  };

  render() {
    const { name, email, loading } = this.state;
    const isDisabled = name.length < 1 || email.length < 1;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            id="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ isDisabled }
        >
          Play
        </button>
        { !loading && <Redirect to="/game" /> }
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
