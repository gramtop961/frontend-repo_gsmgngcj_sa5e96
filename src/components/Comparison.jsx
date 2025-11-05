import React from 'react';

function barColor(aqi) {
  if (aqi <= 50) return 'bg-emerald-500';
  if (aqi <= 100) return 'bg-yellow-400';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-600';
  return 'bg-rose-700';
}

export default function Comparison({ indoorAQI, outdoorAQI }) {
  const maxScale = 300; // cap for bar length
  const indoorWidth = Math.min(100, (indoorAQI / maxScale) * 100);
  const outdoorWidth = Math.min(100, (outdoorAQI / maxScale) * 100);
  const diff = indoorAQI - outdoorAQI;

  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-slate-900">Indoor vs Outdoor AQI</p>
        <p className="text-xs text-slate-500">Lower is better</p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-slate-600 mb-1">
            <span>Indoor</span>
            <span>{indoorAQI}</span>
          </div>
          <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
            <div className={`h-full ${barColor(indoorAQI)} transition-all`} style={{ width: `${indoorWidth}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-600 mb-1">
            <span>Outdoor</span>
            <span>{outdoorAQI}</span>
          </div>
          <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
            <div className={`h-full ${barColor(outdoorAQI)} transition-all`} style={{ width: `${outdoorWidth}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
        {diff < -10 && (
          <span>Outdoor air is cleaner by {Math.abs(diff)} AQI points. Consider bringing in more fresh air.</span>
        )}
        {diff >= -10 && diff <= 10 && (
          <span>Indoor and outdoor air are similar. Maintain filtration and ventilation as usual.</span>
        )}
        {diff > 10 && (
          <span>Indoor air is worse by {diff} AQI points. Increase filtration, reduce sources, or limit activity.</span>
        )}
      </div>
    </div>
  );
}
