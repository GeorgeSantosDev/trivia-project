import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addScore } from '../redux/actions';
import Header from '../components/Header';
import getQuestions from '../services/fetchQuestions';

const codeTokenExpired = 3;
const timer = 1000;
const scoreBase = 10;
const questionLimit = 4;

class PageGame extends Component {
  state = {
    questions: '',
    questionIndex: 0,
    answers: '',
    clicked: '',
    clock: 30,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);

    if (questions.response_code === codeTokenExpired) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('./');
    }

    this.setState({ questions }, () => {
      const { questionIndex } = this.state;
      this.setState({
        answers: this.shuffleArray([...questions.results[questionIndex].incorrect_answers,
          questions.results[questionIndex].correct_answer]),
      });
    });
    this.setTimer();
  }

  getScore = () => {
    const { clock, questions, questionIndex } = this.state;
    const score = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    return scoreBase + (clock * score[questions.results[questionIndex].difficulty]);
  };

  updateScore = (name) => {
    if (name === 'correct') {
      const { dispatch } = this.props;
      dispatch(addScore(this.getScore()));
    }
  };

  checkAnswer = (e) => {
    e.preventDefault();
    this.setState({ clicked: true });
    this.updateScore(e.target.name);
  };

  bringNextQuestion = (e) => {
    e.preventDefault();

    this.checkQuestionIndex();

    this.setState((previousState) => ({
      questionIndex: previousState.questionIndex + 1,
    }), () => {
      const { questions, questionIndex } = this.state;

      this.setState({
        clicked: '',
        answers: this.shuffleArray([...questions.results[questionIndex].incorrect_answers,
          questions.results[questionIndex].correct_answer]),
        clock: 30,
      });
    });
  };

  checkQuestionIndex = () => {
    const { questionIndex } = this.state;

    if (questionIndex === questionLimit) {
      const { history } = this.props;

      history.push('/feedback');
    }
  };

  shuffleArray = (array) => {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= currentIndex;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  setTimer = () => setInterval(() => {
    const { clock } = this.state;

    if (clock <= 0) {
      return clearInterval();
    }

    this.setState((prev) => ({
      clock: prev.clock - 1,
    }));
  }, timer);

  isButtonDisabled = () => {
    const { clock } = this.state;

    return (clock <= 0);
  };

  render() {
    const { questions, questionIndex, answers, clicked, clock } = this.state;
    const borderColor = clicked ? (
      { correct: '3px solid rgb(6, 240, 15)', wrong: '3px solid red' }
    )
      : { correct: '3px solid black', wrong: '3px solid black' };

    return (
      <section>
        <Header />
        <main>
          <p data-testid="question-category">
            { questions && questions.results[questionIndex].category }
          </p>
          <p data-testid="question-text">
            { questions && questions.results[questionIndex].question }
          </p>
          <section data-testid="answer-options">
            {
              answers && answers.map((answer, i) => {
                if (answer === questions.results[questionIndex].correct_answer) {
                  return (
                    <button
                      type="button"
                      data-testid="correct-answer"
                      name="correct"
                      key={ answer }
                      onClick={ this.checkAnswer }
                      style={ { border: borderColor.correct } }
                      disabled={ this.isButtonDisabled() }
                    >
                      { answer }
                    </button>
                  );
                }
                return (
                  <button
                    type="button"
                    data-testid={ `wrong-answer-${i}` }
                    key={ answer }
                    name="wrong"
                    onClick={ this.checkAnswer }
                    style={ { border: borderColor.wrong } }
                    disabled={ this.isButtonDisabled() }
                  >
                    { answer }
                  </button>
                );
              })
            }
          </section>
          <span>{ clock }</span>
          {
            clicked && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.bringNextQuestion }
              >
                Next
              </button>
            )
          }
        </main>
      </section>
    );
  }
}

PageGame.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(PageGame);
