import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getQuestions from '../services/fetchQuestions';

const codeTokenExpired = 3;

class PageGame extends Component {
  state = {
    questions: '',
    questionIndex: 0,
    answers: '',
    clicked: '',
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
        answers: [...questions.results[questionIndex].incorrect_answers,
          questions.results[questionIndex].correct_answer],
      });
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ clicked: true });
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

  render() {
    const { questions, questionIndex, answers, clicked } = this.state;
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
              answers && this.shuffleArray(answers.map((answer, i) => {
                if (answer === questions.results[questionIndex].correct_answer) {
                  return (
                    <button
                      type="button"
                      data-testid="correct-answer"
                      key={ answer }
                      onClick={ this.handleClick }
                      style={ { border: borderColor.correct } }
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
                    onClick={ this.handleClick }
                    style={ { border: borderColor.wrong } }
                  >
                    { answer }
                  </button>
                );
              }))
            }
          </section>
        </main>
      </section>
    );
  }
}

PageGame.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default PageGame;
