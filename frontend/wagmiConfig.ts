import { http, createConfig } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { RPC_PROVIDER_URL } from './src/config'

export const wagmiConfig = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(RPC_PROVIDER_URL),
  },
})
