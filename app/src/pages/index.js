import {useDynamicContext} from '@dynamic-labs/sdk-react-core';
import {Inter} from "next/font/google";
import {createSafe, sendEthToSafe} from "@/lib/safe";
import {Button} from "@/components/ui/button";
import Layout from "@/components/Layout";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
	const {primaryWallet} = useDynamicContext();

	return (
		<Layout>
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="text-4xl font-bold text-gray-700 dark:text-gray-300">
					Welcome to Foo
				</div>
			</div>
			<Button onClick={() => {
				createSafe(primaryWallet)
			}}>
				Create Safe
			</Button>
			<Button onClick={() => {
				sendEthToSafe(primaryWallet, "0x9754B56ab0BF8D59E9384ce3318Dc33220dA320f")
			}}>
				Send Eth to Safe
			</Button>
		</Layout>
	);
}
