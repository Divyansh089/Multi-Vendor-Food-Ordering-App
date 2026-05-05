import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { menusByRestaurant } from "@/lib/mockData";
import { Pencil, Trash2, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/vendor/menu")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== "VENDOR" && user.role !== "ADMIN") throw redirect({ to: "/home" });
  },
  component: MenuManagement,
});

function MenuManagement() {
  const [items, setItems] = useState(menusByRestaurant.r1);
  const [q, setQ] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ name: "", price: "", desc: "", veg: true });

  const filtered = items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()));

  const add = () => {
    if (!draft.name || !draft.price) return;
    setItems([
      {
        id: "m" + Date.now(),
        name: draft.name,
        price: Number(draft.price),
        desc: draft.desc,
        veg: draft.veg,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
      },
      ...items,
    ]);
    setDraft({ name: "", price: "", desc: "", veg: true });
    setShowAdd(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Menu management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} items · Last updated just now
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          <Plus className="h-4 w-4" /> Add dish
        </button>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-soft">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search dishes…"
          className="flex-1 bg-transparent py-1 text-sm outline-none"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-card shadow-soft">
        <table className="w-full">
          <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Dish</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((i) => (
              <tr key={i.id} className="transition hover:bg-surface/50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img src={i.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold">{i.name}</p>
                      <p className="line-clamp-1 text-xs text-muted-foreground">{i.desc}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 font-semibold">₹{i.price}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${i.veg ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                    {i.veg ? "Veg" : "Non-veg"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => setItems(items.filter((x) => x.id !== i.id))} className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-card p-6 shadow-card">
            <h3 className="text-lg font-bold">Add new dish</h3>
            <div className="mt-4 space-y-3">
              <input
                placeholder="Dish name"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
              <input
                placeholder="Price (₹)"
                type="number"
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
              <textarea
                placeholder="Description"
                value={draft.desc}
                onChange={(e) => setDraft({ ...draft, desc: e.target.value })}
                rows={3}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={draft.veg} onChange={(e) => setDraft({ ...draft, veg: e.target.checked })} />
                Vegetarian
              </label>
            </div>
            <div className="mt-5 flex gap-2">
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-full border border-border bg-card py-2.5 text-sm font-semibold">
                Cancel
              </button>
              <button onClick={add} className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
                Add dish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
