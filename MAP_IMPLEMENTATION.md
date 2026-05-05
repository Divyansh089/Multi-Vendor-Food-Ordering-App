# Map & Location Tracking Implementation

This document describes the map and real-time location tracking features implemented in the Multi-Vendor Food Ordering App.

## Features Implemented

### 1. **Frontend Map Component** (`Map.tsx`)
A basic interactive map component that displays:
- **Origin marker** (green): Restaurant/pickup location
- **Current position marker** (blue): Delivery agent's current location
- **Destination marker** (red): Customer/delivery destination
- **Route visualization**: Green line for completed route, blue dashed line for remaining route
- **ETA display**: Real-time estimated arrival time
- **Location labels**: Display location names
- **Grid background**: Visual representation of map area

#### Usage:
```tsx
import Map from "@/components/Map";

<Map
  origin={{ lat: 28.6139, lng: 77.209, name: "Restaurant" }}
  destination={{ lat: 28.5921, lng: 77.2341, name: "Customer Home" }}
  currentPosition={{ lat: 28.603, lng: 77.2215, name: "Current" }}
  estimatedTime={15}
/>
```

### 2. **Location Utilities** (`locationUtils.ts`)
Helper functions for location calculations:
- **calculateDistance()**: Haversine formula to compute distance between coordinates
- **estimateETA()**: Calculate estimated arrival time based on distance and speed
- **getInterpolatedCoordinates()**: Simulate GPS movement between origin and destination
- **coordinatesToAddress()**: Convert coordinates to address (dummy implementation)
- **calculateBearing()**: Get navigation direction angle between two points
- **MOCK_RESTAURANTS**: Sample restaurant coordinates in Delhi for testing

### 3. **Location Store** (`locationStore.ts`)
Zustand state management for:
- **Active delivery tracking**: Current delivery information
- **Nearby drivers**: List of drivers near customer
- **User location**: Customer's GPS coordinates
- **Location history**: Track past locations for analytics
- **Geolocation integration**: Browser GPS API wrapper functions
  - `requestUserLocation()`: Get user's current location once
  - `watchUserLocation()`: Continuous location tracking

### 4. **Backend Location Services**

#### Enhanced Distance Calculator (`DistanceCalculator.java`)
Added methods:
- **estimateETA()**: Calculate ETA from distance
- **isValidCoordinates()**: Validate latitude/longitude
- **calculateBearing()**: Get direction angle between points

#### Location DTOs:
- **LocationDTO**: Represents a geographic coordinate point
- **DeliveryTrackingDTO**: Real-time delivery tracking information

### 5. **Integration Points**

#### Active Delivery Tracking Page (`delivery.active.tsx`)
- Displays real-time map with delivery progress
- Shows origin (restaurant), current position, and destination
- Interactive progress tracker
- Driver-customer communication

#### Restaurant Details Page (`restaurant.$id.tsx`)
- Shows restaurant location on map
- Displays distance and estimated delivery time
- Customer can see restaurant pickup point

## Architecture

```
Frontend:
├── components/Map.tsx (Visual map display)
├── lib/locationUtils.ts (Location calculations)
├── lib/mockData.js (Sample locations)
└── store/locationStore.ts (State management)

Backend:
├── util/DistanceCalculator.java (Calculations)
├── dto/LocationDTO.java (Data transfer)
└── dto/DeliveryTrackingDTO.java (Tracking data)
```

## How It Works

### Real-Time Delivery Tracking Flow:
1. **Driver accepts order** → Location is tracked
2. **Map updates continuously** → GPS updates from device
3. **Distance calculated** → Haversine formula computes remaining distance
4. **ETA estimated** → Based on speed (25 km/h) + 15% traffic buffer
5. **Routes displayed** → Green = completed, Blue dashed = remaining
6. **Customer sees real-time** → Via WebSocket updates
7. **Order marked delivered** → When driver reaches destination

### ETA Calculation:
```
Average Speed: 25 km/h
Traffic Buffer: 15%
Minimum ETA: 5 minutes
Formula: (Distance / Speed) * 60 * 1.15
```

## Distance Calculation (Haversine Formula)

The Haversine formula calculates the great-circle distance between two points on Earth:

```
a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlon/2)
c = 2 × atan2(√a, √(1−a))
d = R × c
where R = 6,371 km (Earth's radius)
```

## Coordinates Used (Delhi Demo)
- Taj Express: 28.6139°N, 77.209°E
- Dragon Palace: 28.5355°N, 77.391°E
- Pizza Hut: 28.5244°N, 77.1855°E
- Biryani Paradise: 28.6292°N, 77.2201°E

## Browser Permissions Required
To enable real-time location tracking:
- User must grant `geolocation` permission
- HTTPS required for production (except localhost)
- Firefox, Chrome, Safari all supported

## Future Enhancements
- [ ] Integrate with Google Maps API for real roads
- [ ] Integrate with Mapbox for better visualizations
- [ ] Add traffic layer to improve ETA accuracy
- [ ] Implement polyline route optimization
- [ ] Add offline map support
- [ ] Real WebSocket integration for live driver updates
- [ ] Driver rating based on route efficiency
- [ ] Push notifications for delivery updates

## Testing

### Test Delivery Tracking:
1. Navigate to `/delivery/active`
2. See mock delivery with map
3. Click "Mark next stage" to update progress
4. Map updates show simulated movement

### Test Restaurant View:
1. Go to any restaurant detail page
2. See restaurant location on map
3. See ETA to delivery

## API Endpoints (Future)
```
GET /api/locations/{orderId} - Get current delivery location
POST /api/locations/update - Update driver location (WebSocket)
GET /api/deliveries/{orderId}/track - Track delivery
POST /api/deliveries/{orderId}/eta - Get updated ETA
```

## Security Considerations
- Locations are sensitive PII
- Only show driver location to customer during active delivery
- Implement proper authentication/authorization
- Encrypt location data in transit
- Regular audits of location data access

---

**Last Updated**: May 2026
