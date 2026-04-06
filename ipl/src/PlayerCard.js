import React from "react";

export default function Player({ player, currentBid, bidder }) {
  return (
    <div>
      <style>{`
        @keyframes pulseGlow { 
          0% { box-shadow: 0 0 15px gold; } 
          50% { box-shadow: 0 0 40px gold; } 
          100% { box-shadow: 0 0 15px gold; } 
        }
      `}</style>
      
      <img src={player.img} alt="" style={styles.img} />
      
      <h1 style={styles.name}>{player.name}</h1>
      <p style={styles.role}>{player.role} | Base: ₹{player.price.toFixed(2)} Cr</p>
      
      <div style={{
        ...styles.bidBox, 
        borderColor: bidder ? bidder.color : "transparent", 
        boxShadow: bidder ? `0 0 25px ${bidder.color}` : "inset 0 0 10px rgba(255,255,255,0.1)"
      }}>
        <div style={{fontSize: "1.2rem", color: "#a4b0be", textTransform: "uppercase"}}>Current Bid</div>
        <h2 style={{margin: "10px 0", fontSize: "3.5rem", color: bidder ? bidder.color : "#00d2d3"}}>
            ₹{(currentBid || player.price).toFixed(2)} <span style={{fontSize:"1.5rem"}}>Cr</span>
        </h2>
        {bidder && (
          <div style={{
            background: bidder.color, color: "white", padding: "5px 15px", 
            borderRadius: "20px", display: "inline-block", fontWeight: "bold"
          }}>
            Leading: {bidder.name}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  img: { width: "220px", height: "220px", borderRadius: "50%", border: "6px solid gold", objectFit: "cover", animation: "pulseGlow 2s infinite" },
  name: { fontSize: "3rem", margin: "15px 0 5px 0", color: "#feca57", textShadow: "2px 2px 5px black" },
  role: { margin: 0, fontSize: "1.2rem", color: "#c8d6e5", letterSpacing: "1px" },
  bidBox: { border: "2px solid", padding: "20px", borderRadius: "20px", width: "fit-content", margin: "30px auto", background: "rgba(0,0,0,0.4)", minWidth: "250px", transition: "all 0.3s ease" }
};