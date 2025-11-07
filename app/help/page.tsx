"use client";

import React from "react";
import Container from "@/components/ui/Container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const helpTopics = [
  {
    title: "How to Place an Order",
    content:
      "Browse our vape products, e-liquids, and accessories, then click 'Add to Cart'. Once ready, proceed to checkout, provide your shipping information, and complete your payment. A confirmation email will be sent once your order is placed.",
  },
  {
    title: "Shipping & Delivery",
    content:
      "We ship nationwide! Orders are usually processed within 1 business day. Standard shipping takes 2-5 business days, while expedited shipping is available at checkout. Vape products require adult signature upon delivery.",
  },
  {
    title: "Order Tracking",
    content:
      "After your order is shipped, you'll receive a tracking number via email. Use this number to monitor your package until it arrives.",
  },
  {
    title: "Returns & Exchanges",
    content:
      "We accept returns or exchanges for defective or incorrect items within 14 days of delivery. Vape products must remain sealed. Contact our support team to initiate a return or exchange.",
  },
  {
    title: "Account Management",
    content:
      "Create an account to save your shipping info, track orders, and manage preferences. You can also reset your password or update your email address in account settings.",
  },
  {
    title: "Payment Options",
    content:
      "We accept all major credit cards, debit cards, and digital wallets. All transactions are secure and encrypted.",
  },
  {
    title: "Product Information",
    content:
      "All our vape products are third-party tested for quality and safety. Check each product page for detailed specifications, ingredients, and certificates of analysis.",
  },
  {
    title: "Vape Safety & Usage",
    content:
      "Always follow manufacturer instructions. Keep products out of reach of children and pets. If you are pregnant, nursing, or have health concerns, consult a healthcare professional before use.",
  },
  {
    title: "Contacting Support",
    content:
      "Need help? Our support team is available Mon-Sat: 10am-9pm, Sun: 11am-7pm. Call us at (412) 551-6026 or email smokinparadise1@gmail.com.",
  },
  {
    title: "FAQs",
    content:
      "Check our FAQ section for answers to common questions about products, orders, shipping, and vape usage tips.",
  },
];

export default function HelpPage() {
  return (
    <section className="py-32 bg-white">
      <Container className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-black">
            Vape Shop Help Center
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Find answers and guidance on orders, shipping, account management, and vape product safety.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {helpTopics.map((item, index) => (
            <AccordionItem
              key={index}
              value={`topic-${index}`}
              className="bg-white border border-black rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="flex justify-between items-center text-lg font-semibold text-black px-6 py-4 hover:bg-orange-100 rounded-xl transition-colors">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-800 border-t border-black/20">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-800 mb-4">
            Still need help? Contact our support team and we'll assist you quickly.
          </p>
          <a
            href="/contact"
            className="inline-block bg-orange-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-orange-400 transition-colors shadow-md hover:shadow-lg"
          >
            Contact Support
          </a>
        </div>
      </Container>
    </section>
  );
}
