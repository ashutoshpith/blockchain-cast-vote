import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.provider.listAccounts();
  console.log(accounts);

  const siasAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const siasTreasury = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
  const siasGovernor = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
  const siasTiemlock = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

  const Sias = await ethers.getContractFactory("Sias");

  const [executor, proposer, voter1, voter2, voter3, voter4, voter5] =
    await ethers.provider.listAccounts();

  // const sias = Sias.attach(siasAddress);
  // const balance = await sias.balanceOf(executor);
  // const voter1Balance = await sias.balanceOf(voter1);

  // console.log(
  //   "balance ",
  //   balance,
  //   balance.toString().length,
  //   voter1Balance,
  //   voter1Balance.toString().length
  // );

  console.log("ad ", voter1);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
