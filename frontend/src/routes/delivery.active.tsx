import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { deliveryOrders } from "@/lib/mockData";
import Map from "@/components/Map";
import { Phone } from "lucide-react";

export const Route = createFileRoute("/delivery/active")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== "DELIVERY" && user.role !== "ADMIN") throw redirect({ to: "/home" });
  },
  component: ActiveOrders,
});

const STAGES = ["Accepted", "Picked up", "On the way", "Delivered"];

function ActiveOrders() {
  const [stage, setStage] = useState(2);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Active orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">Orders ready to pick up near you.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Active order */}
        <div className="rounded-2xl bg-card p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-xs text-muted-foreground">{deliveryOrders[0].id}</p>
              <h2 className="mt-1 text-xl font-bold">{deliveryOrders[0].restaurant}</h2>
              <p className="text-sm text-muted-foreground">→ {deliveryOrders[0].customer}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Payout</p>
              <p className="text-2xl font-bold text-primary">₹{deliveryOrders[0].payout}</p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="relative mt-5 h-48 overflow-hidden rounded-2xl bg-surface">
            <Map
              origin={{
                lat: 28.6139,
                lng: 77.209,
                name: deliveryOrders[0].restaurant,
              }}
              destination={{
                lat: 28.5921,
                lng: 77.2341,
                name: deliveryOrders[0].customer,
              }}
              currentPosition={{
                lat: 28.603,
                lng: 77.2215,
                name: "Your Location",
              }}
              estimatedTime={15}
            />
          </div>

          {/* Stage tracker */}
          <div className="mt-6">
            <div className="flex items-center gap-2">
              {STAGES.map((s, i) => (
                <div key={s} className="flex flex-1 items-center">
                  <div className={`h-2 flex-1 rounded-full ${i <= stage ? "bg-primary" : "bg-secondary"}`} />
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between text-xs">
              {STAGES.map((s, i) => (
                <span key={s} className={i <= stage ? "font-semibold text-foreground" : "text-muted-foreground"}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button className="flex-1 rounded-full border border-border py-3 text-sm font-semibold hover:bg-secondary">
              <Phone className="mr-2 inline h-4 w-4" /> Call customer
            </button>
            <button
              onClick={() => setStage((s) => Math.min(s + 1, STAGES.length - 1))}
              className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              {stage < STAGES.length - 1 ? `Mark "${STAGES[stage + 1]}"` : "Completed"}
            </button>
          </div>
        </div>

        {/* Suggested batch */}
        <aside>
          <div className="rounded-2xl bg-card p-5 shadow-soft">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Batch with</h3>
            <p className="mt-1 text-sm text-muted-foreground">Same area · +₹65 extra</p>
            <div className="mt-4 space-y-3">
              {deliveryOrders.slice(1).map((o) => (
                <div key={o.id} className="rounded-xl bg-surface p-3">
                  <p className="text-xs text-muted-foreground">{o.id}</p>
                  <p className="text-sm font-semibold">{o.restaurant}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{o.address}</p>
                  <button className="mt-3 w-full rounded-full bg-foreground py-1.5 text-xs font-semibold text-background">
                    Add to batch
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
