import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, TrendingUp, Star, Activity, Mail, FileText,
  Link2, Shield, Palette, Moon, Sun, ExternalLink, Users,
  DollarSign, Zap, Globe, BarChart3, CheckCircle2, LogOut,
  FileEdit, StickyNote, BarChart2, Plus, Trash2, RotateCcw, Save,
} from "lucide-react";
import { useLeadsCount } from "@/hooks/useLeadsCount";
import { useTrustpilotFiveStarCount } from "@/hooks/useTrustpilotStats";
import { useTheme } from "@/hooks/useTheme";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { type Section, loadContent, saveContent, resetContent } from "@/lib/pageContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ── Auth gate ──────────────────────────────────────────────────────
function LoginGate({ onAuthed }: { onAuthed: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError("Incorrect email or password.");
        return;
      }
      // Server-side verification — getUser() hits Supabase servers, not just localStorage
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("Verification failed. Please try again.");
        return;
      }
      onAuthed();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <img src="/Markety.png" alt="Markety" className="h-7 w-auto" />
          <div className="leading-none">
            <p className="text-[13px] font-bold text-foreground">Markety</p>
            <p className="text-[10px] text-muted-foreground">Admin panel</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-7">
          <h1 className="text-base font-bold text-foreground mb-1">Sign in</h1>
          <p className="text-xs text-muted-foreground mb-6">Enter your admin credentials to continue.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-xs">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-xs">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-xs text-destructive">{error}</p>
            )}

            <Button variant="hero" className="w-full rounded-xl" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ── Nav structure ──────────────────────────────────────────────────
const nav = [
  {
    items: [
      { id: "overview",     label: "Overview",     icon: LayoutDashboard },
    ],
  },
  {
    section: "Statistics",
    items: [
      { id: "leads",        label: "Leads",        icon: TrendingUp  },
      { id: "reviews",      label: "Reviews",      icon: Star        },
      { id: "performance",  label: "Performance",  icon: BarChart3   },
      { id: "traffic",      label: "Traffic",      icon: BarChart2   },
    ],
  },
  {
    section: "Content",
    items: [
      { id: "messages",     label: "Messages",     icon: Mail        },
      { id: "pages",        label: "Pages",        icon: FileText    },
      { id: "editor",       label: "Editor",       icon: FileEdit    },
    ],
  },
  {
    section: "Configure",
    items: [
      { id: "integrations", label: "Integrations", icon: Link2       },
      { id: "legal",        label: "Legal",        icon: Shield      },
      { id: "appearance",   label: "Appearance",   icon: Palette     },
      { id: "notes",        label: "Notes",        icon: StickyNote  },
    ],
  },
];

// ── Shared components ──────────────────────────────────────────────
function StatCard({
  icon: Icon, label, value, sub, accent = false,
}: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-5 flex flex-col gap-2 ${
        accent
          ? "bg-purple-deep border-purple-deep/50"
          : "bg-card border-border"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-medium uppercase tracking-wider ${accent ? "text-white/60" : "text-muted-foreground"}`}>
          {label}
        </span>
        <Icon className={`w-3.5 h-3.5 ${accent ? "text-white/70" : "text-muted-foreground"}`} />
      </div>
      <p className={`text-2xl font-bold tabular-nums leading-none ${accent ? "text-white" : "text-foreground"}`}>
        {value}
      </p>
      {sub && (
        <p className={`text-[11px] ${accent ? "text-white/50" : "text-muted-foreground"}`}>{sub}</p>
      )}
    </motion.div>
  );
}

function Row({ label, value, badge, href }: { label: string; value: string; badge?: string; href?: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0 gap-4">
      <p className="text-sm text-muted-foreground shrink-0">{label}</p>
      <div className="flex items-center gap-2 min-w-0">
        {badge && (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-purple-deep bg-purple-light px-2 py-0.5 rounded shrink-0">
            {badge}
          </span>
        )}
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground font-medium hover:text-purple-deep transition-colors flex items-center gap-1 truncate"
          >
            {value} <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        ) : (
          <span className="text-sm text-foreground font-medium truncate">{value}</span>
        )}
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border bg-muted/30">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      </div>
      <div className="px-5 divide-y divide-border">{children}</div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-10 text-center">
      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
      <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Content editor ──────────────────────────────────────────────────
function ContentEditor() {
  const [page, setPage] = useState<"privacy" | "terms">("privacy");
  const [sections, setSections] = useState<Section[]>(() => loadContent("privacy"));

  const switchPage = (p: "privacy" | "terms") => {
    setPage(p);
    setSections(loadContent(p));
  };

  const updateSection = (i: number, field: "title" | "body", value: string) =>
    setSections(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));

  const addSection = () =>
    setSections(prev => [...prev, { title: `${prev.length + 1}. New section`, body: "" }]);

  const deleteSection = (i: number) =>
    setSections(prev => prev.filter((_, idx) => idx !== i));

  const handleSave = () => {
    saveContent(page, sections);
    toast.success("Saved — reload the public page to see changes.");
  };

  const handleReset = () => {
    const defaults = resetContent(page);
    setSections(defaults);
    toast.success("Reset to default content.");
  };

  return (
    <div className="space-y-5">
      {/* Page selector */}
      <div className="flex gap-2">
        {(["privacy", "terms"] as const).map(p => (
          <button
            key={p}
            onClick={() => switchPage(p)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              page === p
                ? "bg-purple-deep text-white"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {p === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Separate paragraphs with a blank line. Start list items with{" "}
        <code className="bg-muted px-1 py-0.5 rounded text-foreground">- </code> (dash space).
        Email addresses and URLs are auto-linked on the public page.
      </p>

      {/* Section cards */}
      <div className="space-y-3">
        {sections.map((section, i) => (
          <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center gap-3">
              <input
                value={section.title}
                onChange={e => updateSection(i, "title", e.target.value)}
                className="flex-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-transparent outline-none placeholder:text-muted-foreground/40"
                placeholder="Section title"
              />
              <button
                onClick={() => deleteSection(i)}
                className="text-muted-foreground/50 hover:text-destructive transition-colors shrink-0"
                title="Delete section"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-4">
              <textarea
                value={section.body}
                onChange={e => updateSection(i, "body", e.target.value)}
                rows={Math.min(16, Math.max(4, section.body.split("\n").length + 2))}
                placeholder="Section content…"
                className="w-full text-sm text-foreground bg-transparent border border-border rounded-lg px-3 py-2.5 resize-none outline-none focus:border-purple-deep/50 transition-colors font-mono leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add section */}
      <button
        onClick={addSection}
        className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add section
      </button>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-1">
        <Button variant="hero" onClick={handleSave} className="flex items-center gap-2 rounded-xl">
          <Save className="w-4 h-4" />
          Save changes
        </Button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset to defaults
        </button>
      </div>
    </div>
  );
}

// ── Dashboard (authenticated view) ─────────────────────────────────
function DashboardApp() {
  const [active, setActive] = useState("overview");
  const { isDark, toggle } = useTheme();
  const { data: leadsCount = 0, isLoading: leadsLoading } = useLeadsCount();
  const { data: fiveStarCount = 0, isLoading: starsLoading } = useTrustpilotFiveStarCount();
  const [notesContent, setNotesContent] = useState(() => localStorage.getItem("markety-admin-notes") ?? "");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const pages = [
    { name: "Home",               path: "/" },
    { name: "About",              path: "/about" },
    { name: "Contact",            path: "/contact" },
    { name: "Privacy Policy",     path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  const activeLabel = nav.flatMap(g => g.items).find(i => i.id === active)?.label ?? "";

  return (
    <div className="min-h-screen bg-background flex text-sm">

      {/* ── Sidebar ── */}
      <aside className="w-52 shrink-0 border-r border-border flex flex-col h-screen sticky top-0 bg-background">
        <div className="px-4 py-4 flex items-center gap-2.5 border-b border-border">
          <img src="/Markety.png" alt="" className="h-6 w-auto" />
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-bold text-foreground tracking-tight">Markety</span>
            <span className="text-[10px] text-muted-foreground">Admin panel</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {nav.map((group, gi) => (
            <div key={gi} className={gi !== 0 ? "mt-4" : ""}>
              {group.section && (
                <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                  {group.section}
                </p>
              )}
              {group.items.map(({ id, label, icon: Icon }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActive(id)}
                    className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] transition-colors mb-0.5 ${
                      isActive
                        ? "text-foreground font-semibold bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60 font-normal"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-purple-deep" : "text-muted-foreground/70"}`} />
                    {label}
                    {isActive && <span className="ml-auto w-1 h-1 rounded-full bg-purple-deep" />}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="border-t border-border px-3 py-3 space-y-0.5">
          <button
            onClick={toggle}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {isDark ? "Light mode" : "Dark mode"}
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            View site
          </a>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-7 py-3 flex items-center justify-between">
          <h1 className="text-[15px] font-semibold text-foreground">{activeLabel}</h1>
          <span className="text-[11px] text-muted-foreground">
            {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        </div>

        <div className="px-7 py-6 max-w-4xl space-y-5">

          {/* Overview */}
          {active === "overview" && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard icon={TrendingUp} label="Total leads"    value={leadsLoading ? "—" : leadsCount.toLocaleString()} sub="Google Sheets" accent />
                <StatCard icon={Star}       label="5-star reviews" value={starsLoading ? "—" : `${fiveStarCount}+`} sub="Trustpilot" />
                <StatCard icon={DollarSign} label="Avg. lead cost" value="$3"   sub="All campaigns" />
                <StatCard icon={Users}      label="Retention"      value="92%"  sub="Month-over-month" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Panel title="Site pages">
                  {pages.map(p => (
                    <div key={p.path} className="flex items-center justify-between py-2.5 gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                        <span className="text-sm text-foreground">{p.name}</span>
                      </div>
                      <a href={p.path} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-purple-deep transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </Panel>
                <Panel title="Business info">
                  <Row label="Agency"  value="Markety" />
                  <Row label="Email"   value="laminey2059@gmail.com" href="mailto:laminey2059@gmail.com" />
                  <Row label="Country" value="Denmark, DK" />
                  <Row label="Founded" value="2026" />
                  <Row label="Model"   value="Pay-per-lead" />
                </Panel>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Panel title="Active channels">
                  <Row label="Google Ads"    value="Search + Display"     badge="Active" />
                  <Row label="Meta Ads"      value="Facebook + Instagram" badge="Active" />
                  <Row label="LinkedIn Ads"  value="B2B targeting"        badge="Active" />
                  <Row label="Email"         value="Drip sequences"       badge="Active" />
                </Panel>
                <Panel title="System status">
                  <Row label="Website"        value="Live"           badge="On" />
                  <Row label="Contact form"   value="n8n webhook"   badge="On" />
                  <Row label="Leads counter"  value="Google Sheets" badge="On" />
                  <Row label="Review count"   value="Trustpilot"    badge="On" />
                  <Row label="Cookie banner"  value="localStorage"  badge="On" />
                </Panel>
              </div>
            </>
          )}

          {/* Leads */}
          {active === "leads" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <StatCard icon={TrendingUp} label="Total leads"   value={leadsLoading ? "Loading…" : leadsCount.toLocaleString()} sub="Live count" accent />
                <StatCard icon={DollarSign} label="Cost per lead" value="$3" sub="All-time avg." />
                <StatCard icon={Zap}        label="Cache"         value="10 min" sub="Auto-refresh" />
              </div>
              <Panel title="Data source">
                <Row label="Provider"    value="Google Sheets" />
                <Row label="Total leads" value={leadsLoading ? "Loading…" : `${leadsCount.toLocaleString()} leads`} badge="Live" />
                <Row label="Cache TTL"   value="10 minutes" />
                <Row label="Webhook"     value="n8n (localhost:5678)" />
                <Row label="Fallback"    value="Returns 0 if unavailable" />
              </Panel>
            </>
          )}

          {/* Reviews */}
          {active === "reviews" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <StatCard icon={Star}         label="5-star reviews" value={starsLoading ? "—" : `${fiveStarCount}+`} sub="Via Trustpilot" accent />
                <StatCard icon={Activity}     label="Score"          value="5.0 / 5.0" sub="Trustpilot rating" />
                <StatCard icon={CheckCircle2} label="Cache"          value="1 hour" sub="Auto-refresh" />
              </div>
              <Panel title="Trustpilot integration">
                <Row label="Source"       value="Supabase Edge Function" />
                <Row label="5-star count" value={starsLoading ? "Loading…" : `${fiveStarCount}`} badge="Live" />
                <Row label="Cache TTL"    value="1 hour" />
                <Row label="Used on"      value="Contact page · About page" />
              </Panel>
            </>
          )}

          {/* Performance */}
          {active === "performance" && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard icon={TrendingUp} label="Avg. lead cost"     value="$3"   sub="All campaigns" accent />
                <StatCard icon={Users}      label="Companies served"   value="200+" sub="All-time" />
                <StatCard icon={Activity}   label="Retention rate"     value="92%"  sub="Month-over-month" />
                <StatCard icon={Zap}        label="Time to first lead" value="14d"  sub="From onboarding" />
              </div>
              <Panel title="Campaign channels">
                <Row label="Google Ads"    value="Search + Display"     badge="Active" />
                <Row label="Meta Ads"      value="Facebook + Instagram" badge="Active" />
                <Row label="LinkedIn Ads"  value="B2B targeting"        badge="Active" />
                <Row label="Email"         value="Drip sequences"       badge="Active" />
                <Row label="Landing pages" value="Per campaign"         badge="Active" />
              </Panel>
              <Panel title="Key metrics">
                <Row label="Avg. open rate"       value="42%" />
                <Row label="Reply rate vs cold"   value="3.1×" />
                <Row label="Avg. onboarding time" value="3–7 days" />
                <Row label="Demo-to-close"        value="Tracked per client" />
              </Panel>
            </>
          )}

          {/* Messages */}
          {active === "messages" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <StatCard icon={Mail}         label="Inbox"         value="n8n"    sub="via webhook"   accent />
                <StatCard icon={Activity}     label="Response goal" value="< 24h"  sub="Target" />
                <StatCard icon={CheckCircle2} label="Form status"   value="Active" sub="Contact page" />
              </div>
              <EmptyState
                icon={Mail}
                title="No message database connected"
                desc="Contact form submissions go to the n8n webhook. Connect a database to store and view messages here."
              />
              <Panel title="Form configuration">
                <Row label="Endpoint" value="localhost:5678/webhook-test/contact-form" />
                <Row label="Method"   value="POST · no-cors" />
                <Row label="Fields"   value="name, email, message" />
                <Row label="Form URL" value="Contact page" href="/contact" />
              </Panel>
              <Panel title="Email settings">
                <Row label="Reply-to"     value="laminey2059@gmail.com" href="mailto:laminey2059@gmail.com" />
                <Row label="Notification" value="Configure in n8n" />
                <Row label="Auto-reply"   value="Not configured" badge="Off" />
                <Row label="Spam filter"  value="Handled by n8n" />
              </Panel>
            </>
          )}

          {/* Pages */}
          {active === "pages" && (
            <Panel title="All pages">
              {[
                ...pages,
                { name: "Dashboard (this page)", path: "/dashboard" },
                { name: "404 Not Found",          path: "/404-example" },
              ].map(p => (
                <div key={p.path} className="flex items-center justify-between py-3 gap-4">
                  <div>
                    <p className="text-sm text-foreground font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{p.path}</p>
                  </div>
                  {p.path !== "/dashboard" && (
                    <a href={p.path} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-purple-deep hover:underline shrink-0">
                      Open <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </Panel>
          )}

          {/* Integrations */}
          {active === "integrations" && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard icon={CheckCircle2} label="Supabase"      value="On"    sub="Auth + Profiles"   accent />
                <StatCard icon={CheckCircle2} label="Google Sheets" value="On"    sub="Leads count" />
                <StatCard icon={CheckCircle2} label="Trustpilot"    value="On"    sub="Review stats" />
                <StatCard icon={Activity}     label="n8n webhook"   value="Local" sub="Contact form" />
              </div>
              <Panel title="Integration details">
                <Row label="Supabase URL"      value="Via VITE_SUPABASE_URL" />
                <Row label="Supabase key"      value="Via VITE_SUPABASE_PUBLISHABLE_KEY" />
                <Row label="Sheets script URL" value="Via VITE_GOOGLE_SHEETS_SCRIPT_URL" />
                <Row label="Trustpilot"        value="Supabase Edge Function" badge="Live" />
                <Row label="n8n endpoint"      value="localhost:5678 (local only)" badge="Local" />
              </Panel>
            </>
          )}

          {/* Legal */}
          {active === "legal" && (
            <Panel title="Legal pages">
              <Row label="Privacy Policy"     value="Published · /privacy"            href="/privacy" />
              <Row label="Terms & Conditions" value="Published · /terms"              href="/terms" />
              <Row label="Cookie banner"      value="Active — stored in localStorage" badge="On" />
              <Row label="Contact email"      value="laminey2059@gmail.com"           href="mailto:laminey2059@gmail.com" />
              <Row label="Last updated"       value="February 2026" />
              <Row label="Jurisdiction"       value="Denmark, DK" />
            </Panel>
          )}

          {/* Traffic */}
          {active === "traffic" && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard icon={Globe}      label="Page views"      value="—" sub="Connect analytics" accent />
                <StatCard icon={Users}      label="Unique visitors" value="—" sub="Connect analytics" />
                <StatCard icon={Activity}   label="Avg. session"    value="—" sub="Connect analytics" />
                <StatCard icon={TrendingUp} label="Bounce rate"     value="—" sub="Connect analytics" />
              </div>
              <EmptyState
                icon={BarChart2}
                title="No analytics connected"
                desc="Connect Google Analytics 4 or Plausible to start seeing real traffic data here."
              />
              <Panel title="Analytics options">
                <Row label="Google Analytics 4" value="Add GA4 tracking ID to index.html"  badge="Popular" />
                <Row label="Plausible"           value="Privacy-friendly, no cookies"       badge="GDPR" />
                <Row label="Fathom"              value="Simple and GDPR-compliant" />
                <Row label="Umami"               value="Self-hosted, open source" />
              </Panel>
            </>
          )}

          {/* Editor */}
          {active === "editor" && <ContentEditor />}

          {/* Notes */}
          {active === "notes" && (
            <div className="space-y-3">
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border bg-muted/30 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin notes</p>
                  <span className="text-[10px] text-muted-foreground/50">Saved locally in this browser</span>
                </div>
                <div className="p-5">
                  <textarea
                    value={notesContent}
                    onChange={e => {
                      setNotesContent(e.target.value);
                      localStorage.setItem("markety-admin-notes", e.target.value);
                    }}
                    rows={18}
                    placeholder={"Private notes — visible only in this admin panel.\nJot down client names, campaign ideas, to-dos, or anything else."}
                    className="w-full text-sm text-foreground bg-transparent border-none outline-none resize-none leading-relaxed font-mono placeholder:text-muted-foreground/30"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Notes are saved automatically as you type. They are stored only in this browser's local storage and are never sent anywhere.
              </p>
            </div>
          )}

          {/* Appearance */}
          {active === "appearance" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <StatCard icon={Palette}      label="Theme"      value={isDark ? "Dark" : "Light"} sub="Current mode"        accent />
                <StatCard icon={CheckCircle2} label="Dark mode"  value="On"                        sub="CSS variable system" />
                <StatCard icon={Activity}     label="Toggle"     value="2 places"                  sub="Footer + Dashboard" />
              </div>
              <Panel title="Theme settings">
                <Row label="Current mode"     value={isDark ? "Dark" : "Light"} badge={isDark ? "Dark" : "Light"} />
                <Row label="Stored in"        value="localStorage · key: markety-cookie-consent" />
                <Row label="Toggle locations" value="Site footer · Admin sidebar" />
                <Row label="CSS system"       value="Tailwind CSS variables" />
                <Row label="Font"             value="Plus Jakarta Sans" />
                <Row label="Border radius"    value="0.75rem (--radius)" />
              </Panel>
              <Panel title="Colour palette">
                <Row label="--purple-light" value="252 80% 92% → 252 45% 20% (dark)" />
                <Row label="--purple-mid"   value="252 60% 74%" />
                <Row label="--purple-deep"  value="252 55% 58%" />
                <Row label="--purple-dark"  value="252 50% 30% → 252 55% 78% (dark)" />
                <Row label="--background"   value="250 20% 98% → 250 25% 8% (dark)" />
              </Panel>
            </>
          )}

        </div>
      </main>
    </div>
  );
}

// ── Root: gate wraps the app ───────────────────────────────────────
const Dashboard = () => {
  const [status, setStatus] = useState<"loading" | "login" | "app">("loading");

  useEffect(() => {
    // Fast local check first
    supabase.auth.getSession().then(({ data: { session } }) => {
      setStatus(session ? "app" : "login");
    });
    // Keep in sync with auth state changes (expiry, sign-out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? "app" : "login");
    });
    return () => subscription.unsubscribe();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border-2 border-purple-deep border-t-transparent animate-spin" />
      </div>
    );
  }
  if (status === "login") {
    return <LoginGate onAuthed={() => setStatus("app")} />;
  }
  return <DashboardApp />;
};

export default Dashboard;
