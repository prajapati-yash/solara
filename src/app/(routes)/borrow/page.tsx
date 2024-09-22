"use client";

import ConnectToBorrow from '@/components/Borrow/ConnectToBorrow';
import CreditScoreWizard from '@/components/Borrow/CreditScoreWizard';
import BorrowTable from '@/components/Borrow/BorrowTable';
import Navbar from '@/components/Navbar/Navbar';
import { SessionProvider } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { encodeAbiParameters, parseAbiParameters, isAddress } from 'viem';

import ISPABI from "../../../contracts/ISPABI.json"
// // ABI for the attestation function
// const ISPABI = [
//   {
//     inputs: [
//       {
//         components: [
//           { internalType: "uint64", name: "schemaId", type: "uint64" },
//           { internalType: "uint64", name: "linkedAttestationId", type: "uint64" },
//           { internalType: "uint64", name: "attestTimestamp", type: "uint64" },
//           { internalType: "uint64", name: "revokeTimestamp", type: "uint64" },
//           { internalType: "address", name: "attester", type: "address" },
//           { internalType: "uint64", name: "validUntil", type: "uint64" },
//           { internalType: "uint8", name: "dataLocation", type: "uint8" },
//           { internalType: "bool", name: "revoked", type: "bool" },
//           { internalType: "bytes[]", name: "recipients", type: "bytes[]" },
//           { internalType: "bytes", name: "data", type: "bytes" }
//         ],
//         internalType: "struct IAttestation.Attestation",
//         name: "attestation",
//         type: "tuple"
//       },
//       { internalType: "string", name: "recipient", type: "string" },
//       { internalType: "bytes", name: "signature", type: "bytes" },
//       { internalType: "bytes", name: "additionalData", type: "bytes" }
//     ],
//     name: "attest",
//     outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
//     stateMutability: "nonpayable",
//     type: "function"
//   }
// ];

function Route() {
  const [activeTab, setActiveTab] = useState('borrow');
  const [showContent, setShowContent] = useState(false);
  const [addressError, setAddressError] = useState<string>('');
  const controls = useAnimation();

  const [borrowerAddress, setBorrowerAddress] = useState('');
  const [amount, setAmount] = useState('');

  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowContent(true);
      controls.start({ opacity: 1, y: 0 });
    } else {
      setShowContent(false);
      controls.start({ opacity: 0, y: -20 });
    }
  };
  const handleBorrowerAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setBorrowerAddress(address);
    if (address && !isAddress(address)) {
      setAddressError('Invalid Ethereum address');
    } else {
      setAddressError('');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  const createAttestation = async () => {
    if (!isConnected) {
      console.error("Wallet not connected");
      return;
    }
  
    if (!borrowerAddress || !amount || !isAddress(borrowerAddress) || isNaN(Number(amount))) {
      console.error("Valid borrower address and amount are required");
      return;
    }
  
    const CONTRACT_ADDRESS = "0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD";
  
    try {
      // Encode the schema data
      const schemaData = encodeAbiParameters(
        parseAbiParameters('address borrower, uint256 amount'),
        [borrowerAddress as `0x${string}`, BigInt(amount)] // Convert amount to BigInt
      );
  
      console.log("Schema Data:", schemaData);
  
      const attestationData = {
        schemaId: 10,
        linkedAttestationId: 0,
        attestTimestamp: 0,
        revokeTimestamp: 0,
        attester: address!,
        validUntil: 0,
        dataLocation: 0,
        revoked: false,
        recipients: [borrowerAddress as `0x${string}`],
        data: schemaData
      };
  
      console.log("Attestation Data:", attestationData);
  
      const result = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: ISPABI,
        functionName: 'attest',
        args: [
          attestationData,
          borrowerAddress.toLowerCase(),
          "0x",
          schemaData
        ],
      });
  
      console.log("Transaction result:", result);
    } catch (error) {
      console.error("Error in createAttestation:", error);
      // You might want to set an error state here to display to the user
    }
  };
  
  
  return (
    <div className="flex flex-col min-h-screen">
      <SessionProvider>
        <Navbar />

        <div className="flex-shrink-0 p-8">
          <CreditScoreWizard />
        </div>

        <div className="flex-grow flex flex-col">
          <div className="flex justify-center space-x-4 p-4 sticky top-0 bg-white z-10">
            <button
              className={`px-4 py-2 rounded-lg ${activeTab === 'borrow' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => setActiveTab('borrow')}
            >
              Borrow
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${activeTab === 'signFriend' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => setActiveTab('signFriend')}
            >
              Sign a Friend
            </button>
          </div>

          <motion.div
            className="flex-grow overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'borrow' && <BorrowTable />}
            {activeTab === 'signFriend' && (
              <div>
                <ConnectToBorrow />
                {isConnected && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Create Attestation</h2>
                    <div className="mb-4">
                      <label htmlFor="borrowerAddress" className="block text-sm font-medium text-gray-700">Borrower Address</label>
                      <input
                        type="text"
                        id="borrowerAddress"
                        value={borrowerAddress}
                        onChange={handleBorrowerAddressChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                          addressError ? 'border-red-500' : ''
                        }`}
                        placeholder="0x..."
                      />
                      {addressError && <p className="mt-1 text-sm text-red-500">{addressError}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                      <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Enter amount"
                      />
                    </div>
                    <button
                      onClick={createAttestation}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                      disabled={isPending || isConfirming || !borrowerAddress || !amount || !!addressError}
                    >
                      {isPending ? 'Confirming...' : isConfirming ? 'Creating Attestation...' : 'Create Attestation'}
                    </button>
                    {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
                    {isConfirmed && <p className="text-green-500 mt-2">Attestation created successfully!</p>}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </SessionProvider>
    </div>
  );
}

export default Route;