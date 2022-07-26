import { ethers, run } from "hardhat";

async function main() {
  const mintPrice = ethers.BigNumber.from("500000000000000000000");
  // 500 tokens
  const minAuctionDuration = 2 * 24 * 3600;
  // 2 days
  const minBidAmount = 2;
  const [signer] = await ethers.getSigners();

  const Marketplace = await ethers.getContractFactory("Marketplace");
  const NFT = await ethers.getContractFactory("NFT");

  const Market = await Marketplace.deploy(
    mintPrice,
    minAuctionDuration,
    minBidAmount
  );
  await Market.deployed();

  const Nft = await NFT.deploy(Market.address, signer.address);
  await Nft.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
