import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { fetchCurrentCryptoPrice, getCryptos } from './services/CryptoService'
import type { Cryptocurrency, Pair } from './types'


type CryptStore = {
     cryptocurrencies: Cryptocurrency[]
     fetchCryptos: () => Promise<void>
     fetchData: (pair: Pair) => Promise<void>
}




export const useCryptoStore = create<CryptStore>()(devtools((set) => ({
     cryptocurrencies: [],
     fetchCryptos: async () => {
          const cryptocurrencies = await getCryptos()
          set(() => ({
               cryptocurrencies
          }))
     },
     fetchData: async (pair) => {
          await fetchCurrentCryptoPrice(pair)
     }
})))
