import {SafeAccountConfig, SafeFactory} from '@safe-global/protocol-kit'
import {createPublicClient, http, parseUnits} from 'viem'
import {baseSepolia} from "viem/chains";
import SafeApiKit from "@safe-global/api-kit";
import {createWalletClientFromWallet} from "@dynamic-labs/sdk-react-core";

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http('https://sepolia.base.org/')
})

// Or using a custom service
const apiKit = new SafeApiKit({
  chainId: 84532n
})

export const createSafe = async (primaryWallet) => {
  if (!primaryWallet) return
  const walletClient = await createWalletClientFromWallet(primaryWallet)
  const safeFactory = await SafeFactory.init({
    provider: walletClient.transport,
    signer: walletClient.account.address
  })

  const safeAccountConfig = {
    owners: [
      walletClient.account.address
    ],
    threshold: 1,
    // Optional params
  }

  const protocolKitOwner1 = await safeFactory.deploySafe({ safeAccountConfig })
  const safeAddress = await protocolKitOwner1.getAddress()

  console.log('Your Safe has been deployed:')
  console.log(`https://sepolia.basescan.org/address/${safeAddress}`)
  console.log(`https://app.safe.global/basesep:${safeAddress}`)
}

export const sendEthToSafe = async (primaryWallet, safeAddress) => {
  if (!primaryWallet || !safeAddress) return
  const walletClient = await createWalletClientFromWallet(primaryWallet)
  const hash = await walletClient.sendTransaction({
    to: safeAddress,
    value: parseUnits('0.01', 18)
  })
  console.log('Transaction hash:', hash);
  return hash;
}
