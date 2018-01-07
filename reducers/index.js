import { DECK_LIST, DECK_DETAIL } from '../actions'

function entries (state = {}, action) {
    //console.log ("reducer", action)
  switch (action.type) {
    case DECK_LIST :
    console.log ("DECK_LIST")
      return {
        ...state,
        decks: action.decks,
      }
    case DECK_DETAIL:
    console.log ("DECK_DETAIL")

    return {
        ...state,
        deck: action.deck,
    }
    default :
      return state
  }
}

export default entries