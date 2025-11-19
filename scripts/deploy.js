const { ethers } = require("hardhat");

async function main() {
  const EVENT_NAME = "My Web3 Meetup";
  const EVENT_URI = "https://example.com/my-event";
  const SECRET = "super-secret-code";

  const Poat = await ethers.getContractFactory("ProofOfAttendance");
  const poat = await Poat.deploy(EVENT_NAME, EVENT_URI, SECRET);
  await poat.waitForDeployment();

  console.log("ProofOfAttendance deployed to:", await poat.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
