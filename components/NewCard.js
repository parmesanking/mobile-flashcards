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
import { addCard } from "../helpers/deckHelper";
import { connect } from "react-redux";

class NewCard extends React.Component {
  state = {
    question: "",
    answer: ""
  };

  componentDidMount() {}

  onSaveCardPress() {
    if (this.state.question.length == 0 || this.state.answer.length == 0) {
      Alert.alert(
        "Error",
        "Card can be saved if it contains a valid question and a valid answer too",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    } else {
      console.log("card can be saved....");
      addCard(this.props.navigation.state.params.deckId, {
        question: this.state.question,
        answer: this.state.answer
      })(this.props.dispatch)
        .then(deck => {
          this.setState({ question: "", answer: "" });
          Alert.alert("Confirm", "New card has been added to selected deck!", [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]);
        })
        .catch(err => console.log("error adding card to deck"));
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>{`New card will be added to "${
          this.props.navigation.state.params.deckTitle
        }" deck:`}</Text>
        <TextInput
          style={styles.input}
          placeholder="Question"
          value={this.state.question}
          onChangeText={input => this.setState({ question: input })}
        />
        <TextInput
          style={styles.input}
          placeholder="Answer"
          value={this.state.answer}
          onChangeText={input => this.setState({ answer: input })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onSaveCardPress()}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
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
    paddingRight: 5
  },
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("window").width - 40,
    height: 44,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    paddingLeft: 5,
    paddingRight: 5
  },
  button: {
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    width: Dimensions.get("window").width - 80, 
    backgroundColor: '#1d396f',
    borderColor: '#1d396f',
  },   
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
});

export default connect()(NewCard);
