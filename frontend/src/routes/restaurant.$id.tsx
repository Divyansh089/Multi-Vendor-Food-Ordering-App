import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import MenuItem from "@/components/MenuItem";
import Map from "@/components/Map";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { Star, Clock, MapPin, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export const Route = createFileRoute("/restaurant/$id")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (!user) throw redirect({ to: "/login" });
  },
  component: RestaurantDetails,
  notFoundComponent: () => <div className="p-10 text-center">Restaurant not found.</div>,
});

function RestaurantDetails() {
  const { id } = Route.useParams();
  
  const { data: r, isLoading: isR } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const res = await api.get(`/restaurants/${id}`);
      return res.data;
    },
  });

  const { data: menu = [], isLoading: isM } = useQuery({
    queryKey: ["menu", id],
    queryFn: async () => {
      const res = await api.get(`/restaurants/${id}/menu`);
      return res.data;
    },
    enabled: !!r,
  });

  const count = useCartStore((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const total = useCartStore((s) => s.getTotal());

  if (isR) return <div className="p-10 text-center animate-pulse">Loading kitchen details...</div>;
  if (!r) return <div className="p-10 text-center text-muted-foreground">Restaurant not found.</div>;

  return (
    <div>
      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        <img src={r.image} alt={r.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="mx-auto -mt-24 max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-card p-7 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{r.name}</h1>
              <p className="mt-1 text-muted-foreground">{r.cuisine}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-1 font-semibold text-success">
                  <Star className="h-3.5 w-3.5 fill-current" /> {r.rating}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {r.eta}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> 1.4 km away · {r.priceLevel}
                </span>
              </div>
            </div>
            {r.surge > 1 && (
              <span className="rounded-full bg-warning/15 px-3 py-1.5 text-xs font-semibold">
                ⚡ Dynamic pricing ×{r.surge.toFixed(2)} (peak hour)
              </span>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <section>
            {/* Location Map */}
            <div className="mb-8 rounded-2xl overflow-hidden h-48 shadow-soft">
              <Map
                origin={{
                  lat: 28.6139,
                  lng: 77.209,
                  name: "Your Location",
                }}
                destination={{
                  lat: 28.5921,
                  lng: 77.2341,
                  name: r.name,
                }}
                estimatedTime={r.eta ? parseInt(r.eta) : 20}
              />
            </div>
            
            <h2 className="mb-4 text-xl font-bold tracking-tight">Menu</h2>
            <div className="space-y-3">
              {isM ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 animate-pulse rounded-xl bg-card" />
                ))
              ) : menu.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">No items available in the menu yet.</p>
              ) : (
                menu.map((m: any) => (
                  <MenuItem key={m.id} item={m} restaurant={r} />
                ))
              )}
            </div>
          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-20 rounded-2xl bg-card p-5 shadow-soft">
              <h3 className="font-semibold">Your order</h3>
              {count === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  Pick something delicious from the menu.
                </p>
              ) : (
                <>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {count} item{count > 1 ? "s" : ""} · ₹{total}
                  </p>
                  <Link
                    to="/cart"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-105"
                  >
                    <ShoppingBag className="h-4 w-4" /> Review cart
                  </Link>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky mobile cart bar */}
      {count > 0 && (
        <div className="sticky bottom-4 z-30 mx-auto mt-10 flex max-w-md items-center justify-between rounded-full bg-foreground px-5 py-3 text-background shadow-card lg:hidden">
          <span className="text-sm font-semibold">{count} items · ₹{total}</span>
          <Link to="/cart" className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
            View cart
          </Link>
        </div>
      )}
      <div className="h-10" />
    </div>
  );
}
