import React from "react";

export default function Teams({ teams, onBid, bidderIndex }) {
  return (
    <div>
      <style>{`
        .spotlight-btn-team:hover:not(:disabled) { 
          filter: brightness(1.2); transform: translateY(-3px); 
        }
      `}</style>
      
      <div style={styles.grid}>
        {teams.map((t, i) => {
          const isLeading = bidderIndex === i;
          return (
            <button 
              key={i} 
              onClick={() => onBid(i)} 
              disabled={isLeading}
              className={isLeading ? "" : "spotlight-btn-team"}
              style={{
                ...styles.btn, 
                background: t.color, 
                boxShadow: isLeading ? `0 0 25px ${t.color}, inset 0 0 10px rgba(255,255,255,0.5)` : "0 5px 15px rgba(0,0,0,0.4)",
                border: isLeading ? "2px solid white" : "2px solid transparent",
                transform: isLeading ? "scale(1.05)" : "scale(1)",
                opacity: isLeading ? 0.7 : 1,
                cursor: isLeading ? "not-allowed" : "pointer"
              }}
            >
              <span style={{fontSize: "1.4rem"}}>{t.name}</span>
              <span style={{fontSize: "1rem", opacity: 0.8, display: "block", marginTop: "3px"}}>
                {isLeading ? "LEADING" : "BID ₹"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  grid: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginTop: "35px" },
  btn: { padding: "16px 35px", borderRadius: "12px", color: "white", fontWeight: "bold", transition: "all 0.3s ease", minWidth: "140px" }
};