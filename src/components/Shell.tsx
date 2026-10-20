"use client";

// Dashboard shell: sidebar + topbar around every authed page.
// Role/email come from cookies; the gateway enforces the real RBAC.

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navFor, Role, can } from "@/lib/permissions";
import { emailFromCookie, roleFromCookie } from "@/lib/api";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const r = (roleFromCookie() || "admin") as Role;
    setRole(r);
    setEmail(emailFromCookie());
  }, [pathname]);

  const items = navFor(role);

  const logout = async () => {
    await fetch("/admin-api/admin/logout", { method: "POST" });
    router.replace("/login");
  };

  return (
    <div className="min-h-screen lg:flex">
      {/* Sidebar */}
      <aside
        className={`${navOpen ? "block" : "hidden"} lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-screen w-full lg:w-60 shrink-0 bg-slate-900 text-slate-300`}
      >
        <div className="px-5 py-4 border-b border-slate-800">
          <div className="text-white font-semibold">HelpNest Admin</div>
          <div className="text-xs text-slate-500 mt-0.5">operations console</div>
        </div>
        <nav className="p-3 space-y-0.5 flex-1 overflow-y-auto">
          {items.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  active
                    ? "bg-brand-600/20 text-white font-medium"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="w-5 text-center text-slate-500">{item.icon}</span>
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800 text-xs">
          <div className="font-medium text-slate-200 truncate">{email || "admin"}</div>
          <div className="text-slate-500 capitalize">{role} · 12h session</div>
          <button
            onClick={logout}
            className="mt-2 w-full rounded-lg border border-slate-700 py-1.5 hover:bg-slate-800 hover:text-white transition"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between bg-slate-900 text-white px-4 py-3">
          <span className="font-semibold">HelpNest Admin</span>
          <button onClick={() => setNavOpen(!navOpen)} className="text-sm border border-slate-700 rounded-lg px-3 py-1">
            {navOpen ? "Close" : "Menu"}
          </button>
        </header>
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
