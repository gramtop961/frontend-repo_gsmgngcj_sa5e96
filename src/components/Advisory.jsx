import React from 'react';
import { AlertTriangle } from 'lucide-react';

function adviceFromAQI(aqi) {
  if (aqi <= 50) return 'Air quality is good. Normal activities can be enjoyed indoors and outdoors.';
  if (aqi <= 100) return 'Moderate air quality. Sensitive groups should consider lighter activities.';
  if (aqi <= 150) return 'Unhealthy for sensitive groups. Consider running air purifiers and reducing strenuous activity.';
  if (aqi <= 200) return 'Unhealthy. Limit time outdoors; enhance indoor filtration and keep windows closed.';
  if (aqi <= 300) return 'Very unhealthy. Stay indoors with purified air; avoid outdoor exertion.';
  return 'Hazardous. Remain indoors with high-efficiency filtration; avoid outdoor exposure.';
}

export default function Advisory({ focus = 'overall', aqi }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-200 p-5">
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5 text-amber-600">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 mb-1">Health Advisory</p>
          <p className="text-sm text-slate-700">{adviceFromAQI(aqi)}</p>
          <p className="mt-2 text-xs text-slate-500">This guidance is simplified. For detailed local guidance, follow public health advisories.</p>
        </div>
      </div>
    </div>
  );
}
