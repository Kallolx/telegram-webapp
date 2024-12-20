import { useNavigation } from '@/context/NavigationContext'

const navItems = [
  { id: 'home', icon: 'paid', label: 'Home' },
  { id: 'boost', icon: 'rocket_launch', label: 'Tasks' },
  { id: 'refer', icon: 'group_add', label: 'Refer' },
  { id: 'shop', icon: 'paragliding', label: 'Airdrop' },
] as const

export function BottomNav() {
  const { currentPage, setCurrentPage } = useNavigation()

  return (
    <div className="fixed bottom-0 inset-x-0 p-4 pointer-events-none">
      <nav className="bg-dark-card/80 backdrop-blur-xl rounded-2xl border border-white/5 shadow-lg pointer-events-auto">
        <div className="grid grid-cols-4 relative">
          {/* Active Tab Indicator */}
          <div 
            className="absolute top-0 left-0 w-1/4 h-full transition-transform duration-300 ease-spring"
            style={{ 
              transform: `translateX(${navItems.findIndex(item => item.id === currentPage) * 100}%)`
            }}
          >
            <div className="absolute inset-0 bg-brand/10 m-1 rounded-xl" />
          </div>

          {/* Nav Items */}
          {navItems.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setCurrentPage(id as any)}
              className={`relative flex flex-col items-center justify-center py-3 transition-colors duration-200
                ${currentPage === id ? 'text-brand' : 'text-gray-400 hover:text-gray-300'}`}
            >
              {id === currentPage && (
                <div className="absolute inset-0 animate-tab-glow">
                  <div className="absolute inset-x-4 -top-px h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
                </div>
              )}
              <span className={`material-icons text-xl mb-1 transition-transform duration-200 ${
                currentPage === id ? 'scale-110' : ''
              }`}>
                {icon}
              </span>
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
} 