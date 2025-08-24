export function PortfolioHeader({ loading, lastUpdated }) {
    return (
      <div className="flex items-center justify-between px-3 sm:px-3 py-3">
        <div className="text-xs sm:text-sm">
          {loading ? "Updating…" : lastUpdated ? `Live • updated ${lastUpdated.toLocaleTimeString()}` : "—"}
        </div>
      </div>
    );
  }