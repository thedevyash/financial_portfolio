export function clsx(...xs) { 
    return xs.filter(Boolean).join(" "); 
  }
  
  export function inr(n) {
    if (n == null) return "—";
    return n.toLocaleString("en-IN", { 
      style: "currency", 
      currency: "INR", 
      maximumFractionDigits: 2 
    });
  }
  
  export function formatNumber(n) {
    if (n == null) return "—";
    return n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  }