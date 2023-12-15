import {NativeSyntheticEvent, StyleSheet, TextInputSubmitEditingEventData, View} from "react-native";
import {m, Screen, spacing, Text, useCrypto} from "@/lib";
import {Button, TextInput} from "react-native-paper";
import {useEffect, useState} from "react";
import {CommonActions, useNavigation} from "@react-navigation/native";


interface AuthProps {

}

type LoginModalState = "login" | "otp" | "loading" | "error"

export function Auth(props: AuthProps) {
  const [state, setState] = useState<LoginModalState>("login")
  const { magic, setIsLoggedIn } = useCrypto()

  const navigation = useNavigation()

  function login(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) {
    const email = e.nativeEvent.text

    const loginEvent = magic.auth.loginWithEmailOTP({ email })

    loginEvent
      .on('email-otp-sent', () => {
        setState("otp")
      })
      .on('invalid-email-otp', () => {
        setState("error")
        loginEvent.emit('cancel');
      })
      .on('done',async (result) => {
        setIsLoggedIn(true)
        navigation.dispatch({
          ...CommonActions.navigate("gameHome"),
        })
      })
      .on('error', (error) => {
        setState("error")
        console.error(error)
      })
  }

  function logout() {
    magic.user.logout()
  }

  useEffect(() => {
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        setIsLoggedIn(true)
        navigation.dispatch({
            ...CommonActions.navigate("gameHome"),
        })
      }
    })
  }, [])

  return (
    <Screen style={[spacing.fill, styles.container]}>
      <View style={[spacing.fill]}>
        <View style={[m('a', 6)]}>
          <Text style={[m('b', 2)]}>Auth!</Text>
          <TextInput autoFocus={true} onSubmitEditing={login} keyboardType="email-address" autoComplete={"email"} label="Email Address" placeholder="example@mail.com" mode={"outlined"}/>
        </View>
        <Button onPress={logout}>
          <Text>Logout</Text>
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  magic: {
    position: "absolute",
    width: "100%",
    height: "100%",
  }
});

export default Auth;
