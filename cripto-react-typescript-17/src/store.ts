import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { fetchCurrentCryptoPrice, getCryptos } from './services/CryptoService'
import type { Cryptocurrency, CryptoPrice, Pair } from './types'


type CryptStore = {
     cryptocurrencies: Cryptocurrency[]
     result: CryptoPrice,
     loading: boolean
     fetchCryptos: () => Promise<void>
     fetchData: (pair: Pair) => Promise<void>
}




export const useCryptoStore = create<CryptStore>()(devtools((set) => ({
     cryptocurrencies: [],
     //result: {} as CryptoPrice,
     result: {
          IMAGEURL: '',
          PRICE: '',
          HIGHDAY: '',
          LOWDAY: '',
          CHANGEPCT24HOUR: '',
          LASTUPDATE: ''
     },
     loading: false,
     fetchCryptos: async () => {
          const cryptocurrencies = await getCryptos()
          set(() => ({
               cryptocurrencies
          }))
     },
     fetchData: async (pair) => {
          set(() => ({
               loading: true
          }))
          const result = await fetchCurrentCryptoPrice(pair)
          set(() => ({
               result,
               loading: false
          }))
     }
})))
