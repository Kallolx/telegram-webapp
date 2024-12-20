

interface Game {
  id: string;
  title: string;
  reward: number;
  playCount: number;
  maxPlays: number;
  duration: string;
  isNew?: boolean;
  icon: string;
  gradient: string;
  iconBg: string;
}

export function GameCard({ onPlay }: { onPlay: (gameId: string) => void }) {
  const games: Game[] = [
    {
      id: 'space-runner',
      title: 'Space Runner',
      reward: 5000,
      playCount: 0,
      maxPlays: 5,
      duration: '2 min',
      isNew: true,
      icon: 'rocket',
      gradient: 'from-brand to-brand-light',
      iconBg: 'bg-brand/20'
    },
    {
      id: 'asteroid-miner',
      title: 'Asteroid Miner',
      reward: 3000,
      playCount: 0,
      maxPlays: 10,
      duration: '1 min',
      icon: 'blur_on',
      gradient: 'from-accent-purple to-brand',
      iconBg: 'bg-accent-purple/20'
    }
  ]

  return (
    <div className="w-80 space-y-3">
      {games.map(game => (
        <div 
          key={game.id}
          className="relative bg-gradient-to-br from-dark-card/95 to-dark-card/90 backdrop-blur-xl 
                     rounded-xl border border-white/5 overflow-hidden group h-[64px]"
        >
          <div className="relative h-full flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className={`relative w-10 h-10 rounded-lg overflow-hidden ${game.iconBg} 
                              flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <span className="material-icons text-2xl text-white">
                  {game.icon}
                </span>
                <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 
                                group-hover:opacity-20 blur-xl transition-opacity`} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm text-white">
                    {game.title}
                  </h3>
                  {game.isNew && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand text-black font-medium
                                   animate-pulse">
                      NEW
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <span className="material-icons text-yellow-500 text-[12px]">monetization_on</span>
                    <span className="text-xs font-medium text-white">{game.reward}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-icons text-brand text-[12px]">timer</span>
                    <span className="text-xs text-gray-400">{game.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-icons text-gray-400 text-[12px]">sports_esports</span>
                    <span className="text-xs text-gray-400">{game.playCount}/{game.maxPlays}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onPlay(game.id)}
              className={`px-4 py-1.5 rounded-lg font-medium text-xs
                       bg-gradient-to-r ${game.gradient} text-black
                       hover:brightness-110 active:scale-95
                       transition-all duration-200`}
            >
              Play
            </button>
          </div>
        </div>
      ))}
    </div>
  )
} 