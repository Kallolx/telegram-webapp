import { useEffect, useRef, useMemo } from 'react'

export const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Move HEX_PROPERTIES outside useEffect
  const HEX_PROPERTIES = useMemo(() => ({
    SIZE: 50,
    SPACING: 50 * 1.8,
    COLOR: 'rgba(0, 230, 118, 0.08)'
  }), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    let offset = 0

    const drawHexagon = (x: number, y: number, size: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const nextX = x + size * Math.cos(angle)
        const nextY = y + size * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(nextX, nextY)
        } else {
          ctx.lineTo(nextX, nextY)
        }
      }
      ctx.closePath()
      ctx.stroke()
    }

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set line properties
      ctx.strokeStyle = HEX_PROPERTIES.COLOR
      ctx.lineWidth = 1

      // Calculate grid dimensions
      const cols = Math.ceil(canvas.width / HEX_PROPERTIES.SPACING) + 2
      const rows = Math.ceil(canvas.height / HEX_PROPERTIES.SPACING) + 2

      // Draw hexagon grid with offset
      for (let row = -2; row < rows; row++) {
        for (let col = -2; col < cols; col++) {
          const x = col * HEX_PROPERTIES.SPACING + (row % 2) * (HEX_PROPERTIES.SPACING / 2)
          const y = row * (HEX_PROPERTIES.SIZE * 1.5) + offset

          // Add perspective scaling
          const scale = 1 + (y / canvas.height) * 0.5
          const scaledSize = HEX_PROPERTIES.SIZE * scale

          // Wrap around vertically
          const wrappedY = y % (canvas.height + HEX_PROPERTIES.SIZE * 2) - HEX_PROPERTIES.SIZE

          // Only draw if in viewport
          if (wrappedY > -HEX_PROPERTIES.SIZE && wrappedY < canvas.height + HEX_PROPERTIES.SIZE) {
            // Add glow effect
            ctx.shadowColor = 'rgba(0, 230, 118, 0.1)'
            ctx.shadowBlur = 5
            drawHexagon(x, wrappedY, scaledSize)
            ctx.shadowBlur = 0
          }
        }
      }

      // Update animation
      offset += 0.5
      if (offset >= HEX_PROPERTIES.SIZE * 1.5) {
        offset = 0
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [HEX_PROPERTIES]) // Add HEX_PROPERTIES to dependencies

  return (
    <div className="fixed inset-0 z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-deep via-dark-surface/50 to-dark-deep" />
      
      {/* Animated hexagon grid */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0"
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[150px] animate-pulse delay-500" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  )
} 