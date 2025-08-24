export function PortfolioHeader({ loading, lastUpdated }) {
    return (
      <div className="flex items-center justify-between px-3 sm:px-5 py-3 bg-gray-50">
        <div className="text-xs sm:text-sm text-gray-600">
          {loading ? "Updating…" : lastUpdated ? `Live • updated ${lastUpdated.toLocaleTimeString()}` : "—"}
        </div>
      </div>
    );
  }