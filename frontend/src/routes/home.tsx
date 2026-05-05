import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import { useAuthStore } from "@/store/authStore";
import { Search, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export const Route = createFileRoute("/home")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (!user) throw redirect({ to: "/login" });
  },
  component: Home,
});

const CUISINES = ["All", "Indian", "Italian", "Japanese", "Healthy", "American", "South Indian"];

function Home() {
  const [q, setQ] = useState("");
  const [cuisine, setCuisine] = useState("All");

  const { data: restaurants = [], isLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const res = await api.get("/restaurants");
      return res.data;
    },
  });

  const filtered = useMemo(() => {
    return restaurants.filter((r: any) => {
      const matchQ = r.name.toLowerCase().includes(q.toLowerCase()) || (r.cuisine?.toLowerCase() || "").includes(q.toLowerCase());
      const matchC = cuisine === "All" || (r.cuisine?.toLowerCase() || "").includes(cuisine.toLowerCase());
      return matchQ && matchC;
    });
  }, [q, cuisine, restaurants]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Hero search */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-soft via-card to-card p-8 shadow-soft sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-semibold text-primary shadow-soft">
            <Sparkles className="h-3 w-3" /> AI picks for you
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            What are you craving today?
          </h1>
          <p className="mt-2 text-muted-foreground">
            From smoky tandoors to fresh bowls — order from hundreds of kitchens nearby.
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-full bg-card p-1.5 shadow-card">
            <Search className="ml-3 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dishes, restaurants…"
              className="flex-1 bg-transparent px-2 py-2 text-sm outline-none"
            />
            <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-105">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Cuisine pills */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {CUISINES.map((c) => (
          <button
            key={c}
            onClick={() => setCuisine(c)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
              cuisine === c
                ? "bg-foreground text-background"
                : "bg-card text-muted-foreground shadow-soft hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Restaurants */}
      <section className="mt-8">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">{filtered.length} kitchens near you</h2>
          <span className="text-sm text-muted-foreground">Sorted by relevance</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-card shadow-soft" />
            ))
          ) : (
            filtered.map((r: any) => (
              <RestaurantCard key={r.id} r={r} />
            ))
          )}
        </div>
        {filtered.length === 0 && !isLoading && (
          <div className="rounded-2xl bg-card py-16 text-center text-muted-foreground shadow-soft">
            No matches. Try a different search.
          </div>
        )}
      </section>
    </div>
  );
}
