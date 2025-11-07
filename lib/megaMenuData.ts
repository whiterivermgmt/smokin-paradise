export interface DropdownItem {
  title: string;
  href: string;
}

export interface ProductPreview {
  id: string;
  title: string;
  image: string;
  href: string;
}

export interface MegaMenuContent {
  allLink: DropdownItem;
  links: DropdownItem[];
  productPreviews?: ProductPreview[];
}

export const megaMenuData: Record<string, MegaMenuContent> = {
  "All": {
    allLink: { title: "Shop All", href: "/shop" },
    links: [
      { title: "Vaporizers", href: "/shop?category=Vaporizers" },
      { title: "Disposables", href: "/shop?category=Disposables" },
      { title: "E-liquids", href: "/shop?category=E-Liquids" },
    ],
    productPreviews: [
      { id: "monster-vape", title: "Monster Vape Watermelon Ice", image: "/products/monster-vape-watermelon-ice.png", href: "/shop/products/monster-vape-watermelon-ice" },
    ],
  },

  "Brands": {
    allLink: { title: "All Brands", href: "/shop?filter=brands" },
    links: [
      { title: "VapeKing", href: "/shop?brand=VapeKing" },
      { title: "ZenVapes", href: "/shop?brand=ZenVapes" },
      { title: "CBDElite", href: "/shop?brand=CBDElite" },
    ],
    productPreviews: [
      { id: "fav", title: "FAV", image: "/products/fav.png", href: "/shop/products/fav" },
    ],
  },

  "Disposables": {
    allLink: { title: "All Disposables", href: "/shop?category=Disposables" },
    links: [
      { title: "Single-use Vapes", href: "/shop?category=Disposables&type=Single-use" },
      { title: "Starter Packs", href: "/shop?category=Disposables&type=Starter-Packs" },
    ],
    productPreviews: [
      { id: "winter", title: "Winter", image: "/products/winter.png", href: "/shop/products/winter" },
    ],
  },

  "E-liquids": {
    allLink: { title: "All E-liquids", href: "/shop?category=E-Liquids" },
    links: [
      { title: "CBD Vape Juice", href: "/shop?category=E-Liquids&type=CBD" },
      { title: "Nicotine Juice", href: "/shop?category=E-Liquids&type=Nicotine" },
    ],
    productPreviews: [
      { id: "monster-vape-eliq", title: "Monster Vape Watermelon Ice", image: "/products/monster-vape-watermelon-ice.png", href: "/shop/products/monster-vape-watermelon-ice" },
    ],
  },

  "Nic Pouches": {
    allLink: { title: "All Nic Pouches", href: "/shop?category=Nic-Pouches" },
    links: [
      { title: "Mint", href: "/shop?category=Nic-Pouches&type=Mint" },
      { title: "Fruity", href: "/shop?category=Nic-Pouches&type=Fruity" },
      { title: "Wintergreen", href: "/shop?category=Nic-Pouches&type=Wintergreen" },
      { title: "Citrus", href: "/shop?category=Nic-Pouches&type=Citrus" },
    ],
    productPreviews: [
      { id: "nicmaster", title: "Nicmaster Winter Wint", image: "/products/nic.png", href: "/shop/products/nicmaster-winter-wint" },
    ],
  },

  "Vape Kits": {
    allLink: { title: "All Vape Kits", href: "/shop?category=Vape-Kits" },
    links: [
      { title: "Beginner Kits", href: "/shop?category=Vape-Kits&type=Beginner" },
      { title: "Advanced Kits", href: "/shop?category=Vape-Kits&type=Advanced" },
      { title: "Portable Kits", href: "/shop?category=Vape-Kits&type=Portable" },
      { title: "Desktop Kits", href: "/shop?category=Vape-Kits&type=Desktop" },
    ],
    productPreviews: [
      { id: "cloudvape", title: "CloudVape Oil Kit", image: "/products/cloudvape-oil-kit.png", href: "/shop/products/cloudvape-oil-kit" },
    ],
  },

  "Hemp": {
    allLink: { title: "All Hemp", href: "/shop?category=Hemp" },
    links: [
      { title: "Hemp Gummies", href: "/shop?category=Hemp&type=Gummies" },
      { title: "Hemp Oil", href: "/shop?category=Hemp&type=Oil" },
      { title: "CBD Flowers", href: "/shop?category=Hemp&type=Flowers" },
    ],
    productPreviews: [
      { id: "naturalcbd", title: "NaturalCBD Gummies", image: "/products/gummies.png", href: "/shop/products/naturalcbd-gummies" },
    ],
  },

  "Vaporizers": {
    allLink: { title: "All Vaporizers", href: "/shop?category=Vaporizers" },
    links: [
      { title: "Portable", href: "/shop?category=Vaporizers&type=Portable" },
      { title: "Desktop", href: "/shop?category=Vaporizers&type=Desktop" },
    ],
    productPreviews: [
      { id: "vaporpro", title: "VaporPro Dry Herb", image: "/products/vaporpro-dry-herb.png", href: "/shop/products/vaporpro-dry-herb" },
    ],
  },

  "Glass": {
    allLink: { title: "All Glass", href: "/shop?category=Glass" },
    links: [
      { title: "Bongs", href: "/shop?category=Glass&type=Bongs" },
      { title: "Pipes", href: "/shop?category=Glass&type=Pipes" },
      { title: "Water Pipes", href: "/shop?category=Glass&type=Water-Pipes" },
    ],
    productPreviews: [
      { id: "trippyglass", title: "Trippy Glass Pipe", image: "/products/trippy-glass.png", href: "/shop/products/trippy-glass" },
    ],
  },

  "Accessories": {
    allLink: { title: "All Accessories", href: "/shop?category=Accessories" },
    links: [
      { title: "Batteries", href: "/shop?category=Accessories&type=Batteries" },
      { title: "Chargers", href: "/shop?category=Accessories&type=Chargers" },
      { title: "Replacement Parts", href: "/shop?category=Accessories&type=Parts" },
    ],
    productPreviews: [
      { id: "delta8pro", title: "Delta8Pro Charger", image: "/products/delta8pro-charger.png", href: "/shop/products/delta8pro-charger" },
    ],
  },
};
