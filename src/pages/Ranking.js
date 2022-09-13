import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  state = {
    players: '',
  };

  componentDidMount() {
    const storage = JSON.parse((localStorage.getItem('ranking')));
    const ordenateRank = storage.sort((a, b) => b.score - a.score);
    this.setState({ players: ordenateRank });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { players } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          players && players.map((player, i) => (
            <div key={ i }>
              <img
                src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}` }
                alt="player"
              />
              <p data-testid={ `player-name-${i}` }>{ player.name }</p>
              <p data-testid={ `player-score-${i}` }>{ player.score }</p>
            </div>
          ))
        }
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClick }
        >
          Voltar ao Início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
