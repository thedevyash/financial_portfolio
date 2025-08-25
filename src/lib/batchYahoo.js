
import yahooFinance from "yahoo-finance2";

function chunk(arr, n = 11) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

/**
 * Fetch quotes in batches (11) with limited parallelism for safety.
 * Shows async/await + Promise.all for parallel batch calls.
 */
export async function fetchYahooQuotesBatched(symbols, batchSize = 11, parallelBatches = 3) {
  const uniq = Array.from(new Set(symbols)).filter(Boolean);
  if (uniq.length === 0) return {};

  const batches = chunk(uniq, batchSize);
  const results = {};

  // process in windows of `parallelBatches`
  for (let i = 0; i < batches.length; i += parallelBatches) {
    const window = batches.slice(i, i + parallelBatches);

    // parallel Yahoo calls for these chunks
    const settled = await Promise.allSettled(
      window.map(async (b) => {
        const res = await yahooFinance.quote(b);
        const arr = Array.isArray(res) ? res : [res];
        for (const q of arr) {
          if (q?.symbol) results[q.symbol] = q;
        }
      })
    );

  }

  return results;
}
