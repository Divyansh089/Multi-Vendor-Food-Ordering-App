import { Link } from "@tanstack/react-router";
import { Star, Clock, Zap } from "lucide-react";

export default function RestaurantCard({ r }) {
  return (
    <Link
      to="/restaurant/$id"
      params={{ id: r.id }}
      className="group block overflow-hidden rounded-2xl bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="relative aspect-[5/3] overflow-hidden bg-muted">
        <img
          src={r.image}
          alt={r.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {r.surge > 1 && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-foreground/85 px-2.5 py-1 text-xs font-medium text-background backdrop-blur">
            <Zap className="h-3 w-3" /> Surge ×{r.surge.toFixed(2)}
          </span>
        )}
        <div className="absolute right-3 top-3 flex gap-1.5">
          {r.tags?.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold tracking-tight">{r.name}</h3>
          <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
            <Star className="h-3 w-3 fill-current" />
            {r.rating}
          </span>
        </div>
        <p className="line-clamp-1 text-sm text-muted-foreground">{r.cuisine}</p>
        <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {r.eta}
          </span>
          <span>·</span>
          <span>{r.priceLevel}</span>
        </div>
      </div>
    </Link>
  );
}
