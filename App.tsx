import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import {registerRootComponent} from 'expo';
import App from '@/app/App'
import {useFonts} from 'expo-font';
import {useCallback} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {magic} from "@/lib";

SplashScreen.preventAutoHideAsync();

export default function Main() {
  const [fontsLoaded] = useFonts({
    'Co-Headline-300': require('./assets/fonts/Co-Headline-Light.otf'),
    'Co-Headline-400': require('./assets/fonts/Co-Headline-Regular.otf'),
    'Co-Headline-700': require('./assets/fonts/Co-Headline-Bold.otf'),
    'Lexend-300': require('./assets/fonts/Lexend-Light.ttf'),
    'Lexend-400': require('./assets/fonts/Lexend-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <magic.Relayer/>
        <App/>
      </SafeAreaProvider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Main);
