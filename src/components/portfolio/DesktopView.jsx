import React from "react";
import { clsx, inr, formatNumber } from "../../utils/Helpers";

export function DesktopView({ bySector, totalInvestment, totalPV }) {
  return (
    <div className="hidden lg:block">
      <div className="overflow-x-auto">
        <table className="border-collapse w-full" style={{ minWidth: '1200px' }}>
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-slate-900/95 via-slate-800/85 to-slate-900/95 backdrop-blur-xl">
            <tr className="border-b border-slate-700/50">
              <th className="px-4 py-5 text-left font-bold text-slate-200 tracking-wider text-xs uppercase" style={{ width: '180px' }}>
                Sector / Particulars
              </th>
              <th className="px-3 py-5 text-right font-bold text-slate-200 tracking-wider text-xs uppercase" style={{ width: '85px' }}>
                Symbol
              </th>
              <th className="px-3 py-5 text-right font-bold text-slate-200 tracking-wider text-xs uppercase" style={{ width: '85px' }}>
                Purchase
              </th>
              <th className="px-2 py-5 text-right font-bold text-slate-200 tracking-wider text-xs uppercase" style={{ width: '60px' }}>
                Qty
              </th>
              <th className="px-3 py-5 text-right font-bold text-slate-200 tracking-wider text-xs uppercase" style={{ width: '110px' }}>
                Investment
              </th>
              <th className="px-3 py-5 text-right font-bold text-slate-200 tracking-wider text-xs uppercase" style={{ width: '85px' }}>
                CMP
              </th>
              <th className="px-3 py-5 text-right font-bold text-slate-200 tracking-wider text-xs uppercase" style={{ width: '110px' }}>
                Present Value
              </th>
              <th className="px-2 py-5 text-right font-bold text-slate-200 tracking-wider text-xs uppercase" style={{ width: '70px' }}>
                P/E Ratio
              </th>
              <th className="px-3 py-5 text-right font-bold text-slate-200 tracking-wider text-xs uppercase" style={{ width: '100px' }}>
                Latest Earnings
              </th>
              <th className="px-4 py-5 text-right font-bold text-slate-200 tracking-wider text-xs uppercase" style={{ width: '110px' }}>
                Gain / Loss
              </th>
            </tr>
          </thead>
          <tbody>
            {bySector.map(([sector, items]) => {
              const sectorInv = items.reduce((a, r) => a + r.investment, 0);
              const sectorPV = items.reduce((a, r) => a + (r.presentValue ?? 0), 0);
              const sectorGL = sectorPV - sectorInv;

              return (
                <React.Fragment key={sector}>
                  {/* Sector Header Row */}
                  <tr className="bg-gradient-to-r from-slate-800/70 via-slate-700/50 to-slate-800/70 backdrop-blur-sm border-b border-slate-700/40">
                    <td className="px-4 py-4 font-bold text-slate-100 text-base tracking-wide" colSpan={10}>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>{sector}</span>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Stock Rows */}
                  {items.map(item => (
                    <tr key={sector + item.name} className="hover:bg-slate-800/30 border-b border-slate-800/20 transition-all duration-300 bg-gradient-to-r from-slate-900/10 to-transparent">
                      <td className="px-4 py-5" style={{ width: '180px' }}>
                        <div className="font-semibold text-slate-100 text-sm">{item.name}</div>
                      </td>
                      <td className="px-3 py-5 text-right" style={{ width: '85px' }}>
                        <span className="text-blue-400 font-semibold text-sm tracking-wide">{item.symbol}</span>
                      </td>
                      <td className="px-3 py-5 text-right" style={{ width: '85px' }}>
                        <span className="text-slate-300 font-medium text-sm">{inr(item.purchasePrice)}</span>
                      </td>
                      <td className="px-2 py-5 text-right" style={{ width: '60px' }}>
                        <span className="text-slate-300 font-medium text-sm">{item.qty}</span>
                      </td>
                      <td className="px-3 py-5 text-right" style={{ width: '110px' }}>
                        <span className="text-blue-300 font-bold text-sm">{inr(item.investment)}</span>
                      </td>
                      <td className="px-3 py-5 text-right" style={{ width: '85px' }}>
                        <span className="text-slate-300 font-medium text-sm">{item.cmp != null ? inr(item.cmp) : "—"}</span>
                      </td>
                      <td className="px-3 py-5 text-right" style={{ width: '110px' }}>
                        <span className="text-blue-300 font-bold text-sm">{item.presentValue != null ? inr(item.presentValue) : "—"}</span>
                      </td>
                      <td className="px-2 py-5 text-right" style={{ width: '70px' }}>
                        <span className="text-slate-300 font-medium text-sm">{formatNumber(item.pe)}</span>
                      </td>
                      <td className="px-3 py-5 text-right" style={{ width: '100px' }}>
                        <span className="text-slate-300 font-medium text-sm">{item.le != null ? inr(item.le) : "—"}</span>
                      </td>
                      <td className="px-4 py-5 text-right" style={{ width: '110px' }}>
                        <span className={clsx(
                          "font-bold text-sm px-2 py-1 rounded-lg backdrop-blur-sm border",
                          item.gainLoss == null 
                            ? "text-slate-400 bg-slate-800/50 border-slate-600/30" 
                            : item.gainLoss >= 0 
                              ? "text-emerald-400 bg-emerald-950/40 border-emerald-800/50 shadow-lg shadow-emerald-900/20" 
                              : "text-red-400 bg-red-950/40 border-red-800/50 shadow-lg shadow-red-900/20"
                        )}>
                          {item.gainLoss == null ? "—" : (item.gainLoss >= 0 ? "+" : "") + inr(item.gainLoss)}
                        </span>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Sector Total Row */}
                  <tr className="bg-gradient-to-r from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm border-b border-slate-700/50">
                    <td className="px-4 py-4 font-bold text-slate-200 tracking-wide text-sm" style={{ width: '180px' }}>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>SECTOR TOTAL</span>
                      </div>
                    </td>
                    <td style={{ width: '85px' }}></td>
                    <td style={{ width: '85px' }}></td>
                    <td style={{ width: '60px' }}></td>
                    <td className="px-3 py-4 text-right" style={{ width: '110px' }}>
                      <span className="text-blue-300 font-bold text-sm">{inr(sectorInv)}</span>
                    </td>
                    <td style={{ width: '85px' }}></td>
                    <td className="px-3 py-4 text-right" style={{ width: '110px' }}>
                      <span className="text-blue-300 font-bold text-sm">{inr(sectorPV)}</span>
                    </td>
                    <td style={{ width: '70px' }}></td>
                    <td style={{ width: '100px' }}></td>
                    <td className="px-4 py-4 text-right" style={{ width: '110px' }}>
                      <span className={clsx(
                        "font-bold text-sm px-2 py-1 rounded-lg backdrop-blur-sm border",
                        sectorGL >= 0 
                          ? "text-emerald-400 bg-emerald-950/50 border-emerald-700/50 shadow-lg shadow-emerald-900/20" 
                          : "text-red-400 bg-red-950/50 border-red-700/50 shadow-lg shadow-red-900/20"
                      )}>
                        {(sectorGL >= 0 ? "+" : "") + inr(sectorGL)}
                      </span>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
      {/* Grand Total Row */}
      <tr className="bg-gradient-to-r from-slate-900/95 via-slate-800/85 to-slate-900/95 backdrop-blur-xl border-t-2 border-blue-700/50 shadow-xl">
              <td className="px-4 py-6 font-bold text-white text-lg tracking-wide" style={{ width: '180px' }}>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <span className="whitespace-nowrap">GRAND TOTAL</span>
                </div>
              </td>
              <td style={{ width: '85px' }}></td>
              <td style={{ width: '85px' }}></td>
              <td style={{ width: '60px' }}></td>
              <td className="px-3 py-6 text-right" style={{ width: '110px' }}>
                <span className="text-blue-300 font-bold text-lg whitespace-nowrap">{inr(totalInvestment)}</span>
              </td>
              <td style={{ width: '85px' }}></td>
              <td className="px-3 py-6 text-right" style={{ width: '110px' }}>
                <span className="text-blue-300 font-bold text-lg whitespace-nowrap">{inr(totalPV)}</span>
              </td>
              <td style={{ width: '70px' }}></td>
              <td style={{ width: '100px' }}></td>
              <td className="px-4 py-6 text-right" style={{ width: '110px' }}>
                <div className={clsx(
                  "inline-block font-bold text-lg px-3 py-2 rounded-xl backdrop-blur-sm border shadow-2xl whitespace-nowrap",
                  (totalPV - totalInvestment) >= 0 
                    ? "text-emerald-400 bg-emerald-950/60 border-emerald-700/60 shadow-emerald-900/30" 
                    : "text-red-400 bg-red-950/60 border-red-700/60 shadow-red-900/30"
                )}>
                  {((totalPV - totalInvestment) >= 0 ? "+" : "") + inr(totalPV - totalInvestment)}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}