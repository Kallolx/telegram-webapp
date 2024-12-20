import { useState, useCallback } from 'react'
import { formatNumber } from '@/utils/formatters'

interface WelcomeBonusProps {
  onClaim: (amount: number) => void;
  onComplete: () => void;
}

export function WelcomeBonus({ onClaim, onComplete }: WelcomeBonusProps) {
  const [isClaiming, setIsClaiming] = useState(false)
  const WELCOME_BONUS = 10000

  const handleClaim = useCallback(() => {
    setIsClaiming(true)
    setTimeout(() => {
      onClaim(WELCOME_BONUS)
      onComplete()
    }, 1500)
  }, [onClaim, onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-dark-deep">
        <div className="absolute inset-0 opacity-30">
          {/* Animated Stars */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
          
          {/* Shooting Stars */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-shooting-star"
              style={{
                top: `${Math.random() * 50}%`,
                left: '-5%',
                animationDelay: `${i * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-sm">
        {/* Welcome Card */}
        <div className="bg-gradient-to-b from-dark-card/95 to-dark-surface/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center animate-float-slow">
          {/* Logo/Icon Container */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-brand/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-brand/20 to-brand-light/20 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-light opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <span className="material-icons text-5xl text-brand group-hover:scale-110 transition-transform duration-300">rocket_launch</span>
            </div>
          </div>

          {/* Title with Gradient */}
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-brand via-brand-light to-brand bg-clip-text text-transparent">
            Welcome to Space Clicker!
          </h1>
          <p className="text-gray-400 mb-8">Embark on an epic clicking adventure</p>

          {/* Bonus Amount Card */}
          <div className="bg-dark-surface/50 rounded-3xl p-6 mb-8 transform hover:scale-105 transition-transform duration-300 group">
            <div className="text-sm text-gray-400 mb-3">Welcome Bonus</div>
            <div className="relative">
              <div className="absolute inset-0 bg-brand/5 blur-xl rounded-full animate-pulse-slow" />
              <div className="relative flex items-center justify-center gap-3">
                <span className="material-icons text-yellow-500 text-4xl animate-bounce">monetization_on</span>
                <span className="text-4xl font-bold">{formatNumber(WELCOME_BONUS)}</span>
              </div>
            </div>
            <div className="mt-3 text-brand-light text-sm">Claim your starter pack!</div>
          </div>

          {/* Claim Button */}
          <button
            onClick={handleClaim}
            disabled={isClaiming}
            className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 relative group
              ${isClaiming 
                ? 'bg-dark-surface text-gray-400 cursor-not-allowed' 
                : 'bg-brand hover:bg-brand-light text-black hover:scale-105'}`}
          >
            <div className="absolute inset-0 bg-brand/20 rounded-xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity" />
            <div className="relative flex items-center justify-center gap-2">
              {isClaiming ? (
                <>
                  <div className="w-5 h-5 border-3 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-lg">Claiming...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">Claim Bonus</span>
                  <span className="material-icons text-xl group-hover:rotate-12 transition-transform">redeem</span>
                </>
              )}
            </div>
          </button>

          {/* Terms */}
          <div className="mt-6 text-xs text-gray-500">
            *One-time welcome bonus for new space explorers
          </div>
        </div>

        {/* Decorative Orbs */}
        <div className="absolute -z-10 inset-0">
          <div className="absolute top-0 left-0 w-48 h-48 bg-brand/10 rounded-full blur-3xl animate-orb-float" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-light/10 rounded-full blur-3xl animate-orb-float-delayed" />
        </div>
      </div>
    </div>
  )
} 