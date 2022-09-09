import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    image: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const image = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    this.setState({ image });
  }

  render() {
    const { image } = this.state;
    const { name, score } = this.props;
    return (
      <header>
        <img
          src={ image }
          alt="Profile"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
