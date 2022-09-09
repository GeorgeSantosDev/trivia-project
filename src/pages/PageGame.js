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
    const { questions, questionIndex, answers } = this.state;
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
                    <button type="button" data-testid="correct-answer" key={ answer }>
                      { answer }
                    </button>
                  );
                }
                return (
                  <button
                    type="button"
                    data-testid={ `wrong-answer-${i}` }
                    key={ answer }
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
