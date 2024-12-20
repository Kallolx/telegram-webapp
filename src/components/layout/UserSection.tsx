import { useMemo, useState } from 'react'
import { formatNumber } from '@/utils/formatters'
import { WalletPanel } from '@/components/wallet/WalletPanel'

interface UserSectionProps {
  totalEarned: number;
}

export function UserSection({ totalEarned }: UserSectionProps) {
  const [isWalletOpen, setIsWalletOpen] = useState(false)
  const tg = window.Telegram.WebApp
  const stats = useMemo(() => {
    const CLICKS_PER_LEVEL = 10000
    const level = Math.max(1, Math.floor(totalEarned / CLICKS_PER_LEVEL) + 1)
    const levelProgress = totalEarned % CLICKS_PER_LEVEL
    const progressPercent = (levelProgress / CLICKS_PER_LEVEL) * 100

    return {
      level,
      name: tg.initDataUnsafe.user?.username || 'User',
      xp: levelProgress,
      nextLevelXp: CLICKS_PER_LEVEL,
      progressPercent: Math.min(100, progressPercent)
    }
  }, [totalEarned])

  return (
    <div className="px-4 pt-4">
      {/* User Info Card */}
      <div className="bg-dark-card/30 backdrop-blur-lg rounded-2xl p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar with Level Badge */}
            <div className="relative">
              <div className="absolute -top-1 -right-1 bg-brand/10 text-brand text-xs font-medium px-2 py-0.5 rounded-full">
                {stats.level}
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-white/10">
                {tg.initDataUnsafe.user?.photo_url ? (
                  <img 
                    src={tg.initDataUnsafe.user.photo_url} 
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-dark-surface flex items-center justify-center text-lg font-medium">
                    {stats.name[0]}
                  </div>
                )}
              </div>
            </div>

            {/* User Details */}
            <div>
              <div className="font-medium text-base">{stats.name}</div>
              <div className="text-sm text-gray-400">Level {stats.level}</div>
            </div>
          </div>

          {/* Wallet Button */}
          <button 
            onClick={() => setIsWalletOpen(true)}
            className="bg-brand hover:bg-brand-light px-4 py-1.5 rounded-full 
                     transition-colors flex items-center gap-1.5"
          >
            <span className="material-icons text-black text-base">account_balance_wallet</span>
            <span className="text-black text-sm font-medium">Wallet</span>
          </button>
        </div>

        {/* Level Progress */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1.5">
            <span>Level Progress</span>
            <span>{formatNumber(stats.xp)}/{formatNumber(stats.nextLevelXp)}</span>
          </div>
          <div className="h-1 bg-dark-surface rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand to-brand-light transition-all duration-300"
              style={{ width: `${stats.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Wallet Panel */}
      <WalletPanel 
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
      />
    </div>
  )
} 