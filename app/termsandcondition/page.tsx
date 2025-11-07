'use client';

import React from "react";
import Container from "@/components/ui/Container";

const termsSections = [
  {
    id: "eligibility",
    title: "Eligibility",
    content:
      "You must be at least 18 years old to purchase our vape products or access this website. By using this site, you confirm that you meet this age requirement.",
  },
  {
    id: "product-info",
    title: "Product Information",
    content:
      "All products comply with federal regulations. Descriptions, images, and pricing are subject to change. Products are not intended to diagnose, treat, cure, or prevent any disease.",
  },
  {
    id: "ordering-payment",
    title: "Ordering & Payment",
    content:
      "Orders must be placed through our website. Prices are in USD and subject to taxes and shipping fees. Payment is processed securely via our approved payment methods.",
  },
  {
    id: "shipping-delivery",
    title: "Shipping & Delivery",
    content:
      "We ship within the United States only. Delivery times may vary by location and carrier. We are not responsible for carrier delays.",
  },
  {
    id: "returns-refunds",
    title: "Returns & Refunds",
    content:
      "Returns are accepted within 30 days of purchase for unopened items in original packaging. Customized or opened items are not eligible. Refunds are issued upon receipt and inspection.",
  },
  {
    id: "user-conduct",
    title: "User Conduct",
    content:
      "You agree not to use our website for illegal purposes or distribute harmful content. Misuse may result in termination of access.",
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content:
      "All content, images, logos, and branding are the property of Escos Green or its licensors. Unauthorized use is prohibited.",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content:
      "We are not liable for direct, indirect, or incidental damages from using our products or website. Use products responsibly according to applicable laws.",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    content:
      "Your personal information is collected and used in accordance with our Privacy Policy. By using this site, you consent to our data practices.",
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content:
      "These terms are governed by the laws of Indiana. Disputes will be resolved in the appropriate courts of Indiana.",
  },
  {
    id: "changes",
    title: "Changes to Terms",
    content:
      "We may update these terms at any time without prior notice. Users are encouraged to review them periodically.",
  },
];

export default function TermsPage() {
  return (
    <section className="py-32 bg-white">
      <Container className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-black">
            Terms & Conditions
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Please read these terms carefully before using our website or purchasing any products. By accessing or using our site, you agree to be bound by these terms.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
          <h2 className="text-xl font-bold text-black mb-4">Table of Contents</h2>
          <ul className="space-y-2 list-disc list-inside">
            {termsSections.map((section, idx) => (
              <li key={idx}>
                <a
                  href={`#${section.id}`}
                  className="text-gray-800 hover:text-orange-500 font-medium transition-colors"
                >
                  {idx + 1}. {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {termsSections.map((section, idx) => (
            <div
              key={idx}
              id={section.id}
              className="p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-2xl font-bold text-black mb-2">
                {idx + 1}. {section.title}
              </h2>
              <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
