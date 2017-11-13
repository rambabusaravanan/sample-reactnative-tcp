import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation'
import SplashScreen from './app/screens/SplashScreen'
import HomeTabsNavigator from './app/screens/HomeTabsNavigator'

const App = StackNavigator({
    Splash: { screen: SplashScreen },
    HomeTabs: { screen: HomeTabsNavigator },
});

AppRegistry.registerComponent('sample', () => App);
