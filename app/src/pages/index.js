import {DynamicEmbeddedWidget, useDynamicContext} from '@dynamic-labs/sdk-react-core';
import {Inter} from "next/font/google";
import Layout from "@/components/Layout";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/router";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
	const {primaryWallet} = useDynamicContext();
	const router = useRouter();

	return (
		<Layout>
			<div className="flex flex-row">
				<div className="flex flex-col items-center justify-center h-fit gap-12 pt-24">
					<Image
						width={64}
						height={64}
						alt="Logo"
						className={""}
						src="/Logo_PNG/Logo_Black_Bottom.png"
					/>
					<Button
						onClick={() => {
							router.push("/pay");
						}}
					>
						Join Community
					</Button>
					{/*<DynamicEmbeddedWidget background="default" />*/}
				</div>
				<Image
					width={1000}
					height={800}
					alt="Logo"
					className={"pl-52"}
					src="/Illustrations/Home_screen_image_2.jpg"
				/>
			</div>
			{/*<Button onClick={() => {*/}
			{/*	createSafe(primaryWallet)*/}
			{/*}}>*/}
			{/*	Create Safe*/}
			{/*</Button>*/}
			{/*<Button onClick={() => {*/}
			{/*	sendEthToSafe(primaryWallet, "0x9754B56ab0BF8D59E9384ce3318Dc33220dA320f")*/}
			{/*}}>*/}
			{/*	Send Eth to Safe*/}
			{/*</Button>*/}
			{/*<Button onClick={() => {*/}
			{/*	createProposal(primaryWallet, "0x342E8bf072327708009FAa2E9045D9B1F6deC2b8", parseUnits('0.01', 18), "0x", 0);*/}
			{/*}}>*/}
			{/*	Create Proposal*/}
			{/*</Button>*/}
			{/*<Button onClick={() => {*/}
			{/*	voteForProposal(primaryWallet, "1");*/}
			{/*}}>*/}
			{/*	Vote for Proposal*/}
			{/*</Button>*/}
		</Layout>
	);
}
