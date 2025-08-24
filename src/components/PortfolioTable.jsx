"use client";
import React, { useMemo } from "react";

function clsx(...xs) { return xs.filter(Boolean).join(" "); }
function inr(n) {
  if (n == null) return "—";
  return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });
}

function formatNumber(n) {
  if (n == null) return "—";
  return n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

/**
 * props.rows => array of:
 * { sector, name, purchasePrice, qty, symbol, cmp, pe, le }
 * We compute: investment, presentValue, gainLoss
 */
function TableInner({ rows, lastUpdated, loading }) {
  const enriched = useMemo(() => {
    return rows.map(r => {
      const investment = r.purchasePrice * r.qty;
      const presentValue = r.cmp != null ? r.cmp * r.qty : null;
      const gainLoss = presentValue != null ? presentValue - investment : null;
      const pe = r.pe != null ? r.pe : null;
      const le = r.le != null ? r.le : null;
      return { ...r, investment, presentValue, gainLoss, pe, le };
    });
  }, [rows]);

  const bySector = useMemo(() => {
    const map = new Map();
    enriched.forEach(r => {
      if (!map.has(r.sector)) map.set(r.sector, []);
      map.get(r.sector).push(r);
    });
    return Array.from(map.entries());
  }, [enriched]);

  const totalInvestment = useMemo(
    () => enriched.reduce((a, r) => a + r.investment, 0),
    [enriched]
  );

  const totalPV = useMemo(
    () => enriched.reduce((a, r) => a + (r.presentValue ?? 0), 0),
    [enriched]
  );

  return (
    <div className="rounded-2xl bg-white shadow ring-1 ring-black/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-5 py-3 bg-gray-50">
        <div className="text-xs sm:text-sm text-gray-600">
          {loading ? "Updating…" : lastUpdated ? `Live • updated ${lastUpdated.toLocaleTimeString()}` : "—"}
        </div>
      </div>

      {/* Mobile Card View (< lg) */}
      <div className="block lg:hidden">
        {bySector.map(([sector, items]) => {
          const sectorInv = items.reduce((a, r) => a + r.investment, 0);
          const sectorPV = items.reduce((a, r) => a + (r.presentValue ?? 0), 0);
          const sectorGL = sectorPV - sectorInv;

          return (
            <div key={sector} className="border-b border-gray-100 last:border-b-0">
              {/* Sector Header */}
              <div className="bg-gray-100/60 px-4 py-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-700 text-sm">{sector}</h3>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">Sector P&L</div>
                    <div className={clsx(
                      "font-semibold text-sm",
                      sectorGL >= 0 ? "text-green-700" : "text-red-600"
                    )}>
                      {inr(sectorGL)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stocks in this sector */}
              {items.map(item => (
                <div key={sector + item.name} className="p-4 border-b border-gray-50 last:border-b-0">
                  {/* Stock name and symbol with main P&L */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.symbol}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs text-gray-500">Gain/Loss</div>
                      <div className={clsx(
                        "text-right font-bold text-base",
                        item.gainLoss == null ? "text-gray-400" : item.gainLoss >= 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {item.gainLoss == null ? "—" : inr(item.gainLoss)}
                      </div>
                    </div>
                  </div>

                  {/* Financial Details Grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Purchase Price:</span>
                      <span className="font-medium text-gray-900">{inr(item.purchasePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Current Price:</span>
                      <span className="font-medium text-gray-900">{item.cmp != null ? inr(item.cmp) : "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Quantity:</span>
                      <span className="font-medium text-gray-900">{item.qty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">P/E Ratio:</span>
                      <span className="font-medium text-gray-900">{formatNumber(item.pe)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Investment:</span>
                      <span className="font-medium text-blue-600">{inr(item.investment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Present Value:</span>
                      <span className="font-medium text-blue-600">{item.presentValue != null ? inr(item.presentValue) : "—"}</span>
                    </div>
                    <div className="flex justify-between col-span-2">
                      <span className="text-gray-500">Latest Earnings:</span>
                      <span className="font-medium text-gray-900">{item.le != null ? inr(item.le) : "—"}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Sector Summary */}
              <div className="bg-gray-50 px-4 py-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-700">Sector Totals</span>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">Investment → Value</div>
                    <div className="font-semibold text-gray-800">
                      {inr(sectorInv)} → {inr(sectorPV)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Grand Total Mobile */}
        <div className="bg-indigo-50 px-4 py-4">
          <div className="text-center">
            <h3 className="font-bold text-indigo-900 text-lg mb-2">Portfolio Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-xs text-indigo-700">Total Investment</div>
                <div className="font-bold text-indigo-900">{inr(totalInvestment)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-indigo-700">Current Value</div>
                <div className="font-bold text-indigo-900">{inr(totalPV)}</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-indigo-200">
              <div className="text-xs text-indigo-700">Total Gain/Loss</div>
              <div className={clsx(
                "font-bold text-xl",
                (totalPV - totalInvestment) >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {inr(totalPV - totalInvestment)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table View (lg+) */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="border-collapse" style={{ width: '1400px', minWidth: '1400px' }}>
            <thead className="bg-gray-50 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-2 py-3 text-left" style={{ width: '200px', minWidth: '200px' }}>Sector / Particulars</th>
                <th className="px-2 py-3 text-right" style={{ width: '100px', minWidth: '100px' }}>Symbol</th>
                <th className="px-2 py-3 text-right" style={{ width: '100px', minWidth: '100px' }}>Purchase</th>
                <th className="px-2 py-3 text-right" style={{ width: '70px', minWidth: '70px' }}>Qty</th>
                <th className="px-2 py-3 text-right" style={{ width: '120px', minWidth: '120px' }}>Investment</th>
                <th className="px-2 py-3 text-right" style={{ width: '100px', minWidth: '100px' }}>CMP</th>
                <th className="px-2 py-3 text-right" style={{ width: '120px', minWidth: '120px' }}>Present Value</th>
                <th className="px-2 py-3 text-right" style={{ width: '80px', minWidth: '80px' }}>P/E Ratio</th>
                <th className="px-2 py-3 text-right" style={{ width: '110px', minWidth: '110px' }}>Latest Earnings</th>
                <th className="px-2 py-3 text-right" style={{ width: '110px', minWidth: '110px' }}>Gain / Loss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bySector.map(([sector, items]) => {
                const sectorInv = items.reduce((a, r) => a + r.investment, 0);
                const sectorPV = items.reduce((a, r) => a + (r.presentValue ?? 0), 0);
                const sectorGL = sectorPV - sectorInv;

                return (
                  <React.Fragment key={sector}>
                    <tr className="bg-gray-100/60">
                      <td className="px-2 py-2 font-semibold text-gray-700" colSpan={10}>{sector}</td>
                    </tr>
                    {items.map(item => (
                      <tr key={sector + item.name} className="hover:bg-gray-50">
                        <td className="px-2 py-3" style={{ width: '200px', minWidth: '200px' }}>
                          <div className="font-medium text-gray-900">{item.name}</div>
                        </td>
                        <td className="px-2 py-3 text-right text-gray-700" style={{ width: '100px', minWidth: '100px' }}>
                          <span className="whitespace-nowrap">{item.symbol}</span>
                        </td>
                        <td className="px-2 py-3 text-right text-gray-700" style={{ width: '100px', minWidth: '100px' }}>
                          <span className="whitespace-nowrap">{inr(item.purchasePrice)}</span>
                        </td>
                        <td className="px-2 py-3 text-right text-gray-700" style={{ width: '70px', minWidth: '70px' }}>
                          <span className="whitespace-nowrap">{item.qty}</span>
                        </td>
                        <td className="px-2 py-3 text-right text-gray-700" style={{ width: '120px', minWidth: '120px' }}>
                          <span className="whitespace-nowrap">{inr(item.investment)}</span>
                        </td>
                        <td className="px-2 py-3 text-right text-gray-700" style={{ width: '100px', minWidth: '100px' }}>
                          <span className="whitespace-nowrap">{item.cmp != null ? inr(item.cmp) : "—"}</span>
                        </td>
                        <td className="px-2 py-3 text-right text-gray-700" style={{ width: '120px', minWidth: '120px' }}>
                          <span className="whitespace-nowrap">{item.presentValue != null ? inr(item.presentValue) : "—"}</span>
                        </td>
                        <td className="px-2 py-3 text-right text-gray-700" style={{ width: '80px', minWidth: '80px' }}>
                          <span className="whitespace-nowrap">{formatNumber(item.pe)}</span>
                        </td>
                        <td className="px-2 py-3 text-right text-gray-700" style={{ width: '110px', minWidth: '110px' }}>
                          <span className="whitespace-nowrap">{item.le != null ? inr(item.le) : "—"}</span>
                        </td>
                        <td className={clsx(
                          "px-2 py-3 text-right font-semibold",
                          item.gainLoss == null ? "text-gray-400" : item.gainLoss >= 0 ? "text-green-600" : "text-red-600"
                        )} style={{ width: '110px', minWidth: '110px' }}>
                          <span className="whitespace-nowrap">{item.gainLoss == null ? "—" : inr(item.gainLoss)}</span>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="px-2 py-2 text-sm text-gray-600 font-medium" style={{ width: '200px', minWidth: '200px' }}>Sector Total</td>
                      <td style={{ width: '100px', minWidth: '100px' }}></td>
                      <td style={{ width: '100px', minWidth: '100px' }}></td>
                      <td style={{ width: '70px', minWidth: '70px' }}></td>
                      <td className="px-2 py-2 text-right text-gray-800 font-medium" style={{ width: '120px', minWidth: '120px' }}>
                        <span className="whitespace-nowrap">{inr(sectorInv)}</span>
                      </td>
                      <td style={{ width: '100px', minWidth: '100px' }}></td>
                      <td className="px-2 py-2 text-right text-gray-800 font-medium" style={{ width: '120px', minWidth: '120px' }}>
                        <span className="whitespace-nowrap">{inr(sectorPV)}</span>
                      </td>
                      <td style={{ width: '80px', minWidth: '80px' }}></td>
                      <td style={{ width: '110px', minWidth: '110px' }}></td>
                      <td className={clsx(
                        "px-2 py-2 text-right font-semibold",
                        sectorGL >= 0 ? "text-green-700" : "text-red-600"
                      )} style={{ width: '110px', minWidth: '110px' }}>
                        <span className="whitespace-nowrap">{inr(sectorGL)}</span>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
              <tr className="bg-indigo-50">
                <td className="px-2 py-3 font-semibold text-indigo-900" style={{ width: '200px', minWidth: '200px' }}>Grand Total</td>
                <td style={{ width: '100px', minWidth: '100px' }}></td>
                <td style={{ width: '100px', minWidth: '100px' }}></td>
                <td style={{ width: '70px', minWidth: '70px' }}></td>
                <td className="px-2 py-3 text-right font-semibold text-indigo-900" style={{ width: '120px', minWidth: '120px' }}>
                  <span className="whitespace-nowrap">{inr(totalInvestment)}</span>
                </td>
                <td style={{ width: '100px', minWidth: '100px' }}></td>
                <td className="px-2 py-3 text-right font-semibold text-indigo-900" style={{ width: '120px', minWidth: '120px' }}>
                  <span className="whitespace-nowrap">{inr(totalPV)}</span>
                </td>
                <td style={{ width: '80px', minWidth: '80px' }}></td>
                <td style={{ width: '110px', minWidth: '110px' }}></td>
                <td className="px-2 py-3 text-right font-semibold text-indigo-900" style={{ width: '110px', minWidth: '110px' }}>
                  <span className="whitespace-nowrap">{inr(totalPV - totalInvestment)}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const PortfolioTable = React.memo(TableInner);
export default PortfolioTable;