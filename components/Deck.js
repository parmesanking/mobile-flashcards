import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableHighlight,
  Button, 
  Dimensions
} from "react-native";

const Deck = props => {
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
            ? `${props.questions.length} card${props.questions.length > 1  ? 's' : ''}`
            : "No cards available"}
        </Text>
        {!props.collapsed && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.onAddCard(props.id)}
            >
              <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
            {props.questions.length > 0  && <TouchableOpacity
              style={styles.button}
              onPress={() => props.onStartQuiz(props.id)}
            >
              <Text style={styles.buttonText}>Start Quiz</Text>
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
    backgroundColor: "#b7e7d7",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#008080',
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

export default Deck;
