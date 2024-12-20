import { useCallback } from 'react'

interface UpgradeProps {
  clickLimit: number;
  rechargeTime: number;
  totalCoins: number;
  onUpgrade: (type: 'limit' | 'recharge' | 'power', cost: number) => void;
  onLimitChange: (newLimit: number) => void;
  onRechargeTimeChange: (newTime: number) => void;
}

export function useUpgrades({ 
  clickLimit, 
  rechargeTime, 
  totalCoins,
  onUpgrade,
  onLimitChange,
  onRechargeTimeChange
}: UpgradeProps) {
  // Calculate costs based on current levels
  const limitUpgradeCost = Math.floor(clickLimit * 2.5)
  const rechargeUpgradeCost = Math.floor((60 / rechargeTime) * 1000)

  const handleLimitUpgrade = useCallback(() => {
    if (totalCoins >= limitUpgradeCost) {
      onUpgrade('limit', limitUpgradeCost)
      onLimitChange(clickLimit + 500)
    }
  }, [clickLimit, limitUpgradeCost, totalCoins, onUpgrade, onLimitChange])

  const handleRechargeUpgrade = useCallback(() => {
    if (totalCoins >= rechargeUpgradeCost && rechargeTime > 10) {
      onUpgrade('recharge', rechargeUpgradeCost)
      onRechargeTimeChange(Math.max(10, rechargeTime - 5))
    }
  }, [rechargeTime, rechargeUpgradeCost, totalCoins, onUpgrade, onRechargeTimeChange])

  return {
    limitUpgradeCost,
    rechargeUpgradeCost,
    handleLimitUpgrade,
    handleRechargeUpgrade
  }
} 