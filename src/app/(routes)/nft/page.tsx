"use client";

import React, { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

const NFTHolderCheck: React.FC = () => {
  const [isHolder, setIsHolder] = useState(false);
  const { address, isConnected } = useAccount();
  const [wallet, setWallet] = useState(address);

  const contractAddresses = [
    '0xe600A7AD9B86A2D949069A6092b7b5a1Dae50e20',  // Builder Pack
    '0x32382a82d9faDc55f971f33DaEeE5841cfbADbE0',  // Hacker Pack
    '0x69B4e2BD6D5c5eeeB7E152FB9bc9b6c4364fA410'   // Pioneer Pack
  ];

  useEffect(() => {
    const checkNFTHolder = async () => {
      for (const contractAddress of contractAddresses) {
        const url = `https://opt-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/isHolderOfContract?wallet=${wallet}&contractAddress=${contractAddress}`;
        try {
          const response = await fetch(url, { method: 'GET', headers: { accept: 'application/json' } });
          const data = await response.json();

          if (data.isHolderOfContract) {
            setIsHolder(true);
            return; // Exit loop once any contract has been matched
          }
        } catch (error) {
          console.error('Error checking NFT holder status:', error);
        }
      }
      // If none of the contracts matched, isHolder remains false
      setIsHolder(false);
    };

    if (wallet) {
      checkNFTHolder();
    }
  }, [wallet]);

  const handleWalletChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWallet(address);
  };

  return (
    <div>
      <input
        type="text"
        value={wallet}
        onChange={handleWalletChange}
        placeholder="Enter wallet address"
      />
      <p>Is NFT Holder: {isHolder ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default NFTHolderCheck;