import { DECK_LIST, DECK_DETAIL } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case DECK_LIST :
      return {
        ...state,
        decks: action.decks,
      }
    case DECK_DETAIL:
    return {
        ...state,
        deck: action.deck,
    }
    default :
      return state
  }
}

export default entries