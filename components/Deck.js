import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableHighlight,
  Button
} from "react-native";

const Deck = props => {
  //console.log("Deck", props.title, props.questions);
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!props.collapsed}
      onPress={() => props.onPress(props.id)}
    >
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subTitle}>
          {props.questions.length > 0
            ? `${props.questions.length} cards`
            : "No cards available"}
        </Text>
        {!props.collapsed && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.onAddCard(props.id)}
            >
              <Text>Add Card</Text>
            </TouchableOpacity>
            {props.questions.length > 0  && <TouchableOpacity
              style={styles.button}
              onPress={() => props.onStartQuiz(props.id)}
            >
              <Text>Start Quiz</Text>
            </TouchableOpacity>}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4A460",
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "stretch"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "red",
    backgroundColor: "transparent",
    alignSelf: "center",
    marginTop: 15
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "transparent",
    alignSelf: "center",
    marginBottom: 15
  },
  buttonContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    margin:5, 
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "black"
  }
});

export default Deck;
