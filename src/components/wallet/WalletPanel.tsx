interface WalletPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Wallet {
  id: string;
  name: string;
  logo: string;
  color: string;
  isPopular?: boolean;
  comingSoon?: boolean;
  description?: string;
}

export function WalletPanel({ isOpen, onClose }: WalletPanelProps) {
  const wallets: Wallet[] = [
    {
      id: 'telegram',
      name: 'Telegram Wallet',
      logo: 'https://telegram.org/img/t_logo.svg',
      color: 'from-[#2AABEE] to-[#229ED9]',
      isPopular: true,
      description: 'Connect with your Telegram Wallet'
    },
    {
      id: 'binance',
      name: 'Binance',
      logo: 'https://cdn-icons-png.flaticon.com/512/14446/14446106.png',
      color: 'from-[#F3BA2F] to-[#F0B90B]',
      isPopular: true,
      description: 'Connect with Binance Wallet'
    },
    {
      id: 'bitget',
      name: 'Bitget',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11092.png',
      color: 'from-[#00F2FE] to-[#4FACFE]',
      description: 'Connect with Bitget Wallet'
    },
    {
      id: 'bybit',
      name: 'Bybit',
      logo: 'https://crypto-central.io/library/uploads/bybit_logo-min-300x300.png',
      color: 'from-[#FFD027] to-[#FF9C27]',
      description: 'Connect with Bybit Wallet'
    },
    {
      id: 'kucoin',
      name: 'KuCoin',
      logo: 'https://assets-currency.kucoin.com/60c74375db892b0006d819a9_KCS.png',
      color: 'from-[#24AE8F] to-[#1F9E81]',
      comingSoon: true,
      description: 'Coming soon to our platform'
    },
    {
      id: 'gateio',
      name: 'Gate.io',
      logo: 'https://www.nuget.org/profiles/gateio/avatar?imageSize=512',
      color: 'from-[#E40377] to-[#FF3CAD]',
      comingSoon: true,
      description: 'Coming soon to our platform'
    }
  ]

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
      <div className="relative bg-dark-card/95 backdrop-blur-xl rounded-t-3xl border-t border-white/10
                    max-h-[85vh] flex flex-col">
        {/* Pull Indicator */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
        </div>

        {/* Fixed Header */}
        <div className="sticky top-0 bg-dark-card/95 backdrop-blur-xl z-10">
          <div className="p-6 pb-4 border-b border-white/5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-xl font-medium bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  Connect Wallet
                </h2>
                <p className="text-sm text-gray-400">Choose your preferred wallet</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
                <span className="material-icons">close</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="p-6 space-y-6">
            {/* Popular Wallets */}
            <div className="space-y-4">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Popular Wallets
              </h3>
              <div className="space-y-3">
                {wallets.filter(w => w.isPopular).map(wallet => (
                  <button
                    key={wallet.id}
                    className="w-full bg-dark-surface/50 hover:bg-dark-surface/70 
                             rounded-xl p-4 flex items-center gap-4 group 
                             transition-all duration-200 border border-white/5 
                             hover:border-white/10 hover:shadow-lg"
                  >
                    {/* Logo */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${wallet.color}
                                   flex items-center justify-center shadow-lg group-hover:scale-105 
                                   transition-transform p-2`}>
                      <img 
                        src={wallet.logo} 
                        alt={wallet.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-white group-hover:text-brand 
                                   transition-colors flex items-center gap-2">
                        {wallet.name}
                        {wallet.isPopular && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand/10 text-brand">
                            Popular
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-400">{wallet.description}</p>
                    </div>

                    <span className="material-icons text-gray-400 group-hover:translate-x-1 
                                   transition-transform">
                      chevron_right
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* More Wallets */}
            <div className="space-y-4">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                More Wallets
              </h3>
              <div className="space-y-3">
                {wallets.filter(w => !w.isPopular).map(wallet => (
                  <button
                    key={wallet.id}
                    disabled={wallet.comingSoon}
                    className={`w-full bg-dark-surface/50 hover:bg-dark-surface/70 
                             rounded-xl p-4 flex items-center gap-4 group 
                             transition-all duration-200 border border-white/5 
                             ${wallet.comingSoon 
                               ? 'opacity-60 cursor-not-allowed' 
                               : 'hover:border-white/10 hover:shadow-lg'}`}
                  >
                    {/* Logo */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${wallet.color}
                                   flex items-center justify-center shadow-lg group-hover:scale-105 
                                   transition-transform p-2`}>
                      <img 
                        src={wallet.logo} 
                        alt={wallet.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white group-hover:text-brand 
                                     transition-colors">
                          {wallet.name}
                        </h3>
                        {wallet.comingSoon && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full 
                                       bg-gray-500/20 text-gray-400">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{wallet.description}</p>
                    </div>

                    {!wallet.comingSoon && (
                      <span className="material-icons text-gray-400 group-hover:translate-x-1 
                                     transition-transform">
                        chevron_right
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 