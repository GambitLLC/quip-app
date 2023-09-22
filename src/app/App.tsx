/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

// -- theme --
import {theme} from "@/util/Theme"

// -- providers --
import {PaperProvider} from "react-native-paper";
import {CryptoProvider} from "@/lib/context/CryptoContext"
import {TickerProvider} from "@/lib/context/TickerContext"

// -- notifications --
import {NotificationBar} from "@/lib/notification/NotificationBar"

// -- navigations
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

// -- pages --
import Home from "@/pages/game/Home";
import Withdraw from "@/pages/wallet/Withdraw";
import Deposit from "@/pages/wallet/Deposit";
import Buy from "@/pages/wallet/Buy";
import Splash from "@/pages/splash/Splash";
import Auth from "@/pages/splash/Auth";
import GameScreen from "@/pages/game/GameScreen";
import {rootNavRef} from "@/lib/nav/RootNav";

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <PaperProvider theme={theme}>
      <TickerProvider>
        <CryptoProvider>
          <NavigationContainer ref={rootNavRef}>
            <NotificationBar>
              <Stack.Navigator initialRouteName="splash" screenOptions={{headerShown: false}}>
                <Stack.Group>
                  <Stack.Screen name="splash" component={Splash}/>
                  <Stack.Screen name="auth" component={Auth} />
                  <Stack.Screen name="gameHome" component={Home}/>
                  <Stack.Screen name="gameScreen" component={GameScreen} />
                </Stack.Group>
                <Stack.Group screenOptions={{
                  presentation: 'modal',
                }}>
                  <Stack.Screen name="depositWallet" component={Deposit}/>
                  <Stack.Screen name="withdrawWallet" component={Withdraw}/>
                  <Stack.Screen name="buyWallet" component={Buy}/>
                </Stack.Group>
              </Stack.Navigator>
            </NotificationBar>
          </NavigationContainer>
        </CryptoProvider>
      </TickerProvider>
    </PaperProvider>
  );
};

export default App;
