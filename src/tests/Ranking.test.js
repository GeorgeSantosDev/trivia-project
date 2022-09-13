import React from 'react';
import { getNodeText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const route = '/ranking'; // rota inicial

const initialState = {
  player: {
    name: 'Leo',
    assertions: 3,
    score: 120,
    gravatarEmail: 'email@example.com',
  },
}; // estado redux

const mockLocalStorage = [
  {
    name: 'Leo',
    assertions: 3,
    score: 120,
    gravatarEmail: 'email@example.com',
  },
  {
    name: 'George',
    assertions: 2,
    score: 98,
    gravatarEmail: 'email2@example.com'
  }
]; // mock do localStorage
localStorage.setItem('ranking', JSON.stringify(mockLocalStorage)); // cria mock do localStorage para o teste

describe('Testa a página de Ranking', () => {
  test('Testa se caso tenha algo no localStorage, a página de ranking renderiza o nome, placar e imagem jogador', () => {
    renderWithRouterAndRedux(<App />, initialState, route);
    const namePlayer0 = screen.getByTestId('player-name-0');
    const scorePlayer0 = screen.getByTestId('player-score-0');
    const namePlayer1 = screen.getByTestId('player-name-1');
    const scorePlayer1 = screen.getByTestId('player-score-1');
    expect(namePlayer0).toBeInTheDocument();
    expect(getNodeText(namePlayer0)).toBe('Leo'); // com o toHaveTextContent toBe('l') passaria
    expect(scorePlayer0).toBeInTheDocument();
    expect(getNodeText(scorePlayer0)).toBe('120');
    expect(namePlayer1).toBeInTheDocument();
    expect(getNodeText(namePlayer1)).toBe('George'); 
    expect(scorePlayer1).toBeInTheDocument();
    expect(getNodeText(scorePlayer1)).toBe('98');
  });
  test('Testa se existe um título com o texto "Ranking" e um botão que redireciona o usuário para "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, route);
    const title = screen.getByRole('heading', { name: /Ranking/ });
    const buttonToHome = screen.getByRole('button', { name: /voltar ao início/i });
    expect(title).toBeInTheDocument();
    expect(getNodeText(title)).toBe('Ranking');
    expect(buttonToHome).toBeInTheDocument();
    expect(getNodeText(buttonToHome)).toBe('Voltar ao Início');
    userEvent.click(buttonToHome);
    expect(history.location.pathname).toBe('/');
  });
});
