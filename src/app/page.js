"use client";

import holdings from "@/data/holdings.json";
import PortfolioTable from "@/components/PortfolioTable";
import ErrorBanner from "@/components/ErrorBanner";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export default function Home() {
  const { rows, lastUpdated, loading, errorMsg } = usePortfolioData(holdings, 15000);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="bg-white rounded-2xl shadow p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dynamic Portfolio Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Live CMP refresh every 15s • Transformed & cached on the server • Memoized UI
          </p>
        </header>

        {errorMsg && <ErrorBanner message={errorMsg} />}

        <PortfolioTable rows={rows} lastUpdated={lastUpdated} loading={loading} />
      </div>
    </main>
  );
}
