// 'use client'

// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { Loader2, Wallet, Award, ThumbsUp, Frown } from 'lucide-react'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/utils/Card'
// import { Button } from '@/utils/Button'

// export default function Component() {
//   const [step, setStep] = useState(0)
//   const [isLoading, setIsLoading] = useState(false)
//   const [creditScore, setCreditScore] = useState(0)
//   const [isBuilder, setIsBuilder] = useState(false)

//   const steps = [
//     { title: "Sign in with Worldcoin", icon: <Award className="w-12 h-12 text-teal-500" /> },
//     { title: "Connect your wallet", icon: <Wallet className="w-12 h-12 text-indigo-500" /> },
//     { title: "Fetching your data", icon: <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" /> },
//     { title: "Calculating credit score", icon: <Loader2 className="w-12 h-12 text-orange-500 animate-spin" /> },
//     { title: "Checking builder status", icon: <Loader2 className="w-12 h-12 text-pink-500 animate-spin" /> },
//     { title: "Results", icon: <ThumbsUp className="w-12 h-12 text-green-500" /> },
//   ]

//   useEffect(() => {
//     if (step === 2) {
//       setIsLoading(true)
//       setTimeout(() => {
//         setStep(3)
//       }, 4000)
//     } else if (step === 3) {
//       setTimeout(() => {
//         setCreditScore(Math.floor(Math.random() * 1000))
//         setStep(4)
//       }, 4000)
//     } else if (step === 4) {
//       setTimeout(() => {
//         setIsBuilder(Math.random() > 0.5)
//         setStep(5)
//         setIsLoading(false)
//       }, 4000)
//     }
//   }, [step])

//   const handleNextStep = () => {
//     setStep(step + 1)
//   }

//   const getStepContent = () => {
//     switch (step) {
//       case 0:
//         return "Ready to embark on a financial adventure? Let's start by proving you're not a robot... or are you? 🤖"
//       case 1:
//         return "Time to connect your wallet! Don't worry, we won't take all your crypto... just the good stuff! 😉"
//       case 2:
//         return "Hang tight! We're diving deep into the blockchain to fetch your data. Hope you're not hiding any meme coins! 🕵️‍♂️"
//       case 3:
//         return "Crunching numbers faster than you can say 'HODL'! Your credit score is cooking... 🧮"
//       case 4:
//         return "Checking if you're a legendary builder or just another crypto enthusiast. No pressure! 🏗️"
//       case 5:
//         if (creditScore > 700) {
//           return `Woohoo! Your credit score of ${creditScore} is hotter than a bull market! You're all set to borrow. Maybe buy some NFTs? (Just kidding, invest responsibly!) 🚀`
//         } else if (isBuilder) {
//           return `Your credit score (${creditScore}) isn't mooning yet, but fear not! Your builder status is your golden ticket. You can still borrow. Keep building the future! 🛠️`
//         } else {
//           return `Uh-oh! Your credit score (${creditScore}) is colder than a crypto winter, and you're not a builder (yet). Time to BUIDL and try again! 🐻`
//         }
//       default:
//         return ""
//     }
//   }

//   return (
//     <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
//       <CardHeader className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-white">
//         <CardTitle className="text-3xl">Credit Check Adventure</CardTitle>
//         <CardDescription>Embark on a thrilling journey to financial freedom!</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <motion.div
//           key={step}
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -50 }}
//           transition={{ duration: 0.5 }}
//           className="flex flex-col items-center space-y-4"
//         >
//           {steps[step].icon}
//           <h2 className="text-2xl font-bold text-center">{steps[step].title}</h2>
//           <p className="text-center text-gray-600">{getStepContent()}</p>
//           {isLoading && (
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div className="bg-blue-500 h-2.5 rounded-full animate-pulse"></div>
//             </div>
//           )}
//         </motion.div>
//       </CardContent>
//       <CardFooter className="flex justify-center space-x-2">
//         {step < 2 && (
//           <Button
//             onClick={handleNextStep}
//             className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-blue-500 hover:to-green-400 transition-all"
//           >
//             {step === 0 ? "Sign in with Worldcoin" : "Connect Wallet"}
//           </Button>
//         )}
//         {step === 5 && (
//           <Button
//             onClick={() => setStep(0)}
//             className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-red-500 hover:to-pink-500 transition-all"
//           >
//             Start Over
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   )
// }
