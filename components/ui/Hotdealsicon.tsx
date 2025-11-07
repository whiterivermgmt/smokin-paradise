// HotDealsIcon.tsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Flame } from "lucide-react";
import HotDealsMenu from "./Hotdealsmenu";
import { products } from "@/lib/products";

const HotDealsIcon = () => {
  const [open, setOpen] = useState(false);
  const hotDeals = products.filter((p) => p.hotDeal);

  return (
    <>
      <button onClick={() => setOpen(true)} className="p-1">
        <Flame className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      </button>

      {open &&
        createPortal(
          <HotDealsMenu
            isOpen={open}
            onClose={() => setOpen(false)}
            hotDeals={hotDeals}
          />,
          document.body // renders outside the header
        )}
    </>
  );
};

export default HotDealsIcon;
