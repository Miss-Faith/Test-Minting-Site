import { useState } from 'react';
import { ethers } from 'ethers';

function WalletBalance() {

  const [balance, setBalance] = useState();
  const getBalance = async () => {
    const [account] = await window.ethereum.request({method: 'eth_requestAccounts'});
    const provider = new ethers.providers.web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div className="card">
      <div>
        <h5>Your Balance: {balance}</h5>
        <button onclick={() => getBalance()}>Show My Balance</button>
      </div>
    </div>
  )
};

export default WalletBalance;
