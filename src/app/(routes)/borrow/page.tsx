"use client"
import ConnectToBorrow from '@/components/Borrow/ConnectToBorrow'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

function route() {
  return (
    <div>
        <Navbar/>
        <ConnectToBorrow/>
    </div>
  )
}

export default route