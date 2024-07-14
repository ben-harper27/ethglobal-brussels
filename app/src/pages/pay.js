import {useDynamicContext} from '@dynamic-labs/sdk-react-core';
import {Inter} from "next/font/google";
import Layout from "@/components/Layout";
import {Button} from "@/components/ui/button";
import {sendEthToSafe} from "@/lib/safe";
import Image from "next/image";
import {useRouter} from "next/router";

const inter = Inter({subsets: ["latin"]});

export default function Pay() {
	const {primaryWallet} = useDynamicContext();
	const router = useRouter();

	return (
		<Layout>
			<div className="flex flex-row">
				<div className="flex flex-col items-center justify-center h-fit gap-12 pt-24">
					<div className={"flex flex-col rounded-xl border border-gray-950"}>
						<div className={"flex items-center justify-center border-b border-gray-950 pt-4 pb-4 gap-4"}>
							<Image src={"/Illustrations/Cashier.png"} width={64} height={64} alt={"Logo"}/>
							<h1 className="">Registration</h1>
						</div>
						<div class={"p-12 flex flex-col"}>
							We&apos;re thrilled to have you join our community!

							Before you get access to your HOA’s dashboard you will need to pay your contribution fee.
							<Button onClick={async () => {
								sendEthToSafe(primaryWallet, "0x9754B56ab0BF8D59E9384ce3318Dc33220dA320f").then((response) => {
									console.log(response);
									router.push("/proposals");
								});
							}}>
								Send Eth to Safe
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
