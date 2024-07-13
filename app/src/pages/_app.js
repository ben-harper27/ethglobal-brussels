import "@/styles/globals.css";
import {DynamicContextProvider} from '@dynamic-labs/sdk-react-core';
import {EthereumWalletConnectors} from "@dynamic-labs/ethereum"

export default function App({Component, pageProps}) {
	return (
		<DynamicContextProvider
			settings={{
				environmentId: '099cc9fb-5b06-4c40-8218-4fe90f319127',
				walletConnectors: [EthereumWalletConnectors],
			}}>
			<Component {...pageProps} />
		</DynamicContextProvider>
	);
}
