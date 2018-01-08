import React from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import Deck from "./Deck";
import { getDeck, getDecks, addDeck } from "../helpers/deckHelper";
import { connect } from "react-redux";

class DeckList extends React.Component {
  state = {
    deckSelected: null
  };

  componentDidMount() {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.deckId != null
    ) {

      this.setState(
        {
          deckSelected: this.props.navigation.state.params.deckId
        }, 
        () => getDeck(this.props.navigation.state.params.deckId)(this.props.dispatch)
      );
    } else {
      getDecks()(this.props.dispatch);
    }
  }

  onDeckPress(deck_id) {
    let deck = this.props.decks.filter(deck => deck.id === deck_id)[0];

    this.props.navigation.navigate("DeckList", {
      name: deck.title,
      deckId: deck_id
    });
  }

  onAddCard(deck_id) {
    let deck = this.props.decks.filter(deck => deck.id === deck_id)[0];
    this.props.navigation.navigate("AddCard", {
      deckId: deck_id, 
      deckTitle: deck.title,
    });
  }
  onStartQuiz(deck_id) {
    let deck = this.props.decks.filter(deck => deck.id === deck_id)[0];
    this.props.navigation.navigate("Quiz", {
      deck: deck, 
      deckTitle: deck.title,
    });
  }

  render() {
    return this.props.decks.length === 0 ? (
      <Text style={styles.text}>No decks available, please create your first deck</Text>
    ) : (
      <FlatList
        style={styles.container}
        data={this.state.deckSelected != null ? this.props.deck : this.props.decks}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <Deck
            {...item}
            onPress={deck_id => this.onDeckPress(deck_id)}
            onAddCard={deck_id => this.onAddCard(deck_id)}
            onStartQuiz={deck_id => this.onStartQuiz(deck_id)}
            collapsed={this.state.deckSelected != null ? false : true}
          />
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    decks: state.decks ? state.decks : [],
    deck: state.deck ? [state.deck]: []
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
  text:{
    flex: 0.1,
    textAlign:'center',
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 100
  }
});

export default connect(mapStateToProps)(DeckList);
