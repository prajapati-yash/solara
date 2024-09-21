import React from 'react'
import Link from 'next/link'
import { WorldIDWidget } from '@worldcoin/id';
import { useState } from 'react';

const Navbar: React.FC = () => {
    const [isConnecting, setIsConnecting] = useState(false);

    const handleWorldCoinConnect = async () => {
      setIsConnecting(true);
  
    };
  return (
    <div className="bg-white shadow-md">
     <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
        <div style={{ color: '#c2410c' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='text-orange-700'>
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
      </svg>
        </div>

          <span className="ml-2 text-4xl font-bold text-orange-700 ">Solara</span>
        </Link>
        <div className="ml-auto flex gap-4 sm:gap-6 text-orange-700 text-2xl"  >
        
        <div className="flex items-center">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            //   onClick={() => {
            //     // TODO: Implement WorldCoin ID connection logic
            //     console.log('Connecting WorldCoin ID...')
            //   }}
            >
              Connect WorldCoin ID
            </button>
          </div>
        </div>
      </header>
      </div>
  )
}

export default Navbar