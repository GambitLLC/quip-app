import {StyleSheet, View} from "react-native";
import {Screen, spacing, useStripeCryptoOnrampStore, useCrypto} from "@/lib";
import WebView from "react-native-webview";
import {useMemo, useRef} from "react";
import {ActivityIndicator} from "react-native-paper";

interface BuyProps {

}

export function Buy(props: BuyProps) {
  const webViewRef = useRef<WebView>()
  const {address} = useCrypto()

  const { redirectUrl, setRedirectUrl } = useStripeCryptoOnrampStore()

  const generateSession = useMemo(() => {
    return (
      <WebView
        ref={webViewRef}
        scrollEnabled={false}
        onMessage={(event) => {
          const data = event.nativeEvent.data

          try {
            const json = JSON.parse(data)
            console.log(json)
            if (json["redirect_url"]) {
              setRedirectUrl(json["redirect_url"])
            }
          } catch (e) {
            console.log(e)
          }
        }}
        source={{
          html: `
            <html lang="en">
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://js.stripe.com/v3/"></script>
                <script src="https://crypto-js.stripe.com/crypto-onramp-outer.js"></script>
                <title></title>
              </head>
              <body>
                <script>
                  window.addEventListener('load', async () => {               
                    try {
                      var myHeaders = new Headers();
                      myHeaders.append("Authorization", "Bearer ${process.env.EXPO_PUBLIC_STRIPE_SECRET_TEST_MODE_API_KEY}");
                      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                      
                      var urlencoded = new URLSearchParams();
                      urlencoded.append("transaction_details[source_currency]", "usd");
                      urlencoded.append("transaction_details[destination_currency]", "sol");
                      urlencoded.append("transaction_details[destination_network]", "solana");
                      urlencoded.append("transaction_details[supported_destination_networks][]", "solana");
                      urlencoded.append("transaction_details[supported_destination_currencies][]", "sol");
                      urlencoded.append("transaction_details[wallet_addresses][solana]", "${address}")
                      urlencoded.append("transaction_details[lock_wallet_address]", "true");
                      
                      var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: urlencoded,
                        redirect: 'follow'
                      };
                      
                      const res = await fetch("https://api.stripe.com/v1/crypto/onramp_sessions", requestOptions)
                      const json = await res.json()
                      window.ReactNativeWebView.postMessage(JSON.stringify(json)) 
                    } catch (e) {
                      window.ReactNativeWebView.postMessage("error")
                      window.ReactNativeWebView.postMessage(e)
                    }
                  })
                </script>
                <div id="onramp-element" />
              </body>
            </html>
          `
        }}
        style={{
          display: "none",
          height: 0,
          width: 0
        }}
      />
    )
  }, [])

  return (
    <Screen hasSafeArea={false}>
      {
        redirectUrl === undefined &&
          <View style={{display: "none"}} pointerEvents="none">
            {generateSession}
          </View>
      }
      {
        redirectUrl === undefined ?
          <ActivityIndicator style={[spacing.fill, spacing.center]} size={"large"}/> :
          <WebView scrollEnabled={false} source={{uri: redirectUrl}}/>
      }
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default Buy;
