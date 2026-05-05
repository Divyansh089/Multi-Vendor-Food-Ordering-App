import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/authStore";
import { ArrowRight, Flame, MapPin, Sparkles, Truck, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cravely — Crave it. Get it." },
      { name: "description", content: "Multi-vendor food ordering with AI-powered ETA, smart batching, and real-time tracking." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const goApp = () => {
    if (!user) return navigate({ to: "/login" });
    if (user.role === "VENDOR") return navigate({ to: "/vendor/dashboard" });
    if (user.role === "DELIVERY") return navigate({ to: "/delivery/dashboard" });
    if (user.role === "ADMIN") return navigate({ to: "/admin/dashboard" });
    navigate({ to: "/home" });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-warning/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              AI-powered ETA · Smart batching · Real-time tracking
            </span>
            <h1 className="mt-6 max-w-3xl text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Crave it.{" "}
              <span className="bg-gradient-to-r from-primary to-warning bg-clip-text text-transparent">
                Get it.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-balance text-lg text-muted-foreground">
              Cravely connects you to the best kitchens in town — order in seconds,
              track your food as it moves, pay less with smart batched delivery.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={goApp}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-105"
              >
                Start ordering <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/register"
                className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:bg-secondary"
              >
                Become a partner
              </Link>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> Delivering across Bengaluru · Live in 6 cities
            </div>
          </div>

          {/* Hero showcase */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-3">
            {[
              { src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop", t: "Saffron & Smoke", s: "₹₹ · 25 min" },
              { src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop", t: "Crust Republic", s: "₹₹ · 22 min" },
              { src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop", t: "Tokyo Bowl", s: "₹₹₹ · 30 min" },
            ].map((c, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl bg-card shadow-card"
                style={{ transform: `rotate(${i === 1 ? 0 : i === 0 ? -1.5 : 1.5}deg)` }}
              >
                <img src={c.src} alt={c.t} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left">
                  <p className="text-sm font-semibold text-white">{c.t}</p>
                  <p className="text-xs text-white/80">{c.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why Cravely</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">Smarter than your average food app.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Sparkles, t: "AI ETA prediction", d: "Models traffic, kitchen load, and rider patterns to give you ETAs that are actually right." },
              { icon: Truck, t: "Smart delivery batching", d: "Nearby orders bundled to cut delivery cost up to 35% — without slowing you down." },
              { icon: Zap, t: "Dynamic pricing", d: "Transparent surge during peak windows. Customers see what they pay and why." },
            ].map((f) => (
              <div key={f.t} className="group rounded-3xl bg-card p-7 shadow-soft transition hover:shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">One platform</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">Built for everyone in the loop.</h2>
          </div>
          <Link to="/register" className="text-sm font-semibold text-primary hover:underline">
            Create an account →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Customers", d: "Discover, order, and track in real time.", to: "/login", emoji: "🍜" },
            { t: "Restaurants", d: "Manage menu, orders, analytics in one place.", to: "/login", emoji: "👩‍🍳" },
            { t: "Delivery partners", d: "Go online, accept batched orders, earn more.", to: "/login", emoji: "🛵" },
          ].map((r) => (
            <Link
              key={r.t}
              to={r.to}
              className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <div>
                <div className="text-4xl">{r.emoji}</div>
                <h3 className="mt-4 text-xl font-semibold">{r.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.d}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Get started <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Flame className="h-4 w-4 text-primary" />
            <span>© {new Date().getFullYear()} Cravely. Made with hunger.</span>
          </div>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
