import React, { useState, useEffect, useRef } from 'react';

interface BorrowPopupProps {
  onClose: () => void;
}

const BorrowPopup: React.FC<BorrowPopupProps> = ({ onClose }) => {
  const [friendAddress, setFriendAddress] = useState<string>('');
  const [eligibilityMessage, setEligibilityMessage] = useState<string>('');
  const [inviteStep, setInviteStep] = useState<'initial' | 'input' | 'checking' | 'result'>('initial');
  const [hasBuilderPack, setHasBuilderPack] = useState<boolean | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const checkBuilderPack = () => {
    const randomResult = Math.random() > 0.5; // Simulate checking for builder pack
    setHasBuilderPack(randomResult);
  };

  const handleInviteFriendClick = () => {
    checkBuilderPack();

    if (hasBuilderPack) {
      // If the user has a builder pack
      setInviteStep('initial'); // Or a specific step if needed
    } else {
      // If the user does not have a builder pack
      setInviteStep('input');
    }
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setFriendAddress(address);

    if (address) {
      setInviteStep('checking');
      setEligibilityMessage('Checking Eligibility...');

      // Simulate API call to check eligibility
      setTimeout(() => {
        const isEligible = Math.random() > 0.3; // Simulate eligibility check
        setEligibilityMessage(isEligible ? 'We have sent a notification on wallet connect using Reown.' : 'Not Eligible for an Invite');
        setInviteStep('result');
      }, 2000); // Simulate API delay
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-orange-700">
        {inviteStep === 'initial' ? (
          <>
            <h2 className="text-md font-regular mb-4 text-left text-orange-700">
              You can borrow $1. Let an eligible wallet address vouch for you.  
              Your social connect will be invited to attest for your borrowing & they will risk their financial reputation if you default.
            </h2>
            <div className="mb-6">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-orange-700" />
                <span className="text-gray-700">I understand</span>
              </label>
            </div>
            <button
              onClick={handleInviteFriendClick}
              className="w-full bg-orange-700 text-white py-2 rounded-lg hover:bg-orange-800 transition"
            >
              Invite My Friend
            </button>
          </>
        ) : hasBuilderPack ? (
          <>
            <h2 className="text-md font-regular mb-4 text-left text-orange-700">
              Well, seems like you have onchain social reputation. 
              Your onchain work has paid off; you don't need a signer. You are eligible to borrow $1 without a signer.
            </h2>
            <button className="w-full bg-orange-700 text-white py-2 rounded-lg hover:bg-orange-800 transition mt-4" onClick={onClose}>
              Continue
            </button>
          </>
        ) : (
          <>
            {inviteStep === 'input' && (
              <div className="mt-4">
                <p className="text-gray-700 mb-2">Paste your friend’s address to invite:</p>
                <input
                  type="text"
                  placeholder="Paste Address"
                  value={friendAddress}
                  onChange={handleAddressInputChange}
                  className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-orange-700"
                />
              </div>
            )}
            {inviteStep === 'checking' && (
              <div className="text-center mt-4">
                <p className="text-orange-700">Checking Eligibility...</p>
                <div className="loader mt-4"></div> {/* Placeholder for spinner/loader */}
              </div>
            )}
            {inviteStep === 'result' && (
              <div className="text-center mt-4">
                <p className={`font-medium ${eligibilityMessage.includes('notification') ? 'text-green-600' : 'text-red-600'}`}>
                  {eligibilityMessage}
                </p>
                {eligibilityMessage.includes('notification') && (
                  <p className="text-orange-700">In Invite Sent!</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BorrowPopup;
