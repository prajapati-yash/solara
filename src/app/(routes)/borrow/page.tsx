"use client";

import ConnectToBorrow from '@/components/Borrow/ConnectToBorrow';
import CreditScoreWizard from '@/components/Borrow/CreditScoreWizard';
import BorrowTable from '@/components/Borrow/BorrowTable';
import Navbar from '@/components/Navbar/Navbar';
import { SessionProvider } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

function Route() {
  const [activeTab, setActiveTab] = useState('borrow');
  const [showContent, setShowContent] = useState(false);
  const controls = useAnimation();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowContent(true);
      controls.start({ opacity: 1, y: 0 });
    } else {
      setShowContent(false);
      controls.start({ opacity: 0, y: -20 });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <div className="flex flex-col min-h-screen">
      <SessionProvider>
        <Navbar />

        {/* Move CreditScoreWizard to the top, but not full-screen */}
        <div className="flex-shrink-0 p-8">
          <CreditScoreWizard />
        </div>

        {/* Toggle buttons and scrollable content area */}
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

          {/* Scrollable content area with animation */}
          <motion.div
            className="flex-grow overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'borrow' && <BorrowTable />}
            {activeTab === 'signFriend' && <ConnectToBorrow />}
          </motion.div>
        </div>
      </SessionProvider>
    </div>
  );
}

export default Route;
