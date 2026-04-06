import React, { useState, useEffect } from "react";
import Player from "./PlayerCard";
import Teams from "./TeamList";
import Squads from "./SquadView";

const MAX_SQUAD_SIZE = 15;
const INITIAL_PURSE = 80;

const getImg = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=250&font-size=0.4&bold=true`;

const ALL_PLAYERS = [
  // 🏏 BATTERS (20 Players)
  { id: 1, name: "Virat Kohli", price: 2.0, role: "Batter", img: "https://documents.iplt20.com/ipl/IPLHeadshot2024/2.png" },
  { id: 2, name: "Rohit Sharma", price: 2.0, role: "Batter", img: "https://documents.iplt20.com/ipl/IPLHeadshot2024/6.png" },
  { id: 3, name: "Shubman Gill", price: 2.0, role: "Batter", img: "https://documents.iplt20.com/ipl/IPLHeadshot2024/3761.png" },
  { id: 4, name: "Suryakumar Yadav", price: 2.0, role: "Batter", img: "https://documents.iplt20.com/ipl/IPLHeadshot2024/108.png" },
  { id: 5, name: "David Warner", price: 2.0, role: "Batter", img: "https://documents.iplt20.com/ipl/IPLHeadshot2024/170.png" },
  { id: 6, name: "Travis Head", price: 2.0, role: "Batter", img: getImg("Travis Head") },
  { id: 7, name: "Steve Smith", price: 2.0, role: "Batter", img: getImg("Steve Smith") },
  { id: 8, name: "Kane Williamson", price: 2.0, role: "Batter", img: getImg("Kane Williamson") },
  { id: 9, name: "Joe Root", price: 1.5, role: "Batter", img: getImg("Joe Root") },
  { id: 10, name: "Yashasvi Jaiswal", price: 1.5, role: "Batter", img: getImg("Yashasvi Jaiswal") },
  { id: 11, name: "Ruturaj Gaikwad", price: 1.5, role: "Batter", img: getImg("Ruturaj Gaikwad") },
  { id: 12, name: "Faf du Plessis", price: 2.0, role: "Batter", img: getImg("Faf du Plessis") },
  { id: 13, name: "Rinku Singh", price: 1.0, role: "Batter", img: getImg("Rinku Singh") },
  { id: 14, name: "Shreyas Iyer", price: 2.0, role: "Batter", img: getImg("Shreyas Iyer") },
  { id: 15, name: "Ajinkya Rahane", price: 1.5, role: "Batter", img: getImg("Ajinkya Rahane") },
  { id: 16, name: "David Miller", price: 1.5, role: "Batter", img: getImg("David Miller") },
  { id: 17, name: "Shimron Hetmyer", price: 1.5, role: "Batter", img: getImg("Shimron Hetmyer") },
  { id: 18, name: "Rovman Powell", price: 1.0, role: "Batter", img: getImg("Rovman Powell") },
  { id: 19, name: "Tilak Varma", price: 1.0, role: "Batter", img: getImg("Tilak Varma") },
  { id: 20, name: "Rajat Patidar", price: 1.0, role: "Batter", img: getImg("Rajat Patidar") },

  // 🎾 BOWLERS (20 Players)
  { id: 21, name: "Jasprit Bumrah", price: 2.0, role: "Bowler", img: "https://documents.iplt20.com/ipl/IPLHeadshot2024/9.png" },
  { id: 22, name: "Mitchell Starc", price: 2.0, role: "Bowler", img: getImg("Mitchell Starc") },
  { id: 23, name: "Pat Cummins", price: 2.0, role: "Bowler", img: getImg("Pat Cummins") },
  { id: 24, name: "Mohammed Shami", price: 2.0, role: "Bowler", img: getImg("Mohammed Shami") },
  { id: 25, name: "Mohammed Siraj", price: 2.0, role: "Bowler", img: getImg("Mohammed Siraj") },
  { id: 26, name: "Kagiso Rabada", price: 2.0, role: "Bowler", img: getImg("Kagiso Rabada") },
  { id: 27, name: "Trent Boult", price: 2.0, role: "Bowler", img: getImg("Trent Boult") },
  { id: 28, name: "Rashid Khan", price: 2.0, role: "Bowler", img: getImg("Rashid Khan") },
  { id: 29, name: "Yuzvendra Chahal", price: 2.0, role: "Bowler", img: getImg("Yuzvendra Chahal") },
  { id: 30, name: "Kuldeep Yadav", price: 2.0, role: "Bowler", img: getImg("Kuldeep Yadav") },
  { id: 31, name: "Adam Zampa", price: 1.5, role: "Bowler", img: getImg("Adam Zampa") },
  { id: 32, name: "Anrich Nortje", price: 2.0, role: "Bowler", img: getImg("Anrich Nortje") },
  { id: 33, name: "Josh Hazlewood", price: 2.0, role: "Bowler", img: getImg("Josh Hazlewood") },
  { id: 34, name: "Shaheen Afridi", price: 2.0, role: "Bowler", img: getImg("Shaheen Afridi") },
  { id: 35, name: "Jofra Archer", price: 2.0, role: "Bowler", img: getImg("Jofra Archer") },
  { id: 36, name: "Mark Wood", price: 1.5, role: "Bowler", img: getImg("Mark Wood") },
  { id: 37, name: "Lockie Ferguson", price: 1.5, role: "Bowler", img: getImg("Lockie Ferguson") },
  { id: 38, name: "Bhuvneshwar Kumar", price: 2.0, role: "Bowler", img: getImg("Bhuvneshwar Kumar") },
  { id: 39, name: "Arshdeep Singh", price: 1.5, role: "Bowler", img: getImg("Arshdeep Singh") },
  { id: 40, name: "Matheesha Pathirana", price: 1.0, role: "Bowler", img: getImg("Matheesha Pathirana") },

  // 🧤 WICKET KEEPERS (15 Players)
  { id: 41, name: "MS Dhoni", price: 2.0, role: "Wicket Keeper", img: "https://documents.iplt20.com/ipl/IPLHeadshot2024/1.png" },
  { id: 42, name: "Rishabh Pant", price: 2.0, role: "Wicket Keeper", img: getImg("Rishabh Pant") },
  { id: 43, name: "Jos Buttler", price: 2.0, role: "Wicket Keeper", img: getImg("Jos Buttler") },
  { id: 44, name: "Sanju Samson", price: 2.0, role: "Wicket Keeper", img: getImg("Sanju Samson") },
  { id: 45, name: "Quinton de Kock", price: 2.0, role: "Wicket Keeper", img: getImg("Quinton de Kock") },
  { id: 46, name: "KL Rahul", price: 2.0, role: "Wicket Keeper", img: getImg("KL Rahul") },
  { id: 47, name: "Ishan Kishan", price: 2.0, role: "Wicket Keeper", img: getImg("Ishan Kishan") },
  { id: 48, name: "Jonny Bairstow", price: 1.5, role: "Wicket Keeper", img: getImg("Jonny Bairstow") },
  { id: 49, name: "Nicholas Pooran", price: 2.0, role: "Wicket Keeper", img: getImg("Nicholas Pooran") },
  { id: 50, name: "Heinrich Klaasen", price: 2.0, role: "Wicket Keeper", img: getImg("Heinrich Klaasen") },
  { id: 51, name: "Phil Salt", price: 1.5, role: "Wicket Keeper", img: getImg("Phil Salt") },
  { id: 52, name: "Rahmanullah Gurbaz", price: 1.0, role: "Wicket Keeper", img: getImg("Rahmanullah Gurbaz") },
  { id: 53, name: "Wriddhiman Saha", price: 1.0, role: "Wicket Keeper", img: getImg("Wriddhiman Saha") },
  { id: 54, name: "Dhruv Jurel", price: 1.0, role: "Wicket Keeper", img: getImg("Dhruv Jurel") },
  { id: 55, name: "Alex Carey", price: 1.0, role: "Wicket Keeper", img: getImg("Alex Carey") },

  // ⚔️ ALL ROUNDERS (20 Players)
  { id: 56, name: "Hardik Pandya", price: 2.0, role: "All Rounder", img: "https://documents.iplt20.com/ipl/IPLHeadshot2024/2740.png" },
  { id: 57, name: "Ravindra Jadeja", price: 2.0, role: "All Rounder", img: getImg("Ravindra Jadeja") },
  { id: 58, name: "Glenn Maxwell", price: 2.0, role: "All Rounder", img: getImg("Glenn Maxwell") },
  { id: 59, name: "Andre Russell", price: 2.0, role: "All Rounder", img: getImg("Andre Russell") },
  { id: 60, name: "Ben Stokes", price: 2.0, role: "All Rounder", img: getImg("Ben Stokes") },
  { id: 61, name: "Sam Curran", price: 2.0, role: "All Rounder", img: getImg("Sam Curran") },
  { id: 62, name: "Cameron Green", price: 2.0, role: "All Rounder", img: getImg("Cameron Green") },
  { id: 63, name: "Mitchell Marsh", price: 2.0, role: "All Rounder", img: getImg("Mitchell Marsh") },
  { id: 64, name: "Marcus Stoinis", price: 2.0, role: "All Rounder", img: getImg("Marcus Stoinis") },
  { id: 65, name: "Sunil Narine", price: 2.0, role: "All Rounder", img: getImg("Sunil Narine") },
  { id: 66, name: "Axar Patel", price: 2.0, role: "All Rounder", img: getImg("Axar Patel") },
  { id: 67, name: "Washington Sundar", price: 1.5, role: "All Rounder", img: getImg("Washington Sundar") },
  { id: 68, name: "Moeen Ali", price: 1.5, role: "All Rounder", img: getImg("Moeen Ali") },
  { id: 69, name: "Liam Livingstone", price: 1.5, role: "All Rounder", img: getImg("Liam Livingstone") },
  { id: 70, name: "Jason Holder", price: 1.5, role: "All Rounder", img: getImg("Jason Holder") },
  { id: 71, name: "Sikandar Raza", price: 1.0, role: "All Rounder", img: getImg("Sikandar Raza") },
  { id: 72, name: "Mohammad Nabi", price: 1.0, role: "All Rounder", img: getImg("Mohammad Nabi") },
  { id: 73, name: "Shakib Al Hasan", price: 1.5, role: "All Rounder", img: getImg("Shakib Al Hasan") },
  { id: 74, name: "Ravichandran Ashwin", price: 2.0, role: "All Rounder", img: getImg("Ravichandran Ashwin") },
  { id: 75, name: "Krunal Pandya", price: 1.5, role: "All Rounder", img: getImg("Krunal Pandya") }
];

const INITIAL_TEAMS = [
  { id: 0, name: "RCB", color: "#e73845", logo: "https://upload.wikimedia.org/wikipedia/en/2/2a/Royal_Challengers_Bengaluru_Logo.svg", purse: INITIAL_PURSE, players: [] },
  { id: 1, name: "CSK", color: "#e2c113", logo: "https://upload.wikimedia.org/wikipedia/en/2/2b/Chennai_Super_Kings_Logo.svg", purse: INITIAL_PURSE, players: [] },
  { id: 2, name: "MI", color: "#005da0", logo: "https://upload.wikimedia.org/wikipedia/en/c/cd/Mumbai_Indians_Logo.svg", purse: INITIAL_PURSE, players: [] },
  { id: 3, name: "SRH", color: "#f26522", logo: "https://upload.wikimedia.org/wikipedia/en/8/81/Sunrisers_Hyderabad.svg", purse: INITIAL_PURSE, players: [] },
  { id: 4, name: "KKR", color: "#3a225d", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/Kolkata_Knight_Riders_Logo.svg", purse: INITIAL_PURSE, players: [] }
];

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function App() {
  const [currentView, setCurrentView] = useState(() => localStorage.getItem("currentView") || "HOME");
  const [teams, setTeams] = useState(() => JSON.parse(localStorage.getItem("teams")) || INITIAL_TEAMS);
  const [processedIds, setProcessedIds] = useState(() => JSON.parse(localStorage.getItem("processedIds")) || []);
  const [selectedCategory, setSelectedCategory] = useState(() => localStorage.getItem("selectedCategory") || "All");
  
  const [playerOrder, setPlayerOrder] = useState(() => {
    const savedOrder = localStorage.getItem("playerOrder");
    return savedOrder ? JSON.parse(savedOrder) : shuffleArray(ALL_PLAYERS.map(p => p.id));
  });

  const [currentBid, setCurrentBid] = useState(0);
  const [bidderIndex, setBidderIndex] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [popup, setPopup] = useState(null);
  const [showUpcoming, setShowUpcoming] = useState(false);

  useEffect(() => {
    localStorage.setItem("currentView", currentView);
    localStorage.setItem("teams", JSON.stringify(teams));
    localStorage.setItem("processedIds", JSON.stringify(processedIds));
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("playerOrder", JSON.stringify(playerOrder));
  }, [currentView, teams, processedIds, selectedCategory, playerOrder]);

  const orderedPlayers = playerOrder.map(id => ALL_PLAYERS.find(p => p.id === id)).filter(Boolean);
  const availablePlayers = orderedPlayers.filter(p => !processedIds.includes(p.id));
  const filteredPlayers = selectedCategory === "All" ? availablePlayers : availablePlayers.filter(p => p.role === selectedCategory);
  const currentPlayer = filteredPlayers[0];

  const categoryStats = [
    { label: "All Players", value: "All", total: ALL_PLAYERS.length },
    { label: "Batters", value: "Batter", total: ALL_PLAYERS.filter(p=>p.role==="Batter").length },
    { label: "Bowlers", value: "Bowler", total: ALL_PLAYERS.filter(p=>p.role==="Bowler").length },
    { label: "Wicket Keepers", value: "Wicket Keeper", total: ALL_PLAYERS.filter(p=>p.role==="Wicket Keeper").length },
    { label: "All Rounders", value: "All Rounder", total: ALL_PLAYERS.filter(p=>p.role==="All Rounder").length },
  ];

  const getRemainingCount = (role) => {
    if (role === "All") return availablePlayers.length;
    return availablePlayers.filter(p => p.role === role).length;
  };

  const exportResults = () => {
    let csvContent = "data:text/csv;charset=utf-8,Team,Remaining Purse (Cr),Player Name,Role,Bought Price (Cr)\n";
    teams.forEach(t => {
      if (t.players.length === 0) csvContent += `${t.name},${t.purse.toFixed(2)},No Players,-,-\n`;
      else t.players.forEach(p => { csvContent += `${t.name},${t.purse.toFixed(2)},${p.name},${p.role},${p.finalPrice}\n`; });
    });
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "IPL_Auction_Results.csv";
    link.click();
  };

  const resetAuction = () => {
    if(window.confirm("Are you sure you want to completely wipe all auction data and start over?")) {
      localStorage.clear();
      setTeams(INITIAL_TEAMS);
      setProcessedIds([]);
      setPlayerOrder(shuffleArray(ALL_PLAYERS.map(p => p.id)));
      setCurrentView("HOME");
      setSelectedCategory("All");
      setSelectedTeam(null);
    }
  };

  const showError = (title, text) => {
    setPopup({ type: "error", title, text, color: "#ff4757" });
    setTimeout(() => setPopup(null), 2000);
  };

  const handleBid = (teamIdx) => {
    if (popup || bidderIndex === teamIdx) return;
    const team = teams[teamIdx];
    const nextBid = currentBid === 0 ? currentPlayer.price : currentBid + 0.5;

    if (team.purse < nextBid) return showError("Oops!", `${team.name} has insufficient funds.`);
    if (team.players.length >= MAX_SQUAD_SIZE) return showError("Squad Full!", `${team.name} already has ${MAX_SQUAD_SIZE} players.`);

    setCurrentBid(Number(nextBid.toFixed(2)));
    setBidderIndex(teamIdx);
  };

  const finalizeSale = () => {
    if (bidderIndex === null || popup) return;
    const winner = teams[bidderIndex];

    const updatedTeams = teams.map((t, i) => {
      if (i === bidderIndex) {
        return {
          ...t, purse: Number((t.purse - currentBid).toFixed(2)),
          players: [...t.players, { name: currentPlayer.name, finalPrice: currentBid, role: currentPlayer.role }]
        };
      }
      return t;
    });

    setTeams(updatedTeams);
    setSelectedTeam(updatedTeams[bidderIndex]); 
    
    setPopup({ type: "sold", title: "SOLD!", text: `${currentPlayer.name} goes to ${winner.name} for ₹${currentBid} Cr`, color: winner.color });
    
    setTimeout(() => {
      setProcessedIds(prev => {
        if (!prev.includes(currentPlayer.id)) return [...prev, currentPlayer.id];
        return prev;
      });
      setCurrentBid(0);
      setBidderIndex(null);
      setPopup(null);
    }, 2500); 
  };

  const markUnsold = () => {
    if (popup) return;
    if (bidderIndex !== null) return showError("Action Denied!", "There is an active bid.");
    
    setPopup({ type: "unsold", title: "UNSOLD", text: `${currentPlayer.name} remains in the pool.`, color: "#ff3d00" });

    setTimeout(() => {
      setProcessedIds(prev => {
        if (!prev.includes(currentPlayer.id)) return [...prev, currentPlayer.id];
        return prev;
      });
      setCurrentBid(0);
      setBidderIndex(null);
      setPopup(null);
    }, 2500);
  };

  const triggerEndAuction = () => {
    setPopup({ 
      type: "end_auction", 
      title: "AUCTION ENDED", 
      text: "Final squads have been locked. Click continue to wipe data and return home.", 
      color: "#e74c3c" 
    });
  };

  const closePopupAndNext = () => {
    if (popup && popup.type === "end_auction") {
      localStorage.clear();
      setTeams(INITIAL_TEAMS);
      setProcessedIds([]);
      setPlayerOrder(shuffleArray(ALL_PLAYERS.map(p => p.id)));
      setCurrentView("HOME");
      setSelectedCategory("All");
      setSelectedTeam(null);
    }
    setPopup(null);
  };

  // --- VIEW 1: INNOVATIVE HOME PAGE ---
  if (currentView === "HOME") {
    return (
      <div style={styles.landingPage}>
        <style>{`
          @keyframes floatLogo { 0%, 100% { transform: translateY(0px) scale(1); filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5)); } 50% { transform: translateY(-15px) scale(1.05); filter: drop-shadow(0 25px 25px rgba(0,0,0,0.8)); } }
          @keyframes glowText { 0%, 100% { text-shadow: 0 0 20px rgba(254, 202, 87, 0.4); } 50% { text-shadow: 0 0 40px rgba(254, 202, 87, 0.9), 0 0 10px #ffffff; } }
          @keyframes borderBreathing { 0%, 100% { box-shadow: 0 0 30px rgba(9, 132, 227, 0.2), inset 0 0 20px rgba(9, 132, 227, 0.1); border-color: rgba(0, 206, 201, 0.3); } 50% { box-shadow: 0 0 60px rgba(0, 206, 201, 0.6), inset 0 0 30px rgba(0, 206, 201, 0.3); border-color: rgba(0, 206, 201, 0.8); } }
          @keyframes shimmerBtn { 0% { background-position: -200% auto; } 100% { background-position: 200% auto; } }
          @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(0, 206, 201, 0.7); } 70% { box-shadow: 0 0 0 20px rgba(0, 206, 201, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 206, 201, 0); } }
          
          .futuristic-btn {
            background: linear-gradient(90deg, #0984e3, #00cec9, #0984e3);
            background-size: 200% auto;
            animation: shimmerBtn 3s linear infinite, pulseRing 2s infinite;
            border: 2px solid rgba(255,255,255,0.5);
          }
          .futuristic-btn:hover { transform: translateY(-5px) scale(1.05); }
        `}</style>
        
        <div style={{...styles.landingContainer, animation: "borderBreathing 4s infinite ease-in-out", position: "relative", overflow: "hidden"}}>
          
          {/* Top Laser Line Accent */}
          <div style={{position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "200px", height: "4px", background: "#00cec9", boxShadow: "0 0 20px #00cec9, 0 0 40px #0984e3"}}></div>
          
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Indian_Premier_League_Official_Logo.svg/1200px-Indian_Premier_League_Official_Logo.svg.png" alt="IPL Logo" style={{...styles.landingLogo, animation: "floatLogo 4s infinite ease-in-out"}} />
          
          <h1 style={{...styles.landingTitle, animation: "glowText 3s infinite ease-in-out"}}>TATA IPL 2026</h1>
          
          <div style={{ background: "linear-gradient(90deg, transparent, rgba(0, 210, 211, 0.15), transparent)", padding: "10px 0", margin: "15px 0 35px 0" }}>
            <h2 style={{color: "#00d2d3", letterSpacing: "6px", margin: 0, fontSize: "1.3rem", textTransform: "uppercase"}}>Mega Auction Simulator</h2>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "45px", flexWrap: "wrap" }}>
             <div style={styles.badge}>🏏 75 ELITE PLAYERS</div>
             <div style={styles.badge}>🏢 5 FRANCHISES</div>
             <div style={styles.badge}>💰 ₹400 CR TOTAL PURSE</div>
          </div>

          <button onClick={() => setCurrentView("CATEGORIES")} className="futuristic-btn" style={{...styles.startBtn, padding: "20px 60px", fontSize: "1.4rem", letterSpacing: "2px"}}>
            ENTER BRIEFING ROOM
          </button>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  if (currentView === "CATEGORIES") {
    return (
      <div style={styles.landingPage}>
        <div style={{...styles.landingContainer, maxWidth: "1000px", width: "95%", padding: "40px"}}>
          <h1 style={{color: "#feca57", letterSpacing: "2px", marginBottom: "20px", borderBottom: "2px solid rgba(255,255,255,0.1)", paddingBottom: "15px"}}>
            AUCTION DASHBOARD
          </h1>
          
          <div style={{display: "flex", justifyContent: "space-between", marginBottom: "30px", gap: "15px", flexWrap: "wrap"}}>
            {categoryStats.map(cat => (
              <div key={cat.label} style={{background: "rgba(0,0,0,0.5)", padding: "15px", borderRadius: "10px", flex: 1, minWidth: "150px", border: "1px solid rgba(255,255,255,0.05)"}}>
                <div style={{fontSize: "0.9rem", color: "#a4b0be", textTransform: "uppercase"}}>{cat.label}</div>
                <div style={{fontSize: "2.5rem", fontWeight: "bold", color: "#00d2d3"}}>{cat.total}</div>
              </div>
            ))}
          </div>

          <div style={{background: "rgba(0,0,0,0.4)", borderRadius: "10px", padding: "10px", maxHeight: "350px", overflowY: "auto", marginBottom: "30px", border: "1px solid rgba(255,255,255,0.1)"}}>
            <table style={{width: "100%", borderCollapse: "collapse", textAlign: "left"}}>
              <thead style={{position: "sticky", top: 0, background: "#1e272e", zIndex: 1}}>
                <tr>
                  <th style={{padding: "15px", color: "#feca57", borderBottom: "2px solid rgba(255,255,255,0.2)"}}>#</th>
                  <th style={{padding: "15px", color: "#feca57", borderBottom: "2px solid rgba(255,255,255,0.2)"}}>Player Name</th>
                  <th style={{padding: "15px", color: "#feca57", borderBottom: "2px solid rgba(255,255,255,0.2)"}}>Role</th>
                  <th style={{padding: "15px", color: "#feca57", borderBottom: "2px solid rgba(255,255,255,0.2)"}}>Base Price</th>
                </tr>
              </thead>
              <tbody>
                {ALL_PLAYERS.map((p, i) => (
                  <tr key={p.id} style={{borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", opacity: processedIds.includes(p.id) ? 0.4 : 1}}>
                    <td style={{padding: "12px 15px", color: "#a4b0be"}}>{i + 1}</td>
                    <td style={{padding: "12px 15px", fontWeight: "bold", fontSize: "1.1rem"}}>{p.name} {processedIds.includes(p.id) && "✓"}</td>
                    <td style={{padding: "12px 15px", color: "#c8d6e5"}}>{p.role}</td>
                    <td style={{padding: "12px 15px", color: "#00d2d3", fontWeight: "bold"}}>₹{p.price.toFixed(2)} Cr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap"}}>
            <button onClick={() => setCurrentView("HOME")} style={{...styles.btn, background: "rgba(255,255,255,0.1)"}}>⬅️ HOME</button>
            <button onClick={() => { setSelectedCategory("All"); setCurrentView("AUCTION"); }} style={{...styles.btn, background: "#00c853", padding: "12px 40px", fontSize: "1.2rem", boxShadow: "0 0 20px rgba(0,200,83,0.4)"}}>
              {processedIds.length > 0 ? "🚀 RESUME AUCTION" : "🚀 START AUCTION"}
            </button>
            <button onClick={() => setCurrentView("RESULTS")} style={{...styles.btn, background: "#f39c12"}}>🏆 VIEW SQUADS</button>
            {processedIds.length > 0 && <button onClick={resetAuction} style={{...styles.btn, background: "#ff4757"}}>🗑️ RESET DATA</button>}
          </div>
        </div>
      </div>
    );
  }

  // --- RESULTS VIEW ---
  if (currentView === "RESULTS") {
    return (
      <div style={{...styles.landingPage, overflowY: "auto", display: "block", padding: "40px"}}>
        
        {popup && (
          <div style={{...styles.overlay, pointerEvents: popup.type === 'end_auction' ? "auto" : "none"}}>
            <div style={{...styles.popupBox, borderColor: popup.color || "#444", background: "rgba(30, 39, 46, 0.95)", boxShadow: `0 0 80px ${popup.color || "rgba(255,0,0,0.5)"}` }}>
              <h1 style={{ color: popup.color || "white", margin: 0, fontSize: "3rem", textTransform: "uppercase" }}>{popup.title}</h1>
              <p style={{ fontSize: "1.4rem", marginTop: "15px", color: "white" }}>{popup.text}</p>
              {popup.type === 'end_auction' && (
                <button onClick={closePopupAndNext} style={{...styles.btn, background: "#00c853", marginTop: "30px"}}>CONTINUE TO HOME</button>
              )}
            </div>
          </div>
        )}

        <div style={{maxWidth: "1400px", margin: "0 auto"}}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px"}}>
            <h1 style={{color: "#feca57", letterSpacing: "2px", margin: 0}}>FINAL SQUADS & RESULTS</h1>
            <div style={{display: "flex", gap: "10px"}}>
              <button onClick={() => setCurrentView("CATEGORIES")} style={{...styles.btn, background: "rgba(255,255,255,0.2)"}}>⬅️ DASHBOARD</button>
              <button onClick={exportResults} style={{...styles.btn, background: "#00c853"}}>📊 DOWNLOAD CSV</button>
              <button onClick={triggerEndAuction} style={{...styles.btn, background: "#e74c3c"}}>🏠 END AUCTION</button>
            </div>
          </div>

          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px"}}>
            {teams.map(team => (
              <div key={team.id} style={{background: "rgba(0,0,0,0.6)", borderRadius: "15px", padding: "20px", borderTop: `5px solid ${team.color}`}}>
                <div style={{display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px"}}>
                  <img src={team.logo} alt="" width="40" />
                  <h2 style={{margin: 0, color: team.color}}>{team.name}</h2>
                </div>
                <div style={{background: "rgba(255,255,255,0.1)", padding: "10px", borderRadius: "8px", marginBottom: "15px"}}>
                  <div style={{fontSize: "0.8rem", color: "#a4b0be"}}>REMAINING PURSE</div>
                  <div style={{fontSize: "1.5rem", fontWeight: "bold", color: "white"}}>₹{team.purse.toFixed(2)} Cr</div>
                </div>
                <h4 style={{color: "#a4b0be", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "5px"}}>Players ({team.players.length}/{MAX_SQUAD_SIZE})</h4>
                <div style={{maxHeight: "300px", overflowY: "auto"}}>
                  {team.players.length === 0 ? <p style={{opacity: 0.5}}>No players bought.</p> : 
                    team.players.map((p, idx) => (
                      <div key={idx} style={{display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.9rem"}}>
                        <span>{p.name}</span>
                        <span style={{color: "#00d2d3"}}>₹{p.finalPrice}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- AUCTION VIEW ---
  if (!currentPlayer) {
    return (
      <div style={styles.endScreen}>
        <div style={{textAlign: "center"}}>
          <h1 style={{fontSize: "3rem", color: "gold", marginBottom: "10px"}}>AUCTION COMPLETE</h1>
          <p style={{fontSize: "1.2rem", color: "#ccc", marginBottom: "30px"}}>All players have been processed.</p>
          <button onClick={() => setCurrentView("CATEGORIES")} style={{...styles.btn, background: "#0984e3", marginRight: "15px"}}>⬅️ DASHBOARD</button>
          <button onClick={() => setCurrentView("RESULTS")} style={{...styles.btn, background: "#f39c12"}}>🏆 VIEW SQUADS</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      
      <style>{`
        @keyframes stampEffect { 
          0% { transform: scale(1.5); opacity: 0; } 
          15% { transform: scale(1); opacity: 1; } 
          85% { transform: scale(1); opacity: 1; } 
          100% { transform: scale(0.8); opacity: 0; } 
        }
      `}</style>

      {popup && (
        <div style={{...styles.overlay, pointerEvents: "none"}}>
          <div style={{
            ...styles.popupBox, 
            borderColor: popup.color || "#444", 
            background: "rgba(30, 39, 46, 0.95)",
            boxShadow: `0 0 80px ${popup.color || "rgba(255,0,0,0.5)"}`,
            animation: `stampEffect ${popup.type === 'error' ? '2s' : '2.5s'} ease-in-out forwards`
          }}>
            <h1 style={{ color: popup.color || "white", margin: 0, fontSize: "3rem", textTransform: "uppercase" }}>{popup.title}</h1>
            <p style={{ fontSize: "1.4rem", marginTop: "15px", color: "white" }}>{popup.text}</p>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{display: "flex", gap: "10px"}}>
          <button onClick={() => setCurrentView("CATEGORIES")} disabled={popup !== null} style={{...styles.btn, padding: "15px 25px", fontSize: "1.1rem", background: "rgba(255,255,255,0.1)", opacity: popup !== null ? 0.5 : 1}}>⬅️ Dashboard</button>
          <button onClick={() => setShowUpcoming(!showUpcoming)} disabled={popup !== null} style={{...styles.btn, padding: "15px 25px", fontSize: "1.1rem", background: showUpcoming ? "#e67e22" : "#f39c12", opacity: popup !== null ? 0.5 : 1}}>
            {showUpcoming ? "👁️ Hide Upcoming" : "👀 View Upcoming"}
          </button>
        </div>

        <div style={{color: "#a4b0be", fontSize: "1.3rem", fontWeight: "bold", letterSpacing: "2px", alignSelf: "center"}}>
             PLAYER {processedIds.length + 1} OF {ALL_PLAYERS.length}
        </div>

        <div>
           <button onClick={() => setCurrentView("RESULTS")} disabled={popup !== null} style={{...styles.btn, padding: "15px 25px", fontSize: "1.1rem", background: "#e74c3c", opacity: popup !== null ? 0.5 : 1}}>🛑 Stop & View Squads</button>
        </div>
      </div>

      <div style={styles.container}>
        
        {showUpcoming && (
          <div style={{ flex: 0.8, background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "20px", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 15px 35px rgba(0,0,0,0.5)" }}>
            <h2 style={{color: "#00cec9", marginTop: 0, textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "10px"}}>UPCOMING</h2>
            {availablePlayers.length <= 1 ? (
                <p style={{color: "#a4b0be", textAlign: "center", marginTop: "20px"}}>No more players.</p>
            ) : (
                <div style={{maxHeight: "500px", overflowY: "auto", paddingRight: "10px"}}>
                  {availablePlayers.slice(1, 11).map((p, idx) => (
                    <div key={p.id} style={{padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)", marginBottom: "5px", borderRadius: "8px"}}>
                        <div style={{fontWeight: "bold", fontSize: "1.05rem"}}>{idx + 1}. {p.name}</div>
                        <div style={{color: "#feca57", fontSize: "0.85rem", marginTop: "4px"}}>{p.role} | ₹{p.price.toFixed(2)} Cr</div>
                    </div>
                  ))}
                </div>
            )}
          </div>
        )}

        <div style={{...styles.main, opacity: popup !== null ? 0.5 : 1, transition: "opacity 0.3s"}}>
          <Player player={currentPlayer} currentBid={currentBid} bidder={bidderIndex !== null ? teams[bidderIndex] : null} />
          
          <Teams teams={teams} onBid={handleBid} bidderIndex={bidderIndex} />
          
          <div style={styles.controls}>
            <button 
              onClick={finalizeSale} 
              disabled={bidderIndex === null || popup !== null} 
              style={{
                ...styles.btn, 
                padding: "18px 50px",   
                fontSize: "1.3rem",     
                background: "#00c853", 
                opacity: bidderIndex === null ? 0.5 : 1, 
                cursor: bidderIndex === null ? "not-allowed" : "pointer", 
                boxShadow: bidderIndex !== null ? "0 0 20px rgba(0,200,83,0.4)" : "none"
              }}
            >
              SOLD
            </button>
            <button 
              onClick={markUnsold} 
              disabled={bidderIndex !== null || popup !== null} 
              style={{
                ...styles.btn, 
                padding: "18px 50px",   
                fontSize: "1.3rem",     
                background: "#ff3d00", 
                opacity: bidderIndex !== null ? 0.5 : 1, 
                cursor: bidderIndex !== null ? "not-allowed" : "pointer", 
                boxShadow: bidderIndex === null ? "0 0 20px rgba(255,61,0,0.4)" : "none"
              }}
            >
              UNSOLD
            </button>
          </div>
        </div>
        
        <div style={styles.sidebar}>
          <Squads team={selectedTeam} max={MAX_SQUAD_SIZE} />
        </div>
      </div>

      <div style={styles.footer}>
        {teams.map((t, i) => (
          <div key={i} style={{...styles.teamCard, borderColor: t.color, boxShadow: selectedTeam?.id === t.id ? `0 0 15px ${t.color}` : 'none'}} onClick={() => setSelectedTeam(t)}>
             <img src={t.logo} alt="" width="35" />
             <div style={{marginLeft: '15px'}}>
               <div style={{fontWeight: 'bold', letterSpacing: "1px"}}>{t.name}</div>
               <div style={{fontSize: '0.8rem', color: "#d1d8e0"}}>₹{t.purse.toFixed(2)} Cr</div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// CHANGED: Reverted to the original background image that you liked better!
const styles = {
  landingPage: { 
    height: "100vh", 
    background: "linear-gradient(rgba(10, 15, 30, 0.8), rgba(0, 0, 0, 0.95)), url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2805&auto=format&fit=crop') center/cover", 
    backgroundAttachment: "fixed",
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    color: "white", 
    fontFamily: "'Segoe UI', sans-serif" 
  },
  landingContainer: { background: "rgba(0,0,0,0.6)", padding: "50px", borderRadius: "20px", textAlign: "center", backdropFilter: "blur(15px)", border: "1px solid rgba(255,255,255,0.1)" },
  landingLogo: { width: "150px", marginBottom: "20px", animation: "float 4s ease-in-out infinite" },
  landingTitle: { fontSize: "4.5rem", margin: "0", color: "#feca57", fontWeight: "900", letterSpacing: "2px" },
  badge: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "8px 15px", borderRadius: "20px", fontSize: "0.95rem", color: "#d1d8e0", letterSpacing: "1px", backdropFilter: "blur(5px)" },
  startBtn: { border: "none", borderRadius: "40px", cursor: "pointer", color: "white", fontWeight: "bold", transition: "transform 0.2s" },
  app: { background: "radial-gradient(circle at top, #2f3640, #192a56, #000000)", minHeight: "100vh", color: "white", padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  container: { display: "flex", gap: "20px", maxWidth: "1400px", margin: "0 auto" },
  main: { flex: 2, textAlign: "center", background: "rgba(255,255,255,0.05)", padding: "40px", borderRadius: "20px", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 15px 35px rgba(0,0,0,0.5)" },
  sidebar: { flex: 1 },
  controls: { marginTop: "30px", display: "flex", justifyContent: "center", gap: "20px" },
  btn: { padding: "12px 30px", border: "none", borderRadius: "30px", color: "white", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s ease" },
  footer: { display: "flex", justifyContent: "center", gap: "15px", marginTop: "40px", flexWrap: "wrap" },
  teamCard: { display: "flex", alignItems: "center", padding: "12px 20px", background: "rgba(0,0,0,0.6)", borderRadius: "12px", borderBottom: "4px solid", cursor: "pointer" },
  endScreen: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#111", color: "white" },
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center" },
  popupBox: { padding: "50px", borderRadius: "20px", textAlign: "center", border: "5px solid", minWidth: "400px" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px", fontSize: "1.1rem" },
  th: { padding: "15px", background: "rgba(0,0,0,0.5)", color: "#a4b0be", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "1px" },
  td: { padding: "15px", textAlign: "center" }
};