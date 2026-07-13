import { useState, useEffect, useRef } from "react";
import {
  Shield,
  Mail,
  Smartphone,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
  Lock,
  Eye,
  Link2,
  Clock,
  RefreshCw,
  ChevronRight,
  Trophy,
  Target,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = ["Home", "What is Phishing?", "Recognize It", "Best Practices", "Quiz"];

const PHISHING_TYPES = [
  {
    icon: Mail,
    title: "Email Phishing",
    color: "#00d4ff",
    description:
      "Mass-sent fraudulent emails that impersonate trusted organizations — banks, tech companies, or government agencies — to steal credentials or install malware.",
  },
  {
    icon: Target,
    title: "Spear Phishing",
    color: "#ff3333",
    description:
      "Highly targeted attacks crafted using personal data about the victim. Attackers research their targets to craft convincing, personalized messages that bypass suspicion.",
  },
  {
    icon: Smartphone,
    title: "Smishing (SMS)",
    color: "#a855f7",
    description:
      "Phishing delivered via SMS text messages. Often contains urgent alerts about package deliveries, bank alerts, or prize notifications with malicious links.",
  },
];

const BEST_PRACTICES = [
  {
    icon: Eye,
    title: "Verify the sender's email address",
    description:
      "Always inspect the full email address, not just the display name. Attackers use addresses like 'support@paypa1.com' to deceive at a glance.",
  },
  {
    icon: Link2,
    title: "Hover before you click",
    description:
      "Hover over any link to preview the actual URL in your browser's status bar. If the destination doesn't match the sender's domain, do not click.",
  },
  {
    icon: Lock,
    title: "Enable multi-factor authentication",
    description:
      "MFA adds a second verification layer. Even if credentials are stolen, attackers cannot access your account without the second factor.",
  },
  {
    icon: AlertTriangle,
    title: "Be skeptical of urgency",
    description:
      "Legitimate organizations rarely demand immediate action under threat of account suspension. Urgency is a social engineering trigger — pause and verify.",
  },
  {
    icon: RefreshCw,
    title: "Keep software and browsers updated",
    description:
      "Security patches fix vulnerabilities that phishing attacks exploit. Enable automatic updates to ensure you have the latest protections.",
  },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    type: "multiple",
    question: "Which of the following is the most reliable indicator that an email may be phishing?",
    options: [
      "The email has a logo from a known company",
      "The sender's domain doesn't match the company it claims to be from",
      "The email asks you to verify your account",
      "The email was received at an unusual time",
    ],
    correct: 1,
    explanation: "Mismatched sender domains are a primary phishing signal. Display names can be spoofed; the actual domain cannot.",
  },
  {
    id: 2,
    type: "truefalse",
    question: "Spear phishing attacks are generic messages sent to thousands of people at once.",
    correct: false,
    explanation: "False. Spear phishing is highly targeted — attackers research specific individuals or organizations to craft personalized, convincing messages.",
  },
  {
    id: 3,
    type: "multiple",
    question: "You receive an SMS claiming your bank account is locked and asking you to call a number immediately. What should you do?",
    options: [
      "Call the number provided in the SMS right away",
      "Reply to the SMS with your account details to verify",
      "Ignore the message and call your bank using the number on their official website",
      "Forward the SMS to your contacts to warn them",
    ],
    correct: 2,
    explanation: "Always contact institutions using contact details from their official website — never from a suspicious message. The number in a smishing text leads directly to the attacker.",
  },
  {
    id: 4,
    type: "truefalse",
    question: "A padlock icon (HTTPS) in the browser address bar guarantees a website is safe and not a phishing site.",
    correct: false,
    explanation: "False. HTTPS only means the connection is encrypted — it says nothing about whether the site is legitimate. Phishing sites routinely use HTTPS and display the padlock.",
  },
  {
    id: 5,
    type: "multiple",
    question: "Which action best protects you if your credentials are stolen via a phishing attack?",
    options: [
      "Changing your password every 30 days",
      "Using a unique email address per service",
      "Enabling multi-factor authentication (MFA)",
      "Avoiding public Wi-Fi networks",
    ],
    correct: 2,
    explanation: "MFA means attackers need a second factor beyond your password to access your account. Even with stolen credentials, MFA blocks the majority of account takeover attempts.",
  },
  {
    id: 6,
    type: "multiple",
    question: "An attacker emails you impersonating your manager requesting an urgent wire transfer. What is this technique called?",
    options: [
      "Smishing",
      "Whaling / BEC (Business Email Compromise)",
      "Vishing",
      "Pharming",
    ],
    correct: 1,
    explanation: "BEC (Business Email Compromise) or Whaling specifically targets executives or impersonates them. It is one of the most costly frauds affecting organizations worldwide.",
  },
  {
    id: 7,
    type: "truefalse",
    question: "An email coming from a known colleague cannot be a phishing attempt.",
    correct: false,
    explanation: "False. Attackers can spoof a colleague's address or compromise their account. Always verify unusual requests through a separate communication channel.",
  },
  {
    id: 8,
    type: "multiple",
    question: "You receive an email with an attachment named 'Invoice_2026.pdf.exe'. What should you do?",
    options: [
      "Open it if the sender seems familiar",
      "Rename it to .pdf before opening",
      "Do not open it — it is an executable disguised as a PDF",
      "Forward it to your contacts for their opinion",
    ],
    correct: 2,
    explanation: "The real extension is .exe — an executable file. The .pdf is added to deceive. Opening this file would install malware on your machine.",
  },
  {
    id: 9,
    type: "truefalse",
    question: "Vishing is a phishing attack carried out through phone calls.",
    correct: true,
    explanation: "True. Vishing (voice phishing) uses phone calls to manipulate victims. Attackers impersonate banks, technical support, or authorities to extract sensitive information.",
  },
  {
    id: 10,
    type: "multiple",
    question: "What is the best way to report a phishing email in a corporate environment?",
    options: [
      "Delete it immediately without doing anything",
      "Reply to the sender to confirm it is phishing",
      "Forward it to all colleagues to warn them",
      "Report it to the IT security team without clicking any links",
    ],
    correct: 3,
    explanation: "Reporting to the security team allows the entire organization to be alerted and the attack to be blocked. Never reply to the attacker or forward the email to colleagues.",
  },
  {
    id: 11,
    type: "multiple",
    question: "You visit a website with a padlock (HTTPS) that looks exactly like your bank. What should you do?",
    options: [
      "Trust it fully — HTTPS means it is secure",
      "Check the full domain name in the address bar carefully",
      "Log in since the design looks identical",
      "HTTPS guarantees the site is the real bank",
    ],
    correct: 1,
    explanation: "HTTPS only encrypts the connection — it does NOT verify the site's identity. Always check the full domain carefully. Attackers use HTTPS on fake sites too.",
  },
  {
    id: 12,
    type: "truefalse",
    question: "Creating urgency and fear in a message is a common social engineering tactic used in phishing attacks.",
    correct: true,
    explanation: "True. Urgency and fear bypass rational thinking, pushing victims to act quickly without verifying. Always pause and verify before clicking any link or providing information.",
  },
];

function SectionTag({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="h-px w-8" style={{ background: "#00d4ff" }} />
      <span
        className="text-xs font-mono font-medium tracking-widest uppercase"
        style={{ color: "#00d4ff", fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </span>
      <div className="h-px w-8" style={{ background: "#00d4ff" }} />
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | boolean | null>>({ 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null, 10: null, 11: null, 12: null });
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10px 0px" }
    );
    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleMultipleChoice = (questionId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleTrueFalse = (answer: boolean, questionId: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitQuiz = () => {
    let s = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) s++;
    });
    setScore(s);
    setQuizSubmitted(true);
    setShowResult(true);
  };

  const handleResetQuiz = () => {
    setQuizAnswers({ 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null, 10: null, 11: null, 12: null });
    setQuizSubmitted(false);
    setScore(0);
    setShowResult(false);
  };

  const allAnswered = QUIZ_QUESTIONS.every((q) => quizAnswers[q.id] !== null);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "#0a0a1a",
        fontFamily: "'Inter', sans-serif",
        scrollbarWidth: "none",
      }}
    >
      <style>{`
        ::-webkit-scrollbar { display: none; }
        html { scroll-behavior: smooth; }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.4); }
          70% { box-shadow: 0 0 0 12px rgba(0, 212, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .scanline {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,212,255,0.08), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
          z-index: 5;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .glow-blue { box-shadow: 0 0 20px rgba(0, 212, 255, 0.15), 0 0 60px rgba(0, 212, 255, 0.05); }
        .glow-red { box-shadow: 0 0 20px rgba(255, 51, 51, 0.2), 0 0 60px rgba(255, 51, 51, 0.08); }
        .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-hover:hover { transform: translateY(-3px); }
        .nav-link { transition: color 0.15s ease; }
      `}</style>

      <div className="scanline" />

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(10, 10, 26, 0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0, 212, 255, 0.12)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield size={22} style={{ color: "#00d4ff" }} />
            <span
              className="text-lg font-bold tracking-wide"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "#00d4ff", letterSpacing: "0.05em" }}
            >
              PHISH<span style={{ color: "#ff3333" }}>GUARD</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item}
                onClick={() => scrollTo(idx)}
                className="nav-link px-4 py-2 text-sm rounded-md font-medium"
                style={{
                  color: activeSection === idx ? "#00d4ff" : "#9ca3af",
                  background: activeSection === idx ? "rgba(0, 212, 255, 0.08)" : "transparent",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            style={{ color: "#9ca3af" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
            style={{ borderColor: "rgba(0,212,255,0.12)", background: "rgba(10,10,26,0.98)" }}
          >
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item}
                onClick={() => scrollTo(idx)}
                className="text-left px-3 py-2.5 text-sm rounded-md font-medium"
                style={{
                  color: activeSection === idx ? "#00d4ff" : "#9ca3af",
                  background: activeSection === idx ? "rgba(0,212,255,0.08)" : "transparent",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── SECTION 1: HOME ── */}
      <section
        ref={(el) => { sectionRefs.current[0] = el; }}
        className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
      >
        {/* Ambient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,51,51,0.06) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-24">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div
              className="p-4 rounded-xl"
              style={{
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.2)",
                animation: "pulse-ring 3s infinite",
              }}
            >
              <Shield size={40} style={{ color: "#00d4ff" }} />
            </div>
          </div>

          <div className="mb-3">
            <span
              className="text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full"
              style={{
                color: "#00d4ff",
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.2)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Security Awareness Training
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "-0.01em" }}
          >
            <span style={{ color: "#e8eaf0" }}>Don't Take</span>
            <br />
            <span
              style={{
                color: "#00d4ff",
                textShadow: "0 0 30px rgba(0,212,255,0.4)",
              }}
            >
              the Bait.
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-10 leading-relaxed" style={{ color: "#9ca3af", maxWidth: "520px", margin: "0 auto 2.5rem" }}>
            90% of data breaches start with a phishing email. Learn to identify, avoid, and report phishing attacks before they compromise your organization.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo(1)}
              className="flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-base transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #0099cc)",
                color: "#0a0a1a",
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "0.05em",
                boxShadow: "0 0 30px rgba(0,212,255,0.3)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 40px rgba(0,212,255,0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.3)")}
            >
              START TRAINING <ChevronRight size={18} />
            </button>
            <button
              onClick={() => scrollTo(4)}
              className="flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-base transition-all duration-200"
              style={{
                background: "transparent",
                color: "#9ca3af",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; e.currentTarget.style.color = "#e8eaf0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#9ca3af"; }}
            >
              TAKE THE QUIZ
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-sm mx-auto">
            {[["3.4B", "Phishing emails/day"], ["90%", "Breach start point"], ["$4.9M", "Avg. breach cost"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: "#ff3333", fontFamily: "'Rajdhani', sans-serif" }}>{val}</div>
                <div className="text-xs leading-tight" style={{ color: "#6b7280" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.4))" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00d4ff" }} />
        </div>
      </section>

      {/* ── SECTION 2: WHAT IS PHISHING ── */}
      <section
        ref={(el) => { sectionRefs.current[1] = el; }}
        className="py-24 px-6"
        style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionTag label="Module 01" />
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "#e8eaf0" }}
            >
              What is <span style={{ color: "#00d4ff" }}>Phishing?</span>
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#9ca3af", lineHeight: "1.7" }}>
              Phishing is a social engineering attack where adversaries impersonate legitimate entities to deceive targets into revealing sensitive information, clicking malicious links, or installing malware.
            </p>
          </div>

          {/* Definition card */}
          <div
            className="rounded-xl p-6 mb-10 glow-blue"
            style={{
              background: "#0f0f24",
              border: "1px solid rgba(0,212,255,0.15)",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="p-3 rounded-lg flex-shrink-0"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}
              >
                <Shield size={24} style={{ color: "#00d4ff" }} />
              </div>
              <div>
                <p
                  className="text-xs font-mono mb-2 tracking-widest uppercase"
                  style={{ color: "#6b7280", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Definition
                </p>
                <p style={{ color: "#d1d5db", lineHeight: "1.7", fontSize: "0.95rem" }}>
                  A <strong style={{ color: "#00d4ff" }}>phishing attack</strong> uses deceptive digital communication — typically email, SMS, or voice — to manipulate individuals into taking actions that compromise security. The term derives from "fishing," as attackers cast lures hoping targets will bite.
                </p>
              </div>
            </div>
          </div>

          {/* Type cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PHISHING_TYPES.map(({ icon: Icon, title, color, description }) => (
              <div
                key={title}
                className="rounded-xl p-6 card-hover"
                style={{
                  background: "#0f0f24",
                  border: `1px solid ${color}22`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${color}44`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${color}22`; }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${color}12`, border: `1px solid ${color}30` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: "#e8eaf0", fontSize: "1.15rem" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{description}</p>
              </div>
            ))}
          </div>
          {/* Fake Websites Block */}
          <div
            className="mt-10 rounded-xl p-6"
            style={{
              background: "#0f0f24",
              border: "1px solid rgba(255,51,51,0.2)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="p-2 rounded-lg"
                style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.2)" }}
              >
                <ExternalLink size={20} style={{ color: "#ff3333" }} />
              </div>
              <h3
                className="text-xl font-bold"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "#e8eaf0" }}
              >
                Fake Websites — <span style={{ color: "#ff3333" }}>Don't Be Fooled</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Typosquatting",
                  icon: "🔤",
                  description: "Attackers register domains with subtle typos or character substitutions.",
                  examples: ["paypa1.com → paypal.com", "rn = m (rnicrosoft.com)", "arnazon.com → amazon.com"],
                  color: "#ff3333",
                },
                {
                  title: "HTTPS ≠ Safe",
                  icon: "🔒",
                  description: "A padlock only means the connection is encrypted — not that the site is legitimate.",
                  examples: ["Phishing sites use HTTPS too", "Attackers get free SSL certificates", "Always verify the full domain"],
                  color: "#f59e0b",
                },
                {
                  title: "Cloned Design",
                  icon: "🪞",
                  description: "Attackers copy the exact visual design of real websites to deceive victims.",
                  examples: ["Pixel-perfect bank login pages", "Fake Microsoft login portals", "Copied Netflix payment pages"],
                  color: "#a855f7",
                },
              ].map(({ title, icon, description, examples, color }) => (
                <div
                  key={title}
                  className="rounded-lg p-4"
                  style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}22` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{icon}</span>
                    <h4
                      className="font-bold"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: "#e8eaf0", fontSize: "1rem" }}
                    >
                      {title}
                    </h4>
                  </div>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: "#9ca3af" }}>
                    {description}
                  </p>
                  <ul className="space-y-1.5">
                    {examples.map((ex) => (
                      <li
                        key={ex}
                        className="flex items-center gap-2 text-xs"
                        style={{ color: "#6b7280" }}
                      >
                        <span style={{ color, flexShrink: 0 }}>→</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* URL checker tip */}
            <div
              className="mt-5 p-4 rounded-lg flex items-start gap-3"
              style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.12)" }}
            >
              <Eye size={16} style={{ color: "#00d4ff", flexShrink: 0, marginTop: "2px" }} />
              <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>
                <span style={{ color: "#00d4ff", fontWeight: 600 }}>Pro tip: </span>
                Always check the full URL in your browser's address bar before entering any credentials.
                Hover over links to preview the destination. When in doubt, type the official URL manually.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: RECOGNIZE IT ── */}
      <section
        ref={(el) => { sectionRefs.current[2] = el; }}
        className="py-24 px-6 grid-bg"
        style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionTag label="Module 02" />
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "#e8eaf0" }}
            >
              How to <span style={{ color: "#00d4ff" }}>Recognize It</span>
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: "#9ca3af" }}>
              Compare a phishing email against a legitimate one. Learn the telltale red flags that attackers rely on.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* FAKE EMAIL */}
            <div
              className="rounded-xl overflow-hidden glow-red"
              style={{ border: "1px solid rgba(255,51,51,0.3)", background: "#0f0f24" }}
            >
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{ background: "rgba(255,51,51,0.1)", borderBottom: "1px solid rgba(255,51,51,0.2)" }}
              >
                <XCircle size={16} style={{ color: "#ff3333" }} />
                <span className="text-sm font-semibold" style={{ color: "#ff3333", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.05em" }}>
                  PHISHING EMAIL — DO NOT CLICK
                </span>
              </div>
              <div className="p-5 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                <div
                  className="mb-4 p-3 rounded-lg"
                  style={{ background: "rgba(255,51,51,0.06)", border: "1px solid rgba(255,51,51,0.15)" }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <span style={{ color: "#6b7280" }}>From: </span>
                      <span style={{ color: "#ff3333" }}>support@paypa1-secure.com</span>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded flex-shrink-0"
                      style={{ background: "rgba(255,51,51,0.15)", color: "#ff3333", border: "1px solid rgba(255,51,51,0.3)" }}
                    >
                      ⚠ Suspicious
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "#6b7280" }}>Subject: </span>
                    <span style={{ color: "#e8eaf0" }}>URGENT: Your account has been compromised!</span>
                  </div>
                </div>

                <div className="space-y-3" style={{ color: "#d1d5db", lineHeight: "1.7" }}>
                  <p>Dear Valued Customer,</p>
                  <p>
                    <span
                      className="px-1.5 py-0.5 rounded text-xs mr-1"
                      style={{ background: "rgba(255,51,51,0.15)", color: "#ff3333", border: "1px solid rgba(255,51,51,0.25)" }}
                    >
                      ⚠ Urgency trigger
                    </span>
                    Your account will be <strong style={{ color: "#ff6666" }}>permanently suspended in 24 hours</strong> unless you verify your identity immediately!
                  </p>
                  <p>
                    <span
                      className="px-1.5 py-0.5 rounded text-xs mr-1"
                      style={{ background: "rgba(255,51,51,0.15)", color: "#ff3333", border: "1px solid rgba(255,51,51,0.25)" }}
                    >
                      ⚠ Fake link
                    </span>
                    Click here to secure your account:{" "}
                    <span
                      className="flex items-center gap-1 mt-1 px-2 py-1 rounded text-xs"
                      style={{ background: "rgba(255,51,51,0.1)", color: "#ff6666", border: "1px solid rgba(255,51,51,0.2)", width: "fit-content" }}
                    >
                      <ExternalLink size={11} />
                      http://paypa1-secure-login.tk/verify
                    </span>
                  </p>
                  <p style={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                    <span
                      className="px-1.5 py-0.5 rounded text-xs mr-1"
                      style={{ background: "rgba(255,51,51,0.15)", color: "#ff3333", border: "1px solid rgba(255,51,51,0.25)" }}
                    >
                      ⚠ Generic greeting
                    </span>
                    PayPa1 Security Team
                  </p>
                </div>

                <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,51,51,0.15)" }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#ff3333", fontFamily: "'JetBrains Mono', monospace" }}>RED FLAGS DETECTED:</p>
                  <ul className="space-y-1">
                    {["Domain uses '1' instead of 'l' (paypa1)", "Urgency and fear-based language", "Suspicious .tk TLD link", "Generic 'Valued Customer' greeting"].map((flag) => (
                      <li key={flag} className="flex items-center gap-2 text-xs" style={{ color: "#9ca3af" }}>
                        <XCircle size={12} style={{ color: "#ff3333", flexShrink: 0 }} />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* LEGITIMATE EMAIL */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(0,212,255,0.15)", background: "#0f0f24", boxShadow: "0 0 20px rgba(0,212,255,0.06)" }}
            >
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{ background: "rgba(0,212,255,0.06)", borderBottom: "1px solid rgba(0,212,255,0.12)" }}
              >
                <CheckCircle size={16} style={{ color: "#00d4ff" }} />
                <span className="text-sm font-semibold" style={{ color: "#00d4ff", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.05em" }}>
                  LEGITIMATE EMAIL — SAFE
                </span>
              </div>
              <div className="p-5 text-sm">
                <div
                  className="mb-4 p-3 rounded-lg"
                  style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)" }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <span style={{ color: "#6b7280" }}>From: </span>
                      <span style={{ color: "#00d4ff" }}>service@paypal.com</span>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded flex-shrink-0"
                      style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.25)" }}
                    >
                      ✓ Verified
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "#6b7280" }}>Subject: </span>
                    <span style={{ color: "#e8eaf0" }}>Receipt for your recent payment</span>
                  </div>
                </div>

                <div className="space-y-3" style={{ color: "#d1d5db", lineHeight: "1.7" }}>
                  <p>Hello, <strong style={{ color: "#e8eaf0" }}>Alex Johnson</strong>,</p>
                  <p>We're confirming your payment of $47.99 to Spotify Premium on July 6, 2026.</p>
                  <p>
                    If you need to manage your account, visit us directly at{" "}
                    <span
                      className="flex items-center gap-1 mt-1 px-2 py-1 rounded text-xs"
                      style={{ background: "rgba(0,212,255,0.06)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.15)", width: "fit-content" }}
                    >
                      <ExternalLink size={11} />
                      https://www.paypal.com/myaccount
                    </span>
                  </p>
                  <p style={{ color: "#9ca3af", fontSize: "0.8rem" }}>Thank you,<br />The PayPal Team</p>
                </div>

                <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#00d4ff", fontFamily: "'JetBrains Mono', monospace" }}>TRUST INDICATORS:</p>
                  <ul className="space-y-1">
                    {["Official @paypal.com domain", "Personalized with your real name", "Links go to paypal.com (hover to verify)", "No urgency or threats — informational only"].map((flag) => (
                      <li key={flag} className="flex items-center gap-2 text-xs" style={{ color: "#9ca3af" }}>
                        <CheckCircle size={12} style={{ color: "#00d4ff", flexShrink: 0 }} />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Social Engineering Tactics */}
          <div className="mt-10 rounded-xl p-6"
            style={{ background: "#0f0f24", border: "1px solid rgba(255,51,51,0.15)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg"
                style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.2)" }}>
                <User size={20} style={{ color: "#ff3333" }} />
              </div>
              <h3 className="text-xl font-bold"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "#e8eaf0" }}>
                Social Engineering <span style={{ color: "#ff3333" }}>Tactics</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { emoji: "⏰", tactic: "Urgency", color: "#ff3333",
                  description: "Creates time pressure to prevent rational thinking.",
                  example: '"Your account will be deleted in 24 hours!"' },
                { emoji: "😨", tactic: "Fear", color: "#f59e0b",
                  description: "Threatens negative consequences to trigger panic.",
                  example: '"Suspicious activity detected on your account."' },
                { emoji: "👔", tactic: "Authority", color: "#a855f7",
                  description: "Impersonates executives, banks or government agencies.",
                  example: '"This is your CEO. Wire $10,000 immediately."' },
                { emoji: "🎁", tactic: "Reward", color: "#22c55e",
                  description: "Promises prizes or benefits to lure victims.",
                  example: '"You won an iPhone 16! Click to claim now."' },
              ].map(({ emoji, tactic, color, description, example }) => (
                <div key={tactic} className="rounded-lg p-4"
                  style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}22` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{emoji}</span>
                    <h4 className="font-bold"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color, fontSize: "1rem" }}>
                      {tactic}
                    </h4>
                  </div>
                  <p className="text-xs mb-2 leading-relaxed" style={{ color: "#9ca3af" }}>
                    {description}
                  </p>
                  <p className="text-xs px-3 py-2 rounded"
                    style={{ background: `${color}10`, color: "#6b7280",
                      border: `1px solid ${color}20`, fontStyle: "italic",
                      fontFamily: "'JetBrains Mono', monospace" }}>
                    {example}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Real World Examples */}
          <div className="mt-6 rounded-xl p-6"
            style={{ background: "#0f0f24", border: "1px solid rgba(0,212,255,0.15)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>
                <AlertTriangle size={20} style={{ color: "#00d4ff" }} />
              </div>
              <h3 className="text-xl font-bold"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "#e8eaf0" }}>
                Real-World <span style={{ color: "#00d4ff" }}>Examples</span>
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { brand: "Netflix", year: "2024", color: "#ff3333",
                  attack: "Mass email campaign claiming payment failure, redirecting to a fake Netflix login page to harvest credentials and credit card numbers.",
                  indicators: ["Sender: netflix-billing@secure-update.net", "Urgent payment threat", "Link goes to netflix-secure-login.tk"] },
                { brand: "Microsoft", year: "2023", color: "#00d4ff",
                  attack: "Fake Microsoft 365 login page sent via compromised email accounts, targeting enterprise employees to steal corporate credentials.",
                  indicators: ["Perfect visual clone of Microsoft login", "HTTPS certificate present (but fake domain)", "URL: microsofft-365-login.com"] },
                { brand: "DHL", year: "2024", color: "#f59e0b",
                  attack: "SMS phishing (smishing) campaign impersonating DHL, claiming a package was held due to unpaid customs fees with a fake payment link.",
                  indicators: ["SMS from unknown number", "Short link hiding real destination", "Requests credit card for small fee"] },
              ].map(({ brand, year, color, attack, indicators }) => (
                <div key={brand} className="rounded-lg p-4"
                  style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}22` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base"
                        style={{ fontFamily: "'Rajdhani', sans-serif", color }}>
                        {brand}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded"
                        style={{ background: `${color}15`, color, border: `1px solid ${color}25`,
                          fontFamily: "'JetBrains Mono', monospace" }}>
                        {year}
                      </span>
                    </div>
                    <XCircle size={14} style={{ color: "#ff3333" }} />
                  </div>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: "#9ca3af" }}>{attack}</p>
                  <div className="space-y-1">
                    {indicators.map((ind) => (
                      <div key={ind} className="flex items-center gap-2 text-xs"
                        style={{ color: "#6b7280" }}>
                        <AlertTriangle size={10} style={{ color: "#ff3333", flexShrink: 0 }} />
                        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: BEST PRACTICES ── */}
      <section
        ref={(el) => { sectionRefs.current[3] = el; }}
        className="py-24 px-6"
        style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionTag label="Module 03" />
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "#e8eaf0" }}
            >
              Best <span style={{ color: "#00d4ff" }}>Practices</span>
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: "#9ca3af" }}>
              Five security behaviors that significantly reduce your risk of becoming a phishing victim.
            </p>
          </div>

          <div className="space-y-4">
            {BEST_PRACTICES.map(({ icon: Icon, title, description }, idx) => (
              <div
                key={title}
                className="group flex items-start gap-5 rounded-xl p-5 card-hover"
                style={{
                  background: "#0f0f24",
                  border: "1px solid rgba(0,212,255,0.08)",
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.08)"; }}
              >
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: "#3d3d5c", fontFamily: "'JetBrains Mono', monospace", width: "20px" }}
                  >
                    0{idx + 1}
                  </span>
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)" }}
                  >
                    <Icon size={20} style={{ color: "#00d4ff" }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle size={14} style={{ color: "#22c55e", flexShrink: 0 }} />
                    <h3
                      className="font-semibold"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: "#e8eaf0", fontSize: "1.05rem", letterSpacing: "0.02em" }}
                    >
                      {title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: QUIZ ── */}
      <section
        ref={(el) => { sectionRefs.current[4] = el; }}
        className="py-24 px-6 grid-bg min-h-screen flex flex-col justify-center"
        style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}
      >
        <div className="max-w-2xl mx-auto w-full">
          <div className="text-center mb-12">
            <SectionTag label="Module 04" />
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "#e8eaf0" }}
            >
              Knowledge <span style={{ color: "#00d4ff" }}>Quiz</span>
            </h2>

            {/* Score counter */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl mt-2"
              style={{ background: "#0f0f24", border: "1px solid rgba(0,212,255,0.15)" }}
            >
              <Trophy size={18} style={{ color: "#00d4ff" }} />
              <span className="text-sm font-mono" style={{ color: "#9ca3af", fontFamily: "'JetBrains Mono', monospace" }}>
                Score:
              </span>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "#00d4ff" }}
              >
                {score} / {QUIZ_QUESTIONS.length}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, qIdx) => {
              const isMultiple = q.type === "multiple";
              const tagColor = isMultiple ? "#00d4ff" : "#a855f7";
              const tagBg = isMultiple ? "rgba(0,212,255,0.1)" : "rgba(168,85,247,0.1)";
              const tagBorder = isMultiple ? "rgba(0,212,255,0.2)" : "rgba(168,85,247,0.25)";

              return (
                <div
                  key={q.id}
                  className="rounded-xl overflow-hidden"
                  style={{ background: "#0f0f24", border: "1px solid rgba(0,212,255,0.12)" }}
                >
                  <div
                    className="px-6 py-4"
                    style={{ borderBottom: "1px solid rgba(0,212,255,0.08)", background: "rgba(0,212,255,0.04)" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{ background: tagBg, color: tagColor, border: `1px solid ${tagBorder}`, fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        Q{qIdx + 1} · {isMultiple ? "Multiple Choice" : "True / False"}
                      </span>
                    </div>
                    <p className="font-medium leading-relaxed" style={{ color: "#e8eaf0" }}>{q.question}</p>
                  </div>

                  <div className="p-5">
                    {isMultiple ? (
                      <div className="space-y-3">
                        {q.options!.map((option, idx) => {
                          const isSelected = quizAnswers[q.id] === idx;
                          const isCorrect = idx === q.correct;
                          let borderColor = "rgba(0,212,255,0.1)";
                          let bg = "rgba(0,212,255,0.02)";
                          let textColor = "#9ca3af";
                          if (quizSubmitted) {
                            if (isCorrect) { borderColor = "rgba(34,197,94,0.5)"; bg = "rgba(34,197,94,0.06)"; textColor = "#86efac"; }
                            else if (isSelected) { borderColor = "rgba(255,51,51,0.5)"; bg = "rgba(255,51,51,0.06)"; textColor = "#fca5a5"; }
                          } else if (isSelected) {
                            borderColor = "rgba(0,212,255,0.4)"; bg = "rgba(0,212,255,0.08)"; textColor = "#00d4ff";
                          }
                          return (
                            <button
                              key={idx}
                              onClick={() => handleMultipleChoice(q.id, idx)}
                              disabled={quizSubmitted}
                              className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-150"
                              style={{ border: `1px solid ${borderColor}`, background: bg, color: textColor, cursor: quizSubmitted ? "default" : "pointer" }}
                            >
                              <span
                                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                style={{ background: isSelected && !quizSubmitted ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)", color: textColor, border: `1px solid ${borderColor}`, fontFamily: "'JetBrains Mono', monospace" }}
                              >
                                {String.fromCharCode(65 + idx)}
                              </span>
                              {option}
                              {quizSubmitted && isCorrect && <CheckCircle size={14} style={{ color: "#22c55e", marginLeft: "auto" }} />}
                              {quizSubmitted && isSelected && !isCorrect && <XCircle size={14} style={{ color: "#ff3333", marginLeft: "auto" }} />}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {([true, false] as const).map((val) => {
                          const isSelected = quizAnswers[q.id] === val;
                          const isCorrect = val === q.correct;
                          let borderColor = "rgba(168,85,247,0.15)";
                          let bg = "rgba(168,85,247,0.02)";
                          let textColor = "#9ca3af";
                          if (quizSubmitted) {
                            if (isCorrect) { borderColor = "rgba(34,197,94,0.5)"; bg = "rgba(34,197,94,0.06)"; textColor = "#86efac"; }
                            else if (isSelected) { borderColor = "rgba(255,51,51,0.5)"; bg = "rgba(255,51,51,0.06)"; textColor = "#fca5a5"; }
                          } else if (isSelected) {
                            borderColor = "rgba(168,85,247,0.4)"; bg = "rgba(168,85,247,0.08)"; textColor = "#a855f7";
                          }
                          return (
                            <button
                              key={String(val)}
                              onClick={() => handleTrueFalse(val, q.id)}
                              disabled={quizSubmitted}
                              className="py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-150"
                              style={{ border: `1px solid ${borderColor}`, background: bg, color: textColor, fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.08em", cursor: quizSubmitted ? "default" : "pointer" }}
                            >
                              {quizSubmitted && isCorrect && <CheckCircle size={14} style={{ color: "#22c55e" }} />}
                              {quizSubmitted && isSelected && !isCorrect && <XCircle size={14} style={{ color: "#ff3333" }} />}
                              {val ? "TRUE" : "FALSE"}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {quizSubmitted && (
                      <p className="text-xs mt-3 px-1" style={{ color: "#6b7280", lineHeight: "1.6" }}>
                        <span style={{ color: "#00d4ff" }}>Explanation: </span>{q.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Submit / Result */}
            {!quizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={!allAnswered}
                className="w-full py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-200"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  letterSpacing: "0.08em",
                  background: allAnswered ? "linear-gradient(135deg, #00d4ff, #0099cc)" : "rgba(0,212,255,0.06)",
                  color: allAnswered ? "#0a0a1a" : "#3d3d5c",
                  border: allAnswered ? "none" : "1px solid rgba(0,212,255,0.1)",
                  cursor: allAnswered ? "pointer" : "not-allowed",
                  boxShadow: allAnswered ? "0 0 30px rgba(0,212,255,0.25)" : "none",
                }}
              >
                {allAnswered ? "SUBMIT ANSWERS" : "ANSWER ALL QUESTIONS TO SUBMIT"}
              </button>
            ) : (
              <div
                className="rounded-xl p-6 text-center"
                style={{
                  background: score === QUIZ_QUESTIONS.length ? "rgba(34,197,94,0.06)" : score > 0 ? "rgba(0,212,255,0.06)" : "rgba(255,51,51,0.06)",
                  border: `1px solid ${score === QUIZ_QUESTIONS.length ? "rgba(34,197,94,0.3)" : score > 0 ? "rgba(0,212,255,0.2)" : "rgba(255,51,51,0.3)"}`,
                }}
              >
                <div className="text-4xl mb-3">
                  {score === QUIZ_QUESTIONS.length ? "🏆" : score > 0 ? "✅" : "📚"}
                </div>
                <p
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    color: score === QUIZ_QUESTIONS.length ? "#22c55e" : score > 0 ? "#00d4ff" : "#ff3333",
                  }}
                >
                  {score === QUIZ_QUESTIONS.length ? "Perfect Score!" : score > 0 ? "Good Effort!" : "Keep Learning!"}
                </p>
                <p className="text-sm mb-4" style={{ color: "#9ca3af" }}>
                  You answered {score} out of {QUIZ_QUESTIONS.length} questions correctly.
                  {score < QUIZ_QUESTIONS.length && " Review the modules above and try again."}
                </p>
                <button
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
                  style={{
                    background: "rgba(0,212,255,0.08)",
                    color: "#00d4ff",
                    border: "1px solid rgba(0,212,255,0.2)",
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  <RefreshCw size={14} /> TRY AGAIN
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center"
        style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield size={14} style={{ color: "#00d4ff" }} />
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "#3d3d5c", letterSpacing: "0.08em" }}
          >
            PHISH<span style={{ color: "#ff3333" }}>GUARD</span>
          </span>
        </div>
        <p className="text-xs" style={{ color: "#3d3d5c" }}>
          Phishing Awareness Training Module · Security Education Platform
        </p>
      </footer>
    </div>
  );
}
