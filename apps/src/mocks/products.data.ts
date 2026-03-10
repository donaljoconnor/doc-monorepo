export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  tags: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Wireless Noise-Canceling Headphones",
    description: "Over-ear Bluetooth headphones with active noise cancellation.",
    price: 199.99,
    discountPercentage: 15,
    rating: 4.6,
    stock: 62,
    brand: "SoundForge",
    category: "audio",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=240",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=640"],
    tags: ["wireless", "anc", "premium"],
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    description: "Water-resistant smartwatch with heart-rate and sleep tracking.",
    price: 149,
    discountPercentage: 10,
    rating: 4.3,
    stock: 38,
    brand: "PulseTech",
    category: "wearables",
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=240",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=640"],
    tags: ["health", "gps", "bluetooth"],
  },
  {
    id: 3,
    title: "Ergonomic Office Chair",
    description: "Mesh-backed chair with adjustable lumbar support.",
    price: 279.5,
    discountPercentage: 5,
    rating: 4.1,
    stock: 12,
    brand: "WorkNest",
    category: "furniture",
    thumbnail: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=240",
    images: ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=640"],
    tags: ["office", "ergonomic"],
  },
  {
    id: 4,
    title: "Portable SSD 1TB",
    description: "USB-C high-speed external SSD for creatives.",
    price: 129.99,
    discountPercentage: 8,
    rating: 4.8,
    stock: 95,
    brand: "ByteDrive",
    category: "storage",
    thumbnail: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=240",
    images: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=640"],
    tags: ["ssd", "usb-c", "backup"],
  },
  {
    id: 5,
    title: "Mechanical Keyboard",
    description: "Hot-swappable keyboard with tactile switches.",
    price: 89.99,
    discountPercentage: 0,
    rating: 4.4,
    stock: 0,
    brand: "KeyMatter",
    category: "peripherals",
    thumbnail: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=240",
    images: ["https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=640"],
    tags: ["keyboard", "rgb", "gaming", "wired"],
  },
  {
    id: 6,
    title: "4K Webcam",
    description: "Ultra HD webcam optimized for video conferencing.",
    price: 119,
    discountPercentage: 12,
    rating: 4.2,
    stock: 28,
    brand: "ClearView",
    category: "cameras",
    thumbnail: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=240",
    images: ["https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=640"],
    tags: ["webcam", "4k", "streaming"],
  },
  {
    id: 7,
    title: "Electric Kettle",
    description: "Fast-boil kettle with temperature presets.",
    price: 54.99,
    discountPercentage: 18,
    rating: 4,
    stock: 44,
    brand: "HomePeak",
    category: "kitchen",
    thumbnail: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=240",
    images: ["https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=640"],
    tags: ["kettle", "appliance"],
  },
  {
    id: 8,
    title: "Trail Running Shoes",
    description: "Lightweight grip shoes designed for rough terrain.",
    price: 109.5,
    discountPercentage: 7,
    rating: 4.5,
    stock: 57,
    brand: "StrideX",
    category: "sports",
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=240",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=640"],
    tags: ["running", "outdoor"],
  },
  {
    id: 9,
    title: "Ceramic Pour-Over Set",
    description: "Barista-grade dripper and server for manual coffee brewing.",
    price: 64,
    discountPercentage: 0,
    rating: 3.9,
    stock: 16,
    brand: "BrewLab",
    category: "kitchen",
    thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=240",
    images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=640"],
    tags: ["coffee", "manual", "ceramic"],
  },
  {
    id: 10,
    title: "Portable Projector",
    description: "Compact projector with auto-keystone and Wi-Fi.",
    price: 249,
    discountPercentage: 22,
    rating: 4.1,
    stock: 9,
    brand: "BeamOne",
    category: "home-theater",
    thumbnail: "https://images.unsplash.com/photo-1490971731456-7c1f2d6a7f8c?w=240",
    images: ["https://images.unsplash.com/photo-1490971731456-7c1f2d6a7f8c?w=640"],
    tags: ["projector", "portable", "wifi"],
  },
  {
    id: 11,
    title: "Desk Lamp Pro",
    description: "Dimmable LED desk lamp with USB-C charging base.",
    price: 39.99,
    discountPercentage: 6,
    rating: 4.7,
    stock: 73,
    brand: "Luma",
    category: "lighting",
    thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=240",
    images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=640"],
    tags: ["lamp", "led", "usb-c"],
  },
  {
    id: 12,
    title: "Yoga Mat",
    description: "Non-slip high-density mat for yoga and mobility routines.",
    price: 29.5,
    discountPercentage: 9,
    rating: 4.2,
    stock: 130,
    brand: "FlexForm",
    category: "fitness",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=240",
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640"],
    tags: ["yoga", "mat", "training"],
  },
]

export function getProductsResponse({ limit, skip }: { limit: number; skip: number }): ProductsResponse {
  const normalizedLimit = Number.isFinite(limit) && limit > 0 ? limit : 10
  const normalizedSkip = Number.isFinite(skip) && skip >= 0 ? skip : 0
  return {
    products: mockProducts.slice(normalizedSkip, normalizedSkip + normalizedLimit),
    total: mockProducts.length,
    skip: normalizedSkip,
    limit: normalizedLimit,
  }
}
