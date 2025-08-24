// src/hooks/usePortfolioData.js
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * @param {Array} staticRows - [{ sector, name, purchasePrice, qty, symbol }]
 */
export function usePortfolioData(staticRows, intervalMs = 15000) {
  const [liveMap, setLiveMap] = useState({}); // symbol -> cmp
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const timerRef = useRef(null);

  const symbols = 
    Array.from(new Set(staticRows.map(r => r.symbol).filter(Boolean)));
    

  async function fetchLive() {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/quotes/all", { cache: "no-store" });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${res.status}`);
      }
      const json = await res.json();
      const map = {};
      (json.data || []).forEach((row) => { map[row.symbol] = {"cmp":row.cmp,"pe":row.pe,"le":row.le}; });
      setLiveMap(map);
      setLastUpdated(new Date(json.asOf || Date.now()));
    } catch (e) {
      setErrorMsg(e.message || "Failed to fetch live quotes");
      // keep last good liveMap
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchLive();
    timerRef.current = setInterval(fetchLive, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [symbols.join(","), intervalMs]);

  // Merge static rows with live CMP for the table
  const mergedRows = 
     staticRows.map(r => ({ ...r, cmp: liveMap[r.symbol]?.cmp ?? null ,pe:liveMap[r.symbol]?.pe??null,le:liveMap[r.symbol]?.le}));
  return { rows: mergedRows, lastUpdated, loading, errorMsg };
}
