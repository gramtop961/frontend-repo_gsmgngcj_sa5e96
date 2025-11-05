import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full h-[360px] sm:h-[420px] lg:h-[520px] overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80 pointer-events-none" />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="pointer-events-none">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">Indoor vs Outdoor Air Quality</h2>
          <p className="mt-3 text-slate-600 max-w-2xl text-sm sm:text-base">
            A clear, real‑time view of air health for hotels and commercial spaces. Compare metrics at a glance and act with confidence.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span>Lower AQI indicates cleaner air</span>
          </div>
        </div>
      </div>
    </section>
  );
}
