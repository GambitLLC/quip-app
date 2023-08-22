import { StyleSheet } from "react-native";
import { SolanaExtension } from "@magic-ext/solana";
import { Extension, Magic, MagicSDKExtensionsOption, MagicUserMetadata } from "@magic-sdk/react-native-expo";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import React, {createContext, useContext, useEffect, useState} from "react";
import { MagicSDKAdditionalConfiguration } from "@magic-sdk/provider/dist/types/core/sdk";
import { AuthExtension } from "@magic-ext/auth";

const RPC_URL = 'https://api.devnet.solana.com'

const solanaExtension = new SolanaExtension({
  rpcUrl: RPC_URL,
})

const authExtension = new AuthExtension()

export const magic = new Magic("pk_live_79385C11B09DBB96", {
  extensions: [
    authExtension,
    solanaExtension
  ]
} as MagicSDKAdditionalConfiguration)

// Define the structure of the Web3 context state
type CryptoContextType = {
  magic: Magic<MagicSDKExtensionsOption<"solana">>,
  metadata: MagicUserMetadata | null,
  isLoggedIn: boolean,
  connection: Connection,
  pubKey: PublicKey | null,
  balance: number | null,
  address: string | null,
  send: (destinationAddress: string, sol: number) => Promise<string | null>,
}

// Create the context with default values
const CryptoContext = createContext<CryptoContextType>({
  // @ts-ignore
  magic,
  metadata: null,
  isLoggedIn: false,
  connection: new Connection(RPC_URL),
  pubKey: null,
  balance: null,
  address: null,
  send: async () => { return null },
})

// Custom hook to use the Web3 context
export const useCrypto = () => useContext(CryptoContext)


interface CryptoProviderProps {
  children: React.ReactNode
}

const connection = new Connection(RPC_URL)

export function CryptoProvider(props: CryptoProviderProps) {
  const [metadata, setMetadata] = useState<MagicUserMetadata | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [pubKey, setPubKey] = useState<PublicKey | null>(null)
  const [balance, setBalance] = useState<number | null>(null)

  const address = metadata?.publicAddress ?? null

  magic.user.isLoggedIn().on("done", (result: boolean) => {
    setIsLoggedIn(result)
  })

  async function getBalance(): Promise<number | null> {
    if (!connection || !pubKey) return null;
    return await connection.getBalance(pubKey) / LAMPORTS_PER_SOL;
  }

  async function send(
    destinationAddress: string,
    sol: number,
  ): Promise<string | null> {
    const lamports = sol * LAMPORTS_PER_SOL;
    if (!connection || !pubKey || !balance) return null;

    console.log(pubKey)

    const recipientPubKey = new PublicKey(destinationAddress);
    const hash = await connection.getLatestBlockhash()
    let transactionMagic = new Transaction({
      feePayer: pubKey,
      recentBlockhash: hash.blockhash,
    })

    const feeInLamports = (await connection.getFeeForMessage(
      transactionMagic.compileMessage(),
      'confirmed'
    )).value

    //if we coulnt get the fee, return null
    if (!feeInLamports) return null

    //if the fee is greater than the balance, return null
    if (feeInLamports > (balance * LAMPORTS_PER_SOL)) return null

    const transaction = (feeInLamports + lamports) > (balance * LAMPORTS_PER_SOL)
      ? SystemProgram.transfer({
        fromPubkey: pubKey,
        toPubkey: recipientPubKey,
        lamports: lamports - feeInLamports,
      })
      : SystemProgram.transfer({
        fromPubkey: pubKey,
        toPubkey: recipientPubKey,
        lamports,
      })

    transactionMagic.add(...([transaction]))

    const serializeConfig = {
      requireAllSignatures: false,
      verifySignatures: true,
    }

    console.log(`Destination: ${destinationAddress} | SOL: ${sol} | Fee: ${feeInLamports / LAMPORTS_PER_SOL}`)

    const signedTransaction = await magic.solana.signTransaction(transactionMagic, serializeConfig).then((res: any) => {
      console.log("Signed transaction")
      console.log(res)
      return res
    }).catch((e: any) => {
      console.log("Error signing transaction")
      console.log(e)
      return null
    });

    const tx = Transaction.from(signedTransaction.rawTransaction);

    console.log("Sending transaction")
    return connection.sendRawTransaction(tx.serialize());
  }


  async function init() {
    const met = (await magic?.user.getInfo()) ?? null
    const pub = new PublicKey(met?.publicAddress!!)
    const bal = await connection.getBalance(pub) / LAMPORTS_PER_SOL

    setMetadata(met)
    setPubKey(pub)
    setBalance(bal)

    connection.onAccountChange(pub, async (accountInfo) => {
      setBalance(accountInfo.lamports / LAMPORTS_PER_SOL)
    })

    console.log("Initialized Crypto!")
  }

  useEffect(() => {
    if (!isLoggedIn) return
    init()
  }, [isLoggedIn])

  return (
    <CryptoContext.Provider
      value={{
        // @ts-ignore
        magic,
        metadata,
        isLoggedIn,
        connection,
        pubKey,
        balance,
        address,
        send,
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  )
}

export default CryptoProvider;
