import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import DeckList from "./DeckList";
import Deck from "./Deck";
import NewDeck from "./NewDeck";
import NewCard from "./NewCard"
import Quiz from "./Quiz"
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";

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

export const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'Deck details',
      headerTintColor: "#FFF",
      headerStyle: {
        backgroundColor: "#008080"
      }
    }
  },
  AddCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add a card',
      headerTintColor: "#FFF",
      headerStyle: {
        backgroundColor: "#008080"
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: "#FFF",
      headerStyle: {
        backgroundColor: "#008080"
      }
    }
  }

});
