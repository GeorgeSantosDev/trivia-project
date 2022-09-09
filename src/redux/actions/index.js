export const ADD_PLAYER_INFOS = 'ADD_PLAYER_INFOS';
export const ADD_SCORE = 'ADD_SCORE';

export const addPlayerInfos = (infos) => ({ type: ADD_PLAYER_INFOS, infos });
export const addScore = (score) => ({ type: ADD_SCORE, score });
