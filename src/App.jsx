import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AQICard from './components/AQICard';
import Comparison from './components/Comparison';
import Advisory from './components/Advisory';

function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }

export default function App() {
  // Seed data that feels realistic for hotel/commercial settings
  const [indoor, setIndoor] = useState({
    aqi: 42,
    metrics: { pm25: 8, pm10: 16, co2: 720, humidity: 45 },
    history: [38, 40, 41, 43, 44, 42, 41, 40, 42, 43, 42, 42],
  });
  const [outdoor, setOutdoor] = useState({
    aqi: 78,
    metrics: { pm25: 22, pm10: 40, co2: 420, humidity: 52 },
    history: [72, 74, 73, 75, 76, 77, 79, 80, 78, 77, 79, 78],
  });

  // Gentle live updates to keep the dashboard feeling fresh
  useEffect(() => {
    const id = setInterval(() => {
      setIndoor(prev => {
        const delta = (Math.random() - 0.5) * 4;
        const nextAQI = clamp(Math.round(prev.aqi + delta), 10, 160);
        const nextHistory = [...prev.history.slice(1), nextAQI];
        return {
          aqi: nextAQI,
          metrics: {
            pm25: clamp(Math.round(prev.metrics.pm25 + (Math.random() - 0.5) * 2), 3, 60),
            pm10: clamp(Math.round(prev.metrics.pm10 + (Math.random() - 0.5) * 3), 8, 120),
            co2: clamp(Math.round(prev.metrics.co2 + (Math.random() - 0.5) * 30), 500, 1500),
            humidity: clamp(Math.round(prev.metrics.humidity + (Math.random() - 0.5) * 2), 30, 70),
          },
          history: nextHistory,
        };
      });

      setOutdoor(prev => {
        const delta = (Math.random() - 0.5) * 6;
        const nextAQI = clamp(Math.round(prev.aqi + delta), 20, 250);
        const nextHistory = [...prev.history.slice(1), nextAQI];
        return {
          aqi: nextAQI,
          metrics: {
            pm25: clamp(Math.round(prev.metrics.pm25 + (Math.random() - 0.5) * 3), 5, 120),
            pm10: clamp(Math.round(prev.metrics.pm10 + (Math.random() - 0.5) * 4), 10, 200),
            co2: prev.metrics.co2, // outdoor baseline
            humidity: clamp(Math.round(prev.metrics.humidity + (Math.random() - 0.5) * 3), 25, 90),
          },
          history: nextHistory,
        };
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const worstAQI = useMemo(() => Math.max(indoor.aqi, outdoor.aqi), [indoor.aqi, outdoor.aqi]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <AQICard
              title="Indoor Air Quality"
              aqi={indoor.aqi}
              metrics={indoor.metrics}
              history={indoor.history}
              accent="emerald"
            />
            <AQICard
              title="Outdoor Air Quality"
              aqi={outdoor.aqi}
              metrics={outdoor.metrics}
              history={outdoor.history}
              accent="sky"
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Comparison indoorAQI={indoor.aqi} outdoorAQI={outdoor.aqi} />
            <Advisory aqi={worstAQI} />

            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-5">
              <p className="text-sm font-medium text-slate-900 mb-3">What the numbers mean</p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2" />0–50 Good</li>
                <li><span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-2" />51–100 Moderate</li>
                <li><span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-2" />101–150 Unhealthy for Sensitive</li>
                <li><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2" />151–200 Unhealthy</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
