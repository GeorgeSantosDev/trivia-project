import { ADD_PLAYER_INFOS, ADD_SCORE } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case ADD_PLAYER_INFOS: return {
    ...state,
    name: action.infos.name,
    gravatarEmail: action.infos.email,
  };
  case ADD_SCORE: return {
    ...state,
    score: state.score + action.score,
  };
  default: return state;
  }
};

export default player;
