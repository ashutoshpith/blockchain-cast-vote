import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { WagmiConfig, createClient, configureChains, defaultChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider  } from "wagmi/providers/infura";
import { InjectedConnector } from 'wagmi/connectors/injected'

const infuraId = 'a4ec2dca292849b5b5f7075fdec338ff'
const { chains, provider, webSocketProvider } = configureChains(
  defaultChains, 
  [infuraProvider({infuraId}),  publicProvider()],
)
const client = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({chains})],
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
      </WagmiConfig>
    )
}

export default MyApp
