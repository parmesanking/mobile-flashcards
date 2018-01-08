import { DECK_LIST, DECK_DETAIL } from "../actions";

const INITIAL_STATE = {
  decks: null,
  deck: null
};

function entries(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DECK_LIST:
      return {
        ...state,
        decks: action.decks
      };
    case DECK_DETAIL:
      return {
        ...state,
        deck: action.deck
      };
    default:
      return state;
  }
}

export default entries;
