import { createFileRoute, redirect } from "@tanstack/react-router";
import OrderCard from "@/components/OrderCard";
import { sampleOrders } from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { CheckCircle2, Truck, ChefHat } from "lucide-react";

export const Route = createFileRoute("/orders")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (!user) throw redirect({ to: "/login" });
  },
  component: Orders,
});

function Orders() {
  const active = sampleOrders.find((o) => o.status === "ON_THE_WAY");
  const others = sampleOrders.filter((o) => o.id !== active?.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Your orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">Track your live order and review past ones.</p>

      {active && (
        <div className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-soft via-card to-card p-7 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Live order</p>
              <h2 className="mt-1 text-2xl font-bold">{active.restaurant}</h2>
              <p className="text-sm text-muted-foreground">Order {active.id} · {active.items} items · ₹{active.total}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Arriving in</p>
              <p className="text-3xl font-bold text-primary">{active.eta}</p>
            </div>
          </div>

          {/* Tracker */}
          <div className="mt-7">
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: ChefHat, label: "Preparing", done: true },
                { icon: Truck, label: "On the way", done: true, current: true },
                { icon: CheckCircle2, label: "Delivered", done: false },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${
                      s.done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    } ${s.current ? "shadow-glow" : ""}`}
                  >
                    <s.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-xs font-medium">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-2/3 rounded-full bg-primary" />
            </div>
          </div>
        </div>
      )}

      <h3 className="mt-10 text-lg font-bold tracking-tight">Recent</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {others.map((o) => (
          <OrderCard key={o.id} order={o} />
        ))}
      </div>
    </div>
  );
}
