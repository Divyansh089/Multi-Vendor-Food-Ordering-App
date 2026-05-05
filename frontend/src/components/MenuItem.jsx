import { Plus, Minus, Leaf } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function MenuItem({ item, restaurant }) {
  const { items, addItem, removeItem } = useCartStore();
  const inCart = items.find((i) => i.id === item.id);

  return (
    <div className="flex gap-4 rounded-2xl bg-card p-4 shadow-soft transition hover:shadow-card">
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
              item.veg ? "border-success" : "border-destructive"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${item.veg ? "bg-success" : "bg-destructive"}`}
            />
          </span>
          <h4 className="truncate font-semibold">{item.name}</h4>
          {item.veg && <Leaf className="h-3.5 w-3.5 text-success" />}
        </div>
        <p className="text-sm font-semibold">₹{item.price}</p>
        <p className="line-clamp-2 text-sm text-muted-foreground">{item.desc}</p>
      </div>
      <div className="relative flex w-28 flex-shrink-0 flex-col items-center gap-2">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-muted">
          <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover" />
        </div>
        {inCart ? (
          <div className="absolute -bottom-3 flex items-center gap-3 rounded-full border border-border bg-card px-2 py-1 shadow-card">
            <button
              onClick={() => removeItem(item.id)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-primary hover:bg-primary-soft"
              aria-label="Remove"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-4 text-center text-sm font-semibold">{inCart.qty}</span>
            <button
              onClick={() => addItem(item, restaurant)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground hover:brightness-105"
              aria-label="Add"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addItem(item, restaurant)}
            className="absolute -bottom-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-105"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        )}
      </div>
    </div>
  );
}
