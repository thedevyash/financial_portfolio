
const STORE = new Map();    // key -> { t, v }
const INFLIGHT = new Map(); // key -> Promise

export function createMemoCache(ttlMs = 15_000) {
  async function memo(key, producer) {
    const now = Date.now();
    const hit = STORE.get(key);
    if (hit && now - hit.t < ttlMs) return hit.v;

    if (INFLIGHT.has(key)) return INFLIGHT.get(key);

    const p = (async () => {
      try {
        const v = await producer();
        STORE.set(key, { t: Date.now(), v });
        return v;
      } finally {
        INFLIGHT.delete(key);
      }
    })();

    INFLIGHT.set(key, p);
    return p;
  }

  return { memo };
}
