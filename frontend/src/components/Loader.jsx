export default function Loader({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <div className="relative h-10 w-10">
        <span className="absolute inset-0 rounded-full border-2 border-primary-soft" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
      </div>
      <p className="text-sm">{label}…</p>
    </div>
  );
}
