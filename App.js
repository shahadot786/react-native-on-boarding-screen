import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, OnBoardScreen } from './screens';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isFirstLaunch && (
          <Stack.Screen
            name="onBoard"
            component={OnBoardScreen}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
