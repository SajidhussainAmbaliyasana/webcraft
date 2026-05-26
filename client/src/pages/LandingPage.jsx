import { useState, useEffect} from "react";

const NAV_LINKS = ["Features", "Pricing", "Templates", "Docs"];

const FEATURES = [
  {
    icon: "⬡",
    title: "Dynamic Component Engine",
    desc: "Build pages from reusable atomic components. Hero sections, cards, galleries — compose anything.",
  },
  {
    icon: "◈",
    title: "Nested Architecture",
    desc: "Infinite nesting depth. Sections contain blocks, blocks contain elements. Unlimited layout freedom.",
  },
  {
    icon: "◉",
    title: "Live Visual Editor",
    desc: "Drag, drop, rearrange. See your website update in real-time as you design.",
  },
  {
    icon: "⬙",
    title: "One-Click Publish",
    desc: "Deploy to a public URL instantly. Your pages live at mysite.com/about in seconds.",
  },
  {
    icon: "◫",
    title: "Multi-Site Dashboard",
    desc: "Manage dozens of websites from a single command center. Clients, projects, brands.",
  },
  {
    icon: "⬕",
    title: "Responsive by Default",
    desc: "Every component adapts to any screen. Mobile, tablet, desktop — always perfect.",
  },
];

const STEPS = [
  { n: "01", title: "Create a website", sub: "Name it. Set the domain. Done in 10 seconds." },
  { n: "02", title: "Add pages", sub: "Home, About, Contact — build your sitemap visually." },
  { n: "03", title: "Drop components", sub: "Choose from 40+ pre-built blocks. Customize everything." },
  { n: "04", title: "Publish", sub: "One click. Your site is live on the web." },
];

const PLANS = [
  { name: "Starter", price: "$0", desc: "Perfect to get started", features: ["3 websites", "10 pages each", "20 components", "Community support"], accent: false },
  { name: "Pro", price: "$29", desc: "For professionals", features: ["Unlimited websites", "Unlimited pages", "All components", "Priority support", "Custom domains", "Analytics"], accent: true },
  { name: "Team", price: "$89", desc: "For agencies", features: ["Everything in Pro", "5 team seats", "White label", "API access", "Dedicated support"], accent: false },
];

function Noise() {
  return (
    <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.03, zIndex: 0 }} xmlns="http://www.w3.org/2000/svg">
      <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

function GridLines() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />
    </div>
  );
}

function Orb({ x, y, color, size = 600 }) {
  return (
    <div style={{
      position: "absolute",
      left: x, top: y,
      width: size, height: size,
      borderRadius: "50%",
      background: color,
      filter: "blur(120px)",
      opacity: 0.18,
      pointerEvents: "none",
      transform: "translate(-50%,-50%)",
    }} />
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 5%",
      height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "background 0.3s, border-color 0.3s",
      background: scrolled ? "rgba(6,8,18,0.85)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(99,179,237,0.1)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: "linear-gradient(135deg, #4fc3f7, #7c4dff)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: "#fff",
        }}>W</div>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#e8f4fd", letterSpacing: "-0.5px" }}>Webcraft</span>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {NAV_LINKS.map(l => (
          <a key={l} href="#" style={{ color: "rgba(232,244,253,0.55)", fontSize: 14, textDecoration: "none", letterSpacing: "0.3px", fontFamily: "'DM Mono', monospace", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#e8f4fd"}
            onMouseLeave={e => e.target.style.color = "rgba(232,244,253,0.55)"}
          >{l}</a>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button style={{ padding: "8px 18px", borderRadius: 8, background: "transparent", border: "1px solid rgba(99,179,237,0.25)", color: "rgba(232,244,253,0.7)", fontSize: 13, cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>Log in</button>
        <button style={{ padding: "8px 18px", borderRadius: 8, background: "linear-gradient(135deg, #4fc3f7, #7c4dff)", border: "none", color: "#fff", fontSize: 13, cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>Get started</button>
      </div>
    </nav>
  );
}

function HeroBadge() {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "6px 14px 6px 8px",
      borderRadius: 100,
      background: "rgba(79,195,247,0.06)",
      border: "1px solid rgba(79,195,247,0.2)",
      marginBottom: 32,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4fc3f7", display: "inline-block", boxShadow: "0 0 8px #4fc3f7" }} />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(232,244,253,0.65)", letterSpacing: "0.5px" }}>v2.0 — Now with AI layout generation</span>
    </div>
  );
}

function EditorMockup() {
  const [active, setActive] = useState(0);
  const COMP = ["Hero Section", "Feature Grid", "Pricing Table", "Testimonials"];
  const COLORS = ["#4fc3f7", "#7c4dff", "#f472b6", "#34d399"];

  return (
    <div style={{
      width: "100%", maxWidth: 860,
      borderRadius: 16,
      border: "1px solid rgba(99,179,237,0.15)",
      background: "rgba(8,12,28,0.9)",
      backdropFilter: "blur(20px)",
      overflow: "hidden",
      boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 80px rgba(79,195,247,0.06)",
    }}>
      {/* Window chrome */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(99,179,237,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ flex: 1, marginLeft: 8, height: 24, borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", paddingLeft: 10 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(232,244,253,0.2)" }}>editor.webcraft.io/dashboard/site/home</span>
        </span>
      </div>
      {/* Editor body */}
      <div style={{ display: "flex", height: 420 }}>
        {/* Sidebar */}
        <div style={{ width: 200, borderRight: "1px solid rgba(99,179,237,0.08)", padding: "12px 0", flexShrink: 0 }}>
          <div style={{ padding: "4px 12px 12px", fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(232,244,253,0.25)", letterSpacing: "1px" }}>COMPONENTS</div>
          {COMP.map((c, i) => (
            <div key={c} onClick={() => setActive(i)} style={{
              padding: "8px 12px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
              background: active === i ? "rgba(79,195,247,0.07)" : "transparent",
              borderLeft: active === i ? `2px solid ${COLORS[i]}` : "2px solid transparent",
              transition: "all 0.15s",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: 2, background: COLORS[i], opacity: active === i ? 1 : 0.4 }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: active === i ? "#e8f4fd" : "rgba(232,244,253,0.4)" }}>{c}</span>
            </div>
          ))}
          <div style={{ margin: "16px 12px 8px", height: 1, background: "rgba(99,179,237,0.08)" }} />
          <div style={{ padding: "4px 12px 12px", fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(232,244,253,0.25)", letterSpacing: "1px" }}>PAGES</div>
          {["Home", "About", "Contact", "Blog"].map(p => (
            <div key={p} style={{ padding: "7px 12px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, color: "rgba(232,244,253,0.2)" }}>◻</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(232,244,253,0.35)" }}>{p}</span>
            </div>
          ))}
        </div>
        {/* Canvas */}
        <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>
          <div style={{ borderRadius: 10, border: `1px solid ${COLORS[active]}30`, overflow: "hidden" }}>
            {active === 0 && (
              <div style={{ padding: "40px 24px", textAlign: "center", background: "rgba(79,195,247,0.04)" }}>
                <div style={{ height: 8, width: 200, borderRadius: 4, background: "rgba(79,195,247,0.25)", margin: "0 auto 12px" }} />
                <div style={{ height: 6, width: 300, borderRadius: 4, background: "rgba(255,255,255,0.08)", margin: "0 auto 8px" }} />
                <div style={{ height: 6, width: 260, borderRadius: 4, background: "rgba(255,255,255,0.06)", margin: "0 auto 20px" }} />
                <div style={{ display: "inline-block", padding: "8px 20px", borderRadius: 8, background: "rgba(79,195,247,0.25)", border: "1px solid rgba(79,195,247,0.4)" }}>
                  <div style={{ height: 6, width: 60, borderRadius: 3, background: "rgba(79,195,247,0.8)" }} />
                </div>
              </div>
            )}
            {active === 1 && (
              <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, background: "rgba(124,77,255,0.04)" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ padding: 12, borderRadius: 8, border: "1px solid rgba(124,77,255,0.15)" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(124,77,255,0.3)", marginBottom: 8 }} />
                    <div style={{ height: 5, width: "80%", borderRadius: 3, background: "rgba(255,255,255,0.1)", marginBottom: 6 }} />
                    <div style={{ height: 4, width: "100%", borderRadius: 3, background: "rgba(255,255,255,0.06)", marginBottom: 3 }} />
                    <div style={{ height: 4, width: "70%", borderRadius: 3, background: "rgba(255,255,255,0.05)" }} />
                  </div>
                ))}
              </div>
            )}
            {active === 2 && (
              <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, background: "rgba(244,114,182,0.04)" }}>
                {["Starter","Pro","Team"].map((p, i) => (
                  <div key={p} style={{ padding: 12, borderRadius: 8, border: `1px solid rgba(244,114,182,${i === 1 ? 0.4 : 0.1})`, background: i === 1 ? "rgba(244,114,182,0.08)" : "transparent" }}>
                    <div style={{ height: 5, width: 50, borderRadius: 3, background: "rgba(244,114,182,0.4)", marginBottom: 8 }} />
                    <div style={{ height: 10, width: 40, borderRadius: 3, background: `rgba(244,114,182,${i === 1 ? 0.7 : 0.2})`, marginBottom: 8 }} />
                    {[1,2,3].map(j => <div key={j} style={{ height: 4, width: "100%", borderRadius: 3, background: "rgba(255,255,255,0.06)", marginBottom: 4 }} />)}
                  </div>
                ))}
              </div>
            )}
            {active === 3 && (
              <div style={{ padding: 20, background: "rgba(52,211,153,0.04)" }}>
                {[0,1].map(i => (
                  <div key={i} style={{ padding: 16, borderRadius: 8, border: "1px solid rgba(52,211,153,0.12)", marginBottom: 10, display: "flex", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(52,211,153,0.2)", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ height: 5, width: "40%", borderRadius: 3, background: "rgba(52,211,153,0.3)", marginBottom: 6 }} />
                      <div style={{ height: 4, width: "100%", borderRadius: 3, background: "rgba(255,255,255,0.07)", marginBottom: 3 }} />
                      <div style={{ height: 4, width: "80%", borderRadius: 3, background: "rgba(255,255,255,0.05)" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Inspector */}
        <div style={{ width: 180, borderLeft: "1px solid rgba(99,179,237,0.08)", padding: 12, flexShrink: 0 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(232,244,253,0.25)", letterSpacing: "1px", marginBottom: 12 }}>PROPERTIES</div>
          {[["Type", COMP[active].split(" ")[0]], ["Padding", "64px"], ["Align", "Center"], ["Animate", "Fade in"]].map(([k, v]) => (
            <div key={k} style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(232,244,253,0.3)", marginBottom: 3 }}>{k}</div>
              <div style={{ padding: "5px 8px", borderRadius: 5, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(232,244,253,0.6)" }}>{v}</div>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: "8px", borderRadius: 8, background: `rgba(${COLORS[active].replace("#","").match(/../g).map(h=>parseInt(h,16)).join(",")},0.12)`, border: `1px solid ${COLORS[active]}30`, textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: COLORS[active] }}>◉ Selected</div>
          </div>
        </div>
      </div>
      {/* Status bar */}
      <div style={{ padding: "8px 16px", borderTop: "1px solid rgba(99,179,237,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(232,244,253,0.25)" }}>home.jsx — {COMP[active]}</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#34d399" }}>Live</span>
        </div>
      </div>
    </div>
  );
}

function Section({ children, style = {} }) {
  return <section style={{ position: "relative", padding: "120px 5%", ...style }}>{children}</section>;
}

function Tag({ children }) {
  return (
    <div style={{
      display: "inline-block", marginBottom: 20,
      padding: "4px 14px", borderRadius: 100,
      fontFamily: "'DM Mono', monospace", fontSize: 11,
      color: "rgba(79,195,247,0.8)", letterSpacing: "1.5px",
      background: "rgba(79,195,247,0.06)",
      border: "1px solid rgba(79,195,247,0.15)",
    }}>{children.toUpperCase()}</div>
  );
}

export default function LandingPage() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ background: "#060812", minHeight: "100vh", color: "#e8f4fd", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <Noise />
      <GridLines />
      <Nav />

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 5% 80px" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <Orb x="20%" y="30%" color="radial-gradient(#4fc3f7, transparent)" size={700} />
          <Orb x="80%" y="20%" color="radial-gradient(#7c4dff, transparent)" size={500} />
          <Orb x="50%" y="80%" color="radial-gradient(#f472b6, transparent)" size={400} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <HeroBadge />
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(48px, 7vw, 88px)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-3px",
            margin: "0 0 24px",
            background: "linear-gradient(160deg, #e8f4fd 0%, rgba(232,244,253,0.5) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Build websites<br />
            <span style={{ background: "linear-gradient(90deg, #4fc3f7, #7c4dff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              beyond imagination.
            </span>
          </h1>
          <p style={{ fontSize: 19, color: "rgba(232,244,253,0.45)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px", fontWeight: 300 }}>
            A next-generation visual website builder. Compose dynamic pages from reusable components. Ship in minutes, not months.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              padding: "14px 32px", borderRadius: 10,
              background: "linear-gradient(135deg, #4fc3f7, #7c4dff)",
              border: "none", color: "#fff",
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15,
              cursor: "pointer", letterSpacing: "-0.3px",
              boxShadow: "0 0 40px rgba(79,195,247,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 4px 60px rgba(79,195,247,0.45)"; }}
              onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 0 40px rgba(79,195,247,0.3)"; }}
            >Start building free →</button>
            <button style={{
              padding: "14px 32px", borderRadius: 10,
              background: "transparent",
              border: "1px solid rgba(99,179,237,0.2)", color: "rgba(232,244,253,0.7)",
              fontFamily: "'DM Mono', monospace", fontSize: 13,
              cursor: "pointer",
            }}>Watch demo</button>
          </div>
          <p style={{ marginTop: 20, fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(232,244,253,0.2)", letterSpacing: "0.5px" }}>No credit card · Free forever plan · Deploy in seconds</p>
        </div>
        {/* Editor preview */}
        <div style={{ position: "relative", zIndex: 1, marginTop: 80, width: "100%", display: "flex", justifyContent: "center" }}>
          <EditorMockup />
        </div>
        {/* Scroll cue */}
        <div style={{ marginTop: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.35 }}>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, #4fc3f7)" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "2px", color: "#4fc3f7" }}>SCROLL</span>
        </div>
      </section>

      {/* LOGOS */}
      <section style={{ padding: "0 5% 100px", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(232,244,253,0.2)", letterSpacing: "2px", marginBottom: 32 }}>TRUSTED BY BUILDERS AT</p>
        <div style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap", opacity: 0.3 }}>
          {["Acme Corp", "Vertikal", "Synth Labs", "Moondust", "Axiom", "Render"].map(co => (
            <span key={co} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "-0.5px", color: "#e8f4fd" }}>{co}</span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <Section>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <Orb x="90%" y="50%" color="radial-gradient(#7c4dff, transparent)" size={500} />
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <Tag>Features</Tag>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-2px", margin: 0, lineHeight: 1.1 }}>
              Everything you need<br />
              <span style={{ color: "rgba(232,244,253,0.4)" }}>to ship a great website.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 1, border: "1px solid rgba(99,179,237,0.1)", borderRadius: 16, overflow: "hidden" }}>
            {FEATURES.map((f, i) => (
              <div key={f.title}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: "36px 32px",
                  background: hovered === i ? "rgba(79,195,247,0.04)" : "rgba(8,12,28,0.6)",
                  borderRight: (i % 3 !== 2) ? "1px solid rgba(99,179,237,0.08)" : "none",
                  borderBottom: i < 3 ? "1px solid rgba(99,179,237,0.08)" : "none",
                  transition: "background 0.2s",
                  cursor: "default",
                }}>
                <div style={{ fontSize: 28, marginBottom: 16, color: "#4fc3f7", opacity: 0.7 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.5px" }}>{f.title}</h3>
                <p style={{ color: "rgba(232,244,253,0.4)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section style={{ paddingTop: 60 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <Tag>How it works</Tag>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-2px", margin: 0 }}>
              Four steps to live.
            </h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 39, top: 56, bottom: 56, width: 1, background: "linear-gradient(to bottom, rgba(79,195,247,0.3), rgba(124,77,255,0.3))" }} />
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ display: "flex", gap: 32, marginBottom: i < STEPS.length - 1 ? 48 : 0, alignItems: "flex-start" }}>
                <div style={{
                  width: 80, height: 80, borderRadius: 16, flexShrink: 0,
                  background: "rgba(8,12,28,0.9)",
                  border: "1px solid rgba(99,179,237,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22,
                  color: "rgba(79,195,247,0.5)",
                  position: "relative", zIndex: 1,
                }}>{s.n}</div>
                <div style={{ paddingTop: 16 }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px" }}>{s.title}</h3>
                  <p style={{ color: "rgba(232,244,253,0.4)", fontSize: 15, margin: 0, lineHeight: 1.6 }}>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PRICING */}
      <Section>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <Orb x="10%" y="50%" color="radial-gradient(#4fc3f7, transparent)" size={500} />
          <Orb x="80%" y="60%" color="radial-gradient(#f472b6, transparent)" size={400} />
        </div>
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <Tag>Pricing</Tag>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-2px", margin: 0 }}>
              Simple, honest pricing.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {PLANS.map((p, i) => (
              <div key={p.name} style={{
                padding: "36px 28px",
                borderRadius: 16,
                border: p.accent ? "1px solid rgba(79,195,247,0.4)" : "1px solid rgba(99,179,237,0.1)",
                background: p.accent ? "rgba(79,195,247,0.05)" : "rgba(8,12,28,0.6)",
                position: "relative", overflow: "hidden",
                transform: p.accent ? "scale(1.02)" : "scale(1)",
                boxShadow: p.accent ? "0 0 60px rgba(79,195,247,0.1)" : "none",
              }}>
                {p.accent && <div style={{ position: "absolute", top: 14, right: 14, padding: "3px 10px", borderRadius: 100, background: "rgba(79,195,247,0.15)", border: "1px solid rgba(79,195,247,0.3)", fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#4fc3f7", letterSpacing: "0.5px" }}>MOST POPULAR</div>}
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(232,244,253,0.4)", marginBottom: 8 }}>{p.name}</p>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 42, fontWeight: 800, letterSpacing: "-2px", marginBottom: 4 }}>{p.price}<span style={{ fontSize: 14, fontWeight: 400, color: "rgba(232,244,253,0.3)", letterSpacing: 0 }}>/mo</span></div>
                <p style={{ fontSize: 13, color: "rgba(232,244,253,0.35)", marginBottom: 28 }}>{p.desc}</p>
                <div style={{ marginBottom: 28 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                      <span style={{ color: p.accent ? "#4fc3f7" : "#34d399", fontSize: 12 }}>✓</span>
                      <span style={{ fontSize: 13, color: "rgba(232,244,253,0.55)" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button style={{
                  width: "100%", padding: "12px",
                  borderRadius: 9,
                  background: p.accent ? "linear-gradient(135deg, #4fc3f7, #7c4dff)" : "transparent",
                  border: p.accent ? "none" : "1px solid rgba(99,179,237,0.2)",
                  color: p.accent ? "#fff" : "rgba(232,244,253,0.6)",
                  fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14,
                  cursor: "pointer",
                }}>Get started</button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section style={{ textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <Orb x="50%" y="50%" color="radial-gradient(#7c4dff, transparent)" size={800} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "inline-block", padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(124,77,255,0.3)", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(124,77,255,0.7)", letterSpacing: "1.5px", marginBottom: 28 }}>START FOR FREE</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-2.5px", lineHeight: 1.05, marginBottom: 24 }}>
            Your next great<br />website starts here.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(232,244,253,0.4)", marginBottom: 40, lineHeight: 1.7, fontWeight: 300 }}>
            Join thousands of designers and developers building beautiful websites with Webcraft.
          </p>
          <button style={{
            padding: "16px 40px", borderRadius: 12,
            background: "linear-gradient(135deg, #4fc3f7, #7c4dff)",
            border: "none", color: "#fff",
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16,
            cursor: "pointer", letterSpacing: "-0.3px",
            boxShadow: "0 0 60px rgba(124,77,255,0.4)",
          }}>Build your first website →</button>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 5%", borderTop: "1px solid rgba(99,179,237,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #4fc3f7, #7c4dff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>W</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "rgba(232,244,253,0.4)", fontSize: 14 }}>Webcraft</span>
        </div>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(232,244,253,0.2)" }}>© 2026 Webcraft. Built with precision.</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Status", "GitHub"].map(l => (
            <a key={l} href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(232,244,253,0.25)", textDecoration: "none", letterSpacing: "0.3px" }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}