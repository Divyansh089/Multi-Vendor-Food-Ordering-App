// Mock data — swap with API responses once backend is connected.

export const restaurants = [
  {
    id: "r1",
    name: "Saffron & Smoke",
    cuisine: "North Indian · Tandoor",
    rating: 4.7,
    eta: "25–30 min",
    priceLevel: "₹₹",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900&auto=format&fit=crop",
    tags: ["Bestseller", "Late night"],
    surge: 1.0,
  },
  {
    id: "r2",
    name: "Tokyo Bowl",
    cuisine: "Japanese · Ramen · Sushi",
    rating: 4.6,
    eta: "30–35 min",
    priceLevel: "₹₹₹",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop",
    tags: ["Trending"],
    surge: 1.15,
  },
  {
    id: "r3",
    name: "Crust Republic",
    cuisine: "Pizza · Pasta · Italian",
    rating: 4.5,
    eta: "20–25 min",
    priceLevel: "₹₹",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&auto=format&fit=crop",
    tags: ["Free delivery"],
    surge: 1.0,
  },
  {
    id: "r4",
    name: "Green Bowl Co.",
    cuisine: "Healthy · Salads · Bowls",
    rating: 4.8,
    eta: "15–20 min",
    priceLevel: "₹₹",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop",
    tags: ["New"],
    surge: 1.0,
  },
  {
    id: "r5",
    name: "Burger Atelier",
    cuisine: "American · Burgers · Fries",
    rating: 4.4,
    eta: "20–30 min",
    priceLevel: "₹₹",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop",
    tags: ["Bestseller"],
    surge: 1.2,
  },
  {
    id: "r6",
    name: "Mango Street",
    cuisine: "South Indian · Dosa · Filter Coffee",
    rating: 4.6,
    eta: "20–25 min",
    priceLevel: "₹",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=900&auto=format&fit=crop",
    tags: ["Vegetarian"],
    surge: 1.0,
  },
];

export const menusByRestaurant = {
  r1: [
    { id: "m1", name: "Butter Chicken", price: 340, veg: false, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600", desc: "Slow-cooked tomato cream curry, smoked tandoor chicken." },
    { id: "m2", name: "Paneer Tikka", price: 280, veg: true, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600", desc: "Charred paneer cubes, mint chutney." },
    { id: "m3", name: "Garlic Naan", price: 70, veg: true, image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=600", desc: "Hand-stretched, clay-oven baked." },
    { id: "m4", name: "Dal Makhani", price: 240, veg: true, image: "https://images.unsplash.com/photo-1626132647523-66f4bf080cb7?w=600", desc: "Black lentils simmered overnight." },
  ],
  r2: [
    { id: "m5", name: "Tonkotsu Ramen", price: 420, veg: false, image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=600", desc: "12-hour pork bone broth, chashu, ajitama." },
    { id: "m6", name: "Salmon Nigiri (6 pc)", price: 520, veg: false, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600", desc: "Fresh Norwegian salmon over seasoned rice." },
    { id: "m7", name: "Veg Gyoza", price: 260, veg: true, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600", desc: "Pan-seared dumplings, ponzu dip." },
  ],
  r3: [
    { id: "m8", name: "Margherita", price: 320, veg: true, image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600", desc: "San Marzano, fior di latte, basil." },
    { id: "m9", name: "Truffle Mushroom", price: 460, veg: true, image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600", desc: "Wild mushrooms, truffle oil, fontina." },
    { id: "m10", name: "Pepperoni", price: 420, veg: false, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600", desc: "Cup-and-char pepperoni, mozzarella." },
  ],
  r4: [
    { id: "m11", name: "Buddha Bowl", price: 290, veg: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600", desc: "Quinoa, chickpea, tahini, greens." },
    { id: "m12", name: "Avocado Toast", price: 240, veg: true, image: "https://images.unsplash.com/photo-1603046891744-1f76eb10aec1?w=600", desc: "Sourdough, smashed avo, chili oil." },
  ],
  r5: [
    { id: "m13", name: "Smash Double", price: 330, veg: false, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600", desc: "Double patty, american cheese, house sauce." },
    { id: "m14", name: "Truffle Fries", price: 180, veg: true, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600", desc: "Hand-cut, parmesan, truffle." },
  ],
  r6: [
    { id: "m15", name: "Masala Dosa", price: 140, veg: true, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600", desc: "Crisp dosa, spiced potato, coconut chutney." },
    { id: "m16", name: "Filter Coffee", price: 80, veg: true, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600", desc: "Strong, frothy, traditional." },
  ],
};

export const sampleOrders = [
  { id: "ORD-7821", restaurant: "Saffron & Smoke", items: 3, total: 690, status: "ON_THE_WAY", eta: "12 min", placedAt: "12:42 PM" },
  { id: "ORD-7799", restaurant: "Crust Republic", items: 2, total: 780, status: "DELIVERED", eta: "—", placedAt: "Yesterday" },
  { id: "ORD-7755", restaurant: "Tokyo Bowl", items: 1, total: 420, status: "PREPARING", eta: "20 min", placedAt: "Today, 1:05 PM" },
];

export const vendorOrders = [
  { id: "ORD-7821", customer: "Aanya R.", items: "Butter Chicken ×1, Naan ×2", total: 480, status: "NEW", time: "2 min ago" },
  { id: "ORD-7820", customer: "Karan M.", items: "Paneer Tikka ×1, Dal Makhani ×1", total: 520, status: "PREPARING", time: "11 min ago" },
  { id: "ORD-7818", customer: "Riya S.", items: "Butter Chicken ×2", total: 680, status: "READY", time: "18 min ago" },
];

export const deliveryOrders = [
  { id: "ORD-7821", restaurant: "Saffron & Smoke", customer: "Aanya R.", distance: "2.1 km", payout: 65, address: "12, Indiranagar 100ft Rd" },
  { id: "ORD-7822", restaurant: "Tokyo Bowl", customer: "Dev P.", distance: "3.4 km", payout: 88, address: "44, HSR Sector 7" },
];
