import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const INITIAL_STATE = {
  player: {
    name: 'Teste',
    assertions: 2,
    score: 150,
    gravatarEmail: 'test@gmail.com',
  }
}
const ROUTE = '/feedback';

describe('Testa a página de feedback', () => {
  test('Testa se tem uma mensagem de feedback: Could be better...', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);
    expect(history.location.pathname).toBe('/feedback');
    
    const feedbackText = screen.getByText(/Could be better.../i);
    expect(feedbackText).toBeInTheDocument();
  });
  test('Testa se tem uma mensagem de feedback: Well Done!', () => {
    const state = {
      player: {
        name: 'Teste',
        assertions: 4,
        score: 150,
        gravatarEmail: 'test@gmail.com',
      }
    }
    renderWithRouterAndRedux(<App />, state, ROUTE);
    
    const feedbackText = screen.getByText(/Well Done!/i);
    
    expect(feedbackText).toBeInTheDocument();
  });
  test('Testa se ao clicar em PlayAgain é redirecionado para página de login', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);
    const playAgainButton = screen.getByRole('button', { name: /play again/i });

    expect(playAgainButton).toBeInTheDocument();

    userEvent.click(playAgainButton);

    expect(history.location.pathname).toBe('/');
  });
  test('Testa se ao clicar em Ranking é redirecionado para página de ranking', () => {
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn();

    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return [{name:"Nome", score:66, gravatarEmail:"george.santos_ufmg@outlook.com"}];
    })

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);
    const rankingButton = screen.getByRole('button', { name: /ranking/i });

    expect(rankingButton).toBeInTheDocument();

    userEvent.click(rankingButton);

    expect(history.location.pathname).toBe('/ranking');
  });
})
