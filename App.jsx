import { useState, useEffect } from "react";

const APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_URL_HERE";

const PRODUCTS = [
  "ENDCAP (BRACKET) FOR 10W 40W BRACKET TUBE (SFG)",
  "ENOVAR DB BACK PART FOR L1 (SFG)",
  "ENOVAR DB FRONT PART FOR L1 (SFG)",
  "ENOVAR DB TRANSPARENT PART FOR L1 (SFG)",
  "ENOVAR DB BACK PART FOR L2 (SFG)",
  "ENOVAR DB FRONT PART FOR L2 (SFG)",
  "ENOVAR DB TRANSPARENT PART FOR L2 (SFG)",
  "ENOVAR DB PANEL FOR 10-13 (SFG)",
  "ENOVAR DB TRANSPARENT COVER FOR 10-13 (SFG)",
  "ENOVAR DB PANEL FOR 4-6 (SFG)",
  "ENOVAR DB TRANSPARENT COVER FOR 4-6 (SFG)",
  "ENOVAR DB PANEL FOR 7-9 (SFG)",
  "ENOVAR DB TRANSPARENT COVER FOR 7-9 (SFG)",
  "ENOVAR DB SCREW COVER (SFG)",
  "Body For 5W & 7W Down Panel (SFG)",
  "DECORATING FRAME FOR PIANO (SFG)",
  "PIANO FIXTURE FOR 2 PIN SOCKET (SFG)",
  "PIANO BACK PART FOR 2 PIN SOCKET (SFG)",
  "SWITCH FIXTURE FOR PIANO (SFG)",
  "SWITCH BUTTON FOR PIANO (SFG)",
  "PIANO SWITCH PRESS PIN (SFG)",
  "BACK PART FOR PIANO ONE WAY SWITCH (SFG)",
  "BACK PART FOR PIANO FAN DIMMER",
  "Dimmer Fixture for Fan Dimmer",
  "FIXTURE FOR PIANO FAN DIMMER",
  "MIDDLE BOARD FOR PIANO FAN DIMMER",
  "KNOB FOR PIANO FAN DIMMER",
  "COVER FOR PIANO FUSE (SFG)",
  "FUSING WIRE HOLDER FOR PIANO FUSE",
  "PIANO INDICATOR TRANSPARENT RED COVER (SFG)",
  "PIANO SWTICH RADIUM (SFG)",
  "PIANO BACK PART FOR TWO WAY SWITCH (SFG)",
  "ENOVAR EXHAUST FAN 10&12 FAN LOCK (SFG)",
  "ENOVAR EXHAUST FAN 10&12 OIL CUP (SFG)",
  "ENOVAR EXHAUST FAN 10IN BACK PART (SFG)",
  "ENOVAR EXHAUST FAN 10IN BLADE (SFG)",
  "ENOVAR EXHAUST FAN 10IN GRILLE (SFG)",
  "ENOVAR EXHAUST FAN 10IN LINKAGE ROD (SFG)",
  "ENOVAR EXHAUST FAN 10IN NET COVER (SFG)",
  "ENOVAR EXHAUST FAN 10IN PANEL (SFG)",
  "ENOVAR EXHAUST FAN 12IN BACK PART (SFG)",
  "ENOVAR EXHAUST FAN 12IN BLADE (SFG)",
  "ENOVAR EXHAUST FAN 12IN GRILLE (SFG)",
  "ENOVAR EXHAUST FAN 12IN LINKAGE ROD (SFG)",
  "ENOVAR EXHAUST FAN 12IN NET COVER (SFG)",
  "ENOVAR EXHAUST FAN 12IN PANEL (SFG)",
  "ENOVAR EXHAUST FAN 6&8 FAN LOCK (SFG)",
  "ENOVAR EXHAUST FAN 6IN BLADE (SFG)",
  "ENOVAR EXHAUST FAN 6IN GRILLE (SFG)",
  "ENOVAR EXHAUST FAN 6IN PANEL (SFG)",
  "ENOVAR EXHAUST FAN 8IN BACK PART (SFG)",
  "ENOVAR EXHAUST FAN 8IN BLADE (SFG)",
  "ENOVAR EXHAUST FAN 8IN GRILLE (SFG)",
  "ENOVAR EXHAUST FAN 8IN LINKAGE ROD (SFG)",
  "ENOVAR EXHAUST FAN 8IN NET COVER (SFG)",
  "ENOVAR EXHAUST FAN 8IN PANEL (SFG)",
  "ENOVAR EXHAUST FAN 8 OIL CUP (SFG)",
  "ENOVAR EXHAUST FAN CABLE LOCK (SFG)",
  "ENOVAR EXHAUST FAN CAPACITOR COVER (SFG)",
  "ENOVAR EXHAUST FAN SPRING LOCK (SFG)",
  "COVER FOR OCTAGONAL CEILING ROSE (SFG)",
  "CEILING ROSE BODY FOR OCTAGONAL (SFG)",
  "Pendant holder-B22",
  "Cap for pendant holder",
  "Cap for Round batten holder (common B22 and E27)",
  "Base for Round batten holder B22",
  "Ceiling rose-Upper cover(S)",
  "Ceiling rose-Bottom plate(S)",
  "2 pin plugs 10A",
  "Internal parts for 2 pin plug（A）",
  "British plug (13A)-Cable sleeve",
  "round 3 pin plug (6A)-Bottom plate",
  "Cable lock-for 3 pin plug",
  "EXTENSION SOCKET FRONT AND BACK PART - 3S",
  "EXTENSION SOCKET FRONT AND BACK PART - 4S",
  "EXTENSION SOCKET FRONT AND BACK PART - 5S",
  "DECORATIVE PART FOR EXTENSION SOCKET",
  "INDICATOR FOR EXTENSION SOCKET",
  "SWITCH BUTTON HOLDER",
  "SAFETY SHUTTER FOR EXTENSION SOCKET",
  "POWER CORD LOCK FOR EXTENSION SOCKET",
  "Ear for Junction Box",
  "Extension Socket Switch Button",
  "ENOVAR DB FRONT & BACK PART FOR L1 (SFG)",
  "ENOVAR DB FRONT & BACK PART FOR L2 (SFG)",
];

const MACHINES = ["A-1","A-2","A-3","A-4","A-5","B-1","B-2","B-3","B-4","B-5","B-6","B-7"];
const SUPERVISORS = ["Shofiq","Rakib","Rahim","Noo","Rahium"];
const SHIFTS = ["Day","Night"];
const BREAKDOWN_TYPES = [
  "Mechanical Breakdown","Electrical Breakdown","Planned Downtime",
  "In Process Setup/Adjustment","Raw Material Shortage","Others down time"
];
const BREAKDOWN_REASONS = [
  "Planning Problem","No Problem","Resin Short Problem","Fitting Problem",
  "Mold Problem","Mixture Problem","Product + Nozzel Problem","Power Problem",
  "Hit Problem","Mold Change","Bad mold","Gearbroken","No reason","Dont know","maintenance"
];

const SMV_MAP = {
  "ENDCAP (BRACKET) FOR 10W 40W BRACKET TUBE (SFG)": 0.250,
  "ENOVAR DB BACK PART FOR L1 (SFG)": 0.408,
  "ENOVAR DB FRONT PART FOR L1 (SFG)": 0.167,
  "ENOVAR DB TRANSPARENT PART FOR L1 (SFG)": 0.146,
  "ENOVAR DB TRANSPARENT PART FOR L2 (SFG)": 0.242,
  "ENOVAR DB PANEL FOR 10-13 (SFG)": 0.917,
  "ENOVAR DB TRANSPARENT COVER FOR 10-13 (SFG)": 0.417,
  "ENOVAR DB PANEL FOR 4-6 (SFG)": 0.650,
  "ENOVAR DB TRANSPARENT COVER FOR 4-6 (SFG)": 0.750,
  "ENOVAR DB PANEL FOR 7-9 (SFG)": 0.667,
  "ENOVAR DB TRANSPARENT COVER FOR 7-9 (SFG)": 0.500,
  "Body For 5W & 7W Down Panel (SFG)": 0.458,
  "DECORATING FRAME FOR PIANO (SFG)": 0.023,
  "PIANO FIXTURE FOR 2 PIN SOCKET (SFG)": 0.024,
  "PIANO BACK PART FOR 2 PIN SOCKET (SFG)": 0.150,
  "SWITCH FIXTURE FOR PIANO (SFG)": 0.040,
  "SWITCH BUTTON FOR PIANO (SFG)": 0.038,
  "PIANO SWITCH PRESS PIN (SFG)": 0.005,
  "BACK PART FOR PIANO ONE WAY SWITCH (SFG)": 0.085,
  "BACK PART FOR PIANO FAN DIMMER": 0.100,
  "Dimmer Fixture for Fan Dimmer": 0.079,
  "FIXTURE FOR PIANO FAN DIMMER": 0.056,
  "MIDDLE BOARD FOR PIANO FAN DIMMER": 0.039,
  "KNOB FOR PIANO FAN DIMMER": 0.040,
  "PIANO INDICATOR TRANSPARENT RED COVER (SFG)": 0.071,
  "PIANO SWTICH RADIUM (SFG)": 0.004,
  "ENOVAR EXHAUST FAN 10&12 FAN LOCK (SFG)": 0.049,
  "ENOVAR EXHAUST FAN 10&12 OIL CUP (SFG)": 0.308,
  "ENOVAR EXHAUST FAN 10IN BACK PART (SFG)": 0.967,
  "ENOVAR EXHAUST FAN 10IN BLADE (SFG)": 0.750,
  "ENOVAR EXHAUST FAN 10IN GRILLE (SFG)": 0.433,
  "ENOVAR EXHAUST FAN 10IN LINKAGE ROD (SFG)": 0.300,
  "ENOVAR EXHAUST FAN 10IN NET COVER (SFG)": 0.983,
  "ENOVAR EXHAUST FAN 10IN PANEL (SFG)": 1.083,
  "ENOVAR EXHAUST FAN 12IN BACK PART (SFG)": 1.000,
  "ENOVAR EXHAUST FAN 12IN BLADE (SFG)": 0.717,
  "ENOVAR EXHAUST FAN 12IN GRILLE (SFG)": 0.367,
  "ENOVAR EXHAUST FAN 12IN NET COVER (SFG)": 0.833,
  "ENOVAR EXHAUST FAN 12IN PANEL (SFG)": 0.833,
  "ENOVAR EXHAUST FAN 6&8 FAN LOCK (SFG)": 0.300,
  "ENOVAR EXHAUST FAN 6IN BLADE (SFG)": 0.667,
  "ENOVAR EXHAUST FAN 6IN GRILLE (SFG)": 0.325,
  "ENOVAR EXHAUST FAN 6IN PANEL (SFG)": 0.750,
  "ENOVAR EXHAUST FAN 8IN BACK PART (SFG)": 0.817,
  "ENOVAR EXHAUST FAN 8IN BLADE (SFG)": 0.633,
  "ENOVAR EXHAUST FAN 8IN GRILLE (SFG)": 0.383,
  "ENOVAR EXHAUST FAN 8IN LINKAGE ROD (SFG)": 0.192,
  "ENOVAR EXHAUST FAN 8IN NET COVER (SFG)": 0.717,
  "ENOVAR EXHAUST FAN 8IN PANEL (SFG)": 0.717,
  "ENOVAR EXHAUST FAN 8 OIL CUP (SFG)": 0.267,
  "ENOVAR EXHAUST FAN CABLE LOCK (SFG)": 0.013,
  "ENOVAR EXHAUST FAN CAPACITOR COVER (SFG)": 0.133,
  "COVER FOR OCTAGONAL CEILING ROSE (SFG)": 0.400,
  "CEILING ROSE BODY FOR OCTAGONAL (SFG)": 0.333,
  "Pendant holder-B22": 0.333,
  "Cap for pendant holder": 0.300,
  "Cap for Round batten holder (common B22 and E27)": 0.375,
  "Base for Round batten holder B22": 0.333,
  "Ceiling rose-Upper cover(S)": 0.283,
  "Ceiling rose-Bottom plate(S)": 0.258,
  "2 pin plugs 10A": 0.133,
  "Internal parts for 2 pin plug（A）": 0.167,
  "British plug (13A)-Cable sleeve": 0.115,
  "round 3 pin plug (6A)-Bottom plate": 0.250,
  "Cable lock-for 3 pin plug": 0.043,
  "EXTENSION SOCKET FRONT AND BACK PART - 3S": 1.000,
  "EXTENSION SOCKET FRONT AND BACK PART - 4S": 1.017,
  "EXTENSION SOCKET FRONT AND BACK PART - 5S": 1.083,
  "DECORATIVE PART FOR EXTENSION SOCKET": 0.088,
  "INDICATOR FOR EXTENSION SOCKET": 0.024,
  "SWITCH BUTTON HOLDER": 0.050,
  "SAFETY SHUTTER FOR EXTENSION SOCKET": 0.100,
  "POWER CORD LOCK FOR EXTENSION SOCKET": 0.079,
  "Ear for Junction Box": 0.058,
  "Extension Socket Switch Button": 0.050,
  "ENOVAR DB FRONT & BACK PART FOR L1 (SFG)": 0.417,
  "ENOVAR DB FRONT & BACK PART FOR L2 (SFG)": 0.333,
};

function getMonthLabel(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" }).replace(" ", "-");
}

function calcOEE(general, npt) {
  const product = general.productCriteria;
  const smv = SMV_MAP[product] || null;
  const shiftTime = parseFloat(general.shiftTime) || 480;
  const plannedDown = parseFloat(npt.plannedDown) || 0;
  const availableRunTime = shiftTime - plannedDown;

  const qco = parseFloat(npt.qco) || 0;
  const unavailOrder = parseFloat(npt.unavailOrder) || 0;
  const manpower = parseFloat(npt.manpower) || 0;
  const gas = parseFloat(npt.gas) || 0;
  const electricity = parseFloat(npt.electricity) || 0;
  const others = parseFloat(npt.others) || 0;
  const totalNPT = qco + unavailOrder + manpower + gas + electricity + others;

  const actualRunTime = availableRunTime - totalNPT;
  const actualOutput = parseFloat(general.actualOutput) || 0;
  const totalWastage = parseFloat(npt.totalWastage) || 0;
  const goodProduction = actualOutput - totalWastage;

  const shiftCapacity = smv ? Math.round((shiftTime / smv) * 10) / 10 : null;
  const shiftTarget = plannedDown > 0 && smv ? Math.round(((shiftTime - plannedDown) / smv) * 10) / 10 : shiftCapacity;
  const idealCycleTime = smv;
  const achievement = shiftTarget ? ((actualOutput / shiftTarget) * 100) : null;

  const availability = availableRunTime > 0 ? (actualRunTime / availableRunTime) : 0;
  const performance = actualRunTime > 0 && idealCycleTime ? (actualOutput * idealCycleTime / actualRunTime) : 0;
  const quality = actualOutput > 0 ? (goodProduction / actualOutput) : 0;
  const oee = availability * performance * quality;
  const nptPct = availableRunTime > 0 ? (totalNPT / availableRunTime) : 0;
  const wastagePct = actualOutput > 0 ? (totalWastage / actualOutput) : 0;

  return {
    shiftCapacity, shiftTarget, idealCycleTime, achievement,
    availableRunTime, actualRunTime, totalNPT, nptPct,
    availability, performance, quality, oee,
    goodProduction, wastagePct
  };
}

const pct = (v) => v != null && !isNaN(v) ? (v * 100).toFixed(1) + "%" : "—";
const num = (v) => v != null && !isNaN(v) ? v.toFixed(2) : "—";
const round1 = (v) => v != null && !isNaN(v) ? v.toFixed(1) : "—";

export default function OEEInputApp() {
  const [activeForm, setActiveForm] = useState("production");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const [general, setGeneral] = useState({
    date: today, section: "Injection Molding", productCriteria: "",
    supervisorName: "", shift: "", actualOutput: "", shiftTime: "480", machine: ""
  });
  const [npt, setNpt] = useState({
    qco: "", unavailOrder: "", manpower: "", gas: "", electricity: "",
    totalWastage: "", wastageReason: "", others: "", remarks: "", plannedDown: ""
  });
  const [breakdown, setBreakdown] = useState({
    date: today, section: "Injection Molding", productCriteria: "",
    machine: "", supervisorName: "", shift: "", breakdownType: "",
    breakdownReason: "", downtime: "", remarks: ""
  });

  const oee = general.productCriteria && general.actualOutput ? calcOEE(general, npt) : null;

  const updateGeneral = (k, v) => setGeneral(p => ({ ...p, [k]: v }));
  const updateNpt = (k, v) => setNpt(p => ({ ...p, [k]: v }));
  const updateBreakdown = (k, v) => setBreakdown(p => ({ ...p, [k]: v }));

  const submitProduction = async () => {
    if (!general.date || !general.productCriteria || !general.actualOutput || !general.supervisorName || !general.shift) {
      setStatus({ type: "error", msg: "Please fill all required fields (marked with *)" });
      return;
    }
    setLoading(true);
    setStatus(null);
    const calc = oee || {};
    const month = getMonthLabel(general.date);
    const payload = {
      action: "addProduction",
      data: {
        sbu: "ALEL",
        date: general.date,
        section: general.section,
        shift: general.shift,
        machine: general.machine,
        productCriteria: general.productCriteria,
        supervisorName: general.supervisorName,
        shiftCapacity: calc.shiftCapacity || "",
        shiftTarget: calc.shiftTarget || "",
        actualOutput: general.actualOutput,
        idealCycleTime: calc.idealCycleTime || "",
        achievementPct: calc.achievement ? (calc.achievement / 100) : "",
        shiftTime: general.shiftTime,
        plannedDownTime: npt.plannedDown || 0,
        availableRunTime: calc.availableRunTime || "",
        totalNPT: calc.totalNPT || 0,
        actualRunTime: calc.actualRunTime || "",
        gas: npt.gas || 0,
        electricity: npt.electricity || 0,
        unavailOrder: npt.unavailOrder || 0,
        rawMaterial: 0,
        manpower: npt.manpower || 0,
        qco: npt.qco || 0,
        inProcessSetup: 0,
        mechBreakdown: 0,
        elecBreakdown: 0,
        othersDowntime: npt.others || 0,
        nptPct: calc.nptPct || "",
        wastagePct: 0,
        totalWastage: npt.totalWastage || 0,
        wastagePctCalc: calc.wastagePct || "",
        wastageReason: npt.wastageReason || "",
        goodProduction: calc.goodProduction || "",
        availability: calc.availability || "",
        performance: calc.performance || "",
        quality: calc.quality || "",
        oee: calc.oee || "",
        remarks: npt.remarks || "",
        month,
      }
    };
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });
      const json = await res.json();
      if (json.success) {
        setStatus({ type: "success", msg: "Production entry saved to Google Sheet!" });
        setGeneral(p => ({ ...p, actualOutput: "", machine: "" }));
        setNpt({ qco:"",unavailOrder:"",manpower:"",gas:"",electricity:"",totalWastage:"",wastageReason:"",others:"",remarks:"",plannedDown:"" });
      } else {
        setStatus({ type: "error", msg: json.error || "Failed to save. Check Apps Script URL." });
      }
    } catch (e) {
      setStatus({ type: "error", msg: "Network error. Make sure Apps Script is deployed and URL is correct." });
    }
    setLoading(false);
  };

  const submitBreakdown = async () => {
    if (!breakdown.date || !breakdown.productCriteria || !breakdown.supervisorName || !breakdown.shift || !breakdown.breakdownType || !breakdown.downtime) {
      setStatus({ type: "error", msg: "Please fill all required fields (marked with *)" });
      return;
    }
    setLoading(true);
    setStatus(null);
    const month = getMonthLabel(breakdown.date).replace("-20", "-").split("-")[0];
    const payload = {
      action: "addBreakdown",
      data: {
        sbu: "Injection",
        date: breakdown.date,
        section: breakdown.section,
        shift: breakdown.shift,
        machine: breakdown.machine,
        productCriteria: breakdown.productCriteria,
        supervisorName: breakdown.supervisorName,
        breakdownType: breakdown.breakdownType,
        breakdownName: breakdown.breakdownReason,
        reason: breakdown.breakdownReason,
        downtime: breakdown.downtime,
        remarks: breakdown.remarks,
        month: getMonthLabel(breakdown.date).split("-")[0],
      }
    };
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });
      const json = await res.json();
      if (json.success) {
        setStatus({ type: "success", msg: "Breakdown entry saved to Google Sheet!" });
        setBreakdown(p => ({ ...p, breakdownType:"", breakdownReason:"", downtime:"", remarks:"", machine:"" }));
      } else {
        setStatus({ type: "error", msg: json.error || "Failed to save." });
      }
    } catch (e) {
      setStatus({ type: "error", msg: "Network error. Check Apps Script URL." });
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%", padding: "8px 10px", fontSize: "14px",
    border: "1px solid var(--color-border-secondary)",
    borderRadius: "6px", background: "var(--color-background-primary)",
    color: "var(--color-text-primary)", boxSizing: "border-box"
  };
  const labelStyle = { fontSize: "12px", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 4, display: "block" };
  const fieldStyle = { marginBottom: 14 };
  const sectionHead = { fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-tertiary)", margin: "20px 0 12px", borderBottom: "0.5px solid var(--color-border-tertiary)", paddingBottom: 6 };

  const tabs = [
    { key: "production", label: "Production Entry" },
    { key: "breakdown", label: "Breakdown Entry" },
  ];

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "1rem 0", fontFamily: "var(--font-sans)" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, margin: 0, color: "var(--color-text-primary)" }}>
          Injection Molding — OEE Input
        </h2>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "4px 0 0" }}>
          ALEL · Data saves directly to Google Sheet
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setActiveForm(t.key); setStatus(null); }}
            style={{
              padding: "7px 18px", fontSize: 13, fontWeight: 500, borderRadius: 6, cursor: "pointer",
              border: activeForm === t.key ? "1px solid #185FA5" : "1px solid var(--color-border-secondary)",
              background: activeForm === t.key ? "#E6F1FB" : "var(--color-background-primary)",
              color: activeForm === t.key ? "#185FA5" : "var(--color-text-secondary)",
            }}>{t.label}</button>
        ))}
      </div>

      {status && (
        <div style={{
          padding: "10px 14px", borderRadius: 6, marginBottom: 16, fontSize: 13,
          background: status.type === "success" ? "var(--color-background-success)" : "var(--color-background-danger)",
          color: status.type === "success" ? "var(--color-text-success)" : "var(--color-text-danger)",
          border: `0.5px solid ${status.type === "success" ? "var(--color-border-success)" : "var(--color-border-danger)"}`,
        }}>{status.msg}</div>
      )}

      {activeForm === "production" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10, padding: "16px 18px" }}>
            <div style={sectionHead}>General Data</div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Date *</label>
              <input type="date" value={general.date} onChange={e => updateGeneral("date", e.target.value)} style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Section *</label>
              <input value={general.section} readOnly style={{ ...inputStyle, background: "var(--color-background-secondary)", cursor: "default" }} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Product Criteria *</label>
              <select value={general.productCriteria} onChange={e => updateGeneral("productCriteria", e.target.value)} style={inputStyle}>
                <option value="">— Select product —</option>
                {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Supervisor Name *</label>
              <select value={general.supervisorName} onChange={e => updateGeneral("supervisorName", e.target.value)} style={inputStyle}>
                <option value="">— Select —</option>
                {SUPERVISORS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>Shift *</label>
                <select value={general.shift} onChange={e => updateGeneral("shift", e.target.value)} style={inputStyle}>
                  <option value="">—</option>
                  {SHIFTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Machine</label>
                <select value={general.machine} onChange={e => updateGeneral("machine", e.target.value)} style={inputStyle}>
                  <option value="">—</option>
                  {MACHINES.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>Actual Output (Pcs) *</label>
                <input type="number" value={general.actualOutput} onChange={e => updateGeneral("actualOutput", e.target.value)} placeholder="0" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Operation/Shift Time (Min) *</label>
                <input type="number" value={general.shiftTime} onChange={e => updateGeneral("shiftTime", e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div style={sectionHead}>NPT & Wastage</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>Planned Downtime (Min)</label>
                <input type="number" value={npt.plannedDown} onChange={e => updateNpt("plannedDown", e.target.value)} placeholder="0" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>QCO (Min)</label>
                <input type="number" value={npt.qco} onChange={e => updateNpt("qco", e.target.value)} placeholder="0" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Unavailable Order (Min)</label>
                <input type="number" value={npt.unavailOrder} onChange={e => updateNpt("unavailOrder", e.target.value)} placeholder="0" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Manpower Shortage (Min)</label>
                <input type="number" value={npt.manpower} onChange={e => updateNpt("manpower", e.target.value)} placeholder="0" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Utility Gas (Min)</label>
                <input type="number" value={npt.gas} onChange={e => updateNpt("gas", e.target.value)} placeholder="0" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Utility Electricity (Min)</label>
                <input type="number" value={npt.electricity} onChange={e => updateNpt("electricity", e.target.value)} placeholder="0" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Total Wastage (Pcs)</label>
                <input type="number" value={npt.totalWastage} onChange={e => updateNpt("totalWastage", e.target.value)} placeholder="0" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Others Downtime (Min)</label>
                <input type="number" value={npt.others} onChange={e => updateNpt("others", e.target.value)} placeholder="0" style={inputStyle} />
              </div>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Wastage Reason</label>
              <input value={npt.wastageReason} onChange={e => updateNpt("wastageReason", e.target.value)} placeholder="e.g. bad mold" style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Others / Remarks</label>
              <input value={npt.remarks} onChange={e => updateNpt("remarks", e.target.value)} style={inputStyle} />
            </div>

            <button onClick={submitProduction} disabled={loading} style={{
              width: "100%", padding: "10px", fontSize: 14, fontWeight: 500, borderRadius: 6,
              background: "#185FA5", color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1, marginTop: 4
            }}>
              {loading ? "Saving…" : "Save Production Entry →"}
            </button>
          </div>

          <div>
            <div style={{ background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10, padding: "16px 18px", marginBottom: 16 }}>
              <div style={sectionHead}>Live OEE Preview</div>
              {!oee ? (
                <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", margin: 0 }}>
                  Select a product and enter output to see calculated OEE.
                </p>
              ) : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                    {[
                      ["Availability", pct(oee.availability)],
                      ["Performance", pct(oee.performance)],
                      ["Quality", pct(oee.quality)],
                      ["OEE", pct(oee.oee)],
                    ].map(([label, val]) => (
                      <div key={label} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 8, padding: "10px 12px" }}>
                        <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginBottom: 2 }}>{label}</div>
                        <div style={{ fontSize: 22, fontWeight: 500, color: label === "OEE" ? "#185FA5" : "var(--color-text-primary)" }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                    {[
                      ["Shift Capacity", oee.shiftCapacity ? round1(oee.shiftCapacity) + " pcs" : "—"],
                      ["Shift Target", oee.shiftTarget ? round1(oee.shiftTarget) + " pcs" : "—"],
                      ["Ideal Cycle Time", oee.idealCycleTime ? oee.idealCycleTime.toFixed(3) + " min" : "—"],
                      ["Available Run Time", round1(oee.availableRunTime) + " min"],
                      ["Total NPT", round1(oee.totalNPT) + " min (" + pct(oee.nptPct) + ")"],
                      ["Actual Run Time", round1(oee.actualRunTime) + " min"],
                      ["Good Production", oee.goodProduction + " pcs"],
                      ["Wastage%", pct(oee.wastagePct)],
                    ].map(([k, v]) => (
                      <tr key={k} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                        <td style={{ padding: "5px 0", color: "var(--color-text-secondary)" }}>{k}</td>
                        <td style={{ padding: "5px 0", textAlign: "right", fontWeight: 500 }}>{v}</td>
                      </tr>
                    ))}
                  </table>
                  {!SMV_MAP[general.productCriteria] && (
                    <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 8 }}>
                      ⚠ SMV not found for this product — capacity fields will be empty in sheet.
                    </p>
                  )}
                </>
              )}
            </div>

            <div style={{ background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10, padding: "14px 16px", fontSize: 12, color: "var(--color-text-secondary)" }}>
              <div style={{ fontWeight: 500, marginBottom: 8, color: "var(--color-text-primary)", fontSize: 13 }}>Setup Guide</div>
              <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
                <li>Open your Google Sheet</li>
                <li>Go to <strong>Extensions → Apps Script</strong></li>
                <li>Paste the provided <code>Code.gs</code> script</li>
                <li>Deploy as Web App (access: Anyone)</li>
                <li>Copy the deployment URL and replace <code>YOUR_APPS_SCRIPT_URL_HERE</code> in this app's source code</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {activeForm === "breakdown" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10, padding: "16px 18px" }}>
            <div style={sectionHead}>Breakdown Entry</div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Date *</label>
              <input type="date" value={breakdown.date} onChange={e => updateBreakdown("date", e.target.value)} style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Section *</label>
              <input value={breakdown.section} readOnly style={{ ...inputStyle, background: "var(--color-background-secondary)", cursor: "default" }} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Product Criteria *</label>
              <select value={breakdown.productCriteria} onChange={e => updateBreakdown("productCriteria", e.target.value)} style={inputStyle}>
                <option value="">— Select product —</option>
                {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>Machine No</label>
                <select value={breakdown.machine} onChange={e => updateBreakdown("machine", e.target.value)} style={inputStyle}>
                  <option value="">—</option>
                  {MACHINES.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Supervisor Name *</label>
                <select value={breakdown.supervisorName} onChange={e => updateBreakdown("supervisorName", e.target.value)} style={inputStyle}>
                  <option value="">—</option>
                  {SUPERVISORS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Shift *</label>
              <select value={breakdown.shift} onChange={e => updateBreakdown("shift", e.target.value)} style={inputStyle}>
                <option value="">— Select shift —</option>
                {SHIFTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Breakdown Type *</label>
              <select value={breakdown.breakdownType} onChange={e => updateBreakdown("breakdownType", e.target.value)} style={inputStyle}>
                <option value="">— Select type —</option>
                {BREAKDOWN_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Breakdown Reason *</label>
              <select value={breakdown.breakdownReason} onChange={e => updateBreakdown("breakdownReason", e.target.value)} style={inputStyle}>
                <option value="">— Select reason —</option>
                {BREAKDOWN_REASONS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Downtime (Min) *</label>
              <input type="number" value={breakdown.downtime} onChange={e => updateBreakdown("downtime", e.target.value)} placeholder="0" style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Remarks</label>
              <input value={breakdown.remarks} onChange={e => updateBreakdown("remarks", e.target.value)} style={inputStyle} />
            </div>

            <button onClick={submitBreakdown} disabled={loading} style={{
              width: "100%", padding: "10px", fontSize: 14, fontWeight: 500, borderRadius: 6,
              background: "#185FA5", color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1, marginTop: 4
            }}>
              {loading ? "Saving…" : "Save Breakdown Entry →"}
            </button>
          </div>

          <div style={{ background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10, padding: "16px 18px", fontSize: 13 }}>
            <div style={sectionHead}>Entry Preview</div>
            {[
              ["Date", breakdown.date || "—"],
              ["Section", breakdown.section],
              ["Product", breakdown.productCriteria || "—"],
              ["Machine", breakdown.machine || "—"],
              ["Supervisor", breakdown.supervisorName || "—"],
              ["Shift", breakdown.shift || "—"],
              ["Type", breakdown.breakdownType || "—"],
              ["Reason", breakdown.breakdownReason || "—"],
              ["Downtime", breakdown.downtime ? breakdown.downtime + " min" : "—"],
              ["Remarks", breakdown.remarks || "—"],
              ["Month", breakdown.date ? getMonthLabel(breakdown.date).split("-")[0] : "—"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                <span style={{ color: "var(--color-text-secondary)", fontSize: 12 }}>{k}</span>
                <span style={{ fontWeight: 500, fontSize: 12, maxWidth: "55%", textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
