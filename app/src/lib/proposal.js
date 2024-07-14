import {createWalletClientFromWallet} from "@dynamic-labs/sdk-react-core";
import {blocksyABI, blocksyAddress} from "@/lib/blocksy";
import {createPublicClient, http} from "viem";
import {baseSepolia} from "viem/chains";

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http('https://sepolia.base.org/')
})

export const createProposal = async (primaryWallet, to, value, data, operation) => {
	if (!primaryWallet) return;
	const walletClient = await createWalletClientFromWallet(primaryWallet);
	const { request } = await publicClient.simulateContract({
		address: blocksyAddress,
		abi: blocksyABI,
		functionName: "createProposal",
		args: [to, value, data, operation],
		account: walletClient.account.address
	})
	console.log(request);
	const hash = await walletClient.writeContract(request);
	console.log(hash);
}


export const voteForProposal = async (primaryWallet, proposalId) => {
	if (!primaryWallet) return;
	const walletClient = await createWalletClientFromWallet(primaryWallet);
	const { request } = await publicClient.simulateContract({
		address: blocksyAddress,
		abi: blocksyABI,
		functionName: "vote",
		args: [proposalId],
		account: walletClient.account.address
	})
	console.log(request);
	const hash = await walletClient.writeContract(request);
	console.log(hash);
}
