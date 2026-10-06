import React, { useEffect, useRef } from 'react';

const SVG_LOGOS = [
  // BTC (Bitcoin Orange #F7931A)
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="16" fill="%23F7931A"/><path d="M22.3 12.8c.3-2.1-1.3-3.2-3.5-4l.7-2.8-1.7-.4-.7 2.8c-.4-.1-.9-.2-1.4-.3l.7-2.8-1.7-.4-.7 2.8c-.4-.1-.7-.2-1.1-.2l-2.4-.6-.5 1.9s1.3.3 1.2.3c.7.2.8.7.8 1.1l-.8 3.2c0 0 .1 0 .2.1h-.2l-1.1 4.5c-.1.2-.3.6-.8.4 0 0-1.2-.3-1.2-.3l-.9 2.1 2.3.6c.4.1.9.2 1.3.3l-.7 2.9 1.7.4.7-2.8c.5.1.9.2 1.4.3l-.7 2.8 1.7.4.7-2.9c3 .6 5.2.3 6.1-2.4.7-2.1-.03-3.4-1.6-4.2 1.1-.4 2-1.3 2.2-2.9zm-4 5.9c-.5 2.2-4.2 1-5.4.7l1-3.9c1.2.3 5 1 4.4 3.2zm.6-5.9c-.5 2-3.6.9-4.6.7l.9-3.6c1 .2 4.2.8 3.7 2.9z" fill="%23FFF"/></svg>',
  // ETH (Ethereum Blue #627EEA)
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="16" fill="%23627EEA"/><path d="M16 4v8.9l7.5 3.3z" fill="%23C0CBF6"/><path d="M16 4L8.5 16.2l7.5-3.3z" fill="%23FFF"/><path d="M16 21.3v6.7l7.5-10.4z" fill="%23C0CBF6"/><path d="M16 28v-6.7L8.5 17.6z" fill="%23FFF"/><path d="M16 20l7.5-4.4L16 12.3z" fill="%238197E6"/><path d="M8.5 15.6L16 20v-7.7z" fill="%23C0CBF6"/></svg>',
  // USDT (Tether Green #26A17B)
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="16" fill="%2326A17B"/><path d="M17.9 16.3c-.2 0-.8.1-1.9.1s-1.7-.1-1.9-.1c-3.1-.1-5.4-.7-5.4-1.5s2.3-1.4 5.4-1.5V11h-3.8V8h11.4v3h-3.8v2.3c3.1.1 5.4.7 5.4 1.5s-2.3 1.4-5.4 1.5zm0 1c3.1-.1 5.2-.7 5.2-1.4s-2.1-1.3-5.2-1.4v2.8zm-3.8 0v-2.8c-3.1.1-5.2.7-5.2 1.4s2.1 1.3 5.2 1.4zm0 1.2c.2 0 .8.1 1.9.1s1.7-.1 1.9-.1v4.4h-3.8v-4.4z" fill="%23FFF"/></svg>',
  // TRX (Tron Red #FF0013)
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="16" fill="%23FF0013"/><path d="M22.8 7.5L8.2 11.2l9.8 14.3zM21.2 9l-3 12.8L10.5 12z" fill="%23FFF"/></svg>',
  // XRP (Ripple Dark/Cyan #00AAE4)
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="16" fill="%2323292F"/><path d="M21.9 8h2.3l-5 5.1c-1.8 1.8-4.6 1.8-6.4 0l-5-5.1h2.3l4 4c.9.9 2.2.9 3.1 0l4.7-4zm-11.8 16h-2.3l5-5.1c1.8-1.8 4.6-1.8 6.4 0l5 5.1h-2.3l-4-4c-.9-.9-2.2-.9-3.1 0l-4.7 4z" fill="%2300AAE4"/></svg>',
  // BNB (Binance Gold #F3BA2F)
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="16" fill="%23F3BA2F"/><path d="M12.1 13.8l3.9-3.9 3.9 3.9 2.3-2.3-6.2-6.2-6.2 6.2zm0 4.4L16 22.1l3.9-3.9 2.3 2.3-6.2 6.2-6.2-6.2zM19.9 16l2.3-2.3 2.3 2.3-2.3 2.3zm-7.8 0l-2.3-2.3-2.3 2.3 2.3 2.3zm2.2 0l1.7-1.7 1.7 1.7-1.7 1.7z" fill="%23FFF"/></svg>'
];

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

    // Preload Authentic Crypto SVG Images
    const loadedImages: HTMLImageElement[] = [];
    SVG_LOGOS.forEach((src) => {
      const img = new Image();
      img.src = src;
      loadedImages.push(img);
    });

    const colors = ['#D4AF37', '#6366F1', '#10B981', '#38BDF8', '#8B5CF6'];

    // Background Sparkle Particles
    const particleCount = Math.min(Math.floor(width / 30), 25);
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      alpha: number;
      color: string;
      img?: HTMLImageElement;
      size?: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Floating Authentic Crypto Brand SVG Logo Particles (28px Size)
    const cryptoCount = 12;
    for (let i = 0; i < cryptoCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.35 - 0.1,
        alpha: Math.random() * 0.3 + 0.25,
        color: colors[i % colors.length],
        img: loadedImages[i % loadedImages.length],
        size: 28 // 28px size as specified (24px-32px range)
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        ctx.globalAlpha = p.alpha;

        if (p.img && p.size) {
          try {
            ctx.drawImage(p.img, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
          } catch {
            // Fallback
          }
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

      {/* Lightweight Floating Particle & Vector Crypto Brand SVG Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-80" />

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
