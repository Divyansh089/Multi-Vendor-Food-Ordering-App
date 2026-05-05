import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, MapPin, LogOut, Flame } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const count = useCartStore((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const onLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  const isActive = (p) => path === p || path.startsWith(p + "/");

  const navLinks = (() => {
    if (!user) return [];
    if (user.role === "CUSTOMER")
      return [
        { to: "/home", label: "Discover" },
        { to: "/orders", label: "Orders" },
      ];
    if (user.role === "VENDOR")
      return [
        { to: "/vendor/dashboard", label: "Overview" },
        { to: "/vendor/menu", label: "Menu" },
        { to: "/vendor/orders", label: "Orders" },
      ];
    if (user.role === "DELIVERY")
      return [
        { to: "/delivery/dashboard", label: "Dashboard" },
        { to: "/delivery/active", label: "Active" },
      ];
    if (user.role === "ADMIN") return [{ to: "/admin/dashboard", label: "Admin" }];
    return [];
  })();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
            <Flame className="h-5 w-5" strokeWidth={2.4} />
          </div>
          <span className="text-lg font-bold tracking-tight">Cravely</span>
        </Link>

        {user?.role === "CUSTOMER" && (
          <div className="hidden items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-sm text-muted-foreground md:flex">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">Indiranagar</span>
            <span>· Bengaluru</span>
          </div>
        )}

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive(l.to)
                  ? "bg-primary-soft text-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          {user?.role === "CUSTOMER" && (
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
          )}
          {user ? (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition hover:brightness-105"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
