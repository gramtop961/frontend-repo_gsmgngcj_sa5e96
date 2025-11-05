import React, { useMemo } from 'react';
import { Wind, Droplets } from 'lucide-react';

function categoryFromAQI(aqi) {
  if (aqi <= 50) return { label: 'Good', color: 'bg-emerald-500', text: 'text-emerald-700', ring: 'ring-emerald-200' };
  if (aqi <= 100) return { label: 'Moderate', color: 'bg-yellow-400', text: 'text-yellow-700', ring: 'ring-yellow-200' };
  if (aqi <= 150) return { label: 'Unhealthy (SG)', color: 'bg-orange-500', text: 'text-orange-700', ring: 'ring-orange-200' };
  if (aqi <= 200) return { label: 'Unhealthy', color: 'bg-red-500', text: 'text-red-700', ring: 'ring-red-200' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: 'bg-purple-600', text: 'text-purple-700', ring: 'ring-purple-200' };
  return { label: 'Hazardous', color: 'bg-rose-700', text: 'text-rose-800', ring: 'ring-rose-200' };
}

function Sparkline({ data = [], color = '#10b981' }) {
  const path = useMemo(() => {
    if (!data.length) return '';
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = Math.max(1, max - min);
    const width = 120;
    const height = 36;
    return data
      .map((v, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((v - min) / range) * height;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }, [data]);

  return (
    <svg width="120" height="36" viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={path} stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function AQICard({ title, aqi, metrics, history = [], accent = 'emerald' }) {
  const cat = categoryFromAQI(aqi);
  const colorHex = {
    emerald: '#10b981',
    yellow: '#f59e0b',
    orange: '#f97316',
    red: '#ef4444',
    teal: '#14b8a6',
    sky: '#0ea5e9',
  }[accent] || '#10b981';

  return (
    <div className={`rounded-2xl bg-white shadow-sm ring-1 ${cat.ring} p-5 flex flex-col gap-4`}>      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <div className="mt-1 flex items-end gap-2">
            <span className="text-4xl font-semibold text-slate-900">{aqi}</span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${cat.color} text-white`}>{cat.label}</span>
          </div>
        </div>
        <Sparkline data={history} color={colorHex} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">PM2.5</p>
          <p className="text-sm font-medium text-slate-900">{metrics.pm25} µg/m³</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">PM10</p>
          <p className="text-sm font-medium text-slate-900">{metrics.pm10} µg/m³</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 flex items-center gap-2">
          <Wind className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-xs text-slate-500 leading-none mb-1">CO₂</p>
            <p className="text-sm font-medium text-slate-900">{metrics.co2} ppm</p>
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 flex items-center gap-2">
          <Droplets className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-xs text-slate-500 leading-none mb-1">Humidity</p>
            <p className="text-sm font-medium text-slate-900">{metrics.humidity}%</p>
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-500">
        Scale: 0-50 Good, 51-100 Moderate, 101-150 Unhealthy for Sensitive, 151-200 Unhealthy
      </div>
    </div>
  );
}
