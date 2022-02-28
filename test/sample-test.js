const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const Clowns = await ethers.getContractFactory("Clowns");
    const clowns = await Clowns.deploy();
    await clowns.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataURI = 'cid/test.png';

    let balance = await clowns.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await clowns.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05')});

// wait until transaction is minted
    await newlyMintedToken.wait();

    balance = await clowns.balanceOf(recipient)
    expect(balance).to.equal(1);

    expect(await clowns.isContentOwned(metadataURI)).to.equal(true);

  });
});
