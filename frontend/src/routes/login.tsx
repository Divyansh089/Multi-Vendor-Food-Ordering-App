import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Flame } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: Login,
});

const ROLES = [
  { key: "CUSTOMER", label: "Customer", desc: "Browse & order", emoji: "🍜" },
  { key: "VENDOR", label: "Restaurant", desc: "Manage your kitchen", emoji: "👩‍🍳" },
  { key: "DELIVERY", label: "Delivery", desc: "Earn on the go", emoji: "🛵" },
  { key: "ADMIN", label: "Admin", desc: "Platform controls", emoji: "🛡️" },
];

function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [role, setRole] = useState("CUSTOMER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      const { user } = useAuthStore.getState();
      const dest =
        user?.role === "VENDOR" ? "/vendor/dashboard" :
        user?.role === "DELIVERY" ? "/delivery/dashboard" :
        user?.role === "ADMIN" ? "/admin/dashboard" : "/home";
      navigate({ to: dest });
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center">
      <div className="hidden lg:block">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
          <Flame className="h-3.5 w-3.5" /> Cravely
        </div>
        <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight">
          Welcome back.<br />Hungry already?
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Sign in to track orders, save favorites, and unlock loyalty perks across hundreds of kitchens.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-3">
          {[
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
            "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
          ].map((s, i) => (
            <img key={i} src={s} alt="" className="aspect-square w-full rounded-2xl object-cover shadow-soft" />
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-card p-7 shadow-card sm:p-10">
        <h2 className="text-2xl font-bold tracking-tight">Sign in to Cravely</h2>
        <p className="mt-1 text-sm text-muted-foreground">Pick your role to continue.</p>

        {error && (
          <div className="mt-4 rounded-xl bg-destructive/10 p-3 text-xs font-medium text-destructive">
            {error}
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-2">
          {ROLES.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRole(r.key)}
              className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                role === r.key
                  ? "border-primary bg-primary-soft"
                  : "border-border bg-card hover:bg-secondary"
              }`}
            >
              <span className="text-2xl">{r.emoji}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{r.label}</p>
                <p className="truncate text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@cravely.app"
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-105"
          >
            Continue as {ROLES.find((r) => r.key === role)?.label}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          New to Cravely?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
