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
  );
}