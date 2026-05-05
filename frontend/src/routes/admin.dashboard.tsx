import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/store/authStore";
import { Users, Store, Bike, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== "ADMIN") throw redirect({ to: "/home" });
  },
  component: AdminDashboard,
});

const stats = [
  { icon: Users, label: "Customers", value: "12,480", delta: "+2.4%" },
  { icon: Store, label: "Restaurants", value: "327", delta: "+12" },
  { icon: Bike, label: "Active riders", value: "184", delta: "+8" },
  { icon: IndianRupee, label: "GMV (24h)", value: "₹4.2L", delta: "+18%" },
];

const topRestaurants = [
  { name: "Saffron & Smoke", orders: 142, revenue: 58400 },
  { name: "Crust Republic", orders: 128, revenue: 51200 },
  { name: "Tokyo Bowl", orders: 96, revenue: 67200 },
  { name: "Burger Atelier", orders: 88, revenue: 31200 },
];

function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin overview</h1>
      <p className="mt-1 text-sm text-muted-foreground">Platform health at a glance.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-card p-5 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-2xl font-bold tracking-tight">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-xs font-semibold text-success">{s.delta} this week</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-card p-6 shadow-soft">
          <h3 className="font-bold tracking-tight">Top restaurants</h3>
          <div className="mt-4 divide-y divide-border">
            {topRestaurants.map((r, i) => (
              <div key={r.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-sm font-semibold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.orders} orders</p>
                  </div>
                </div>
                <p className="font-semibold">₹{r.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-soft">
          <h3 className="font-bold tracking-tight">Live ops feed</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { c: "primary", t: "187 orders in progress across the city" },
              { c: "success", t: "Smart batching saved ₹4,820 for riders today" },
              { c: "warning", t: "Surge pricing active in Indiranagar (peak hour)" },
              { c: "primary", t: "AI ETA accuracy this week: 94%" },
            ].map((x, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-${x.c}`} />
                <span>{x.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
