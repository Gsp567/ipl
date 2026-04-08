import React from "react";

export default function Teams({ teams, onBid, bidderIndex, nextBid }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
      {teams.map((t, i) => (
        <button key={i} onClick={() => onBid(i)} disabled={bidderIndex === i || t.purse < nextBid} 
          style={{ 
            padding: "22px", borderRadius: "18px", color: "white", cursor: "pointer", 
            background: t.color, display: "flex", flexDirection: "column", 
            alignItems: "center", minWidth: "160px", 
            opacity: (bidderIndex === i || t.purse < nextBid) ? 0.4 : 1, 
            border: bidderIndex === i ? "4px solid white" : "none", transition: "0.2s" 
          }}>
          <img src={t.logo} alt="" width="40" style={{ marginBottom: "8px" }} />
          <span style={{ fontWeight: "bold", fontSize: "1.4rem" }}>{t.name}</span>
          <span style={{ fontSize: "1.1rem" }}>{bidderIndex === i ? "LEADING" : `BID ₹${nextBid.toFixed(2)}`}</span>
        </button>
      ))}
    </div>
  );
}