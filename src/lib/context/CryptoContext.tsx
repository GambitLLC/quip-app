import {SolanaExtension} from "@magic-ext/solana";
import {Magic, MagicSDKExtensionsOption, MagicUserMetadata} from "@magic-sdk/react-native-expo";
import {Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction,} from '@solana/web3.js';
import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {MagicSDKAdditionalConfiguration} from "@magic-sdk/provider/dist/types/core/sdk";
import {AuthExtension} from "@magic-ext/auth";
import {AccountLayout, TOKEN_PROGRAM_ID, createTransferInstruction} from "@solana/spl-token";
import {useNotificationStore} from "../store/NotificationStore";

const RPC_URL = 'https://api.devnet.solana.com'
const MAGIC_PUB_KEY = 'pk_live_79385C11B09DBB96'

const USDC_MINT_ADDRESS = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU')
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')

const solanaExtension = new SolanaExtension({
  rpcUrl: RPC_URL,
})

const authExtension = new AuthExtension()

export const magic = new Magic(MAGIC_PUB_KEY, {
  extensions: [
    authExtension,
    solanaExtension
  ]
} as MagicSDKAdditionalConfiguration)

export interface TransactionItem {
  address: string,
  timestamp: number,
  amount: number,
}

export interface TransactionDay {
  date: number,
  items: TransactionItem[],
}

// Define the structure of the Web3 context state
type CryptoContextType = {
  magic: Magic<MagicSDKExtensionsOption<"solana">>,
  metadata: MagicUserMetadata | null,
  isLoggedIn: boolean,
  connection: Connection,
  pubKey: PublicKey | null,
  usdcPubKey: PublicKey | null,
  balance: number | null,
  usdcBalance: number | null,
  address: string | null,
  usdcAddress: string | null,
  transactions: TransactionDay[],
  usdcTransactions: TransactionDay[],
  send: (destinationAddress: string, sol: number) => Promise<string | null>,
  sendUsdc: (destinationAddress: string, usdc: number) => Promise<string | null>,
  logout: () => Promise<void>,
  setIsLoggedIn: (isLoggedIn: boolean) => void,
  getUSDCTransactionList: () => Promise<void>,
  getUSDCTokenBalance: () => Promise<void>,
}

// Create the context with default values
const CryptoContext = createContext<CryptoContextType>({
  // @ts-ignore
  magic,
  metadata: null,
  isLoggedIn: false,
  connection: new Connection(RPC_URL),
  pubKey: null,
  usdcPubKey: null,
  balance: null,
  usdcBalance: null,
  address: null,
  usdcAddress: null,
  transactions: [],
  usdcTransactions: [],
  send: async () => { return null },
  sendUsdc: async () => { return null },
  logout: async () => {},
  setIsLoggedIn: (isLoggedIn) => {},
  getUSDCTransactionList: async () => {},
  getUSDCTokenBalance: async () => {},
})

// Custom hook to use the Web3 context
export const useCrypto = () => useContext(CryptoContext)


interface CryptoProviderProps {
  children: React.ReactNode
}

export function CryptoProvider(props: CryptoProviderProps) {
  const connection = new Connection(RPC_URL)

  const [metadata, setMetadata] = useState<MagicUserMetadata | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [pubKey, setPubKey] = useState<PublicKey | null>(null)
  const [usdcPubKey, setUsdcPubKey] = useState<PublicKey | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null)
  const [transactions, setTransactions] = useState<TransactionDay[]>([])
  const [usdcTransactions, setUsdcTransactions] = useState<TransactionDay[]>([])

  const address = useMemo(() => metadata?.publicAddress ?? null, [metadata])
  const usdcAddress = useMemo(() => usdcPubKey?.toBase58() ?? null, [usdcPubKey])

  const USDC_DECIMALS = 1_000_000

  const notifications = useNotificationStore()

  async function logout() {
    //log out of magic
    await magic.user.logout()

    //reset state
    setMetadata(null)
    setIsLoggedIn(false)
    setPubKey(null)
    setUsdcPubKey(null)
    setBalance(null)
    setUsdcBalance(null)
    setTransactions([])
    setUsdcTransactions([])
  }

  async function getUSDCTransactionList() {
    if (usdcPubKey === null) return

    //init usdcTransactions
    const transactionList = await connection.getSignaturesForAddress(usdcPubKey)
    const txs = await connection.getParsedTransactions(transactionList.map(e => e.signature), {maxSupportedTransactionVersion:0})

    const usdcTxsByDay = txs.reduce((acc: TransactionDay[], tx) => {
      if (!tx?.blockTime || !tx?.meta) return acc

      const date = new Date(tx.blockTime * 1000).setHours(0,0,0,0)

      const idx = tx.transaction.message.accountKeys.findIndex(e => e.pubkey.toString() === usdcPubKey?.toString())

      const otherAddress = tx.transaction.message.accountKeys.find(e =>
        e.pubkey.toString() !== usdcPubKey?.toString()
        && e.pubkey.toString() !== SystemProgram.programId.toString()
      )

      console.log(otherAddress?.pubkey.toString())
      console.log(idx)
      console.log(tx.meta.postTokenBalances)
      console.log(tx.meta.preTokenBalances)
      console.log("-------------------------------------")

      const postTokenBalance = tx.meta.postTokenBalances?.find(e => e.accountIndex === idx)
      const preTokenBalance = tx.meta.preTokenBalances?.find(e => e.accountIndex === idx)

      if (postTokenBalance === undefined) return acc

      const postTokenAmt = Number(postTokenBalance.uiTokenAmount.amount)
      const preTokenAmt = Number(preTokenBalance?.uiTokenAmount?.amount ?? 0)

      const item: TransactionItem = {
        address: otherAddress?.pubkey.toString() ?? usdcPubKey?.toString() ?? "",
        timestamp: tx.blockTime * 1000,
        amount: (postTokenAmt - preTokenAmt) / USDC_DECIMALS,
      }

      const day = acc.find(e => e.date === date)
      if (day) {
        day.items.push(item)
      } else {
        acc.push({
          date,
          items: [item]
        })
      }

      return acc
    }, [])

    setUsdcTransactions(usdcTxsByDay)
  }

  async function getUSDCTokenBalance() {
    if (pubKey === null) return

    const tokenAccounts = await connection.getTokenAccountsByOwner(
      pubKey,
      {
        programId: TOKEN_PROGRAM_ID
      }
    )

    tokenAccounts.value.forEach((tokenAccount) => {
      const accountData = AccountLayout.decode(tokenAccount.account.data);

      if (accountData.mint.toBase58() === "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU") {
        console.log("Found USDC account!")

        setUsdcPubKey(tokenAccount.pubkey)
        setUsdcBalance(Number(accountData.amount) / USDC_DECIMALS)

        connection.onAccountChange(tokenAccount.pubkey, async (accountInfo) => {
          const accountData = AccountLayout.decode(accountInfo.data)

          if (accountData.mint.toBase58() === "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU") {
            console.log("Updated USDC account!")
            setUsdcBalance(Number(accountData.amount) / USDC_DECIMALS)
            console.log(tokenAccount.pubkey)
          }
        })
      }
    })
  }

  async function send(destinationAddress: string, sol: number): Promise<string | null> {
    const lamports = sol * LAMPORTS_PER_SOL;
    if (!connection || !pubKey || !balance) return null;

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

    const signedTransaction = await magic.solana.signTransaction(transactionMagic, serializeConfig)
    const tx = Transaction.from(signedTransaction.rawTransaction);

    return connection.sendRawTransaction(tx.serialize());
  }

  async function sendUsdc(destinationAddress: string, usdc: number) {
    if (pubKey === null || usdcPubKey === null || balance === null) return null

    // Notes:
    // 1. For a token transfer to succeed the recipient must have a token account with the compatible mint already created
    // 2. The Associated Token Account program allows the sender to create the associated token account for the receiver

    // find the associated USDC token account for the recipient
    const destinationPubKey = new PublicKey(destinationAddress)

    const [associatedTokenAccount] = PublicKey.findProgramAddressSync(
      [destinationPubKey.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), USDC_MINT_ADDRESS.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )

    console.log(associatedTokenAccount)

    // if the associated token account doesn't exist, error
    const associatedTokenAccountInfo = await connection.getAccountInfo(associatedTokenAccount)
    if (associatedTokenAccountInfo === null) {
      notifications.add({
        id: performance.now().toString(),
        message: "Token account doesn't exist!",
        type: "error"
      })
      return null
    }

    // if the associated token account exists, send the tokens
    console.log(AccountLayout.decode(associatedTokenAccountInfo.data))

    //do magic stuff
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

    const instruction = createTransferInstruction(
      usdcPubKey,
      associatedTokenAccount,
      pubKey,
      usdc * USDC_DECIMALS,
      [],
      TOKEN_PROGRAM_ID
    )

    transactionMagic.add(...([instruction]))

    const serializeConfig = {
      requireAllSignatures: false,
      verifySignatures: true,
    }

    const signedTransaction = await magic.solana.signTransaction(transactionMagic, serializeConfig)
    const tx = Transaction.from(signedTransaction.rawTransaction);

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

    //init transaction list
    const transactionList = await connection.getSignaturesForAddress(pub)
    const txs = await connection.getParsedTransactions(transactionList.map(e => e.signature), {maxSupportedTransactionVersion:0})

    const txsByDay: TransactionDay[] = []

    txs.forEach((tx) => {
      if (!tx?.blockTime || !tx?.meta) return

      const date = new Date(tx.blockTime * 1000).setHours(0,0,0,0)

      const idx = tx.transaction.message.accountKeys.findIndex(e => e.pubkey.toString() === pub.toString())

      const otherAddress = tx.transaction.message.accountKeys.find(e =>
          e.pubkey.toString() !== pub.toString()
          && e.pubkey.toString() !== SystemProgram.programId.toString()
      )

      const item: TransactionItem = {
          address: otherAddress?.pubkey.toString() ?? pub.toString(),
          timestamp: tx.blockTime * 1000,
          amount: (tx.meta.postBalances[idx] - tx.meta.preBalances[idx]) / LAMPORTS_PER_SOL,
      }

      const day = txsByDay.find(e => e.date === date)
      if (day) {
        day.items.push(item)
      } else {
        txsByDay.push({
          date,
          items: [item]
        })
      }
    })

    setTransactions(txsByDay)


    console.log("Initialized Crypto!")
  }

  useEffect(() => {
    if (pubKey === null) return
    getUSDCTokenBalance()
  }, [pubKey])

  useEffect(() => {
    if (usdcPubKey === null) return
    getUSDCTransactionList()
  }, [usdcPubKey])

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
        usdcPubKey,
        balance,
        usdcBalance,
        address,
        usdcAddress,
        transactions,
        usdcTransactions,
        send,
        sendUsdc,
        logout,
        setIsLoggedIn,
        getUSDCTransactionList,
        getUSDCTokenBalance,
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  )
}

export default CryptoProvider;
