import { expect } from "chai";
import { ethers } from "hardhat";

describe("ThoughtsAndPrayers", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const thoughtsAndPrayers = await ethers.getContractFactory(
      "ThoughtsAndPrayers"
    );
    const Tap = await thoughtsAndPrayers.deploy();

    await Tap.deployed();
    /**
     * Account #1
     */
    const recipient = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
    const metadataURI = "cid/test.png";

    let balance = await Tap.balanceOf(recipient);

    expect(balance).to.equal(0);

    const newlyMintedToken = await Tap.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });
  });
});
