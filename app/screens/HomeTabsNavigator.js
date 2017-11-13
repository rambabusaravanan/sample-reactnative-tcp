import React from 'react'
import { TabNavigator } from 'react-navigation'
import HomeScreen from './HomeScreen'
import QuoteScreen from './QuoteScreen'

const HomeTabsNavigator = TabNavigator(
  {
    Home1: { screen: QuoteScreen },
    Home2: { screen: QuoteScreen },
    Home3: { screen: QuoteScreen },
  },
  {
    navigationOptions: {
      headerTitle: 'My Watchlist',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
    },
    tabBarOptions: {
      lazy: true, // TODO: yet to verify
      // scrollEnabled: true,
      activeTintColor: '#C2252A',
      inactiveTintColor: 'grey',
      // inactiveBackgroundColor: 'white',
      // activeBackgroundColor: 'white',
      // tabStyle: {
      //   backgroundColor: 'white',
      // },
      style: {
        backgroundColor: 'white',  // TODO: ripple effect missed
      },
      indicatorStyle: {
        backgroundColor: '#C2252A',
      },
    }
  }
);

export default HomeTabsNavigator;