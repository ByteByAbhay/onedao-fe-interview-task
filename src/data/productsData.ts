export type Category = "Electronics" | "Fashion" | "Home" | "Accessories" | "Sports";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  rating: number;
};

export const categories: Category[] = ["Electronics", "Fashion", "Home", "Accessories", "Sports"];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Over-ear headphones with active noise cancellation and a 30-hour battery life.",
    price: 129.99,
    image: "https://picsum.photos/seed/onedao-headphones/600/450",
    category: "Electronics",
    rating: 4.5,
  },
  {
    id: "prod-2",
    name: "Smart Fitness Watch",
    description: "Tracks heart rate, sleep, and workouts, with a 7-day battery and always-on display.",
    price: 89.5,
    image: "https://picsum.photos/seed/onedao-watch/600/450",
    category: "Electronics",
    rating: 4,
  },
  {
    id: "prod-3",
    name: "Minimalist Leather Backpack",
    description: "Water-resistant leather backpack with a padded 15-inch laptop compartment.",
    price: 74.0,
    image: "https://picsum.photos/seed/onedao-backpack/600/450",
    category: "Fashion",
    rating: 4.5,
  },
  {
    id: "prod-4",
    name: "Ceramic Pour-Over Coffee Set",
    description: "Hand-glazed ceramic dripper and carafe for a clean, full-bodied cup of coffee.",
    price: 42.0,
    image: "https://picsum.photos/seed/onedao-coffee/600/450",
    category: "Home",
    rating: 5,
  },
  {
    id: "prod-5",
    name: "Polarized Aviator Sunglasses",
    description: "UV400 polarized lenses with a lightweight metal frame and spring hinges.",
    price: 34.99,
    image: "https://picsum.photos/seed/onedao-sunglasses/600/450",
    category: "Accessories",
    rating: 4,
  },
  {
    id: "prod-6",
    name: "Insulated Stainless Steel Bottle",
    description: "Keeps drinks cold for 24 hours or hot for 12, with a leak-proof lid.",
    price: 24.5,
    image: "https://picsum.photos/seed/onedao-bottle/600/450",
    category: "Sports",
    rating: 4.5,
  },
  {
    id: "prod-7",
    name: "Scandinavian Table Lamp",
    description: "Warm dimmable LED lamp with a solid oak base and linen shade.",
    price: 58.0,
    image: "https://picsum.photos/seed/onedao-lamp/600/450",
    category: "Home",
    rating: 4,
  },
  {
    id: "prod-8",
    name: "Merino Wool Crewneck Sweater",
    description: "Breathable, temperature-regulating merino wool in a classic relaxed fit.",
    price: 95.0,
    image: "https://picsum.photos/seed/onedao-sweater/600/450",
    category: "Fashion",
    rating: 4.5,
  },
  {
    id: "prod-9",
    name: "Portable Bluetooth Speaker",
    description: "Compact IPX7 waterproof speaker with 360° sound and a 20-hour battery.",
    price: 49.99,
    image: "https://picsum.photos/seed/onedao-speaker/600/450",
    category: "Electronics",
    rating: 4,
  },
  {
    id: "prod-10",
    name: "Yoga Mat with Alignment Lines",
    description: "Non-slip, eco-friendly TPE mat with printed guides for proper pose alignment.",
    price: 32.0,
    image: "https://picsum.photos/seed/onedao-yogamat/600/450",
    category: "Sports",
    rating: 4.5,
  },
  {
    id: "prod-11",
    name: "Genuine Leather Wallet",
    description: "Slim bifold wallet with RFID-blocking lining and six card slots.",
    price: 28.0,
    image: "https://picsum.photos/seed/onedao-wallet/600/450",
    category: "Accessories",
    rating: 4,
  },
  {
    id: "prod-12",
    name: "Cast Iron Skillet Set",
    description: "Pre-seasoned 10\" and 12\" skillets, oven-safe up to 500°F.",
    price: 64.5,
    image: "https://picsum.photos/seed/onedao-skillet/600/450",
    category: "Home",
    rating: 5,
  },
];
