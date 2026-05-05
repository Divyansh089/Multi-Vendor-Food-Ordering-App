import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { vendorOrders } from "@/lib/mockData";
import OrderCard from "@/components/OrderCard";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/vendor/orders")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== "VENDOR" && user.role !== "ADMIN") throw redirect({ to: "/home" });
  },
  component: VendorOrders,
});

function VendorOrders() {
  const [orders, setOrders] = useState(vendorOrders);
  const update = (id: string, status: string) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  const tabs = ["NEW", "PREPARING", "READY"] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]>("NEW");
  const filtered = orders.filter((o) => o.status === tab);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Live orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">Accept or reject incoming orders in real time.</p>

      <div className="mt-6 inline-flex rounded-full bg-card p-1 shadow-soft">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "NEW" ? "New" : t === "PREPARING" ? "Preparing" : "Ready"}
            <span className="ml-2 rounded-full bg-background/20 px-2 text-xs">
              {orders.filter((o) => o.status === t).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {filtered.map((o) => (
          <OrderCard
            key={o.id}
            order={o}
            actions={
              tab === "NEW" ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => update(o.id, "CANCELLED")}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" /> Reject
                  </button>
                  <button
                    onClick={() => update(o.id, "PREPARING")}
                    className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-glow"
                  >
                    <Check className="h-4 w-4" /> Accept
                  </button>
                </div>
              ) : tab === "PREPARING" ? (
                <button
                  onClick={() => update(o.id, "READY")}
                  className="rounded-full bg-foreground px-3 py-1.5 text-sm font-semibold text-background"
                >
                  Mark ready
                </button>
              ) : (
                <span className="text-sm font-semibold text-success">Awaiting pickup</span>
              )
            }
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl bg-card py-16 text-center text-sm text-muted-foreground shadow-soft">
            Nothing here right now. New orders will pop up live.
          </div>
        )}
      </div>
    </div>
  );
}
