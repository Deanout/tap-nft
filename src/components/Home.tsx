import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import WalletBalance from './WalletBalance';
import ThoughtsAndPrayers from '../artifacts/contracts/ThoughtsAndPrayers.sol/ThoughtsAndPrayers.json'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import '../App.css'

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, ThoughtsAndPrayers.abi, signer )



function Home() {
    const [totalMinted, setTotalMinted] = useState(0)
    
    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const count = await contract.count();
        setTotalMinted(parseInt(count, 10));
    }
    let counter = 0;
  return <div>
      <WalletBalance />
      <h1>Thoughts And Prayers NFT Collection</h1>
    <Container>
    <div className="row row-cols-3">
      {Array(totalMinted + 5).fill(0).map((_, index) => {
          return (<div key={index} className="col">
                <NFTImage tokenId={index} getCount={getCount()} />
            </div>)
        })}
        </div>
    </Container>
        <hr />
  </div>;
}

function NFTImage({ tokenId, getCount }) {
    const contentId = 'QmScYwezAm5jKEEcXZ15SZM399tqcZWTkFwbfZJNbqdQTc'
    const metadata = `${contentId}/${tokenId}`;
    const metaDataURI = `${metadata}.json`;
    const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`

    const [isMinted, setIsMinuted] = useState(false);

    useEffect(() => {
        getMintedStatus();
    }, []);


    const getMintedStatus = async () => {
        const isMinted = await contract.isContentOwned(metaDataURI);
        setIsMinuted(isMinted);
    }

    const mintToken = async () => {
        const connection = contract.connect(signer);
        const address = connection.address;
        const result = await contract.payToMint(address, metaDataURI, {
            value: ethers.utils.parseEther('0.05'),
        });
        await result.wait();
        getMintedStatus();
    }

    async function getURI() {
        const uri = await contract.tokenURI(tokenId);

    }

    return <div>
        <Card style={{ width: '100%' }}>
            <Card.Img variant="top" src={isMinted ? imageURI : '../images/placeholder.jpg'} />
            <Card.Body>
                <Card.Title>ID #{tokenId}</Card.Title>
                <Card.Text>
                    {isMinted ? 'This could have been you! Talk about FOMO!' : 'You can mint this token by sending 0.05 ETH to this address'}
                </Card.Text>
                {!isMinted ? (
                <Button onClick={mintToken} variant="success">Mint</Button>
            ) : (
                <Button onClick={getURI} variant="success">Taken! Show URI</Button>
            )}
            </Card.Body>
        </Card>
    </div>;
}

export default Home;
