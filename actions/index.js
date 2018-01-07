export const DECK_LIST = 'DECK_LIST'
export const DECK_DETAIL = 'DECK_DETAIL'

export const deckList = (decks) => {
  return {
    type: DECK_LIST,
    decks,
  }
}
export const deckDetail = (deck) => {
  return {
    type: DECK_DETAIL,
    deck,
  }
}
