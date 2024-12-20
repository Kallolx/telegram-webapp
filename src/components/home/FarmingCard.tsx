import { useEffect, useCallback, useMemo, useState } from 'react'
import { formatNumber } from '@/utils/formatters'

interface FarmingCardProps {
  onCollect: (amount: number) => void;
  userLevel: number;
}

export function FarmingCard({ onCollect, userLevel }: FarmingCardProps) {
  // Memoize time calculations
  const { FARMING_TIME, FARMING_REWARD } = useMemo(() => {
    const BASE_TIME = 4 * 60 * 60 // 4 hours in seconds for level 1
    const ADDITIONAL_TIME = 2 * 60 * 60 // 2 hours in seconds per level
    const BASE_REWARD = 20 // Base reward for level 1
    
    return {
      FARMING_TIME: BASE_TIME + (ADDITIONAL_TIME * (userLevel - 1)),
      FARMING_REWARD: BASE_REWARD * (userLevel || 1)
    }
  }, [userLevel])

  const [timeLeft, setTimeLeft] = useState(FARMING_TIME)
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)

  // Reset timer when farming time changes
  useEffect(() => {
    setTimeLeft(FARMING_TIME)
    setProgress(0)
    setIsReady(false)
  }, [FARMING_TIME])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          setIsReady(true)
          return 0
        }
        return prev - 1
      })

      setProgress(() => {
        const newProgress = ((FARMING_TIME - timeLeft) / FARMING_TIME) * 100
        return Math.min(100, Math.floor(newProgress))
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft])

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`
  }, [])

  const handleCollect = useCallback(() => {
    if (!isReady) return
    onCollect(FARMING_REWARD)
    setIsReady(false)
    setTimeLeft(FARMING_TIME)
    setProgress(0)
  }, [isReady, onCollect, FARMING_REWARD, FARMING_TIME])

  return (
    <div className="px-4 mt-8 flex items-center gap-3">
      {/* Farming Card */}
      <div className="flex-1 bg-gradient-to-r from-dark-card/95 to-dark-card/90 backdrop-blur-xl 
                    rounded-2xl border border-white/5 overflow-hidden">
        <div className="relative h-20">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Progress Bar with smooth animation */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-brand to-brand-light transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />

          {/* Content with better contrast */}
          <div className="relative h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-white font-medium text-lg mix-blend-difference">
                {progress}%
              </div>
              <div className="text-white text-lg font-medium mix-blend-difference">
                {formatNumber(FARMING_REWARD)}
              </div>
            </div>
            <div className="flex items-center text-white mix-blend-difference">
              <span className="material-icons text-base mr-1">schedule</span>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      {/* Collect Button */}
      <button
        onClick={handleCollect}
        disabled={!isReady}
        className={`h-20 px-6 rounded-2xl font-medium transition-all duration-300
          ${isReady 
            ? 'bg-brand text-black hover:bg-brand-light cursor-pointer' 
            : 'bg-dark-card/50 text-gray-500 cursor-not-allowed'
          }`}
      >
        Collect
      </button>
    </div>
  )
} 