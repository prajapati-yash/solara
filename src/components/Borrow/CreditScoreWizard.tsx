import React, { useState, useEffect } from 'react';
import { Button } from '@/utils/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/utils/Card';
import { Wallet, CheckCircle, XCircle, Zap } from 'lucide-react';
import Confetti from 'react-confetti';

const CreditScoreWizard: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [isBuilder, setIsBuilder] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const steps = [
    { title: "Sign in with Worldcoin", icon: "🌍" },
    { title: "Connect Your Wallet", icon: "💼" },
    { title: "Fetching Your Data", icon: "🔍" },
    { title: "Calculating Credit Score", icon: "🧮" },
    { title: "Checking Builder Status", icon: "🏗️" },
    { title: "Final Result", icon: "🎉" },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    if (step > 1 && step < steps.length - 1) {
        setIsLoading(true);
        setProgress(0);
        
        progressInterval = setInterval(() => {
          setProgress(prev => Math.min(prev + 5, 100));
        }, 200);
      
        timer = setTimeout(() => {
          clearInterval(progressInterval);
          setIsLoading(false);
          setProgress(100);
          
          if (step === 2) {
            setCreditScore(Math.floor(Math.random() * 850));
          } else if (step === 3) {
            setIsBuilder(Math.random() > 0.5);
          }
          
          // Use 'step + 1' directly instead of 'prevStep + 1'
          setTimeout(() => {
            setStep(step + 1); // Update here
            if (step + 1 === steps.length - 1) {
              if (creditScore !== null && (creditScore >= 700 || isBuilder)) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
              }
            }
          }, 500);
        }, 4000);
      }
      

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [step, creditScore, isBuilder, steps.length]);

  const handleAction = () => {
    if (step <= 1) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return "Ready to embark on a financial adventure? Let's start by signing in with your Worldcoin ID!";
      case 1:
        return "Great! Now, let's connect your wallet. Don't worry, we won't take any NFTs... unless they're really cool. 😎";
      case 2:
        return "Hang tight! We're fetching your data faster than a squirrel fetches nuts. 🐿️";
      case 3:
        return "Crunching numbers like a robot eating chips. Beep boop beep! 🤖";
      case 4:
        return "Checking if you're a certified blockchain builder or just a block-head. (Just kidding, you're awesome either way!)";
      case 5:
        if (creditScore !== null && (creditScore >= 700 || isBuilder)) {
          return "Woohoo! Your credit score is hotter than a freshly mined bitcoin. You're approved to borrow! 🎉🚀";
        } else {
          return (
            <div className="space-y-2">
              <p>Your credit score is taking a power nap. Time to wake it up! 😴💪</p>
              <p className="font-semibold text-blue-600">
                Level up your Web3 game:
              </p>
              <ul className="list-disc list-inside text-sm">
                <li>Dive into onchain transactions 🏊‍♂️</li>
                <li>Join Web3 communities and make some noise 🗣️</li>
                <li>Build cool stuff and show off your skills 🛠️</li>
                <li>Hodl like your credit score depends on it (because it kinda does) 💎🙌</li>
              </ul>
            </div>
          );
        }
      default:
        return "Something went wrong. Did you try turning it off and on again?";
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto relative overflow-hidden mt-10 p-8 text-black border border-black">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-6">
          {steps[step].title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between mb-4">
          {steps.map((s, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center ${index <= step ? 'text-blue-500' : 'text-gray-400'}`}
            >
              <div className={`text-2xl ${index === step ? 'animate-bounce' : ''}`} style={{fontSize:"2.2rem"}}>{s.icon}</div>
              <div className={`w-4 h-4 rounded-full mt-2 ${index < step ? 'bg-blue-500' : index === step ? 'bg-blue-200 animate-pulse' : 'bg-gray-200'}`} />
            </div>
          ))}
        </div>
        
        <div className="text-center min-h-[120px] pt-8 text-xl ">{renderContent()}</div>
        
        {step < 2 ? (
          <Button 
            onClick={handleAction} 
            className="w-full"
          >
            {step === 1 && <Wallet className="mr-2 h-4 w-4" />}
            {steps[step].title}
          </Button>
        ) : step < steps.length - 1 ? (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-center">
              <Zap className="h-6 w-6 text-yellow-500 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            {creditScore !== null && (creditScore >= 700 || isBuilder) ? (
              <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500 animate-pulse" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditScoreWizard;