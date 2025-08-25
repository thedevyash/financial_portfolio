
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import symbols from "@/data/symbols.json";
import { fetchYahooQuotesBatched } from "@/lib/batchYahoo";
import { createMemoCache } from "@/lib/cache";

const { memo } = createMemoCache(15_000); // 15s TTL

export async function GET() {
  try {
    const key = "quotes:all";

    const payload = await memo(key, async () => {
      const quotes = await fetchYahooQuotesBatched(symbols, 20, 3);
      const data = symbols.map((sym) => {
        const q = quotes[sym];
        return {
          symbol: sym,
          name: q?.shortName || q?.longName || null,
          currency: q?.currency || null,
          cmp: q?.regularMarketPrice ?? null,
          le:q?.epsTrailingTwelveMonths??null,
          pe:q?.trailingPE??null
        };
      });

      const missing = symbols.filter((s) => !quotes[s]);
      const warnings = missing.length ? [`No data for: ${missing.join(", ")}`] : [];

      return { data, warnings, asOf: new Date().toISOString() };
    });

    // PERFORMANCE: tell the platform/CDN to cache & revalidate
    return new NextResponse(JSON.stringify(payload), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=15, stale-while-revalidate=60"
      }
    });
  } catch (err) {
    // ERROR HANDLING: safe message & 500
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
