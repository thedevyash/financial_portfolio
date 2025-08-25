// src/components/ErrorBanner.jsx
"use client";
export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
      <span className="font-medium">Error:</span> {message}
    </div>
  );
}
