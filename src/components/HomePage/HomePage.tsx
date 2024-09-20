import React, { ReactNode } from 'react'
import Link from 'next/link'
import { CreditCardIcon } from '@heroicons/react/outline';
import {ShieldCheckIcon} from '@heroicons/react/outline';
import {TrendingUpIcon} from '@heroicons/react/outline'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded font-semibold ${className}`}
    {...props}
  >
    {children}
  </button>
)

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <input
    className={`px-3 py-2 border rounded ${className}`}
    {...props}
  />
)

interface IconProps {
  name: 'Mountain' | 'CreditCard' | 'ShieldCheck' | 'TrendingUp';
  className?:string;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  const icons = {
    Mountain: (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
      </svg>
    ),
    CreditCard: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2"/>
        <line x1="2" x2="22" y1="10" y2="10"/>
      </svg>
    ),
    ShieldCheck: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    TrendingUp: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  }

  return icons[name] || null
}

export default function Component() {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-orange-100 min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
        <div style={{ color: '#c2410c' }}>
        <Icon name="Mountain" className=" text-orange-700" />
        </div>

          <span className="ml-2 text-4xl font-bold text-orange-700 ">Solara</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 text-orange-700 text-2xl"  >
          <Link className="font-medium hover:underline underline-offset-4 " href="#features" style={{fontSize:"1.5rem"}}>
            Features
          </Link>
          <Link className="font-medium hover:underline underline-offset-4" href="#how-it-works">
            How It Works
          </Link>
          <Link className="font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-orange-700">
                    Empower Your Crypto Borrowing with Solara
              </h1>

                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Unlock the power of your social and on-chain reputation. Borrow with ease, build your credit, and
                  shine in the world of decentralized finance.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-orange-500 text-white hover:bg-orange-600">Get Started</Button>
                <Button className="bg-white text-orange-500 hover:bg-orange-100">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <CreditCardIcon className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Smart Credit Scoring</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our advanced algorithm assesses your wallet's credit score based on on-chain activity and social
                  reputation.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheckIcon className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Flexible Borrowing</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Access a wide range of protocols and lending options tailored to your credit profile.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <TrendingUpIcon className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Build Your Reputation</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Improve your credit score through timely repayments and active participation in the ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-orange-600">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-orange-700">
              {[
                { title: "Check Credit Score", description: "Connect your wallet and get your credit score instantly." },
                { title: "Choose a Protocol", description: "Browse available lending protocols based on your score." },
                { title: "Borrow Funds", description: "Select your amount, rate, and duration. Confirm the transaction." },
                { title: "Repay & Grow", description: "Make timely repayments to boost your credit score and unlock better rates." }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section  id="users-review" className="w-full py-12 md:py-24 lg:py-32 bg-orange-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "Solara has revolutionized my DeFi experience. The credit scoring system is fair and transparent, and I've been able to access much better rates!",
                  author: "Alex T., DeFi Enthusiast"
                },
                {
                  quote: "As a lender, I love how Solara provides a comprehensive view of borrowers' creditworthiness. It's made my lending decisions much more informed.",
                  author: "Sarah L., Crypto Investor"
                },
                {
                  quote: "The integration of social reputation into the credit scoring is genius. It's great to see my community contributions reflected in my borrowing power.",
                  author: "Mike R., Blockchain Developer"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">"{testimonial.quote}"</p>
                  <p className="font-bold">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="join-us" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-orange-400 to-red-500">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Shine with Solara?</h2>
                <p className="mx-auto max-w-[600px] text-white/90 md:text-xl">
                  Join the future of decentralized lending. Connect your wallet, check your score, and start borrowing
                  with confidence today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-white text-black" placeholder="Enter your email" type="email" />
                  <Button className="bg-white text-orange-500 hover:bg-orange-100" type="submit">
                    Get Started
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex justify-between py-6 w-full shrink-0 items-center text-center px-4 md:px-6 border-t">
  <p className="text-lg text-orange-700">© 2024 Solara. All rights reserved.</p>
  <p className="text-lg text-orange-700">Made with ❤️ by Solara Team</p>
</footer>

    </div>
  )
}