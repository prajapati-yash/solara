import React from 'react'
import { useAppKit } from '@reown/appkit/react'

function ConnectToBorrow() {
  const { open, close } = useAppKit()

  return (
    <div>
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto mt-10 border border-black">
        <h2 className="text-2xl font-bold text-black mb-4 ">Connect your wallet – it's like a first date for your crypto and our credit score!😉</h2>
        <button
          onClick={() => open()}
          className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300 flex items-center justify-center"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Connect Wallet
        </button>
        </div>
    </div>
  )
}

export default ConnectToBorrow