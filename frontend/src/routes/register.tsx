import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState<{ name: string; email: string; password: string; role: string; [k: string]: string }>({ name: "", email: "", password: "", role: "CUSTOMER" });
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      const { user } = useAuthStore.getState();
      const dest =
        user?.role === "VENDOR" ? "/vendor/dashboard" :
        user?.role === "DELIVERY" ? "/delivery/dashboard" :
        user?.role === "ADMIN" ? "/admin/dashboard" : "/home";
      navigate({ to: dest });
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-12 sm:px-6">
      <div className="w-full rounded-3xl bg-card p-8 shadow-card">
        <h2 className="text-2xl font-bold tracking-tight">Create your Cravely account</h2>
        <p className="mt-1 text-sm text-muted-foreground">Join thousands ordering smarter every day.</p>

        {error && (
          <div className="mt-4 rounded-xl bg-destructive/10 p-3 text-xs font-medium text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4">
          {[
            { k: "name", label: "Full name", type: "text", placeholder: "Aanya Rao" },
            { k: "email", label: "Email", type: "email", placeholder: "you@cravely.app" },
            { k: "password", label: "Password", type: "password", placeholder: "••••••••" },
          ].map((f) => (
            <div key={f.k}>
              <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
              <input
                required
                type={f.type}
                value={form[f.k]}
                onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                placeholder={f.placeholder}
                className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          ))}
          <div>
            <label className="text-xs font-medium text-muted-foreground">I'm signing up as</label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {[
                { k: "CUSTOMER", l: "Customer" },
                { k: "VENDOR", l: "Restaurant" },
                { k: "DELIVERY", l: "Delivery" },
              ].map((r) => (
                <button
                  key={r.k}
                  type="button"
                  onClick={() => setForm({ ...form, role: r.k })}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                    form.role === r.k
                      ? "border-primary bg-primary-soft"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  {r.l}
                </button>
              ))}
            </div>
          </div>
          <button className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-105">
            Create account
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
