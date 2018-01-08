import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Dimensions,
  Alert,
  Button,
  Animated
} from "react-native";
import { addCard } from "../helpers/deckHelper";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import {
  clearLocalNotification,
  setLocalNotification
} from "../helpers/notification";
class Quiz extends React.Component {
  state = {
    deck: null,
    isCardFlipped: false,
    currentQuestionIx: 0,
    completedQuestions: 0,
    correctAnswers: 0,
    isCurrentCorrect: null
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      if (value < 90 && this.state.isCardFlipped) {
        this.setState({ isCardFlipped: false });
      } else if (value > 90 && !this.state.isCardFlipped) {
        this.setState({ isCardFlipped: true });
      }
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"]
    });
  }

  componentWillUnmount(){
    this.animatedValue.removeAllListeners()
  }

  componentDidMount() {
    this.props.navigation.state.params.deck &&
      this.setState({ deck: this.props.navigation.state.params.deck });
  }

  onQuestionAnswer(answer) {
    //clear notification for today
    if (this.state.completedQuestions == 0) {
      clearLocalNotification().then(() => setLocalNotification());
    }

    this.setState({
      completedQuestions: this.state.completedQuestions + 1,
      correctAnswers: this.state.correctAnswers + (answer ? 1 : 0),
      isCurrentCorrect: answer
    });
  }

  showAnswer() {
    this.flipCard(this.state.isCardFlipped);
  }

  flipCard(toFront) {
    Animated.spring(this.animatedValue, {
      toValue: toFront ? 0 : 180,
      friction: 8,
      tension: 10
    }).start();
  }

  nextQuestion() {
    this.flipCard(true);
    this.setState({
      currentQuestionIx: this.state.currentQuestionIx + 1,
      isCurrentCorrect: null
    });
  }

  onRestartQuiz() {
    this.flipCard(true);
    this.setState({
      currentQuestionIx: 0,
      completedQuestions: 0,
      correctAnswers: 0,
      isCurrentCorrect: null
    });
  }

  render() {
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    };
    return (
      this.state.deck && (
        <View style={styles.container}>
          <View>
            <Animated.View
              style={[
                styles.card,
                frontAnimatedStyle,
                { zIndex: this.state.isCardFlipped ? 0 : 1 }
              ]}
              disabled={this.state.isCardFlipped}
            >
              {this.state.deck && (
                <Text style={styles.title}>
                  {
                    this.state.deck.questions[this.state.currentQuestionIx]
                      .question
                  }
                </Text>
              )}

              <Button
                title="See the answer"
                color="red"
                onPress={() => this.showAnswer()}
              />
              <View style={styles.buttonsContainer}>
                {this.state.isCurrentCorrect == null && (
                  <View>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonOK]}
                      onPress={() => this.onQuestionAnswer(true)}
                    >
                      <Text style={styles.buttonText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonKO]}
                      onPress={() => this.onQuestionAnswer(false)}
                    >
                      <Text style={styles.buttonText}>Incorrect</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {this.state.isCurrentCorrect != null && (
                  <FontAwesome
                    name={
                      this.state.isCurrentCorrect ? "thumbs-up" : "thumbs-down"
                    }
                    size={50}
                    color={this.state.isCurrentCorrect ? "green" : "red"}
                  />
                )}
              </View>
            </Animated.View>
            <Animated.View
              style={[
                backAnimatedStyle,
                styles.card,
                styles.flipCardBack,
                { zIndex: this.state.isCardFlipped ? 1 : 0 }
              ]}
              disabled={!this.state.isCardFlipped}
            >
              {this.state.deck && (
                <Text style={styles.title}>
                  {
                    this.state.deck.questions[this.state.currentQuestionIx]
                      .answer
                  }
                </Text>
              )}
              <Button
                title="Back to question"
                color="blue"
                onPress={() => this.showAnswer()}
              />
            </Animated.View>
          </View>
          <View style={styles.bottomContainer}>
            {this.state.completedQuestions ==
              this.state.deck.questions.length && (
              <Text style={{ fontSize: 16 }}>{`Score: ${Number(
                this.state.correctAnswers / this.state.completedQuestions * 100
              ).toFixed(2)}%`}</Text>
            )}
            <View style={{ flex: 0.1 }} />
            {this.state.deck.questions.length > 0 &&
              this.state.currentQuestionIx <
                this.state.deck.questions.length - 1 && (
                <Button
                  style={[styles.title]}
                  title={`Next (${this.state.deck.questions.length -
                    1 -
                    this.state.currentQuestionIx})`}
                  color="red"
                  onPress={() => this.nextQuestion()}
                />
              )}
            {((this.state.currentQuestionIx != 0 &&
              this.state.currentQuestionIx ==
                this.state.deck.questions.length - 1) ||
              (this.state.currentQuestionIx == 0 &&
                this.state.completedQuestions > 0)) && (
              <Button
                style={[styles.title]}
                title="Restart Quiz"
                color="red"
                onPress={() => this.onRestartQuiz()}
              />
            )}
          </View>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height - 220,
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    backgroundColor: "#d3d3d3",
    backfaceVisibility: "hidden"
  },
  flipCardBack: {
    position: "absolute",
    top: 0
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: 50,
    width: Dimensions.get("window").width - 120,
  },
  button: {
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    width: Dimensions.get("window").width - 80
  },
  buttonOK: {
    backgroundColor: "green",
    borderColor: "green"
  },
  buttonKO: {
    backgroundColor: "red",
    borderColor: "red"
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonsContainer: {
    flex: 0.5
  },
  bottomContainer: {
    flexDirection: "row",
    height: 50,
    width: Dimensions.get("window").width - 40,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5
  }
});

export default connect()(Quiz);
