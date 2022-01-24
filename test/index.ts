import { expect } from "chai";
import { ethers } from "hardhat";

describe("ThoughtsAndPrayers", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const thoughtsAndPrayers = await ethers.getContractFactory(
      "ThoughtsAndPrayers"
    );
    const Tap = await thoughtsAndPrayers.deploy();

    await Tap.deployed();
    const recipient = "";
  });
});
