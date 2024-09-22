"use client"

import React from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className="bg-white shadow-md">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="/">
          <div style={{ color: '#c2410c' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='text-orange-700'>
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </svg>
          </div>

          <span className="ml-2 text-4xl font-bold text-orange-700 ">Solara</span>
        </Link>
        {/* <div className="flex items-center">
          {!session && !loading ? (
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300 ease-in-out"
              onClick={() => signIn("worldcoin")}
            >
              Sign in with World ID
            </button>
          ) : session?.user ? (
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <small className="block text-orange-600">Signed in as</small>
                <strong className="text-sm text-orange-700">
                  {session.user.email
                    ? `${session.user.email.slice(0, 6)}...${session.user.email.slice(-4)}`
                    : session.user.name
                      ? `${session.user.name.slice(0, 6)}...${session.user.name.slice(-4)}`
                      : 'User'}
                </strong>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300 ease-in-out"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div> */}
      </header>
    </div>
  )
}

export default Navbar