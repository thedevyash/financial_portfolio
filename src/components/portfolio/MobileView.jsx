import React from "react";
import { clsx, inr, formatNumber } from "../../utils/Helpers";

export function MobileView({ bySector, totalInvestment, totalPV }) {
  return (
    <div className="block lg:hidden">
      {bySector.map(([sector, items]) => {
        const sectorInv = items.reduce((a, r) => a + r.investment, 0);
        const sectorPV = items.reduce((a, r) => a + (r.presentValue ?? 0), 0);
        const sectorGL = sectorPV - sectorInv;

        return (
          <div key={sector} className="border-b border-slate-700/30 last:border-b-0">
            {/* Sector Header */}
            <div className="bg-gradient-to-r from-slate-800/70 via-slate-700/50 to-slate-800/70 backdrop-blur-sm px-6 py-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <h3 className="font-bold text-slate-100 text-lg tracking-wide">{sector}</h3>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 mb-2 font-semibold tracking-wider whitespace-nowrap">SECTOR P&L</div>
                  <div className={clsx(
                    "font-bold text-lg px-4 py-2 rounded-xl backdrop-blur-sm border whitespace-nowrap",
                    sectorGL >= 0 
                      ? "text-emerald-400 bg-emerald-950/50 border-emerald-800/50 shadow-lg shadow-emerald-900/20" 
                      : "text-red-400 bg-red-950/50 border-red-800/50 shadow-lg shadow-red-900/20"
                  )}>
                    {sectorGL >= 0 ? "+" : ""}{inr(sectorGL)}
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Cards */}
            {items.map(item => (
              <div key={sector + item.name} className="px-6 py-6 border-b border-slate-800/30 last:border-b-0 bg-gradient-to-br from-slate-900/20 to-slate-800/10">
                {/* Stock Header with Enhanced Styling */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-100 text-lg leading-tight mb-2">{item.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <p className="text-blue-400 font-semibold text-sm tracking-wide">{item.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-xs text-slate-400 mb-3 font-semibold tracking-wider whitespace-nowrap">GAIN/LOSS</div>
                    <div className={clsx(
                      "text-right font-bold text-xl px-4 py-3 rounded-xl backdrop-blur-sm border whitespace-nowrap",
                      item.gainLoss == null 
                        ? "text-slate-400 bg-slate-800/50 border-slate-600/30" 
                        : item.gainLoss >= 0 
                          ? "text-emerald-400 bg-emerald-950/50 border-emerald-700/50 shadow-lg shadow-emerald-900/20" 
                          : "text-red-400 bg-red-950/50 border-red-700/50 shadow-lg shadow-red-900/20"
                    )}>
                      {item.gainLoss == null ? "—" : (item.gainLoss >= 0 ? "+" : "") + inr(item.gainLoss)}
                    </div>
                  </div>
                </div>

                {/* Financial Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-slate-700/30">
                    <span className="text-slate-400 text-xs block mb-2 font-semibold tracking-wider whitespace-nowrap">PURCHASE PRICE</span>
                    <span className="font-bold text-slate-100 text-base whitespace-nowrap">{inr(item.purchasePrice)}</span>
                  </div>
                  <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-slate-700/30">
                    <span className="text-slate-400 text-xs block mb-2 font-semibold tracking-wider whitespace-nowrap">CURRENT PRICE</span>
                    <span className="font-bold text-slate-100 text-base whitespace-nowrap">{item.cmp != null ? inr(item.cmp) : "—"}</span>
                  </div>
                  <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-slate-700/30">
                    <span className="text-slate-400 text-xs block mb-2 font-semibold tracking-wider whitespace-nowrap">QUANTITY</span>
                    <span className="font-bold text-slate-100 text-base whitespace-nowrap">{item.qty}</span>
                  </div>
                  <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-slate-700/30">
                    <span className="text-slate-400 text-xs block mb-2 font-semibold tracking-wider whitespace-nowrap">P/E RATIO</span>
                    <span className="font-bold text-slate-100 text-base whitespace-nowrap">{formatNumber(item.pe)}</span>
                  </div>
                  <div className="bg-gradient-to-br from-blue-950/50 to-blue-900/30 backdrop-blur-sm p-4 rounded-xl border border-blue-800/40">
                    <span className="text-blue-400 text-xs block mb-2 font-semibold tracking-wider whitespace-nowrap">INVESTMENT</span>
                    <span className="font-bold text-blue-300 text-base whitespace-nowrap">{inr(item.investment)}</span>
                  </div>
                  <div className="bg-gradient-to-br from-blue-950/50 to-blue-900/30 backdrop-blur-sm p-4 rounded-xl border border-blue-800/40">
                    <span className="text-blue-400 text-xs block mb-2 font-semibold tracking-wider whitespace-nowrap">PRESENT VALUE</span>
                    <span className="font-bold text-blue-300 text-base whitespace-nowrap">{item.presentValue != null ? inr(item.presentValue) : "—"}</span>
                  </div>
                  <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-slate-700/30 col-span-2">
                    <span className="text-slate-400 text-xs block mb-2 font-semibold tracking-wider whitespace-nowrap">LATEST EARNINGS</span>
                    <span className="font-bold text-slate-100 text-base whitespace-nowrap">{item.le != null ? inr(item.le) : "—"}</span>
                  </div>
                </div>
              </div>
            ))}
{/* Sector Summary */}
<div className="bg-gradient-to-r from-slate-800/60 to-slate-700/40 backdrop-blur-sm px-4 py-5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="font-bold text-slate-200 tracking-wide whitespace-nowrap">SECTOR TOTALS</span>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-400 mb-2 font-semibold tracking-wider">INV → VAL</div>
                  <div className="font-bold text-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-blue-400 text-sm">{inr(sectorInv)}</span>
                      <span className="text-slate-500 hidden sm:inline">→</span>
                      <span className="text-slate-500 sm:hidden">↓</span>
                      <span className="text-blue-300 text-sm">{inr(sectorPV)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
            
          </div>
        );
      })}

      {/* Portfolio Summary */}
      <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/85 to-slate-900/95 backdrop-blur-xl px-6 py-8">
        <div className="text-center">
          {/* Header with animated indicator */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
            </div>
            <h3 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">Portfolio Summary</h3>
          </div>
          
          {/* Investment Cards - Stack on smaller screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-950/60 to-blue-900/40 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-blue-800/30">
              <div className="text-blue-400 text-xs sm:text-sm mb-2 sm:mb-3 font-semibold tracking-wider whitespace-nowrap">TOTAL INVESTMENT</div>
              <div className="font-bold text-white text-lg sm:text-2xl whitespace-nowrap">{inr(totalInvestment)}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-950/60 to-blue-900/40 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-blue-800/30">
              <div className="text-blue-400 text-xs sm:text-sm mb-2 sm:mb-3 font-semibold tracking-wider whitespace-nowrap">CURRENT VALUE</div>
              <div className="font-bold text-white text-lg sm:text-2xl whitespace-nowrap">{inr(totalPV)}</div>
            </div>
          </div>
          
          {/* Total P&L Section */}
          <div className="pt-6 border-t border-slate-700/50">
            <div className="text-slate-300 text-xs sm:text-sm mb-4 font-semibold tracking-wider whitespace-nowrap">TOTAL GAIN/LOSS</div>
            <div className={clsx(
              "font-bold text-2xl sm:text-4xl px-6 sm:px-8 py-3 sm:py-4 rounded-2xl backdrop-blur-sm border shadow-2xl whitespace-nowrap",
              (totalPV - totalInvestment) >= 0 
                ? "text-emerald-400 bg-emerald-950/60 border-emerald-700/60 shadow-emerald-900/30" 
                : "text-red-400 bg-red-950/60 border-red-700/60 shadow-red-900/30"
            )}>
              {(totalPV - totalInvestment) >= 0 ? "+" : ""}{inr(totalPV - totalInvestment)}
            </div>
          </div>
          
          {/* Performance Indicator */}
          <div className="mt-6 pt-4 border-t border-slate-700/30">
            <div className="flex items-center justify-center space-x-2 text-slate-400 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold tracking-wide whitespace-nowrap">Live Portfolio Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}