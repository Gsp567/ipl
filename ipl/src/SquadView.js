import React from "react";

export default function Squads({ team, max }) {
  if (!team) return <div style={{ textAlign: "center", color: "#666", marginTop: "120px", fontSize: "1.3rem" }}>Select a team to view squad</div>;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
        <img src={team.logo} alt="" width="60" />
        <h2 style={{ margin: 0, color: team.color, fontSize: "2rem" }}>{team.name}</h2>
      </div>
      <div style={{ fontSize: "1.7rem", fontWeight: "bold" }}>₹{team.purse.toFixed(2)} Cr Remaining</div>
      <div style={{ margin: "15px 0", color: "#aaa", fontSize: "1.2rem" }}>Players: {team.players.length} / {max}</div>
      <div style={{ overflowY: "auto", maxHeight: "400px" }}>
        {team.players.map((p, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #333", fontSize: "1.2rem" }}>
            <span>{p.name}</span>
            <span style={{ color: "gold", fontWeight: "bold" }}>₹{p.finalPrice}</span>
          </div>
        ))}
      </div>
    </div>
  );
}