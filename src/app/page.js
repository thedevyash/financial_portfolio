"use client";

import holdings from "@/data/holdings.json";
import PortfolioTable from "@/components/PortfolioTable";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export default function Home() {
  const { rows, lastUpdated, loading, errorMsg } = usePortfolioData(holdings, 15000);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-10">
        
        {/* Premium Hero Section */}
        <header className="relative overflow-hidden bg-gradient-to-r from-slate-900/95 via-slate-800/85 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50">
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          
          <div className="relative p-8 sm:p-12">
            <div className="text-center space-y-6">
              {/* Main Title */}
              <div className="relative inline-block">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent leading-tight mb-4">
                  Dynamic Portfolio
                </h1>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-400">
                  Dashboard
                </div>
                {/* Subtle glow effect */}
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-emerald-600/10 rounded-3xl blur-2xl -z-10"></div>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="absolute top-6 right-6">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600/40 px-4 py-2 rounded-full">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-300 text-xs font-bold tracking-wider">
                      {loading ? "UPDATING" : "LIVE"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Error Banner with Premium Styling */}
        {errorMsg && (
          <div className="relative overflow-hidden bg-gradient-to-r from-red-950/95 via-red-900/85 to-red-950/95 backdrop-blur-xl rounded-2xl border border-red-800/50 shadow-2xl shadow-red-900/20">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
            <ErrorBanner message={errorMsg} />
          </div>
        )}

        {/* Portfolio Table with Enhanced Wrapper */}
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-emerald-600/10 rounded-[2rem] blur-2xl opacity-50"></div>
          <div className="relative">
            <PortfolioTable rows={rows} lastUpdated={lastUpdated} loading={loading} />
          </div>
        </div>

        {/* Premium Footer */}
        <footer className="text-center py-12">
          <div className="space-y-4">
            <div className="text-slate-600 text-sm">
              Made with ❤️ by Yash Sharma
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}