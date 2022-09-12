import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const badAssertions = 3;

class Feedback extends Component {
  onClick = () => {
    const { history } = this.props;
    history.push('./');
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { assertions < badAssertions ? 'Could be better...' : 'Well Done!' }
        </p>
        <h3 data-testid="feedback-total-question">{ assertions }</h3>
        <h3 data-testid="feedback-total-score">{ score }</h3>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.onClick }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);