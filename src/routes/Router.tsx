import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  Splash,
  Welcome,
  Login,
  Register,
  OnBoarding,
  Home,
  Leaderboard,
  MyProfile,
  EditProfile,
  About,
  AvatarCollection,
  BadgeCollection,
  ChoosePaket,
  Exam,
  Result,
  Review,
} from '../screens';

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      headerShown: false,
    },
  },
  OnBoarding: {
    screen: OnBoarding,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AppStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        headerShown: false,
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    Leaderboard: {
      screen: Leaderboard,
      navigationOptions: {
        headerShown: false,
      },
    },
    MyProfile: {
      screen: MyProfile,
      navigationOptions: {
        headerShown: false,
      },
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        headerShown: false,
      },
    },
    About: {
      screen: About,
      navigationOptions: {
        headerShown: false,
      },
    },
    AvatarCollection: {
      screen: AvatarCollection,
      navigationOptions: {
        headerShown: false,
      },
    },
    BadgeCollection: {
      screen: BadgeCollection,
      navigationOptions: {
        headerShown: false,
      },
    },
    ChoosePaket: {
      screen: ChoosePaket,
      navigationOptions: {
        headerShown: false,
      },
    },
    Exam: {
      screen: Exam,
      navigationOptions: {
        headerShown: false,
      },
    },
    Result: {
      screen: Result,
      navigationOptions: {
        headerShown: false,
      },
    },
    Review: {
      screen: Review,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
    Splash: Splash,
  },
  {
    initialRouteName: 'Splash',
  },
);

const NativeRouter = createAppContainer(AppNavigator);

export default NativeRouter;
