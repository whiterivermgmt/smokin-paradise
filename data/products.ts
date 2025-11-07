import { ReactNode } from "react";

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number; // number for filtering
  image: string;
  slug: string;
  rating?: number;
  reviews?: number;
  hotDeal?: boolean;
  bestSeller?: boolean;
  description?: ReactNode;
}

export const products: Product[] = [
  // ===== Disposables =====
  {
    id: "disp-001",
    title: "CloudNine Single-use Vape",
    brand: "CloudNine",
    category: "disposables",
    subcategory: "single-use",
    price: 19.99,
    image: "/products/cloudnine-single.png",
    slug: "cloudnine-single",
    rating: 4,
    reviews: 8,
    hotDeal: false,
    bestSeller: false,
    description: "A sleek, disposable vape with smooth clouds and flavorful hits."
  },
  {
    id: "disp-002",
    title: "VaporLux Starter Pack",
    brand: "VaporLux",
    category: "disposables",
    subcategory: "starter-pack",
    price: 34.99,
    image: "/products/vaporlux-starter-pack.png",
    slug: "vaporlux-starter-pack",
    rating: 5,
    reviews: 12,
    hotDeal: true,
    bestSeller: true,
    description: "Perfect starter kit for beginners, includes vape and e-liquid."
  },
  {
    id: "disp-003",
    title: "CloudNine Drip Tip Vape",
    brand: "CloudNine",
    category: "disposables",
    subcategory: "drip-tip",
    price: 21.99,
    image: "/products/cloudnine-drip-tip.png",
    slug: "cloudnine-drip-tip",
    rating: 4,
    reviews: 7,
    hotDeal: false,
    bestSeller: false,
    description: "Disposable vape with removable drip tip for easy cleaning."
  },

  // ===== E-Liquids =====
  {
    id: "eliquid-001",
    title: "Naked 100 – Lava Flow",
    brand: "Naked 100",
    category: "e-liquids",
    price: 14.99,
    image: "/products/naked100-lava-flow.png",
    slug: "naked100-lava-flow",
    rating: 5,
    reviews: 27,
    hotDeal: true,
    bestSeller: true,
    description: "Refreshing tropical fruit flavor with hints of strawberry and pineapple."
  },
  {
    id: "eliquid-002",
    title: "Monster Vape Labs – Watermelon Ice",
    brand: "Monster Vape Labs",
    category: "e-liquids",
    price: 15.99,
    image: "/products/monster-vape-watermelon-ice.png",
    slug: "monster-vape-labs-watermelon-ice",
    rating: 4,
    reviews: 15,
    hotDeal: false,
    bestSeller: false,
    description: "Sweet watermelon flavor with a refreshing icy finish."
  },
  {
    id: "eliquid-003",
    title: "7 Daze – OG Reds Apple",
    brand: "7 Daze E-Liquid",
    category: "e-liquids",
    price: 19.99,
    image: "/products/7daze-og-reds-apple.png",
    slug: "7-daze-og-reds",
    rating: 5,
    reviews: 32,
    hotDeal: false,
    bestSeller: true,
    description: "Crisp red apple flavor with a smooth vaping experience."
  },

  // ===== Nic Pouches =====
  {
    id: "nic-001",
    title: "NicMaster Winter Mint",
    brand: "NicMaster",
    category: "nic-pouches",
    price: 9.99,
    image: "/products/nic.png",
    slug: "nicmaster-winter-mint",
    rating: 5,
    reviews: 10,
    hotDeal: false,
    bestSeller: true,
    description: "Refreshing mint pouches for a smooth nicotine experience."
  },
  {
    id: "nic-002",
    title: "SmoothNic Fruit Mix",
    brand: "SmoothNic",
    category: "nic-pouches",
    price: 11.99,
    image: "/products/images.png",
    slug: "smoothnic-fruit-mix",
    rating: 4,
    reviews: 6,
    hotDeal: false,
    bestSeller: false,
    description: "Mixed fruit flavored nicotine pouches for on-the-go use."
  },

  // ===== Vape Kits =====
  {
    id: "kit-001",
    title: "VapeKing Beginner Kit",
    brand: "VapeKing",
    category: "vape-kits",
    price: 59.99,
    image: "/products/vapeking-beginner-kit.png",
    slug: "vapeking-beginner-kit",
    rating: 5,
    reviews: 19,
    hotDeal: true,
    bestSeller: true,
    description: "Complete beginner kit with everything needed to start vaping."
  },
  {
    id: "kit-002",
    title: "ZenVapes Advanced Kit",
    brand: "ZenVapes",
    category: "vape-kits",
    price: 99.99,
    image: "/products/zenvapes-advanced-kit.png",
    slug: "zenvapes-advanced-kit",
    rating: 5,
    reviews: 13,
    hotDeal: false,
    bestSeller: false,
    description: "Advanced kit with adjustable wattage and sleek design."
  },

  // ===== Hemp =====
  {
    id: "hemp-001",
    title: "NatureCBD Gummies",
    brand: "NatureCBD",
    category: "hemp",
    price: 24.99,
    image: "/products/gummies.png",
    slug: "naturecbd-gummies",
    rating: 5,
    reviews: 20,
    hotDeal: true,
    bestSeller: true,
    description: "Delicious CBD-infused gummies for daily wellness and relaxation."
  },
  {
    id: "hemp-002",
    title: "CBD Elite Hemp Oil",
    brand: "CBDElite",
    category: "hemp",
    price: 39.99,
    image: "/products/cbdelite-oil.png",
    slug: "cbdelite-oil",
    rating: 4,
    reviews: 11,
    hotDeal: false,
    bestSeller: false,
    description: "Premium hemp oil with full spectrum cannabinoids for optimal wellness."
  },

  // ===== Vaporizers =====
  {
    id: "vap-001",
    title: "VaporPro Dry Herb",
    brand: "VaporPro",
    category: "vaporizers",
    price: 129.99,
    image: "/products/vaporpro-dry-herb.png",
    slug: "vaporpro-dry-herb",
    rating: 5,
    reviews: 10,
    hotDeal: false,
    bestSeller: true,
    description: "High-performance dry herb vaporizer with precise temperature control."
  },
  {
    id: "vap-002",
    title: "CloudVape Oil Kit",
    brand: "CloudVape",
    category: "vaporizers",
    price: 149.99,
    image: "/products/cloudvape-oil-kit.png",
    slug: "cloudvape-oil-kit",
    rating: 4,
    reviews: 8,
    hotDeal: false,
    bestSeller: false,
    description: "Compact oil vaporizer kit with adjustable voltage and USB-C charging."
  },

  // ===== Glass =====
  {
    id: "glass-001",
    title: "GlassWorld Beaker Bong 14\"",
    brand: "GlassWorld",
    category: "glass",
    price: 129.99,
    image: "/products/glassworld-bong-14.png",
    slug: "glassworld-bong",
    rating: 5,
    reviews: 14,
    hotDeal: false,
    bestSeller: true,
    description: "Classic 14\" beaker bong with reinforced glass and smooth airflow."
  },
  {
    id: "glass-002",
    title: "TrippyGlass Pipe",
    brand: "TrippyGlass",
    category: "glass",
    price: 34.99,
    image: "/products/trippyglass-pipe.png",
    slug: "trippyglass-pipe",
    rating: 4,
    reviews: 10,
    hotDeal: false,
    bestSeller: false,
    description: "Handcrafted glass pipe with vibrant colors and ergonomic design."
  },

  // ===== Accessories =====
  {
    id: "acc-001",
    title: "SmokeLab Battery 5000mAh",
    brand: "SmokeLab",
    category: "accessories",
    price: 25.0,
    image: "/products/smokelab-battery.png",
    slug: "smokelab-battery",
    rating: 5,
    reviews: 9,
    hotDeal: false,
    bestSeller: true,
    description: "High-capacity 5000mAh rechargeable battery for all vaping devices."
  },
  {
    id: "acc-002",
    title: "Delta8Pro Charger",
    brand: "Delta8Pro",
    category: "accessories",
    price: 15.0,
    image: "/products/delta8pro-charger.png",
    slug: "delta8pro-charger",
    rating: 4,
    reviews: 6,
    hotDeal: false,
    bestSeller: false,
    description: "Compact USB charger compatible with most vape devices."
  }
];
