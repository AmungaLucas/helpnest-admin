"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button, Field, inputCls } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/admin-api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        router.replace("/");
        router.refresh();
      } else {
        setError(data.message || "Login failed.");
      }
    } catch {
      setError("Could not reach the gateway. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-brand-600 items-center justify-center text-white text-xl font-bold">
            H
          </div>
          <h1 className="mt-3 text-xl font-semibold text-slate-900">HelpNest Admin</h1>
          <p className="text-sm text-slate-500">Operations console for jobready.co.ke</p>
        </div>

        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          {error && <Alert kind="error">{error}</Alert>}

          <Field label="Email">
            <input
              className={inputCls}
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@jobready.co.ke"
              required
            />
          </Field>

          <Field label="Password">
            <input
              className={inputCls}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </Field>

          <Button type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>

          <p className="mt-3 text-xs text-slate-400">
            Sessions last 12 hours. Every sign-in is recorded in the audit trail.
          </p>
        </form>
      </div>
    </div>
  );
}
