import React from "react";
import { clsx, inr, formatNumber } from "../../utils/Helpers";

export function DesktopTable({ bySector, totalInvestment, totalPV }) {
  return (
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
  );
}