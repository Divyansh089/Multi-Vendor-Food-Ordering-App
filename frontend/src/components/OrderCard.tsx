import { Clock, Package } from "lucide-react";

const STATUS_STYLES = {
  NEW: "bg-primary-soft text-primary",
  PREPARING: "bg-warning/15 text-foreground",
  READY: "bg-success/15 text-success",
  ON_THE_WAY: "bg-foreground text-background",
  DELIVERED: "bg-secondary text-muted-foreground",
  CANCELLED: "bg-destructive/10 text-destructive",
};

const STATUS_LABEL = {
  NEW: "New",
  PREPARING: "Preparing",
  READY: "Ready for pickup",
  ON_THE_WAY: "On the way",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function OrderCard({ order, actions = null }: { order: any; actions?: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-soft transition hover:shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Package className="h-3.5 w-3.5" />
            <span className="font-mono">{order.id}</span>
            {order.placedAt && (
              <>
                <span>·</span>
                <Clock className="h-3.5 w-3.5" />
                <span>{order.placedAt || order.time}</span>
              </>
            )}
          </div>
          <h4 className="mt-1.5 truncate font-semibold">
            {order.restaurant || order.customer}
          </h4>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
            {typeof order.items === "string" ? order.items : `${order.items} items`}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-base font-semibold">₹{order.total}</span>
          {order.status && (
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${(STATUS_STYLES as Record<string, string>)[order.status]}`}
            >
              {(STATUS_LABEL as Record<string, string>)[order.status]}
            </span>
          )}
        </div>
      </div>
      {(order.eta && order.eta !== "—") || actions ? (
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          {order.eta && order.eta !== "—" ? (
            <span className="text-sm text-muted-foreground">
              ETA <span className="font-semibold text-foreground">{order.eta}</span>
            </span>
          ) : <span />}
          {actions}
        </div>
      ) : null}
    </div>
  );
}
