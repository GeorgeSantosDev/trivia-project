import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import mockData from './helpers/mockData';
import { mockRequestInvalidToken  } from './helpers/mockData';

const INITIAL_STATE = {
  player: {
    name: 'User',
    assertions: 0,
    score: 0,
    gravatarEmail: 'user@test.com',
  },
};

describe('Teste da página Game', () => {
  test('A página exibe a imagem do usuário', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    const userImage = screen.getByAltText(/profile/i);

    expect(userImage).toBeInTheDocument();
  });

  test('A página exibe o nome do usuário', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    const userName = screen.getByText(/user/i);

    expect(userName).toBeInTheDocument();
  });

  test('A página exibe a pontuação do usuário', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    const userScore = screen.getByTestId('header-score');

    expect(userScore).toBeInTheDocument();
  });

  test('A página exibe a questão', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const category = screen.getByText(/art/i);
    const question = screen.getByText(/vincent van gogh/i);
    const answerButton = screen.getByRole('button', { name: /true/i });

    expect(category).toBeInTheDocument();
    expect(question).toBeInTheDocument();
    expect(answerButton).toBeInTheDocument();
  });

  test('A página desativa os botões de resposta após 30 segundos', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    const initialClock = screen.getByText('30');
    expect(initialClock).toBeInTheDocument();

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const clock = screen.getByText('29');
    expect(clock).toBeInTheDocument();

    await new Promise((resolve) => {
      setTimeout(resolve, 30000);
    });

    const lastClock = screen.getAllByText('0');
    expect(lastClock).toHaveLength(2);
  }, 34000);

  test('A página exibe o botão "Next" após o usuário clicar na resposta', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const answerButton = screen.getByRole('button', { name: /true/i });

    userEvent.click(answerButton);

    const nextButton = screen.getByTestId('btn-next');

    expect(nextButton).toBeInTheDocument();
  });

  test('A página exibe a próxima pergunta após o usuário clicar no botão "Next"', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const answerButton = screen.getByRole('button', { name: /true/i });

    userEvent.click(answerButton);

    const nextButton = screen.getByTestId('btn-next');

    userEvent.click(nextButton);

    const category = screen.getByText(/history/i);
    const question = screen.getByText(/what was found/i);

    expect(category).toBeInTheDocument();
    expect(question).toBeInTheDocument();
  });

  test('A aplicação redireciona para a página de Feedback após o usuário responder 5 perguntas', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    const question1Button = await screen.findAllByRole('button');

    userEvent.click(question1Button[0]);
    userEvent.click(await screen.findByTestId('btn-next'));

    const question2Button = await screen.findByRole('button', { name: /dead sea scrolls/i });

    userEvent.click(question2Button);
    userEvent.click(await screen.findByTestId('btn-next'));

    const question3Button = await screen.findAllByRole('button');

    userEvent.click(question3Button[0]);
    userEvent.click(await screen.findByTestId('btn-next'));

    const question4Button = await screen.findByRole('button', { name: /june/i });

    userEvent.click(question4Button);
    userEvent.click(await screen.findByTestId('btn-next'));
    
    const question5Button = await screen.findAllByRole('button');

    userEvent.click(question5Button[0]);
    userEvent.click(await screen.findByTestId('btn-next'));

    expect(localStorage.setItem).toHaveBeenCalled();

    expect(history.location.pathname).toBe('/feedback');
  });

  test('Ao receber um retorno da API com um token inválido é redirecionado para tela de Login', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockRequestInvalidToken),
    });

    jest.spyOn(Storage.prototype, 'removeItem');
    Storage.prototype.removeItem = jest.fn();

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(localStorage.removeItem).toHaveBeenCalled()

    expect(history.location.pathname).toBe('/');
  });
});
