import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Power, Wallet, Bike, Star } from "lucide-react";

export const Route = createFileRoute("/delivery/dashboard")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== "DELIVERY" && user.role !== "ADMIN") throw redirect({ to: "/home" });
  },
  component: DeliveryDashboard,
});

function DeliveryDashboard() {
  const { user } = useAuthStore();
  const [online, setOnline] = useState(true);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-warning p-8 text-primary-foreground shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm/6 opacity-80">Hey, {user?.name}</p>
            <h1 className="text-3xl font-bold tracking-tight">You're {online ? "online" : "offline"}.</h1>
            <p className="mt-1 text-sm opacity-80">
              {online ? "Keep going — peak hour starts in 22 minutes." : "Go online to start earning."}
            </p>
          </div>
          <button
            onClick={() => setOnline(!online)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
              online ? "bg-card text-foreground" : "bg-foreground text-background"
            }`}
          >
            <Power className="h-4 w-4" />
            {online ? "Go offline" : "Go online"}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Wallet, label: "Today's earnings", value: "₹1,240" },
          { icon: Bike, label: "Trips completed", value: "12" },
          { icon: Star, label: "Rider rating", value: "4.9" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-card p-5 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-2xl font-bold tracking-tight">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-card p-6 shadow-soft">
        <h3 className="font-bold tracking-tight">Smart batching tip 🧠</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You can pick up 2 orders from <span className="font-semibold text-foreground">Crust Republic</span> heading to the same area. Estimated extra payout: <span className="font-semibold text-success">+₹40</span>.
        </p>
        <Link to="/delivery/active" className="mt-4 inline-block rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow">
          See active orders
        </Link>
      </div>
    </div>
  );
}
