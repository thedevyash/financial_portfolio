"use client";
import React, { useMemo } from "react";
import { PortfolioHeader } from "../components/portfolio/PortfolioHeader";
import { MobileView } from "../components/portfolio/MobileView";
import { DesktopView } from "../components/portfolio/DesktopView";

// function formatNumber(n) {
//   if (n == null) return "—";
//   return n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
// }

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
    <div className="rounded-2xl shadow ring-1 ring-black/5 overflow-hidden">
      <PortfolioHeader loading={loading} lastUpdated={lastUpdated} />
      <MobileView 
        bySector={bySector} 
        totalInvestment={totalInvestment} 
        totalPV={totalPV} 
      />
      <DesktopView
        bySector={bySector} 
        totalInvestment={totalInvestment} 
        totalPV={totalPV} 
      />
    </div>
  );
}

const PortfolioTable = React.memo(TableInner);
export default PortfolioTable;