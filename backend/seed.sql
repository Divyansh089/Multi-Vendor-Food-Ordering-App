-- Seed data for Cravely
-- Note: You should register a user first to get an ID, or we can create one here.

-- 1. Create a Vendor User (Password is 'password' hashed)
-- $2a$12$8.UnVuG9HHgffUDAlk8q2OuVGkqBKzVp.fLp/6S.M6bY3rE.R25q6
INSERT INTO users (email, password, name, role, phone, enabled, blocked, created_at, wallet_balance)
VALUES ('tandoor@cravely.app', '$2a$12$8.UnVuG9HHgffUDAlk8q2OuVGkqBKzVp.fLp/6S.M6bY3rE.R25q6', 'Tandoor Express Owner', 'VENDOR', '9876543210', true, false, NOW(), 0)
ON CONFLICT (email) DO NOTHING;

-- 2. Create Vendor Profile
INSERT INTO vendors (owner_id, name, description, image_url, cuisine, eta, rating, surge, price_level, address, is_open, total_reviews, blocked, created_at)
SELECT id, 'Tandoor Express', 'Authentic North Indian charcoal grills and curries.', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800', 'North Indian', '25-35 min', 4.8, 1.0, '₹₹', '123 Spice Garden, Indiranagar', true, 120, false, NOW()
FROM users WHERE email = 'tandoor@cravely.app'
ON CONFLICT (owner_id) DO NOTHING;

-- 3. Create Menu Items for Tandoor Express
INSERT INTO menu_items (vendor_id, name, description, price, image_url, category, is_available, is_veg)
SELECT v.id, 'Butter Chicken', 'Classic creamy tomato gravy with succulent tandoori chicken.', 350.0, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', 'Main Course', true, false
FROM vendors v WHERE v.name = 'Tandoor Express';

INSERT INTO menu_items (vendor_id, name, description, price, image_url, category, is_available, is_veg)
SELECT v.id, 'Garlic Naan', 'Freshly baked leavened bread with garlic and butter.', 60.0, 'https://images.unsplash.com/photo-1601303584126-2f9a2d268631?w=400', 'Breads', true, true
FROM vendors v WHERE v.name = 'Tandoor Express';

-- 4. Another Vendor: Pizza Paradise
INSERT INTO users (email, password, name, role, phone, enabled, blocked, created_at, wallet_balance)
VALUES ('pizza@cravely.app', '$2a$12$8.UnVuG9HHgffUDAlk8q2OuVGkqBKzVp.fLp/6S.M6bY3rE.R25q6', 'Pizza Paradise Owner', 'VENDOR', '9876543211', true, false, NOW(), 0)
ON CONFLICT (email) DO NOTHING;

INSERT INTO vendors (owner_id, name, description, image_url, cuisine, eta, rating, surge, price_level, address, is_open, total_reviews, blocked, created_at)
SELECT id, 'Pizza Paradise', 'Hand-tossed sourdough pizzas with fresh mozzarella.', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800', 'Italian', '30-45 min', 4.5, 1.2, '₹₹₹', '45 Olive Street, Koramangala', true, 85, false, NOW()
FROM users WHERE email = 'pizza@cravely.app'
ON CONFLICT (owner_id) DO NOTHING;
