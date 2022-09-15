import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import mockData from './helpers/mockData';

describe('Testa a página de Login', () => {
  test('Testa se existem 2 inputs na tela, um do tipo text e outro do tipo email', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByRole('textbox', {  name: /nome/i });
    const inputEmail = screen.getByRole('textbox', {  name: /email/i });
    const allInputs = screen.getAllByRole('textbox');

    expect(inputName).toBeInTheDocument();
    expect(inputName).toHaveAttribute('type', 'text');
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveAttribute('type', 'email');
    expect(allInputs).toHaveLength(2);
  });
  test('Testa se existem 2 botões na tela, um com o texto "Play" e outro com o texto "Settings"', () => {
    renderWithRouterAndRedux(<App />);

    const buttonPlay = screen.getByRole('button', {  name: /Play/ })
    const buttonSettings = screen.getByRole('button', {  name: /Settings/ })

    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
  });
  test('Testa se ao clicar no botão com o texto "Settings" você é redirecionado para "/settings" ', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonSettings = screen.getByRole('button', {  name: /Settings/ })

    expect(buttonSettings).toBeInTheDocument();

    userEvent.click(buttonSettings);

    expect(history.location.pathname).toBe('/settings');
  });
  test('Testa se o botão play fica ativado caso o usuário digite 1 caractere ou mais nos dois campos', () => {
    renderWithRouterAndRedux(<App />);

    const buttonPlay = screen.getByRole('button', {  name: /Play/ })
    const inputName = screen.getByRole('textbox', {  name: /nome/i });
    const inputEmail = screen.getByRole('textbox', {  name: /email/i });

    expect(buttonPlay).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();

    userEvent.click(inputName);
    userEvent.type(inputName, 't');
    userEvent.click(inputEmail)
    userEvent.type(inputEmail, 't');

    expect(buttonPlay).toBeEnabled();
  });
  test('Testa se é possível apertar no botão play e ser redirecionado para "/game" caso o valor no input de nome seja maior que um, e o email no input de email seja válido', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonPlay = screen.getByRole('button', {  name: /Play/ })
    const inputName = screen.getByRole('textbox', {  name: /nome/i });
    const inputEmail = screen.getByRole('textbox', {  name: /email/i });

    expect(buttonPlay).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();

    userEvent.click(inputName);
    userEvent.type(inputName, 't');
    userEvent.click(inputEmail)
    userEvent.type(inputEmail, 'email@example.com');

    expect(buttonPlay).toBeEnabled();

    userEvent.click(buttonPlay);

    await waitFor(() => expect(history.location.pathname).toBe('/game')); // assim que é apertado o botão ele bate numa API.
  });
})
