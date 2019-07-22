/**
 * @format
 * @flow
 */
import { createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import SettingsScreen from './components/SettingsScreen';

const LoginNavigator = createSwitchNavigator({
  Login: LoginScreen
})

const BottomTabNav = createBottomTabNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
  Settings: {screen: SettingsScreen},
}, {
  initialRouteName: "Home"
})

// const InitialNavigator = createAnimatedSwitchNavigator({
//   Login: LoginNavigator,
//   Bottom: BottomTabNav
// }, {
//   initialRouteName: "Login",
//   transition: (
//     <Transition.Together>
//       <Transition.Out
//         type="slide-bottom"
//         durationMs={400}
//         interpolation="easeIn"
//       />
//       <Transition.In type="fade" durationMs={500} />
//     </Transition.Together>
//   ),
// })

const InitialNavigator = createSwitchNavigator({
  Login: LoginNavigator,
  Bottom: BottomTabNav
}, {
  initialRouteName: "Bottom"
})

const App = createAppContainer(InitialNavigator);

export default App;