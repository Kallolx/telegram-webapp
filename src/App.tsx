import { useEffect, useState } from 'react'
import { BottomNav } from '@/components/layout/BottomNav'
import { NavigationProvider } from '@/context/NavigationContext'
import { WelcomeBonus } from '@/components/onboarding/WelcomeBonus'
import { HomePage } from '@/pages/HomePage'

function PageContent() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [initialCoins, setInitialCoins] = useState(0)

  const handleWelcomeBonus = (amount: number) => {
    setInitialCoins(amount)
  }

  if (showOnboarding) {
    return (
      <WelcomeBonus 
        onClaim={handleWelcomeBonus}
        onComplete={() => setShowOnboarding(false)}
      />
    )
  }

  return <HomePage initialCoins={initialCoins} />
}

export default function App() {
  useEffect(() => {
    window.Telegram.WebApp.expand()
  }, [])

  return (
    <NavigationProvider>
      <div className="relative min-h-screen bg-gradient-to-b from-dark-deep to-dark-surface text-white">
        <PageContent />
        <div className="relative z-20">
          <BottomNav />
        </div>
      </div>
    </NavigationProvider>
  )
} 