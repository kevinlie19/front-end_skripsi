import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { routes, initialRoute } from './routes';

const StackNavigator = createStackNavigator(
  { ...routes },
  {
    initialRouteName: initialRoute,
    headerMode: 'none',
  },
);

const NativeRouter = createAppContainer(StackNavigator);

export default NativeRouter;
