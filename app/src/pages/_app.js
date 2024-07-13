import "@/styles/globals.css";
import {DynamicContextProvider, getAuthToken} from '@dynamic-labs/sdk-react-core';
import {EthereumWalletConnectors} from "@dynamic-labs/ethereum"
import {createUserIfNotExist} from "@/lib/api/user";

export default function App({Component, pageProps}) {
	return (
		<DynamicContextProvider
			settings={{
				environmentId: '099cc9fb-5b06-4c40-8218-4fe90f319127',
				walletConnectors: [EthereumWalletConnectors],
				handlers: {
					handleVerifiedUser: async (args) => {
						console.log("Handling verified user", args);
						const userData = {
							name: args.user.firstName + " " + args.user.lastName,
							email: args.user.email,
						};

						await createUserIfNotExist(userData, getAuthToken());
					},
				},
			}}
		>
			<Component {...pageProps} />
		</DynamicContextProvider>
	);
}
