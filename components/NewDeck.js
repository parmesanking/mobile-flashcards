import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import { addDeck } from "../helpers/deckHelper";
import { connect } from "react-redux";

class NewDeck extends React.Component {
  state = {
    deckTitle: ""
  };

  onSaveDeckPress() {
    addDeck({ title: this.state.deckTitle, questions: [] })(this.props.dispatch)
      .then(deck => {
        this.setState({ deckTitle: "" });
        Alert.alert("Confirm", "New deck has been created!", [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]);
      })
      .catch(err => console.log("error saving deck", err));
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>Please enter a deck name</Text>
        <TextInput
          style={styles.input}
          value={this.state.deckTitle}
          underlineColorAndroid={'transparent'}
          onChangeText={input => this.setState({ deckTitle: input })}
        />

        <View style={{ opacity: this.state.deckTitle.length > 0 ? 1 : 0.5 }}>
          <TouchableOpacity
            style={[styles.button]}
            disabled={!(this.state.deckTitle.length > 0)}
            onPress={() => this.onSaveDeckPress()}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center"
  },
  title: {
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: 100,
    width: 200,
    height: 44
  },
  input: {
    alignItems: "center",
    alignContent: "center",
    width: Dimensions.get("window").width - 40,
    height: 44,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    paddingLeft: 5,
    paddingRight: 5, 
    
  },
  button: {
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    width: Dimensions.get("window").width - 80,
    backgroundColor: "#1d396f",
    borderColor: "#1d396f"
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default connect()(NewDeck);
