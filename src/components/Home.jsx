import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import Clowns from '../artifacts/contracts/MyNFT.sol/Clowns.json'

const contractAddress = '99999999999999';

const provider = new ethers.providers.Web3Provider(window.ethereum);

//get the end user
const signer = provider.getSigner();

//get the smart contracts
const contract = new ethers.Contract(contractAddress, Clowns.abi, signer);

function Home() {

  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async() => {
      const count = await contract.count();
      setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

      <h1> Clowns NFT Collection</h1>
        {Array(totalMinted + 1)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <NFTImage tokenId={i} />
            </div>
          ))}
      </div>
  );
}

function NFTImage({ tokenId, getCount}) {
  const contentId = "pinataaddress";
  const metadataURI = '${contentId}/${tokenId}.json';
  const imageURI = 'img/$(tokenId).png';

  const[isMinted, setIsMinted] = useState(false);

  useEffect(() => {

  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result)
    setIsMinted(result);

  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    getMintedStatus();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
  }

  return (
    <div>
      <img scr={isMinted ? imageURI : 'img/placeholder.png'}></img>
      <div>
        <h5>ID #{tokenId}</h5>
        {!isMinted ? (
          <button onClick={mintToken}>
            Mint
          </button>
        ) : (
          <button> onClick={getURI}>
            Taken! Show URI
          </button>
        )}
      </div>
    </div>
  );
}
export default Home;
