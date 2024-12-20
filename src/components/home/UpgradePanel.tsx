import { useCallback } from 'react'
import { formatNumber } from '@/utils/formatters'

interface UpgradePanelProps {
  isOpen: boolean;
  onClose: () => void;
  clickLimit: number;
  rechargeTime: number;
  clickPower: number;
  totalCoins: number;
  onUpgrade: (type: 'limit' | 'recharge' | 'power', cost: number) => void;
  onLimitChange: (newLimit: number) => void;
  onRechargeTimeChange: (newTime: number) => void;
  onClickPowerChange: (newPower: number) => void;
}

export function UpgradePanel({
  isOpen,
  onClose,
  clickLimit,
  rechargeTime,
  clickPower,
  totalCoins,
  onUpgrade,
  onLimitChange,
  onRechargeTimeChange,
  onClickPowerChange
}: UpgradePanelProps) {
  const limitUpgradeCost = Math.floor(clickLimit * 2.5)
  const rechargeUpgradeCost = Math.floor((60 / rechargeTime) * 1000)
  const powerUpgradeCost = Math.floor(clickPower * 5000)

  const handleLimitUpgrade = useCallback(() => {
    if (totalCoins >= limitUpgradeCost) {
      onUpgrade('limit', limitUpgradeCost)
      onLimitChange(clickLimit + 500)
    }
  }, [clickLimit, limitUpgradeCost, totalCoins, onUpgrade, onLimitChange])

  const handleRechargeUpgrade = useCallback(() => {
    if (totalCoins >= rechargeUpgradeCost) {
      onUpgrade('recharge', rechargeUpgradeCost)
      onRechargeTimeChange(Math.max(10, rechargeTime - 5))
    }
  }, [rechargeTime, rechargeUpgradeCost, totalCoins, onUpgrade, onRechargeTimeChange])

  const handlePowerUpgrade = useCallback(() => {
    if (totalCoins >= powerUpgradeCost) {
      onUpgrade('power', powerUpgradeCost)
      onClickPowerChange(clickPower + 1)
    }
  }, [clickPower, powerUpgradeCost, totalCoins, onUpgrade, onClickPowerChange])

  return (
    <div className={`fixed inset-x-0 bottom-0 transition-transform duration-300 z-50
      ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
    >
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Panel Content */}
      <div className="relative bg-dark-card/95 backdrop-blur-xl rounded-t-3xl border-t border-white/10">
        {/* Pull Indicator */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
        </div>

        {/* Header - Fixed */}
        <div className="sticky top-0 bg-dark-card/95 backdrop-blur-xl p-6 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
              Power Ups
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <span className="material-icons">close</span>
            </button>
          </div>

          {/* Available Coins */}
          <div className="flex items-center gap-2">
            <div className="bg-dark-surface/50 px-4 py-2 rounded-xl flex items-center gap-2">
              <span className="material-icons text-yellow-500">monetization_on</span>
              <span className="font-medium">{formatNumber(totalCoins)}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4 pb-24">
          {/* Click Power Upgrade */}
          <div className="bg-dark-surface/50 rounded-xl p-4 border border-white/5 hover:border-brand/20 transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                  <span className="material-icons text-brand">add_circle</span>
                </div>
                <div>
                  <h3 className="font-medium">Click Power</h3>
                  <p className="text-sm text-gray-400">Current: {clickPower}x</p>
                </div>
              </div>
              <button
                onClick={handlePowerUpgrade}
                disabled={totalCoins < powerUpgradeCost}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
                  ${totalCoins >= powerUpgradeCost 
                    ? 'bg-brand hover:bg-brand-light text-black hover:scale-105' 
                    : 'bg-dark-card/50 text-gray-400'}`}
              >
                <span className="text-sm font-medium">{formatNumber(powerUpgradeCost)}</span>
                <span className="material-icons text-base">add</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="material-icons text-brand text-base">arrow_forward</span>
              Upgrade to {clickPower + 1}x click power
            </div>
          </div>

          {/* Click Limit Upgrade */}
          <div className="bg-dark-surface/50 rounded-xl p-4 border border-white/5 hover:border-brand/20 transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                  <span className="material-icons text-brand">speed</span>
                </div>
                <div>
                  <h3 className="font-medium">Click Limit</h3>
                  <p className="text-sm text-gray-400">Current: {formatNumber(clickLimit)}</p>
                </div>
              </div>
              <button
                onClick={handleLimitUpgrade}
                disabled={totalCoins < limitUpgradeCost}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
                  ${totalCoins >= limitUpgradeCost 
                    ? 'bg-brand hover:bg-brand-light text-black hover:scale-105' 
                    : 'bg-dark-card/50 text-gray-400'}`}
              >
                <span className="text-sm font-medium">{formatNumber(limitUpgradeCost)}</span>
                <span className="material-icons text-base">add</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="material-icons text-brand text-base">arrow_forward</span>
              Upgrade to {formatNumber(clickLimit + 500)} clicks
            </div>
          </div>

          {/* Recharge Time Upgrade */}
          <div className="bg-dark-surface/50 rounded-xl p-4 border border-white/5 hover:border-brand/20 transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                  <span className="material-icons text-brand">bolt</span>
                </div>
                <div>
                  <h3 className="font-medium">Recharge Time</h3>
                  <p className="text-sm text-gray-400">Current: {rechargeTime}s</p>
                </div>
              </div>
              <button
                onClick={handleRechargeUpgrade}
                disabled={totalCoins < rechargeUpgradeCost || rechargeTime <= 10}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
                  ${totalCoins >= rechargeUpgradeCost && rechargeTime > 10
                    ? 'bg-brand hover:bg-brand-light text-black hover:scale-105' 
                    : 'bg-dark-card/50 text-gray-400'}`}
              >
                <span className="text-sm font-medium">{formatNumber(rechargeUpgradeCost)}</span>
                <span className="material-icons text-base">add</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="material-icons text-brand text-base">arrow_forward</span>
              Reduce to {Math.max(10, rechargeTime - 5)}s recharge time
            </div>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-dark-surface/30 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-500/10 flex items-center justify-center">
                <span className="material-icons text-gray-500">lock</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-400">More Coming Soon</h3>
                <p className="text-sm text-gray-500">Stay tuned for new upgrades!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 