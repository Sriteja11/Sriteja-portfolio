import React, { useRef, useEffect, useCallback } from 'react'

/**
 * Full-viewport animated gradient canvas that follows pointer / touch.
 * Renders soft color blobs that drift slowly and shift toward the cursor.
 */
export function GradientCanvas() {
  const canvasRef = useRef(null)
  const pointer = useRef({ x: 0.5, y: 0.5 })
  const blobs = useRef([
    { x: 0.25, y: 0.3, vx: 0.0003, vy: 0.0002, r: 0.38, color: [124, 58, 237] },   // violet
    { x: 0.7,  y: 0.2, vx: -0.0002, vy: 0.0003, r: 0.34, color: [59, 130, 246] },   // blue
    { x: 0.5,  y: 0.7, vx: 0.0002, vy: -0.0002, r: 0.36, color: [236, 72, 153] },   // pink
    { x: 0.3,  y: 0.8, vx: 0.0003, vy: 0.0001, r: 0.30, color: [16, 185, 129] },    // emerald
    { x: 0.8,  y: 0.6, vx: -0.0001, vy: -0.0003, r: 0.28, color: [245, 158, 11] },  // amber
  ])

  const onPointerMove = useCallback((e) => {
    const touch = e.touches ? e.touches[0] : e
    pointer.current = {
      x: touch.clientX / window.innerWidth,
      y: touch.clientY / window.innerHeight,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    function resize() {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      canvas.style.width = '100%'
      canvas.style.height = '100%'
    }

    function draw() {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      const px = pointer.current.x
      const py = pointer.current.y

      for (const b of blobs.current) {
        // Drift naturally
        b.x += b.vx
        b.y += b.vy

        // Soft attraction toward pointer (very gentle)
        b.x += (px - b.x) * 0.003
        b.y += (py - b.y) * 0.003

        // Wrap around edges
        if (b.x < -0.2) b.x = 1.2
        if (b.x > 1.2) b.x = -0.2
        if (b.y < -0.2) b.y = 1.2
        if (b.y > 1.2) b.y = -0.2

        const cx = b.x * width
        const cy = b.y * height
        const radius = b.r * Math.min(width, height)

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        grad.addColorStop(0, `rgba(${b.color.join(',')}, 0.35)`)
        grad.addColorStop(0.5, `rgba(${b.color.join(',')}, 0.12)`)
        grad.addColorStop(1, `rgba(${b.color.join(',')}, 0)`)

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="gradient-canvas"
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onTouchMove={onPointerMove}
    />
  )
}
