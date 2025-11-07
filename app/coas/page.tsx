"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Leaf, Droplet, FileText } from "lucide-react";

const strains = [
  {
    name: "Blue Dream",
    description:
      "A classic hybrid with balanced effects, sweet berry aroma, and smooth smoke.",
    pdf: "/e0298bfa-9551-4046-8190-9e1627c10d67_Update.pdf",
  },
  {
    name: "Sour Diesel",
    description:
      "Energetic sativa with pungent diesel scent, perfect for daytime use.",
    pdf: "/e0298bfa-9551-4046-8190-9e1627c10d67_Update.pdf",
  },
  {
    name: "Girl Scout Cookies",
    description:
      "Award-winning hybrid with sweet and earthy flavors, ideal for relaxation.",
    pdf: "/e0298bfa-9551-4046-8190-9e1627c10d67_Update.pdf",
  },
  {
    name: "OG Kush",
    description:
      "Legendary indica-dominant strain, famous for stress relief and euphoric effects.",
    pdf: "/e0298bfa-9551-4046-8190-9e1627c10d67_Update.pdf",
  },
];

const dabs = [
  {
    name: "Shatter",
    description: "Concentrated cannabis extract with potent effects.",
    pdf: "/e0298bfa-9551-4046-8190-9e1627c10d67_Update.pdf",
  },
  {
    name: "Wax",
    description: "Soft, malleable concentrate for dabbing.",
    pdf: "/e0298bfa-9551-4046-8190-9e1627c10d67_Update.pdf",
  },
  {
    name: "Live Resin",
    description: "Fresh frozen cannabis extract for flavorful dabs.",
    pdf: "/e0298bfa-9551-4046-8190-9e1627c10d67_Update.pdf",
  },
  {
    name: "Rosin",
    description: "Solventless concentrate extracted with heat and pressure.",
    pdf: "/e0298bfa-9551-4046-8190-9e1627c10d67_Update.pdf",
  },
];

export default function COAPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-5xl font-bold mb-12 text-center text-gray-900">
        Certificates of Analysis
      </h1>

      {/* Member Menu Box */}
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          Member Menu <Leaf size={24} className="text-green-500" />
        </h2>
        <a
          href="/e0298bfa-9551-4046-8190-9e1627c10d67_Update.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-shop_light_green text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
        >
          <FileText size={18} /> View Menu
        </a>
      </div>

      <Accordion type="multiple" collapsible className="space-y-4">
        {/* Strains */}
        <AccordionItem value="strains" className="bg-white rounded-xl shadow-md">
          <AccordionTrigger className="flex justify-between items-center p-6 text-lg font-semibold text-gray-800">
            Strains
          </AccordionTrigger>
          <AccordionContent className="p-6 space-y-4">
            {strains.map((strain, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center space-x-4 mb-2 md:mb-0">
                  <Leaf size={40} className="text-green-500" />
                  <div>
                    <h3 className="text-xl font-semibold">{strain.name}</h3>
                    <p className="text-gray-700">{strain.description}</p>
                  </div>
                </div>
                <a
                  href={strain.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 md:mt-0 inline-flex items-center gap-2 bg-shop_light_green text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  <FileText size={16} /> View Certificate
                </a>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Dabs */}
        <AccordionItem value="dabs" className="bg-white rounded-xl shadow-md">
          <AccordionTrigger className="flex justify-between items-center p-6 text-lg font-semibold text-gray-800">
            Dabs
          </AccordionTrigger>
          <AccordionContent className="p-6 space-y-4">
            {dabs.map((dab, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center space-x-4 mb-2 md:mb-0">
                  <Droplet size={40} className="text-blue-500" />
                  <div>
                    <h3 className="text-xl font-semibold">{dab.name}</h3>
                    <p className="text-gray-700">{dab.description}</p>
                  </div>
                </div>
                <a
                  href={dab.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 md:mt-0 inline-flex items-center gap-2 bg-shop_light_green text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  <FileText size={16} /> View Certificate
                </a>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
