export type Role = "admin" | "support" | "finance";

// Mirrors the gateway's requireAdmin() allow-lists — this only drives the
// UI (hiding buttons/menus); the API enforces the real boundaries.
export const can = {
  planEdit: (r: Role) => r === "admin" || r === "finance",
  payOptionsEdit: (r: Role) => r === "admin" || r === "finance",
  userActions: (r: Role) => r === "admin" || r === "support",
  kycReview: (r: Role) => r === "admin" || r === "support",
  jobActions: (r: Role) => r === "admin" || r === "support",
  reverse: (r: Role) => r === "admin" || r === "finance",
  adminsManage: (r: Role) => r === "admin"
};

export const NAV: {
  href: string;
  label: string;
  roles: Role[];
  icon: string;
}[] = [
  { href: "/", label: "Overview", roles: ["admin", "support", "finance"], icon: "◧" },
  { href: "/users", label: "Users", roles: ["admin", "support", "finance"], icon: "◉" },
  { href: "/plans", label: "Plans & Pricing", roles: ["admin", "support", "finance"], icon: "KSh" },
  { href: "/transactions", label: "Transactions", roles: ["admin", "support", "finance"], icon: "⇄" },
  { href: "/kyc", label: "KYC Review", roles: ["admin", "support"], icon: "☑" },
  { href: "/jobs", label: "Jobs", roles: ["admin", "support", "finance"], icon: "▤" },
  { href: "/metrics", label: "Metrics", roles: ["admin", "support", "finance"], icon: "▲" },
  { href: "/audit", label: "Audit Trail", roles: ["admin", "support", "finance"], icon: "≡" },
  { href: "/admins", label: "Dashboard Team", roles: ["admin"], icon: "⛨" }
];

export function navFor(role: Role) {
  return NAV.filter((item) => item.roles.includes(role));
}
