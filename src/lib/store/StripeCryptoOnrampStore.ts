import {create} from "zustand";

interface StripeCryptoOnrampStore {
  redirectUrl: string | undefined,
  setRedirectUrl: (url: string) => void,
}

const useStripeCryptoOnrampStore = create<StripeCryptoOnrampStore>((set) => ({
  redirectUrl: undefined,
  setRedirectUrl: (url: string) => set((state) => ({
    redirectUrl: url
  }))
}))

export {
  StripeCryptoOnrampStore,
  useStripeCryptoOnrampStore
}