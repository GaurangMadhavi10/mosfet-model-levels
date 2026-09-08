# MOSFET Model Levels: From Simple Models to Advanced Device Models

An interactive, educational technical web platform exploring the evolution of MOSFET modeling from simple classroom square-law equations to industrial foundry compact models (BSIM) and 3D multi-gate devices (FinFET & GAA Nanosheets).

---

## 👥 Authors & Academic Context
- **Shloka Loni** (`shloka.18321@sakec.ac.in`) — Roll No. 34
- **Gaurang Madhavi** (`gaurang.madhavi18355@sakec.ac.in`) — Roll No. 35
- **Course / Activity:** VLSI Design • CCE1 Technical Activity

---

## 🌟 Core Topics & Roadmap

1. **The Model Journey:**
   - **Level 1:** Ideal physics, gradual channel approximation (GCA), and square-law behavior.
   - **Level 2 / 3:** First non-ideal physical corrections (body effect, mobility degradation, channel-length modulation) and empirical fitting.
   - **BSIM Family:** Measured silicon, surface-potential / charge-sheet models, unified scalability, and PVT sign-off.
   - **3D FETs:** Multi-gate 3D electrostatics, FinFETs, and Gate-All-Around (GAA) nanosheets.

2. **Interactive Engineering Modules:**
   - **Real-Time 2D MOSFET Cross-Section:** Live voltage sliders ($V_{GS}$ and $V_{DS}$) simulating inversion layer formation and channel pinch-off.
   - **Square-Law Derivation & Parameter Studio:** Step-by-step KaTeX derivation with live $\beta, V_{OV}, I_{D,sat}, g_m$ calculation.
   - **Output Characteristics ($I_D-V_{DS}$) Visualizer:** Interactive multi-curve plots for $V_{OV} = 0.2\text{V}, 0.35\text{V}, 0.5\text{V}$ with channel-length modulation ($\lambda$).
   - **SPICE Netlist Token Inspector:** Interactive dark code editor explaining model card resolution and geometry constraints.
   - **Wafer-to-Model Extraction Pipeline:** DC I-V, C-V, and AC/RF measurement flows with interactive validation checklists.
   - **3D Transistor Architectures:** FinFET vs. GAA Nanosheet cross-section diagrams with live $W_{eff}$ perimeter calculator.
   - **Model Matrix & Simulation Checklist:** Filterable comparison table and 5-point verification checklist.

---

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (Semiconductor & Wafer Custom Palette)
- **Mathematical Rendering:** KaTeX (LaTeX typesetting)
- **Charts:** Recharts
- **Icons:** Lucide React

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/GaurangMadhavi/mosfet-model-levels.git

# Navigate into project directory
cd mosfet-model-levels

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the interactive platform.

### Building for Production
```bash
npm run build
```

---

## 📚 References

1. Y. Tsividis and C. McAndrew, *Operation and Modeling of the MOS Transistor*, 3rd ed., Oxford University Press, 2011.
2. Y. Cheng et al., *"BSIM3v3 Manual,"* University of California, Berkeley, 1995.
3. BSIM Group, *BSIM4 User Manual and Model Documentation*, UC Berkeley.
4. BSIM Group, *BSIM-CMG Technical Manual: Common Multi-Gate MOSFET Model*, UC Berkeley.
5. Y. Taur and T. Ning, *Fundamentals of Modern VLSI Devices*, 2nd ed., Cambridge University Press, 2009.
6. S. M. Sze and K. K. Ng, *Physics of Semiconductor Devices*, 3rd ed., Wiley, 2006.
7. R. H. Dennard et al., *"Design of Ion-Implanted MOSFETs with Very Small Physical Dimensions,"* IEEE JSSC, 1974.
8. R. Geiger, P. Allen, and N. Strader, *VLSI Design Techniques for Analog and Digital Circuits*, McGraw-Hill.
