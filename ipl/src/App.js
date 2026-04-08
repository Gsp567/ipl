import React, { useState, useEffect, useCallback } from "react";
import PlayerCard from "./PlayerCard";
import Teams from "./TeamList";
import Squads from "./SquadView";

const MAX_SQUAD_SIZE = 15;
const INITIAL_PURSE = 80;

const getImg = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=250&font-size=0.4&bold=true`;

const ALL_PLAYERS = [
  // ... Keep your full list of 75 players here exactly as they were ...
  { id: 1,  name: "Virat Kohli", price: 2.0, role: "Batter", img: "https://documents.iplt20.com/ipl/IPLHeadshot2024/2.png" },
  { id: 2,  name: "Rohit Sharma", price: 2.0, role: "Batter", img: "https://documents.iplt20.com/ipl/IPLHeadshot2024/6.png" },
  { id: 3,  name: "Shubman Gill", price: 2.0, role: "Batter", img: "https://documents.iplt20.com/ipl/IPLHeadshot2024/3761.png" },
  { id: 4,  name: "Suryakumar Yadav", price: 2.0, role: "Batter", img: "https://documents.iplt20.com/ipl/IPLHeadshot2024/108.png" },
  { id: 5,  name: "David Warner", price: 2.0, role: "Batter", img: "https://documents.iplt20.com/ipl/IPLHeadshot2024/170.png" },
  { id: 6,  name: "Travis Head", price: 2.0, role: "Batter", img: getImg("Travis Head") },
  { id: 7,  name: "Steve Smith", price: 2.0, role: "Batter", img: getImg("Steve Smith") },
  { id: 8,  name: "Kane Williamson", price: 2.0, role: "Batter", img: getImg("Kane Williamson") },
  { id: 9,  name: "Joe Root", price: 1.5, role: "Batter", img: getImg("Joe Root") },
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
  { id: 75, name: "Krunal Pandya", price: 1.5, role: "All Rounder", img: getImg("Krunal Pandya") },
];

const INITIAL_TEAMS = [
  { id: 0, name: "RCB", color: "#e73845", logo: "https://upload.wikimedia.org/wikipedia/en/2/2a/Royal_Challengers_Bengaluru_Logo.svg", purse: INITIAL_PURSE, players: [] },
  { id: 1, name: "CSK", color: "#e2c113", logo: "https://upload.wikimedia.org/wikipedia/en/2/2b/Chennai_Super_Kings_Logo.svg",         purse: INITIAL_PURSE, players: [] },
  { id: 2, name: "MI",  color: "#005da0", logo: "https://upload.wikimedia.org/wikipedia/en/c/cd/Mumbai_Indians_Logo.svg",             purse: INITIAL_PURSE, players: [] },
  { id: 3, name: "SRH", color: "#f26522", logo: "https://upload.wikimedia.org/wikipedia/en/8/81/Sunrisers_Hyderabad.svg",             purse: INITIAL_PURSE, players: [] },
  { id: 4, name: "KKR", color: "#3a225d", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/Kolkata_Knight_Riders_Logo.svg",      purse: INITIAL_PURSE, players: [] },
];

const shuffleArray = (array) => {
  let s = [...array];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
};

export default function App() {
  const [currentView,      setCurrentView]      = useState(() => localStorage.getItem("currentView") || "HOME");
  const [teams,            setTeams]            = useState(() => JSON.parse(localStorage.getItem("teams")) || INITIAL_TEAMS);
  const [processedIds,     setProcessedIds]     = useState(() => JSON.parse(localStorage.getItem("processedIds")) || []);
  const [selectedCategory, setSelectedCategory] = useState(() => localStorage.getItem("selectedCategory") || "All");
  const [playerOrder,      setPlayerOrder]      = useState(() => {
    const saved = localStorage.getItem("playerOrder");
    return saved ? JSON.parse(saved) : shuffleArray(ALL_PLAYERS.map((p) => p.id));
  });

  const [currentBid,   setCurrentBid]   = useState(0);
  const [bidderIndex,  setBidderIndex]  = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [popup,        setPopup]        = useState(null);

  useEffect(() => {
    localStorage.setItem("currentView",      currentView);
    localStorage.setItem("teams",            JSON.stringify(teams));
    localStorage.setItem("processedIds",     JSON.stringify(processedIds));
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("playerOrder",      JSON.stringify(playerOrder));
  }, [currentView, teams, processedIds, selectedCategory, playerOrder]);

  const orderedPlayers   = playerOrder.map((id) => ALL_PLAYERS.find((p) => p.id === id)).filter(Boolean);
  const availablePlayers = orderedPlayers.filter((p) => !processedIds.includes(p.id));
  const filteredPlayers  = selectedCategory === "All" ? availablePlayers : availablePlayers.filter((p) => p.role === selectedCategory);
  const currentPlayer    = filteredPlayers[0];

  const categoryStats = [
    { label: "All Players",     value: "All",           total: ALL_PLAYERS.length },
    { label: "Batters",         value: "Batter",        total: ALL_PLAYERS.filter((p) => p.role === "Batter").length },
    { label: "Bowlers",         value: "Bowler",        total: ALL_PLAYERS.filter((p) => p.role === "Bowler").length },
    { label: "Wicket Keepers",  value: "Wicket Keeper", total: ALL_PLAYERS.filter((p) => p.role === "Wicket Keeper").length },
    { label: "All Rounders",    value: "All Rounder",   total: ALL_PLAYERS.filter((p) => p.role === "All Rounder").length },
  ];

  const resetAuction = () => {
    if (window.confirm("Wipe all auction data and start over?")) {
      localStorage.clear();
      setTeams(INITIAL_TEAMS);
      setProcessedIds([]);
      setPlayerOrder(shuffleArray(ALL_PLAYERS.map((p) => p.id)));
      setCurrentView("HOME");
      setSelectedCategory("All");
      setSelectedTeam(null);
    }
  };

  const finalizeSale = () => {
    if (bidderIndex === null || popup) return;
    const winner = teams[bidderIndex];
    setPopup({ title: "SOLD!", text: `${currentPlayer.name} to ${winner.name}`, color: winner.color, logo: winner.logo });
    
    setTimeout(() => {
      const updatedTeams = teams.map((t, i) => {
        if (i !== bidderIndex) return t;
        return {
          ...t,
          purse: Number((t.purse - currentBid).toFixed(2)),
          players: [...t.players, { name: currentPlayer.name, finalPrice: currentBid, role: currentPlayer.role }],
        };
      });
      setTeams(updatedTeams);
      setSelectedTeam(updatedTeams[bidderIndex]);
      setProcessedIds((prev) => [...prev, currentPlayer.id]);
      setCurrentBid(0);
      setBidderIndex(null);
      setPopup(null);
    }, 1200);
  };

  const markUnsold = () => {
    if (popup || bidderIndex !== null) return;
    setPopup({ title: "UNSOLD", text: `${currentPlayer.name} returns to pool`, color: "#d63031" });
    setTimeout(() => {
      setProcessedIds((prev) => [...prev, currentPlayer.id]);
      setCurrentBid(0);
      setBidderIndex(null);
      setPopup(null);
    }, 1200);
  };

  const handleBid = (teamIdx) => {
    if (popup || bidderIndex === teamIdx) return;
    const nextBid = currentBid === 0 ? currentPlayer.price : currentBid + 0.5;
    if (teams[teamIdx].purse < nextBid) return;
    setCurrentBid(nextBid);
    setBidderIndex(teamIdx);
  };

  // HOME
  if (currentView === "HOME") {
    return (
      <div style={styles.landingPage}>
        <div style={{ ...styles.landingContainer, border: "2px solid rgba(0, 210, 211, 0.6)", boxShadow: "0 0 25px rgba(0, 210, 211, 0.4)", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "200px", height: "4px", background: "#00cec9", boxShadow: "0 0 15px #00cec9" }}/>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Indian_Premier_League_Official_Logo.svg/1200px-Indian_Premier_League_Official_Logo.svg.png" alt="IPL" style={styles.landingLogo} />
          <h1 style={styles.landingTitle}>TATA IPL 2026</h1>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "30px", margin: "20px 0 35px 0" }}>
             <div style={{ padding: "10px 25px", borderRadius: "10px", border: "1px solid rgba(0,210,211,0.4)", boxShadow: "0 0 10px rgba(0,210,211,0.3)", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#00cec9" }}>5</div>
                <div style={{ fontSize: "0.8rem", color: "#dfe6e9", letterSpacing: "1px" }}>TEAMS</div>
             </div>
             <div style={{ padding: "10px 25px", borderRadius: "10px", border: "1px solid rgba(0,210,211,0.4)", boxShadow: "0 0 10px rgba(0,210,211,0.3)", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#00cec9" }}>75</div>
                <div style={{ fontSize: "0.8rem", color: "#dfe6e9", letterSpacing: "1px" }}>PLAYERS</div>
             </div>
          </div>

          <button onClick={() => setCurrentView("CATEGORIES")} style={{ ...styles.startBtn, padding: "20px 80px", fontSize: "1.3rem", background: "#00c853" }}>Enter</button>
        </div>
      </div>
    );
  }

  // DASHBOARD
  if (currentView === "CATEGORIES") {
    return (
      <div style={styles.landingPage}>
        <div style={{ ...styles.landingContainer, maxWidth: "1100px", width: "95%", padding: "40px" }}>
          <h1 style={{ color: "#74b9ff", letterSpacing: "1px", marginBottom: "25px", fontWeight: "600" }}>Auction Dashboard</h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", marginBottom: "30px" }}>
            {categoryStats.map((cat) => (
              <div key={cat.label} style={{ background: "rgba(255,255,255,0.06)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                <div style={{ fontSize: "0.9rem", color: "#b2bec3" }}>{cat.label}</div>
                <div style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#00cec9" }}>{cat.total}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(0,0,0,0.5)", borderRadius: "12px", padding: "10px", maxHeight: "350px", overflowY: "auto", marginBottom: "30px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ color: "#74b9ff" }}>{["#", "Player", "Role", "Price"].map((h) => (<th key={h} style={{ padding: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>{h}</th>))}</tr></thead>
              <tbody>
                {ALL_PLAYERS.map((p, i) => (
                  <tr key={p.id} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent", opacity: processedIds.includes(p.id) ? 0.4 : 1 }}>
                    <td style={{ padding: "10px" }}>{i + 1}</td>
                    <td style={{ padding: "10px", fontWeight: "500" }}>{p.name} {processedIds.includes(p.id) && "✓"}</td>
                    <td style={{ padding: "10px", color: "#a4b0be" }}>{p.role}</td>
                    <td style={{ padding: "10px", color: "#00cec9" }}>₹{p.price.toFixed(2)} Cr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            <button onClick={() => setCurrentView("HOME")} style={{ ...styles.btn, background: "#636e72", padding: "15px 40px" }}>Home</button>
            <button onClick={() => setCurrentView("AUCTION")} style={{ ...styles.btn, background: "#00b894", padding: "20px 80px", fontSize: "1.2rem" }}>
              {processedIds.length > 0 ? "Resume Auction" : "Start Auction"}
            </button>
            <button onClick={() => setCurrentView("RESULTS")} style={{ ...styles.btn, background: "#fdcb6e", color: "#000", padding: "15px 40px" }}>Results</button>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS
  if (currentView === "RESULTS") {
    return (
      <div style={{ ...styles.landingPage, overflowY: "auto", display: "block", padding: "40px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <h1 style={{ color: "#feca57", margin: 0 }}>FINAL SQUADS</h1>
            <div style={{ display: "flex", gap: "15px" }}>
              <button onClick={() => setCurrentView("CATEGORIES")} style={{ ...styles.btn, background: "rgba(255,255,255,.2)", padding: "12px 30px" }}>DASHBOARD</button>
              <button onClick={resetAuction} style={{ ...styles.btn, background: "#e74c3c", padding: "12px 30px" }}>END AUCTION</button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            {teams.map((team) => (
              <div key={team.id} style={{ background: "rgba(0,0,0,.6)", borderRadius: "15px", padding: "20px", borderTop: `5px solid ${team.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                  <img src={team.logo} alt="" width="40" />
                  <h2 style={{ margin: 0, color: team.color }}>{team.name}</h2>
                </div>
                <div style={{ background: "rgba(255,255,255,.1)", padding: "10px", borderRadius: "8px", marginBottom: "15px" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>₹{team.purse.toFixed(2)} Cr</div>
                </div>
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {team.players.map((p, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,.05)", fontSize: ".9rem" }}>
                      <span>{p.name}</span>
                      <span style={{ color: "#00d2d3" }}>₹{p.finalPrice}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // AUCTION VIEW
  if (!currentPlayer) return <div style={styles.endScreen}><h1>Complete</h1><button onClick={() => setCurrentView("RESULTS")}>Results</button></div>;

  return (
    <div style={styles.app}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", padding: "10px 20px", background: "rgba(255,255,255,0.05)", borderRadius: "12px" }}>
        <h2 style={{ margin: 0, color: "#00cec9" }}> LIVE AUCTION</h2>
        <div style={{ color: "#a4b0be", fontWeight: "bold" }}>Player {processedIds.length + 1} / {ALL_PLAYERS.length}</div>
        <button onClick={() => setCurrentView("RESULTS")} style={{ ...styles.btn, background: "#e74c3c", padding: "12px 30px" }}>Stop Auction</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr", gap: "25px", maxWidth: "1350px", margin: "0 auto", position: "relative" }}>
        
        {popup && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "450px", height: "300px", background: "rgba(0,0,0,0.95)", zIndex: 100, borderRadius: "25px", display: "flex", justifyContent: "center", alignItems: "center", border: `4px solid ${popup.color}`, boxShadow: "0 0 50px rgba(0,0,0,1)" }}>
            <div style={{ textAlign: "center", padding: "20px" }}>
              {popup.logo && <img src={popup.logo} alt="" width="80" style={{ marginBottom: "15px" }} />}
              <h1 style={{ fontSize: "3.5rem", fontWeight: "bold", color: popup.color, margin: 0 }}>{popup.title}</h1>
              <p style={{ fontSize: "1.4rem", color: "white", marginTop: "10px" }}>{popup.text}</p>
            </div>
          </div>
        )}

        <div style={{ background: "rgba(255,255,255,0.05)", padding: "35px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
          <PlayerCard player={currentPlayer} currentBid={currentBid} bidder={bidderIndex !== null ? teams[bidderIndex] : null} />
          <div style={{ marginTop: "30px" }}>
            <Teams teams={teams} onBid={handleBid} bidderIndex={bidderIndex} nextBid={currentBid === 0 ? currentPlayer.price : currentBid + 0.5} />
          </div>
          <div style={{ marginTop: "35px", display: "flex", justifyContent: "center", gap: "20px" }}>
            <button onClick={finalizeSale} disabled={bidderIndex === null || !!popup} style={{ ...styles.btn, padding: "20px 80px", fontSize: "1.5rem", background: "#00b894", opacity: bidderIndex === null ? 0.5 : 1 }}> SOLD</button>
            <button onClick={markUnsold} disabled={bidderIndex !== null || !!popup} style={{ ...styles.btn, padding: "20px 80px", fontSize: "1.5rem", background: "#d63031", opacity: bidderIndex !== null ? 0.5 : 1 }}> UNSOLD</button>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
          <Squads team={selectedTeam} max={MAX_SQUAD_SIZE} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "40px", flexWrap: "wrap" }}>
        {teams.map((t, i) => (
          <div key={i} onClick={() => setSelectedTeam(t)} style={{ display: "flex", alignItems: "center", padding: "12px 25px", background: "rgba(0,0,0,0.6)", borderRadius: "12px", borderBottom: `4px solid ${t.color}`, cursor: "pointer", transition: "0.2s" }}>
            <img src={t.logo} alt="" width="35" />
            <div style={{ marginLeft: "15px" }}>
              <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{t.name}</div>
              <div style={{ fontSize: "0.9rem", color: t.purse < 10 ? "#ff6b6b" : "#d1d8e0" }}>₹{t.purse.toFixed(2)} Cr</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  landingPage: { height: "100vh", background: "linear-gradient(rgba(10,15,30,.8),rgba(0,0,0,.95)),url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2805&auto=format&fit=crop') center/cover", backgroundAttachment: "fixed", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontFamily: "'Segoe UI',sans-serif" },
  landingContainer: { background: "rgba(0,0,0,.6)", padding: "50px", borderRadius: "20px", textAlign: "center", backdropFilter: "blur(15px)", border: "1px solid rgba(255,255,255,.1)" },
  landingLogo: { width: "150px", marginBottom: "20px" },
  landingTitle: { fontSize: "4.5rem", margin: "0", color: "#feca57", fontWeight: "900", letterSpacing: "2px" },
  app: { background: "radial-gradient(circle at top,#2f3640,#192a56,#000000)", minHeight: "100vh", color: "white", padding: "20px", fontFamily: "'Segoe UI',sans-serif" },
  btn: { border: "none", borderRadius: "30px", color: "white", fontWeight: "bold", cursor: "pointer", transition: "0.3s" },
  startBtn: { border: "none", borderRadius: "40px", cursor: "pointer", color: "white", fontWeight: "bold" },
  endScreen: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#111", color: "white" }
};