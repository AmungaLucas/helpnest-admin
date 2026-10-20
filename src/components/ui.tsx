"use client";

import React from "react";

// Minimal hand-rolled UI kit — zero extra dependencies, everything the
// dashboard pages need. Tailwind-only, professional light theme.

export function Card({
  title,
  right,
  children,
  className = ""
}: {
  title?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`bg-white border border-slate-200 rounded-xl shadow-sm ${className}`}>
      {(title || right) && (
        <header className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
          {right}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function Stat({
  label,
  value,
  sub,
  tone = "default"
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  tone?: "default" | "good" | "warn" | "bad";
}) {
  const tones: Record<string, string> = {
    default: "text-slate-900",
    good: "text-emerald-600",
    warn: "text-amber-600",
    bad: "text-rose-600"
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${tones[tone]}`}>{value}</div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

const BADGE_TONES: Record<string, string> = {
  slate: "bg-slate-100 text-slate-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-rose-100 text-rose-700",
  blue: "bg-sky-100 text-sky-700",
  violet: "bg-violet-100 text-violet-700"
};

export function Badge({
  children,
  tone = "slate"
}: {
  children: React.ReactNode;
  tone?: keyof typeof BADGE_TONES;
}) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${BADGE_TONES[tone]}`}>
      {children}
    </span>
  );
}

export function statusTone(status: string | null | undefined): keyof typeof BADGE_TONES {
  switch (status) {
    case "verified":
    case "success":
    case "active":
    case "approved":
    case "open":
    case "hired":
      return "green";
    case "pending":
    case "viewed":
    case "shortlisted":
    case "restricted":
      return "amber";
    case "failed":
    case "suspended":
    case "rejected":
    case "timeout":
      return "red";
    case "closed":
    case "withdrawn":
      return "slate";
    default:
      return "slate";
  }
}

export function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  small,
  type = "button"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger" | "subtle";
  disabled?: boolean;
  small?: boolean;
  type?: "button" | "submit";
}) {
  const base = small ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm";
  const variants: Record<string, string> = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 disabled:bg-slate-300",
    subtle: "bg-brand-50 text-brand-700 hover:bg-brand-100 disabled:text-slate-400",
    ghost: "border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:text-slate-300",
    danger: "bg-rose-600 text-white hover:bg-rose-700 disabled:bg-rose-300"
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg font-medium transition ${base} ${variants[variant]} disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

export function Modal({
  open,
  title,
  onClose,
  children,
  wide
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className={`relative bg-white rounded-xl shadow-xl w-full ${wide ? "max-w-2xl" : "max-w-md"} max-h-[90vh] overflow-y-auto`}>
        <header className="flex items-center justify-between px-4 py-3 border-b border-slate-100 sticky top-0 bg-white rounded-t-xl">
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg leading-none">×</button>
        </header>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
  hint
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block mb-3">
      <span className="block text-xs font-medium text-slate-600 mb-1">{label}</span>
      {children}
      {hint && <span className="block mt-1 text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 disabled:bg-slate-50";

export function Alert({ kind, children }: { kind: "error" | "ok" | "info"; children: React.ReactNode }) {
  const map = {
    error: "bg-rose-50 text-rose-700 border-rose-200",
    ok: "bg-emerald-50 text-emerald-700 border-emerald-200",
    info: "bg-sky-50 text-sky-700 border-sky-200"
  };
  return <div className={`rounded-lg border px-3 py-2 text-sm mb-3 ${map[kind]}`}>{children}</div>;
}

export function Th({ children, right }: { children?: React.ReactNode; right?: boolean }) {
  return (
    <th className={`px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide ${right ? "text-right" : "text-left"}`}>
      {children}
    </th>
  );
}

export function Td({
  children,
  right,
  mono,
  className = ""
}: {
  children?: React.ReactNode;
  right?: boolean;
  mono?: boolean;
  className?: string;
}) {
  return (
    <td className={`px-3 py-2.5 text-sm text-slate-700 align-middle ${right ? "text-right" : ""} ${mono ? "font-mono text-xs" : ""} ${className}`}>
      {children}
    </td>
  );
}

export function Pagination({
  page,
  pageSize,
  total,
  onPage
}: {
  page: number;
  pageSize: number;
  total: number;
  onPage: (p: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex items-center justify-between pt-3">
      <span className="text-xs text-slate-500">
        {total.toLocaleString()} record{total === 1 ? "" : "s"} · page {page} of {pages}
      </span>
      <div className="flex gap-2">
        <Button small variant="ghost" disabled={page <= 1} onClick={() => onPage(page - 1)}>← Prev</Button>
        <Button small variant="ghost" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next →</Button>
      </div>
    </div>
  );
}

export function Bars({
  data,
  valueKey,
  labelKey,
  fmt
}: {
  data: any[];
  valueKey: string;
  labelKey: string;
  fmt?: (v: any) => string;
}) {
  const max = Math.max(1, ...data.map((d) => Number(d[valueKey]) || 0));
  if (!data.length) return <p className="text-sm text-slate-400 py-4 text-center">No data in this window.</p>;
  return (
    <div className="flex items-end gap-1 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
          <div className="absolute -top-6 hidden group-hover:block bg-slate-800 text-white text-[10px] rounded px-1.5 py-0.5 whitespace-nowrap z-10">
            {d[labelKey]}: {fmt ? fmt(d[valueKey]) : String(d[valueKey])}
          </div>
          <div
            className="w-full rounded-t bg-brand-500/80 group-hover:bg-brand-600 transition-colors"
            style={{ height: `${Math.max(3, ((Number(d[valueKey]) || 0) / max) * 100)}%` }}
          />
          <span className="text-[9px] text-slate-400 mt-1 truncate w-full text-center">
            {String(d[labelKey]).slice(5)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-slate-400 text-center py-8">{children}</p>;
}

export function Spinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-10 text-sm text-slate-400 gap-2">
      <span className="inline-block w-4 h-4 border-2 border-slate-300 border-t-brand-600 rounded-full animate-spin" />
      {label}
    </div>
  );
}
