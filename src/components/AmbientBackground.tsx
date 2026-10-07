import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#0B0E14]">
      {/* Stable Subtle Deep Trading Ambient Radial Gradients */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#1E293B]/40 via-indigo-950/20 to-transparent blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#D4AF37]/5 via-amber-950/10 to-transparent blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#0F172A]/80 via-[#0B0E14] to-transparent blur-3xl" />

      {/* Subtle Financial Trading Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #2A3447 1px, transparent 1px), linear-gradient(to bottom, #2A3447 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

