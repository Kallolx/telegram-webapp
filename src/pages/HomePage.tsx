import { UserSection } from '@/components/layout/UserSection'
import { TokenDisplay } from '@/components/home/TokenDisplay'
import { Background } from '@/components/layout/Background'
import { useState, useEffect, useRef, useCallback } from 'react'

interface HomePageProps {
  initialCoins: number;
}

export function HomePage({ initialCoins }: HomePageProps) {
  const [clickCount, setClickCount] = useState(0)
  const [totalEarnedCoins, setTotalEarnedCoins] = useState(0)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!initializedRef.current && initialCoins > 0) {
      setClickCount(initialCoins)
      setTotalEarnedCoins(initialCoins)
      initializedRef.current = true
    }
  }, [initialCoins])

  const userLevel = Math.max(1, Math.floor(totalEarnedCoins / 10000) + 1)

  const handleClickCountChange = useCallback((count: number | ((prev: number) => number)) => {
    if (typeof count === 'function') {
      setClickCount(prev => {
        const newCount = count(prev)
        const difference = newCount - prev
        if (difference > 0) {
          setTotalEarnedCoins(earned => earned + difference)
        }
        return newCount
      })
    } else {
      const difference = count - clickCount
      if (difference > 0) {
        setTotalEarnedCoins(prev => prev + difference)
      }
      setClickCount(count)
    }
  }, [clickCount])

  return (
    <div className="flex flex-col min-h-screen pb-24 relative">
      <Background />
      <div className="relative z-10">
        <UserSection totalEarned={totalEarnedCoins} />
        <TokenDisplay 
          clickCount={clickCount} 
          setClickCount={handleClickCountChange}
          userLevel={userLevel}
        />
      </div>
    </div>
  )
} 