import { ethers } from "hardhat";

async function main() {
  const [executor, proposer, voter1, voter2, voter3, voter4, voter5] =
    await ethers.provider.listAccounts();
  const Sias = await ethers.getContractFactory("Sias");
  const SiasGovernor = await ethers.getContractFactory("SiasGovernor");
  const SiasTimelock = await ethers.getContractFactory("SiasTimelock");
  const SiasTreasury = await ethers.getContractFactory("SiasTreasury");

  const name = "Sias";
  const symbol = "SIAS";
  const supply = ethers.utils.parseEther("1000");

  const sias = await Sias.deploy(name, symbol, supply);
  await sias.deployed();

  console.log("Sias Deployed to:", sias.address);

  const amount = ethers.utils.parseEther("50");

  await sias.transfer(voter1, amount, { from: executor });
  await sias.transfer(voter2, amount, { from: executor });
  await sias.transfer(voter3, amount, { from: executor });
  await sias.transfer(voter4, amount, { from: executor });
  await sias.transfer(voter5, amount, { from: executor });

  const minDelay = 1;

  const siasTimelock = await SiasTimelock.deploy(
    minDelay,
    [proposer],
    [executor]
  );
  await siasTimelock.deployed();

  console.log("SiasTimeLock Deployed to  ", siasTimelock.address);

  const quorum = 4;
  const votingDelay = 0;
  const votingPeriod = 5;

  const siasGovernor = await SiasGovernor.deploy(
    sias.address,
    siasTimelock.address,
    quorum,
    votingDelay,
    votingPeriod
  );
  await siasGovernor.deployed();

  console.log("SiasGovernor Deployed to ", siasGovernor.address);

  const funds = ethers.utils.parseEther("0");

  const siasTreasury = await SiasTreasury.deploy(executor, { value: funds });
  await siasTreasury.deployed();

  await siasTreasury.transferOwnership(siasTimelock.address, {
    from: executor,
  });

  console.log("SiasTreasury deployed to ", siasTreasury.address);

  const proposerRole = await siasTimelock.PROPOSER_ROLE();
  const executorRole = await siasTimelock.EXECUTOR_ROLE();

  await siasTimelock.grantRole(proposerRole, siasGovernor.address, {
    from: executor,
  });
  await siasTimelock.grantRole(executorRole, siasGovernor.address, {
    from: executor,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
