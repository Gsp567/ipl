import React from "react";

export default function Squads({ team, max }) {
  if (!team) return (
    <div style={styles.emptyBox}>
      <h2 style={{color: "#a4b0be"}}>Squad Overview</h2>
      <p style={{opacity: 0.6, lineHeight: "1.5"}}>Select a franchise from the bottom menu to view their current squad and remaining purse.</p>
    </div>
  );

  return (
    <div style={{...styles.box, borderTop: `5px solid ${team.color}`}}>
      
      <div style={styles.header}>
        <img src={team.logo} alt="" width="55" style={{dropShadow: "2px 2px 4px black"}} />
        <div>
          <h2 style={{margin: 0, color: team.color, letterSpacing: "1px", textShadow: "1px 1px 2px black"}}>{team.name}</h2>
          <span style={{color: "#d1d8e0", fontSize: "0.95rem", fontWeight: "bold"}}>Players: {team.players.length} / {max}</span>
        </div>
      </div>
      
      <div style={styles.purseContainer}>
        <span style={{color: "#a4b0be", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px"}}>Remaining Purse</span>
        <span style={{fontSize: "1.8rem", fontWeight: "bold", color: "white"}}>
          ₹{team.purse.toFixed(2)} <span style={{fontSize:"1rem", color: "#a4b0be"}}>Cr</span>
        </span>
      </div>

      <div style={styles.list}>
        {team.players.length === 0 ? (
          <div style={{textAlign: "center", opacity: 0.5, marginTop: "40px"}}>
            <p>No players bought yet.</p>
            <p style={{fontSize: "0.8rem"}}>Start bidding to build the squad!</p>
          </div>
        ) : (
          team.players.map((p, i) => (
            <div key={i} style={styles.item}>
              <div style={{display: "flex", flexDirection: "column"}}>
                <span style={{fontWeight: "bold", fontSize: "1.05rem"}}>{p.name}</span>
                <span style={{fontSize: "0.75rem", color: "#a4b0be", textTransform: "uppercase", marginTop: "2px"}}>{p.role}</span>
              </div>
              <span style={{color: "#00d2d3", fontWeight: "bold", fontSize: "1.1rem"}}>₹{p.finalPrice.toFixed(2)} Cr</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  emptyBox: { 
    background: "rgba(0,0,0,0.3)", padding: "40px 20px", borderRadius: "20px", textAlign: "center", border: "2px dashed rgba(255,255,255,0.1)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center"
  },
  box: { 
    background: "rgba(255,255,255,0.05)", padding: "25px", borderRadius: "20px", backdropFilter: "blur(10px)", boxShadow: "0 15px 35px rgba(0,0,0,0.5)", height: "100%", maxHeight: "600px", display: "flex", flexDirection: "column"
  },
  header: { display: "flex", alignItems: "center", gap: "15px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" },
  purseContainer: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.5)", padding: "15px 20px", borderRadius: "12px", margin: "20px 0", border: "1px solid rgba(255,255,255,0.05)" },
  list: { flex: 1, overflowY: "auto", paddingRight: "5px" },
  item: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 15px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)", marginBottom: "8px", borderRadius: "8px", transition: "background 0.2s" }
};