"use client";

import BorrowPopup from '@/components/Borrow/BorrowPopUp'
import { SessionProvider } from 'next-auth/react'
import React, { useState } from 'react'

function Page() {
  const [showPopup, setShowPopup] = useState(true); // Assume the popup is open initially

  const handleClosePopup = () => {
    setShowPopup(false); // This will hide the popup when called
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SessionProvider>
        {showPopup && <BorrowPopup onClose={handleClosePopup} />}
      </SessionProvider>
    </div>
  )
}

export default Page;
