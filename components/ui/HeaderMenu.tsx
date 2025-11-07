'use client';

import { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { megaMenuData } from "@/lib/megaMenuData";
import { products as allProducts } from "@/data/products";

const HeaderMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const desktopMenuItems = [
    { title: "All", href: "/shop" },
    { title: "Brands", href: "/shop?filter=brands" },
    { title: "Disposables", href: "/shop?category=Disposables" },
    { title: "E-liquids", href: "/shop?category=E-Liquids" },
    { title: "Nic Pouches", href: "/shop?category=Nic-Pouches" },
    { title: "Vape Kits", href: "/shop?category=Vape-Kits" },
    { title: "Hemp", href: "/shop?category=Hemp" },
    { title: "Vaporizers", href: "/shop?category=Vaporizers" },
    { title: "Glass", href: "/shop?category=Glass" },
    { title: "Accessories", href: "/shop?category=Accessories" },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  const handleMouseEnter = (menu: string) => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => setHoveredMenu(null), 300);
  };

  // Click top menu or sublink
  const handleFilterClick = (href: string) => {
    router.push(href); // Navigate with category/filter query
    setHoveredMenu(null);
  };

  return (
    <nav className="hidden md:flex justify-start items-center gap-7 text-[1.08rem] font-sans capitalize font-bold relative z-10">
      {desktopMenuItems.map((item) => {
        const active = isActive(item.href);
        const mega = megaMenuData[item.title];

        // Get 2 product previews for mega menu
        const menuProducts = allProducts
          .filter(p =>
            item.title === "All" || item.title === "New"
              ? true
              : p.category.replace(/\s+/g, "-").toLowerCase() === item.title.replace(/\s+/g, "-").toLowerCase()
          )
          .slice(0, 2);

        return (
          <div
            key={item.title}
            className="relative"
            ref={(el) => { menuRefs.current[item.title] = el; }}
            onMouseEnter={() => handleMouseEnter(item.title)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Top menu link */}
            <button
              onClick={() => handleFilterClick(item.href)}
              className={cn(
                "relative transition-colors duration-300",
                active || hoveredMenu === item.title ? "text-orange-500" : "text-white"
              )}
            >
              {item.title}
              <span
                className={cn(
                  "absolute -bottom-0.5 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 ease-out origin-left",
                  active || hoveredMenu === item.title ? "scale-x-100" : ""
                )}
              />
            </button>

            {/* Mega Menu */}
            {mega && hoveredMenu === item.title && (
              <div
                className="absolute top-full mt-2 w-[600px] bg-white shadow-lg z-50"
                style={{
                  left:
                    menuRefs.current[item.title]?.getBoundingClientRect().left! + 600 >
                    window.innerWidth
                      ? "auto"
                      : 0,
                  right:
                    menuRefs.current[item.title]?.getBoundingClientRect().left! + 600 >
                    window.innerWidth
                      ? 0
                      : "auto",
                }}
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex p-6 gap-6">
                  {/* Left column: All + links */}
                  <div className="flex flex-col gap-2 min-w-[200px]">
                    <button
                      onClick={() => handleFilterClick(mega.allLink.href)}
                      className="py-2 px-3 text-black font-semibold hover:text-orange-500 rounded-lg text-left"
                    >
                      {mega.allLink.title}
                    </button>
                    {mega.links.map((link) => (
                      <button
                        key={link.title}
                        onClick={() => handleFilterClick(link.href)}
                        className="py-2 px-3 text-black hover:text-orange-500 rounded-lg text-left"
                      >
                        {link.title}
                      </button>
                    ))}
                  </div>

                  {/* Right column: product previews */}
                  {menuProducts.length > 0 && (
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      {menuProducts.map((prod) => (
                        <button
                          key={prod.id}
                          onClick={() => router.push(`/shop/${prod.slug}`)}
                          className="flex flex-col w-full h-48 bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                        >
                          <img
                            src={prod.image}
                            alt={prod.title}
                            className="w-full h-36 object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <div className="px-2 py-1 text-sm font-semibold text-black truncate">
                            {prod.title}
                          </div>
                          <div className="px-2 text-sm font-bold text-orange-600">
                            ${prod.price.toFixed(2)}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default HeaderMenu;
