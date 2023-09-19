import {StyleSheet, View} from "react-native";
import {Screen, spacing, useStripeCryptoOnrampStore, useCrypto} from "@/lib";
import WebView from "react-native-webview";
import {useEffect, useMemo, useState} from "react";
import {ActivityIndicator} from "react-native-paper";

interface BuyProps {

}

export function Buy(props: BuyProps) {
  const {address} = useCrypto()
  const {redirectUrl, setRedirectUrl} = useStripeCryptoOnrampStore()

  useEffect(() => {
    if (address === null) return

    (async () => {
      const res = await fetch(`https://quip-stripe-crypto-mint-session.azurewebsites.net/api/mintSession?address=${address}`, {
        method: 'POST',
      })

      const json = await res.json()
      const redirectUrl = json['redirect_url']
      if (redirectUrl !== undefined) {
        setRedirectUrl(json['redirect_url'])
      }
    })()
  }, [address])


  return (
    <Screen hasSafeArea={false}>
      {
        redirectUrl === undefined ?
          <ActivityIndicator style={[spacing.fill, spacing.center]} size={"large"}/> :
          <WebView cacheEnabled={true} cacheMode="LOAD_DEFAULT" scrollEnabled={false} source={{uri: redirectUrl}}/>
      }
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default Buy;
