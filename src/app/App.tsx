import { useState } from "react";
import {
  LayoutDashboard, Briefcase, Users, Send, ClipboardList,
  Receipt, Settings, ShieldCheck, ChevronDown, Building2,
  UserCircle, LogOut, Search, Plus, Download, Wand2,
  Sparkles, RefreshCw, Clock, Check, ChevronLeft,
  ChevronRight, TrendingUp, Zap,
} from "lucide-react";

// ── ボタン ────────────────────────────────────────────────
type BtnV = "primary" | "secondary" | "ghost" | "danger-outline";
function Btn({ variant = "secondary", size = "md", children, onClick, disabled, className = "" }:
  { variant?: BtnV; size?: "sm" | "md"; children: React.ReactNode; onClick?: () => void; disabled?: boolean; className?: string }) {
  const base = "inline-flex items-center justify-center gap-1.5 font-semibold rounded-lg transition-all cursor-pointer select-none";
  const sz = size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm";
  const v = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/30",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 shadow-sm",
    ghost: "text-slate-500 hover:bg-white/60 hover:text-indigo-600",
    "danger-outline": "border border-red-300 text-red-600 hover:bg-red-50",
  }[variant];
  return (
    <button onClick={onClick} disabled={disabled}
      className={`${base} ${sz} ${v} ${disabled ? "opacity-40 pointer-events-none" : ""} ${className}`}>
      {children}
    </button>
  );
}

// ── バッジ ────────────────────────────────────────────────
function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
      style={{ backgroundColor: `${color}22`, color, border: `1px solid ${color}55` }}>
      {label}
    </span>
  );
}
function RankBadge({ rank }: { rank: string }) {
  const c: Record<string, string> = { S: "#7c3aed", A: "#2563eb", B: "#16a34a", C: "#94a3b8" };
  const col = c[rank] ?? "#94a3b8";
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-extrabold"
      style={{ background: `linear-gradient(135deg, ${col}30, ${col}18)`, color: col, border: `1.5px solid ${col}66` }}>
      {rank}
    </span>
  );
}

// ── サイドバー ────────────────────────────────────────────
const GROUPS = [
  { key: "sales", label: "営業", items: [
    { id: "projects", label: "案件", icon: Briefcase },
    { id: "engineers", label: "人材", icon: Users },
    { id: "proposals", label: "提案", icon: Send },
  ]},
  { key: "delivery", label: "納品・請求", items: [
    { id: "assignments", label: "参画", icon: ClipboardList },
    { id: "invoices", label: "請求", icon: Receipt },
  ]},
];

function Sidebar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ sales: true, delivery: true });

  const link = (id: string, indent = false) => {
    const active = page === id;
    return {
      onClick: () => setPage(id),
      className: `flex items-center gap-2.5 py-2.5 pr-3 text-sm font-medium transition-all rounded-r-xl cursor-pointer
        border-l-[3px]
        ${indent ? "pl-8" : "pl-4"}
        ${active
          ? "bg-white/15 text-white border-cyan-400"
          : "text-indigo-200 hover:bg-white/10 hover:text-white border-transparent"}`,
    };
  };

  return (
    <aside className="w-56 shrink-0 flex flex-col"
      style={{ background: "linear-gradient(175deg, #1e1b4b 0%, #312e81 60%, #1e3a5f 100%)" }}>
      {/* ロゴ */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #818cf8, #06b6d4)" }}>
            <Zap size={16} className="text-white" />
          </div>
          <div className="font-extrabold text-lg leading-tight text-white tracking-tight">SES Brain</div>
        </div>
        <div className="text-xs text-indigo-300 pl-10">案件を探さない SES へ</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        <div className="px-2 mb-2">
          <div {...link("dashboard")}>
            <LayoutDashboard size={17} className="shrink-0" />ダッシュボード
          </div>
        </div>
        {GROUPS.map(g => (
          <div key={g.key} className="mt-2">
            <button onClick={() => setOpen(o => ({ ...o, [g.key]: !o[g.key] }))}
              className="w-full flex items-center justify-between px-4 py-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-200 transition uppercase tracking-widest">
              <span>{g.label}</span>
              <ChevronDown size={11} className={`transition-transform ${open[g.key] ? "" : "-rotate-90"}`} />
            </button>
            {open[g.key] && (
              <div className="mt-1 px-2 space-y-0.5">
                {g.items.map(({ id, label, icon: Icon }) => (
                  <div key={id} {...link(id, true)}>
                    <Icon size={15} className="shrink-0" />{label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="mt-4 pt-3 border-t border-white/10 px-2 space-y-0.5">
          {[{ id: "settings", label: "設定", icon: Settings }, { id: "admin", label: "運営", icon: ShieldCheck }]
            .map(({ id, label, icon: Icon }) => (
              <div key={id} {...link(id)}>
                <Icon size={17} className="shrink-0" />{label}
              </div>
            ))}
        </div>
      </nav>

      {/* ユーザー */}
      <div className="px-4 py-3 border-t border-white/10 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shrink-0">A</div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-white truncate">admin@sample.co.jp</div>
          <div className="text-[10px] text-indigo-400">株式会社サンプル</div>
        </div>
      </div>
    </aside>
  );
}

// ── PageHeader ────────────────────────────────────────────
function PageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-8 py-5 border-b border-slate-200"
      style={{ background: "linear-gradient(to right, rgba(79,70,229,0.08) 0%, rgba(79,70,229,0.03) 35%, #fff 70%)" }}>
      <div className="flex items-stretch gap-3">
        <span className="w-1.5 rounded-full shrink-0"
          style={{ background: "linear-gradient(to bottom, #4f46e5, #06b6d4)" }} />
        <div>
          <h1 className="text-xl font-bold text-slate-900">{title}</h1>
          {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

// ── トップバー ────────────────────────────────────────────
function Topbar() {
  return (
    <header className="flex items-center justify-between gap-3 px-6 h-12 border-b border-slate-200 bg-white">
      <div className="flex items-center gap-2">
        <Building2 size={15} className="text-indigo-500" />
        <span className="text-sm font-semibold text-slate-800">株式会社サンプル</span>
      </div>
      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-all bg-slate-50">
        <LogOut size={13} />ログアウト
      </button>
    </header>
  );
}

// ── ダッシュボード ────────────────────────────────────────
const STATS = [
  { label: "案件数", value: "47", sub: "募集中 23", color: "#4f46e5", icon: Briefcase },
  { label: "登録人材", value: "31", sub: "稼働可 12", color: "#06b6d4", icon: Users },
  { label: "提案数", value: "89", sub: "提案中 12", color: "#f59e0b", icon: Send },
  { label: "受注数", value: "34", sub: "今月 +4", color: "#16a34a", icon: TrendingUp },
  { label: "受注率", value: "62.3%", sub: "失注 37.7%", color: "#7c3aed", icon: Sparkles },
  { label: "予想粗利", value: "144万", sub: "提案中", color: "#0ea5e9", icon: Zap },
  { label: "確定粗利", value: "238万", sub: "受注合計", color: "#16a34a", icon: TrendingUp },
];

const MATCHES = [
  { rank: "S", project: "【React/TS】大手SIer向けフロントエンド開発", location: "渋谷区", price: 90, engineer: "山田 健太", affil: "フリーランス", fit: 94, gross: 28 },
  { rank: "S", project: "【Java/Spring】金融系バックエンドAPI開発", location: "千代田区", price: 85, engineer: "佐藤 美咲", affil: "株式会社テック", fit: 91, gross: 22 },
  { rank: "A", project: "【Python/AWS】データ基盤構築・ETL開発", location: "品川区", price: 80, engineer: "田中 翔", affil: "フリーランス", fit: 87, gross: 19 },
  { rank: "A", project: "【Terraform】クラウド移行・インフラ支援", location: "新宿区", price: 75, engineer: "鈴木 花子", affil: "合同会社クラウド", fit: 83, gross: 17 },
];

const FOLLOWUPS = [
  { days: 7, project: "【Vue.js】ECフロントエンドリニューアル", engineer: "木村 大輔", email: "client@example.co.jp" },
  { days: 5, project: "【Java】基幹システム改修・保守", engineer: "中村 さくら", email: "hr@sample.com" },
];

function DashboardPage() {
  return (
    <div>
      <PageHeader title="ダッシュボード" description="営業状況の可視化" />
      <div className="p-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
          {STATS.map((s, i) => (
            <div key={i} className="rounded-xl p-4 border overflow-hidden relative group cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: `linear-gradient(135deg, ${s.color}18 0%, ${s.color}08 100%)`, borderColor: `${s.color}44` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: s.color }}>{s.label}</span>
                <s.icon size={14} style={{ color: `${s.color}99` }} />
              </div>
              <div className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</div>
              {s.sub && <div className="text-[11px] mt-0.5 text-slate-500">{s.sub}</div>}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl" style={{ backgroundColor: s.color }} />
            </div>
          ))}
        </div>

        {/* AIマッチング */}
        <section>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <span className="w-5 h-5 rounded-md flex items-center justify-center bg-indigo-600">
                <Sparkles size={12} className="text-white" />
              </span>
              AIマッチング — 注目の案件 × 候補
            </h2>
            <Btn variant="secondary"><RefreshCw size={13} />マッチングを更新</Btn>
          </div>
          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-indigo-100 text-left" style={{ background: "linear-gradient(to right,rgba(79,70,229,0.07),rgba(79,70,229,0.02))" }}>
                  {["", "案件", "人材", "適合率", "粗利", ""].map((h, i) => (
                    <th key={i} className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATCHES.map((m, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-indigo-50/60 transition"
                    style={{ borderColor: "#e2e8f0", backgroundColor: i % 2 === 1 ? "rgba(79,70,229,0.022)" : "white" }}>
                    <td className="px-4 py-3"><RankBadge rank={m.rank} /></td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-indigo-700 hover:underline cursor-pointer line-clamp-1">{m.project}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{m.location} ／ 単価 {m.price}万</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{m.engineer}</div>
                      <div className="text-xs text-slate-400">{m.affil}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                            style={{ width: `${m.fit}%` }} />
                        </div>
                        <span className="font-bold text-indigo-600">{m.fit}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-500 text-sm">粗利 <span className="font-semibold text-slate-700">{m.gross}万</span></td>
                    <td className="px-4 py-3">
                      <Btn variant="primary" size="sm"><Send size={12} />提案</Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* フォロー */}
        <section>
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
            <span className="w-5 h-5 rounded-md flex items-center justify-center bg-amber-500">
              <Clock size={12} className="text-white" />
            </span>
            フォローが必要な提案
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">{FOLLOWUPS.length}件</span>
          </h2>
          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <tbody>
                {FOLLOWUPS.map((r, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-amber-50/50 transition"
                    style={{ borderColor: "#e2e8f0" }}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        <Clock size={11} />{r.days}日経過
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">{r.project}</div>
                      <div className="text-xs text-slate-400">{r.engineer} → {r.email}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Btn variant="secondary" size="sm"><Check size={13} />フォロー済み</Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

// ── 案件一覧 ──────────────────────────────────────────────
const PROJECTS = [
  { title: "【React/TypeScript】大手SIer向けフロントエンド開発", statusLabel: "募集中", statusColor: "#16a34a", priceMin: 85, priceMax: 95, location: "渋谷区", remote: "フルリモート", skills: ["React", "TypeScript", "GraphQL", "AWS"], partner: "CCT", status: "ACTIVE" },
  { title: "【Java/Spring Boot】金融系バックエンドAPI開発", statusLabel: "募集中", statusColor: "#16a34a", priceMin: 80, priceMax: 90, location: "千代田区", remote: "一部リモート", skills: ["Java", "Spring", "Oracle", "Docker"], partner: "WhiteBox", status: "ACTIVE" },
  { title: "【Python/AWS】データ基盤構築・ETL", statusLabel: "募集中", statusColor: "#16a34a", priceMin: 75, priceMax: 85, location: "品川区", remote: "フルリモート", skills: ["Python", "AWS", "Spark", "Airflow"], partner: "CCT", status: "ACTIVE" },
  { title: "【Terraform】クラウド移行・インフラ支援", statusLabel: "募集中", statusColor: "#16a34a", priceMin: 70, priceMax: 80, location: "新宿区", remote: "一部リモート", skills: ["Terraform", "AWS", "Linux", "CI/CD"], partner: "イルミナ", status: "ACTIVE" },
  { title: "【Vue.js】EC向けフロントエンドリニューアル", statusLabel: "募集中", statusColor: "#16a34a", priceMin: 65, priceMax: 75, location: "渋谷区", remote: "フルリモート", skills: ["Vue.js", "TypeScript", "Nuxt", "REST"], partner: "Xhours", status: "ACTIVE" },
  { title: "【PM/要件定義】基幹システム再構築", statusLabel: "終了", statusColor: "#94a3b8", priceMin: 90, priceMax: 100, location: "大手町", remote: "出社", skills: ["PM", "要件定義", "Excel"], partner: "センターネット", status: "CLOSED" },
];
const SRC_C: Record<string, string> = { CCT: "#2563eb", WhiteBox: "#7c3aed", イルミナ: "#0ea5e9", センターネット: "#14b8a6", Xhours: "#db2777" };

function ProjectsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const filtered = PROJECTS.filter(p => (status === "all" || p.status === status) && (!q || p.title.includes(q)));
  return (
    <div>
      <PageHeader title="案件" description={`${filtered.length} 件（募集中）`} />
      <div className="flex flex-wrap items-center gap-3 px-8 py-4 border-b border-slate-200 bg-white">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={e => setQ(e.target.value)}
            placeholder="案件名・スキル・勤務地を検索"
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all" />
        </div>
        <select value={status} onChange={e => setStatus(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 outline-none">
          <option value="all">全ステータス</option>
          <option value="ACTIVE">募集中</option>
          <option value="CLOSED">終了</option>
        </select>
        <Btn variant="primary"><Download size={15} />案件を取込</Btn>
        <Btn variant="secondary"><Plus size={15} />案件登録</Btn>
      </div>
      <div className="p-8">
        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-indigo-100 text-left"
                style={{ background: "linear-gradient(to right,rgba(79,70,229,0.07),rgba(79,70,229,0.02))" }}>
                <th className="px-4 py-3 w-10"><input type="checkbox" /></th>
                {["案件名","状態","単価","勤務地","必須スキル","案件元"].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-indigo-50/50 transition"
                  style={{ borderColor: "#e2e8f0", backgroundColor: i % 2 === 1 ? "rgba(79,70,229,0.02)" : "white" }}>
                  <td className="px-4 py-3"><input type="checkbox" /></td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-indigo-700 hover:underline cursor-pointer line-clamp-1">{p.title}</div>
                  </td>
                  <td className="px-4 py-3"><Badge label={p.statusLabel} color={p.statusColor} /></td>
                  <td className="px-4 py-3 whitespace-nowrap font-bold text-indigo-600">{p.priceMin}〜{p.priceMax}万</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-slate-700">{p.location}</div>
                    <div className="text-xs text-slate-400">{p.remote}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.skills.slice(0, 3).map(s => (
                        <span key={s} className="px-1.5 py-0.5 text-xs rounded-md font-medium"
                          style={{ color: "#4f46e5", backgroundColor: "rgba(79,70,229,0.08)", border: "1px solid rgba(79,70,229,0.2)" }}>
                          {s}
                        </span>
                      ))}
                      {p.skills.length > 3 && <span className="text-xs text-slate-400">+{p.skills.length - 3}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold rounded-full border"
                      style={{ color: SRC_C[p.partner] ?? "#64748b", borderColor: `${SRC_C[p.partner] ?? "#64748b"}55`, backgroundColor: `${SRC_C[p.partner] ?? "#64748b"}12` }}>
                      {p.partner}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-5 text-sm">
          <span className="text-slate-400">1–{filtered.length} / {filtered.length} 件</span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 opacity-50"><ChevronLeft size={14} />前へ</button>
            <span className="text-slate-400 text-xs">1 / 1</span>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 opacity-50">次へ<ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 人材一覧 ──────────────────────────────────────────────
const AV_C: Record<string, string> = { AVAILABLE: "#16a34a", SOON: "#f59e0b", BUSY: "#94a3b8" };
const AV_L: Record<string, string> = { AVAILABLE: "稼働可能", SOON: "もうすぐ", BUSY: "稼働中" };
const ENGINEERS = [
  { name: "山田 健太", affil: "フリーランス", av: "AVAILABLE", price: 90, years: 8, skills: ["React","TypeScript","Node.js","AWS"], summary: "大手SIer出身のフロントエンドエンジニア。React/TypeScript歴5年。" },
  { name: "佐藤 美咲", affil: "株式会社テック", av: "SOON", price: 80, years: 6, skills: ["Java","Spring","Oracle","Docker"], summary: "金融系バックエンド専門。Java経験豊富で設計フェーズも対応可能。" },
  { name: "田中 翔", affil: "フリーランス", av: "AVAILABLE", price: 75, years: 5, skills: ["Python","AWS","Spark","Airflow"], summary: "データエンジニア。ETL設計・データ基盤構築を得意とする。" },
  { name: "鈴木 花子", affil: "合同会社クラウド", av: "BUSY", price: 70, years: 4, skills: ["Terraform","AWS","K8s","CI/CD"], summary: "インフラエンジニア。クラウド移行プロジェクトの実績多数。" },
  { name: "木村 大輔", affil: "フリーランス", av: "AVAILABLE", price: 65, years: 3, skills: ["Vue.js","TypeScript","Nuxt","REST"], summary: "フロントエンドエンジニア。EC・メディア系の開発経験あり。" },
  { name: "中村 さくら", affil: "株式会社デジタル", av: "SOON", price: 85, years: 7, skills: ["PM","要件定義","Agile","JIRA"], summary: "PMO経験あり。要件定義から設計・進捗管理まで一貫対応。" },
];

function EngineersPage() {
  return (
    <div>
      <PageHeader title="人材" description={`${ENGINEERS.length} 名`} />
      <div className="flex flex-wrap items-center gap-3 px-8 py-4 border-b border-slate-200 bg-white">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input placeholder="氏名・スキル・役割・所属を検索"
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all" />
        </div>
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 outline-none">
          <option>全稼働状況</option><option>稼働可能</option><option>もうすぐ</option><option>稼働中</option>
        </select>
        <Btn variant="primary"><Plus size={15} />人材登録</Btn>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ENGINEERS.map((e, i) => (
            <div key={i}
              className="rounded-xl border bg-white p-5 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-indigo-200"
              style={{ borderColor: "#e2e8f0", boxShadow: "0 1px 4px rgba(15,23,42,0.06)" }}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                    style={{ background: `linear-gradient(135deg, ${AV_C[e.av]}, ${AV_C[e.av]}99)` }}>
                    {e.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{e.name}</div>
                    <div className="text-xs text-slate-400">{e.affil}</div>
                  </div>
                </div>
                <Badge label={AV_L[e.av]} color={AV_C[e.av]} />
              </div>
              <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">{e.summary}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {e.skills.map(s => (
                  <span key={s} className="px-1.5 py-0.5 text-xs rounded-md font-medium"
                    style={{ color: "#4f46e5", backgroundColor: "rgba(79,70,229,0.08)", border: "1px solid rgba(79,70,229,0.2)" }}>
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="text-xs text-slate-500">
                  単価 <span className="font-bold text-indigo-600">{e.price}万</span>
                  <span className="mx-2 text-slate-300">|</span>
                  経験 <span className="font-semibold text-slate-700">{e.years}年</span>
                </div>
                <Btn variant="primary" size="sm"><Wand2 size={12} />案件を探す</Btn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 設定ページ ────────────────────────────────────────────
function SettingsPage() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <PageHeader title="設定" description="外部連携・通知・テンプレート設定" />
      <div className="p-8 space-y-5 max-w-2xl">
        {[
          { title: "Gmail 連携", fields: [{ label: "Gmail アドレス", ph: "example@gmail.com" }, { label: "取込キーワード", ph: "案件,SES,募集" }] },
          { title: "LINE 通知", fields: [{ label: "LINE Notify トークン", ph: "••••••••••••••••••••", mono: true }] },
        ].map((s, si) => (
          <div key={si} className="rounded-xl border border-slate-200 p-6 space-y-4 bg-white shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center">
                <Zap size={11} className="text-white" />
              </div>
              <h2 className="text-sm font-bold text-slate-800">{s.title}</h2>
            </div>
            {s.fields.map((f, fi) => (
              <div key={fi}>
                <label className="text-xs font-semibold text-slate-500 block mb-1">{f.label}</label>
                <input className={`w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all ${f.mono ? "font-mono" : ""}`}
                  placeholder={f.ph} />
              </div>
            ))}
            <div className="flex gap-2 pt-1">
              <Btn variant="primary" onClick={() => setSaved(true)}>保存</Btn>
              <Btn variant="secondary">接続テスト</Btn>
              <Btn variant="danger-outline">接続を解除</Btn>
            </div>
            {si === 0 && saved && <p className="text-xs text-emerald-600 font-medium">✓ 保存しました</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");

  const pages: Record<string, React.ReactNode> = {
    dashboard: <DashboardPage />,
    projects: <ProjectsPage />,
    engineers: <EngineersPage />,
    settings: <SettingsPage />,
    proposals: <div><PageHeader title="提案" /><div className="p-8 text-sm text-slate-400">提案一覧（省略）</div></div>,
    assignments: <div><PageHeader title="参画" /><div className="p-8 text-sm text-slate-400">参画一覧（省略）</div></div>,
    invoices: <div><PageHeader title="請求" /><div className="p-8 text-sm text-slate-400">請求一覧（省略）</div></div>,
    admin: <div><PageHeader title="運営管理" /><div className="p-8 text-sm text-slate-400">管理者ページ（省略）</div></div>,
  };

  return (
    <div className="min-h-screen flex bg-slate-50"
      style={{ fontFamily: 'ui-sans-serif,system-ui,"Hiragino Kaku Gothic ProN","Noto Sans JP",sans-serif' }}>
      <Sidebar page={page} setPage={setPage} />
      <main className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <div className="flex-1 overflow-auto">
          {pages[page] ?? pages["dashboard"]}
        </div>
      </main>
    </div>
  );
}
