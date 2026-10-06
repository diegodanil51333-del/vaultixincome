import React, { useEffect, useRef } from 'react';

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Crypto Symbols Array
    const cryptoSymbols = ['₿', 'Ξ', '◎', '✕', '₮', '▲', '$'];
    const colors = ['#D4AF37', '#6366F1', '#10B981', '#38BDF8', '#8B5CF6'];

    // Particles Array
    const particleCount = Math.min(Math.floor(width / 25), 30);
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      alpha: number;
      color: string;
      symbol?: string;
      fontSize?: number;
    }> = [];

    // Subtle background particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.35 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Floating Crypto Symbol Elements
    const cryptoCount = 12;
    for (let i = 0; i < cryptoCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.25 + 0.1,
        color: colors[i % colors.length],
        symbol: cryptoSymbols[i % cryptoSymbols.length],
        fontSize: Math.floor(Math.random() * 10) + 14
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.globalAlpha = p.alpha;

        if (p.symbol) {
          ctx.font = `900 ${p.fontSize}px sans-serif`;
          ctx.fillStyle = p.color;
          ctx.fillText(p.symbol, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Animated Ambient Radial Light Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-indigo-900/25 via-purple-900/15 to-transparent blur-3xl animate-pulse duration-10000" />
      <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-amber-500/10 via-amber-900/10 to-transparent blur-3xl animate-pulse duration-7000" />
      <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-cyan-900/20 via-[#0B0E14] to-transparent blur-3xl" />

      {/* Lightweight Floating Particle & Crypto Symbol Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      {/* Subtle Digital Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-[#D4AF37] 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
};
