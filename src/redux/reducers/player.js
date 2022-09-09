import { ADD_PLAYER_INFOS } from '../actions';

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
  default: return state;
  }
};

export default player;
