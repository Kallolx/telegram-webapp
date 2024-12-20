import { useState, useCallback, useEffect } from 'react'
import { formatNumber } from '@/utils/formatters'
import { FarmingCard } from './FarmingCard'
import { useUpgrades } from './useUpgrades'
import { UpgradePanel } from './UpgradePanel'
import { GameCard } from './GameCard'

interface TokenDisplayProps {
  clickCount: number;
  setClickCount: (count: number | ((prev: number) => number)) => void;
  userLevel: number;
}

export function TokenDisplay({ clickCount, setClickCount, userLevel }: TokenDisplayProps) {
  const MAX_CLICKS = 1000
  const RECHARGE_TIME = 60 // 1 minute in seconds

  const [isAnimating, setIsAnimating] = useState(false)
  const [clicksLeft, setClicksLeft] = useState(MAX_CLICKS)
  const [isRecharging, setIsRecharging] = useState(false)
  const [rechargeTimeLeft, setRechargeTimeLeft] = useState(0)
  const [clickLimit, setClickLimit] = useState(MAX_CLICKS)
  const [rechargeTime, setRechargeTime] = useState(RECHARGE_TIME)
  const [isUpgradePanelOpen, setIsUpgradePanelOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [clickPower, setClickPower] = useState(1)

  const createFloatingNumber = useCallback(() => {
    const container = document.getElementById('click-container')
    if (!container) return

    // Create 3 floating numbers for better effect
    for (let i = 0; i < 3; i++) {
      const floatingNumber = document.createElement('div')
      
      // Randomize starting position around the circle
      const angle = Math.random() * Math.PI * 2
      const distance = 40 + Math.random() * 20 // Distance from center
      const startX = Math.cos(angle) * distance
      const startY = Math.sin(angle) * distance

      // Randomize end position (floating up and outward)
      const endX = startX * 2
      const endY = startY - 100 - Math.random() * 50

      floatingNumber.className = 'absolute text-brand font-bold pointer-events-none select-none'
      floatingNumber.textContent = `+${clickPower}`
      
      Object.assign(floatingNumber.style, {
        left: '50%',
        top: '50%',
        transform: `translate(${startX}px, ${startY}px) scale(0.5)`,
        opacity: '1',
        transition: 'all 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
      })

      container.appendChild(floatingNumber)

      // Start animation after a small delay
      requestAnimationFrame(() => {
        Object.assign(floatingNumber.style, {
          transform: `translate(${endX}px, ${endY}px) scale(1)`,
          opacity: '0',
        })
      })

      // Remove element after animation
      setTimeout(() => {
        floatingNumber.remove()
      }, 1000)
    }
  }, [clickPower])

  const handleClick = useCallback(() => {
    if (isRecharging || clicksLeft <= 0) return

    setClickCount((prev: number) => prev + clickPower)
    setClicksLeft(prev => {
      // Deduct clicks based on click power
      const newClicks = prev - clickPower
      if (newClicks <= 0) {
        setIsRecharging(true)
        setRechargeTimeLeft(rechargeTime)
        return 0 // Ensure we don't go below 0
      }
      return newClicks
    })
    
    setScale(0.9)
    setTimeout(() => setScale(1.1), 50)
    setTimeout(() => setScale(1), 150)
    
    setIsAnimating(true)
    createFloatingNumber()
  }, [setClickCount, clicksLeft, isRecharging, rechargeTime, createFloatingNumber, clickPower])

  // Handle recharge timer
  useEffect(() => {
    if (!isRecharging) return

    const interval = setInterval(() => {
      setRechargeTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRecharging(false)
          setClicksLeft(MAX_CLICKS)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRecharging])

  const handleFarmingCollect = useCallback((amount: number) => {
    setClickCount((prev: number) => prev + amount)
  }, [setClickCount])

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  // Handle upgrades
  const handleUpgrade = useCallback((type: 'limit' | 'recharge' | 'power', cost: number) => {
    console.log(`Upgrading ${type}`)
    setClickCount(prev => prev - cost)
  }, [setClickCount])

  // Update click limit
  const handleLimitChange = useCallback((newLimit: number) => {
    setClickLimit(newLimit)
    setClicksLeft(prev => Math.min(prev, newLimit)) // Ensure current clicks don't exceed new limit
  }, [])

  // Update recharge time
  const handleRechargeTimeChange = useCallback((newTime: number) => {
    setRechargeTime(newTime)
  }, [])

  // Use the upgrades hook
  const {
    limitUpgradeCost,
    rechargeUpgradeCost
  } = useUpgrades({
    clickLimit,
    rechargeTime,
    totalCoins: clickCount,
    onUpgrade: handleUpgrade,
    onLimitChange: handleLimitChange,
    onRechargeTimeChange: handleRechargeTimeChange
  })

  const handleGamePlay = useCallback((gameId: string) => {
    // Will implement game logic later
    console.log('Playing game:', gameId)
  }, [])

  useEffect(() => {
    console.log('Current upgrade costs:', { limitUpgradeCost, rechargeUpgradeCost })
  }, [limitUpgradeCost, rechargeUpgradeCost])

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8 pb-20">
      {/* Click Count with Coin Icon */}
      <div className="text-4xl font-bold mb-8 transition-all duration-300 flex items-center gap-2">
        <span className="material-icons text-yellow-500" style={{ fontSize: '2.5rem' }}>monetization_on</span>
        <span>{formatNumber(clickCount)}</span>
      </div>

      {/* Click Area */}
      <div id="click-container" className="relative">
        <button 
          onClick={handleClick}
          disabled={isRecharging || clicksLeft <= 0}
          className="relative w-48 h-48 group focus:outline-none disabled:opacity-50"
          style={{
            transform: `scale(${scale})`,
            transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Outer Glow Ring */}
          <div className={`absolute inset-0 bg-brand/10 rounded-full blur-xl transition-transform duration-200
            ${isAnimating ? 'scale-125' : 'scale-100'}`} 
          />

          {/* Main Click Area */}
          <div className="relative bg-dark-card border border-brand/20 rounded-full w-full h-full flex items-center justify-center overflow-hidden">
            {/* Inner Rotating Ring */}
            <div className={`absolute inset-0 border-2 border-brand/20 rounded-full 
              ${isAnimating ? 'animate-spin-slow' : ''}`}
            />
            
            {/* Center Planet */}
            <div 
              className={`w-32 h-32 rounded-full bg-gradient-to-br from-brand/20 to-brand/5 
                flex items-center justify-center transition-all duration-200 
                ${isAnimating ? 'scale-90' : 'scale-100'}
                group-hover:from-brand/30 group-hover:to-brand/10
                group-active:scale-90`}
            >
              {/* Planet Icon */}
              <span className="material-icons text-6xl text-brand group-hover:scale-110 transition-transform">
                rocket_launch
              </span>
            </div>

            {/* Energy Rings */}
            <div className={`absolute inset-0 flex items-center justify-center`}>
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className={`absolute border border-brand/10 rounded-full
                    transition-all duration-300
                    ${isAnimating ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
                  style={{
                    width: `${100 + i * 20}%`,
                    height: `${100 + i * 20}%`,
                    transitionDelay: `${i * 50}ms`
                  }}
                />
              ))}
            </div>
          </div>
        </button>
      </div>

      {/* Clicks Progress */}
      <div className="mt-8 w-80">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-400">
            {isRecharging ? (
              <span className="text-brand">Recharging {formatTime(rechargeTimeLeft)}</span>
            ) : (
              'Clicks Remaining'
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-brand">{clicksLeft}/{clickLimit}</div>
            <button
              onClick={() => setIsUpgradePanelOpen(true)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-brand/10 transition-colors"
            >
              <span className="material-icons text-brand text-sm">rocket_launch</span>
            </button>
          </div>
        </div>

        <div className="h-1.5 bg-dark-surface rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              isRecharging 
                ? 'bg-gradient-to-r from-brand via-brand-light to-brand animate-pulse' 
                : 'bg-brand'
            }`}
            style={{ width: `${(clicksLeft / clickLimit) * 100}%` }}
          />
        </div>
      </div>

      {/* Farming Card */}
      <FarmingCard onCollect={handleFarmingCollect} userLevel={userLevel} />

      {/* Game Card - Increased margin to match other sections */}
      <div className="mt-6 flex justify-center">
        <GameCard onPlay={handleGamePlay} />
      </div>

      {/* Upgrade Panel */}
      <UpgradePanel
        isOpen={isUpgradePanelOpen}
        onClose={() => setIsUpgradePanelOpen(false)}
        clickLimit={clickLimit}
        rechargeTime={rechargeTime}
        clickPower={clickPower}
        totalCoins={clickCount}
        onUpgrade={handleUpgrade}
        onLimitChange={handleLimitChange}
        onRechargeTimeChange={handleRechargeTimeChange}
        onClickPowerChange={setClickPower}
      />
    </div>
  )
} 