// ==========================================
// PARTICLE CANVAS COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/ParticleCanvas.tsx
// Satır Sayısı: 119 satır

"use client"

import React, { useEffect, useRef } from "react"

interface ParticleCanvasProps {
  theme: "dark" | "light"
}

export function ParticleCanvas({ theme }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const particles: FoodParticle[] = []

    // Resize canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Food particle class
    class FoodParticle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      emoji: string

      constructor() {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
          this.size = 10;
          this.speedX = 0;
          this.speedY = 0;
          this.color = theme === "dark" ? "#f97316" : "#ea580c";
          this.emoji = "🍕";
          return;
        }
        
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 20 + 10
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = theme === "dark" ? "#f97316" : "#ea580c"
        this.emoji = ["🍕", "🍔", "🍟", "🥗", "🍖"][Math.floor(Math.random() * 5)]
      }

      update() {
        if (!canvas) return;
        
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        if (!ctx) return;
        
        ctx.font = `${this.size}px Arial`
        ctx.fillText(this.emoji, this.x, this.y)
      }
    }

    // Create particles
    for (let i = 0; i < 15; i++) {
      particles.push(new FoodParticle())
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resizeCanvas()
      // Recreate particles with new canvas dimensions
      particles.length = 0
      for (let i = 0; i < 15; i++) {
        particles.push(new FoodParticle())
      }
    }

    // Initial setup
    resizeCanvas()
    animate()

    // Event listeners
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20" />
} 