import {StyleSheet, View} from 'react-native';
import {theme} from "@/util/Theme"
import Sol from '../candy/Sol';
import WalletNavIcon from "./WalletNavIcon";
import FontAwesome from "@expo/vector-icons/FontAwesome"
import {Text} from "../text/Text"
import {m, p} from "../styles/Spacing"
import {useCrypto} from "../context/CryptoContext"
import {Usdc} from "../candy/Usdc"

interface TopWalletInfoProps {}

export function TopWalletInfo(props: TopWalletInfoProps) {
  const crypto = useCrypto()

  return (
    <View style={[styles.topWalletInfo, p('a', 6)]}>
      {/*Top Part of Wallet Info*/}
      <View style={[m('b', 6), styles.topInfo]}>
        <View style={[styles.cryptoBalance]}>
          <FontAwesome size={28} name="usd"/>
          <Text style={styles.usdBal}>{
            (crypto.usdcBalance ?? 0).toFixed(2)
            // ((crypto.balance ?? 0) * usdPrice).toFixed(2)
          } USDC</Text>
        </View>
      </View>
      {/*Bottom Part of Wallet Info*/}
      <View style={[styles.bottomInfo]}>
        <WalletNavIcon title="Deposit" icon="arrow-downward" route="depositWallet"/>
        <WalletNavIcon title="Withdraw" icon="arrow-upward" route="withdrawWallet"/>
        <WalletNavIcon title="Buy" icon="credit-card" route="buyWallet"/>
        <WalletNavIcon title="QR Code" icon="qr-code-scanner" route="depositWallet"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topWalletInfo: {
    backgroundColor: theme.colors.s5,
    borderRadius: 24,
  },
  cryptoBalance: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  solIcon: {
    width: 16,
    height: 16,
  },
  usdBal: {
    fontSize: 32,
    lineHeight: 32 * 1.4,
    marginLeft: 4,
    marginTop: 4,
    fontFamily: 'Co-Headline-700'
  },
  solBal: {
    opacity: .4,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    marginLeft: 4,
    marginTop: 4,
    fontFamily: 'Co-Headline-400'
  }
});

export default TopWalletInfo;
