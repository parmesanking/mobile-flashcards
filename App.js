import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import NewDeck from "./components/NewDeck";
import NewCard from "./components/NewCard"
import { Constants } from "expo";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

const Tabs = TabNavigator(
  {
    Home: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ tintColor }) => <Foundation name="page-add" size={30} color={tintColor} />
      }
    }
  },
  {
    navigationOptions: {
      header: null
    }
    /*tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }*/
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      headerTintColor: "#FFF",
      headerStyle: {
        backgroundColor: "#888"
      }
    }
  },
  AddCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add a card',
      headerTintColor: "#FFF",
      headerStyle: {
        backgroundColor: "#888"
      }
    }
  }

});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "green",
              height: Constants.statusBarHeight
            }}
          >
            <StatusBar
              translucent
              backgroundColor={"green"}
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
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center"
  }
});
