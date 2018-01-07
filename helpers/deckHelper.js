import { AsyncStorage } from "react-native";

import * as acts from "../actions";

export const DECKS_STORAGE_KEY = "FlashCards:decks";

export const getDeck = deckId => dispatch => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    let res = JSON.parse(results);
    dispatch && dispatch(acts.deckDetail(res[deckId]));
    return res[deckId];
  });
};
export const getDecks = () => dispatch => {
  console.log("GetDECKS", dispatch);
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    let decks = [];
    let res = JSON.parse(results);
    Object.keys(res).map(key => decks.push(res[key]));
    dispatch && dispatch(acts.deckList(decks));
    return decks;
  });
};

export const addDeck = deck => dispatch => {
  console.log("addDeck", deck.id, dispatch);
  if (deck.id == null) {
    return getDecks()().then(decks => {
      var id = decks.reduce((prev, curr) => {
        return curr.id > prev ? curr.id : prev;
      }, 0);
      id = id + 1;
      console.log("New id", id);
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
export const addCard = (deckId, card) => dispatch => {
  return getDeck(deckId)().then(deck => {
    deck.questions.push(card);
    dispatch(acts.deckDetail(deck));
    return addDeck(deck)(dispatch);
  });
};
