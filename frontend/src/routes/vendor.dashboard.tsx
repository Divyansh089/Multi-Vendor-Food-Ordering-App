import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/store/authStore";
import { vendorOrders } from "@/lib/mockData";
import { TrendingUp, Clock, IndianRupee, Star, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/vendor/dashboard")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== "VENDOR" && user.role !== "ADMIN") throw redirect({ to: "/home" });
  },
  component: VendorDashboard,
});

const stats = [
  { label: "Today's revenue", value: "₹18,420", delta: "+12%", icon: IndianRupee },
  { label: "Orders", value: "47", delta: "+8", icon: TrendingUp },
  { label: "Avg prep time", value: "14 min", delta: "-2m", icon: Clock },
  { label: "Rating", value: "4.7", delta: "+0.1", icon: Star },
];

function VendorDashboard() {
  const { user } = useAuthStore();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
          <h1 className="text-3xl font-bold tracking-tight">Saffron & Smoke · Overview</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/vendor/menu" className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-secondary">
            Edit menu
          </Link>
          <Link to="/vendor/orders" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow">
            View orders
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                <ArrowUpRight className="h-3 w-3" /> {s.delta}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold tracking-tight">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-card p-6 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold tracking-tight">Revenue · last 7 days</h3>
            <span className="text-xs text-muted-foreground">Auto-updated</span>
          </div>
          <div className="flex items-end gap-3 h-48">
            {[55, 70, 45, 80, 65, 90, 100].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-lg bg-primary/80 transition hover:bg-primary" style={{ height: `${h}%` }} />
                <span className="text-xs text-muted-foreground">{["M","T","W","T","F","S","S"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-soft">
          <h3 className="font-bold tracking-tight">Incoming orders</h3>
          <div className="mt-4 space-y-3">
            {vendorOrders.slice(0, 3).map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-xl bg-surface p-3">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{o.id}</p>
                  <p className="text-sm font-semibold">{o.customer}</p>
                </div>
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
                  ₹{o.total}
                </span>
              </div>
            ))}
          </div>
          <Link to="/vendor/orders" className="mt-4 block text-center text-sm font-semibold text-primary hover:underline">
            See all →
          </Link>
        </div>
      </div>
    </div>
  );
}
