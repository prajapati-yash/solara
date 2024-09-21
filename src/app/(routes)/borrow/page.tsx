"use client"
import ConnectToBorrow from '@/components/Borrow/ConnectToBorrow'
import CreditScoreWizard from '@/components/Borrow/CreditScoreWizard'
// import VerificationSteps from '@/components/Borrow/VerificationSteps'
import Navbar from '@/components/Navbar/Navbar'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

function route() {
  return (
    <div>
      <SessionProvider>
        <Navbar/>
        {/* <ConnectToBorrow/> */}
        {/* <VerificationSteps/> */}
        <CreditScoreWizard />
        </SessionProvider>
    </div>
  )
}

export default route