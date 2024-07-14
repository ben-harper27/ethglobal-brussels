import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BlocksyContract = buildModule("BlocksyContract", (m) => {
  const blocksyContract = m.contract("BlocksyContract", [
      "0x9754B56ab0BF8D59E9384ce3318Dc33220dA320f" // safe address
  ]);

  return { blocksyContract };
});

export default BlocksyContract;
