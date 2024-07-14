import {useDynamicContext} from '@dynamic-labs/sdk-react-core';
import {Inter} from "next/font/google";
import {createSafe, sendEthToSafe} from "@/lib/safe";
import {Button} from "@/components/ui/button";
import Layout from "@/components/Layout";
import {parseUnits} from "viem";
import {createProposal, voteForProposal} from "@/lib/proposal";
import Image from "next/image";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
	const {primaryWallet} = useDynamicContext();

	return (
		<Layout>
			<div className="flex flex-row items-center justify-center gap-4">
				<Image
						width={512}
						height={512}
						alt="Logo"
						src="/Logo_PNG/Logo_Black_Bottom.png"
					/>
				<Image
						width={1000}
						height={800}
						alt="Logo"
						src="/Illustrations/home screen image.jpg"
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
