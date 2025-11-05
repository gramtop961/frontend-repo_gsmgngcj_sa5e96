import React from 'react';
import { Cloud, Home } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-sm">
            <Cloud className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900 leading-tight">Air Quality Dashboard</h1>
            <p className="text-slate-500 text-sm">Indoor vs Outdoor clarity for hotels and commercial spaces</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-600">
          <Home className="h-5 w-5" />
          <span className="text-sm">Facility Overview</span>
        </div>
      </div>
    </header>
  );
}
