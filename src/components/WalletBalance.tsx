import { useState } from 'react';
import { ethers } from 'ethers';
import Button from 'react-bootstrap/Button';


function WalletBalance() {
    const [balance, setBalance] = useState("");


    const getBalance = async () => {
        try {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(account);
            setBalance(ethers.utils.formatEther(balance))
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <h3>Your Balance</h3>
            <p>{balance}</p>
            <Button onClick={getBalance} variant="success">Get Balance</Button>
        </div>
    );
}

export default WalletBalance;
