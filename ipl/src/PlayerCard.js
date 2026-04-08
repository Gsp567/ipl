import React from "react";

export default function PlayerCard({ player, currentBid, bidder }) {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={player.img} alt={player.name} style={{ width: "230px", height: "230px", borderRadius: "50%", border: "6px solid gold", objectFit: "cover" }} />
      <h1 style={{ fontSize: "3.8rem", color: "#feca57", margin: "15px 0 5px" }}>{player.name}</h1>
      <p style={{ fontSize: "1.4rem", color: "#c8d6e5" }}>{player.role} | Base: ₹{player.price.toFixed(2)} Cr</p>
      <div style={{ border: `2px solid ${bidder ? bidder.color : "#444"}`, padding: "30px", borderRadius: "20px", width: "fit-content", margin: "25px auto", background: "rgba(0,0,0,0.5)" }}>
        <div style={{ color: "#a4b0be", fontSize: "1.2rem" }}>CURRENT BID</div>
        <h2 style={{ fontSize: "4.5rem", color: bidder ? bidder.color : "#00cec9", margin: "10px 0" }}>₹{(currentBid || player.price).toFixed(2)} Cr</h2>
        {bidder && <div style={{ background: bidder.color, padding: "10px 25px", borderRadius: "12px", fontWeight: "bold", fontSize: "1.3rem" }}>Leading: {bidder.name}</div>}
      </div>
    </div>
  );
}