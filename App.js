import React from "react";
import { StyleSheet, Text, View, StatusBar, Picker } from "react-native";
import { Constants } from "expo";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { setLocalNotification} from './helpers/notification'
import {MainNavigator} from './components/Navigation'
export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "#008080",
              height: Constants.statusBarHeight
            }}
          >
            <StatusBar
              translucent
              backgroundColor={"#008080"}
              barStyle="light-content"
            />
          </View>
          <MainNavigator initialRouteName={"Home"} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008080",
    alignItems: "center",
    justifyContent: "center"
  }
});
