import { AsyncStorage } from "react-native";

import * as acts from "../actions";

export const DECKS_STORAGE_KEY = "FlashCards:decks";

/** Get a deck from id and dispatch it to redux */
export const getDeck = deckId => dispatch => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    let res = JSON.parse(results);
    dispatch && dispatch(acts.deckDetail(res[deckId]));
    return res[deckId];
  });
};
/** Get the full deck list and dispatch and dispatch it to redux */
export const getDecks = () => dispatch => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    let decks = [];
    if (results == null) {
      return [];
    } else {
      let res = JSON.parse(results);
      Object.keys(res).map(key => decks.push(res[key]));
      dispatch && dispatch(acts.deckList(decks));
      return decks;
    }
  });
};

/** Add a new deck or update an existing one, dispatch it to redux when stored */
export const addDeck = deck => dispatch => {
  if (deck.id == null) {
    return getDecks()().then(decks => {
      var id = decks.reduce((prev, curr) => {
        return curr.id > prev ? curr.id : prev;
      }, 0);
      id = id + 1;

      return addDeck({ id: id, ...deck })(dispatch);
    });
  } else {
    return AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [deck.id]: deck
      })
    ).then(err => {
      if (err == null) {
        return getDecks()(dispatch);
      }
    });
  }
};

/** Add a question to a deck and dispatch it to redux when stored */
export const addCard = (deckId, card) => dispatch => {
  return getDeck(deckId)().then(deck => {
    deck.questions.push(card);
    dispatch(acts.deckDetail(deck));
    return addDeck(deck)(dispatch);
  });
};
