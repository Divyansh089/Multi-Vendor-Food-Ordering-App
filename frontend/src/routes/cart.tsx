import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Minus, Plus, Trash2, ShoppingBag, Sparkles } from "lucide-react";

export const Route = createFileRoute("/cart")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (!user) throw redirect({ to: "/login" });
  },
  component: Cart,
});

function Cart() {
  const { items, restaurantName, addItem, removeItem, deleteItem, clearCart, getTotal } =
    useCartStore();
  const navigate = useNavigate();
  const subtotal = getTotal();
  const delivery = subtotal > 0 ? (subtotal > 500 ? 0 : 39) : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  const place = () => {
    clearCart();
    navigate({ to: "/orders" });
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft">
          <ShoppingBag className="h-7 w-7 text-primary" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">Your cart is empty</h1>
        <p className="mt-1 text-muted-foreground">Find something to crave on the home page.</p>
        <Link
          to="/home"
          className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Browse restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Your cart</h1>
      <p className="mt-1 text-sm text-muted-foreground">From {restaurantName}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="space-y-3">
          {items.map((i) => {
            const r = { id: useCartStore.getState().restaurantId!, name: restaurantName! };
            return (
              <div key={i.id} className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-soft">
                <img src={i.image} alt={i.name} className="h-16 w-16 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-semibold">{i.name}</h4>
                  <p className="text-sm text-muted-foreground">₹{i.price}</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1">
                  <button
                    onClick={() => removeItem(i.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-primary hover:bg-primary-soft"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-4 text-center text-sm font-semibold">{i.qty}</span>
                  <button
                    onClick={() => addItem(i, r)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="w-16 text-right font-semibold">₹{i.qty * i.price}</span>
                <button
                  onClick={() => deleteItem(i.id)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </section>

        <aside>
          <div className="sticky top-20 rounded-2xl bg-card p-6 shadow-card">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              <Sparkles className="h-3 w-3" /> AI ETA: 28 min
            </div>
            <h3 className="text-lg font-bold">Bill summary</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>₹{subtotal}</dd></div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd>{delivery === 0 ? <span className="font-semibold text-success">FREE</span> : `₹${delivery}`}</dd>
              </div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Taxes</dt><dd>₹{tax}</dd></div>
              <div className="my-3 border-t border-border" />
              <div className="flex justify-between text-base font-bold"><dt>Total</dt><dd>₹{total}</dd></div>
            </dl>
            <button
              onClick={place}
              className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-105"
            >
              Place order · ₹{total}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              By placing, you agree to Cravely's terms.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
