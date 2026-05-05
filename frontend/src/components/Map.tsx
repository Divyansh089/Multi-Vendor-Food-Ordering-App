import { MapPin, Navigation, Clock } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface MapProps {
  origin: Location;
  destination: Location;
  currentPosition?: Location;
  estimatedTime?: number; // in minutes
}

export default function Map({
  origin,
  destination,
  currentPosition,
  estimatedTime = 15,
}: MapProps) {
  // Calculate approximate position on map based on coordinates
  // Dummy implementation - in real app would use Mapbox/Google Maps API
  const calculatePosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  const originPos = calculatePosition(origin.lat, origin.lng);
  const destPos = calculatePosition(destination.lat, destination.lng);
  const currentPos = currentPosition
    ? calculatePosition(currentPosition.lat, currentPosition.lng)
    : null;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Map background with grid */}
      <div className="absolute inset-0">
        <svg className="h-full w-full">
          {/* Grid lines */}
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Route line from origin to destination */}
          {currentPos ? (
            <>
              {/* Current to Destination */}
              <line
                x1={`${currentPos.x}%`}
                y1={`${currentPos.y}%`}
                x2={`${destPos.x}%`}
                y2={`${destPos.y}%`}
                stroke="#3b82f6"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              {/* Origin to Current */}
              <line
                x1={`${originPos.x}%`}
                y1={`${originPos.y}%`}
                x2={`${currentPos.x}%`}
                y2={`${currentPos.y}%`}
                stroke="#10b981"
                strokeWidth="3"
              />
            </>
          ) : (
            <line
              x1={`${originPos.x}%`}
              y1={`${originPos.y}%`}
              x2={`${destPos.x}%`}
              y2={`${destPos.y}%`}
              stroke="#3b82f6"
              strokeWidth="2"
            />
          )}
        </svg>
      </div>

      {/* Markers */}
      <div className="absolute inset-0">
        {/* Origin marker */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 transform"
          style={{ left: `${originPos.x}%`, top: `${originPos.y}%` }}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute h-8 w-8 animate-pulse rounded-full bg-green-400 opacity-30" />
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 shadow-lg">
              <MapPin size={12} className="text-white" />
            </div>
          </div>
        </div>

        {/* Current position marker */}
        {currentPos && (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 transform"
            style={{ left: `${currentPos.x}%`, top: `${currentPos.y}%` }}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute h-6 w-6 animate-pulse rounded-full bg-blue-400 opacity-40" />
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 shadow-lg">
                <Navigation size={14} className="text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Destination marker */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 transform"
          style={{ left: `${destPos.x}%`, top: `${destPos.y}%` }}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute h-8 w-8 animate-pulse rounded-full bg-red-400 opacity-30" />
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 shadow-lg">
              <MapPin size={12} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Info overlay */}
      <div className="absolute bottom-4 right-4 rounded-lg bg-black/70 p-3 text-white backdrop-blur">
        <div className="flex items-center gap-2 text-sm">
          <Clock size={16} className="text-yellow-400" />
          <span>ETA: {estimatedTime} mins</span>
        </div>
      </div>

      {/* Location labels */}
      <div className="absolute top-4 left-4 text-xs text-white drop-shadow-lg">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="font-medium">{origin.name}</span>
        </div>
      </div>

      <div className="absolute bottom-16 right-4 text-xs text-white drop-shadow-lg">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="font-medium">{destination.name}</span>
        </div>
      </div>
    </div>
  );
}
