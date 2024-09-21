"use client"
import ConnectToBorrow from '@/components/Borrow/ConnectToBorrow'
import Navbar from '@/components/Navbar/Navbar'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

function route() {
  return (
    <div>
      <SessionProvider>
        <Navbar/>
        <ConnectToBorrow/>
        </SessionProvider>
    </div>
  )
}

export default route