'use client';

import React from "react";
import Container from "@/components/ui/Container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqData = [
  {
    question: "Do I need to be 21 to order?",
    answer:
      "Yes, all customers must be at least 21 years old to purchase vape products. Age verification is required at checkout or upon delivery/pickup.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Browse our vape products, add your selections to the cart, and proceed to checkout. Enter your shipping information, choose your delivery or store pickup option, and complete payment.",
  },
  {
    question: "What shipping options are available?",
    answer:
      "We offer standard shipping (2-5 business days) and expedited shipping at checkout. Store pickup is also available at our Bedford, IN location.",
  },
  {
    question: "Do you ship vape products nationwide?",
    answer:
      "Yes, we ship vape products across the U.S. All shipments require an adult signature upon delivery.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. Use it to monitor the delivery status until it arrives.",
  },
  {
    question: "What is your return/exchange policy?",
    answer:
      "We accept returns or exchanges for defective or incorrect items within 14 days. Vape products must remain sealed. Contact our support team to initiate a return.",
  },
  {
    question: "Do your products contain nicotine?",
    answer:
      "Yes, many of our vape products contain nicotine. Always check product descriptions and labels for nicotine content before purchasing.",
  },
  {
    question: "Are your products tested for safety?",
    answer:
      "All our vape products are third-party tested for quality, safety, and compliance. Certificates of analysis are available on each product page.",
  },
  {
    question: "Can I pick up my order in-store?",
    answer:
      "Yes! Store pickup is available at 3078 John A Williams Blvd, Bedford, IN. Select the 'Store Pickup' option at checkout.",
  },
  {
    question: "How do I contact support?",
    answer:
      "For help with orders, products, or returns, call us at (412) 551-6026 or email smokinparadise1@gmail.com. Our support team is available Mon-Sat: 10am-9pm, Sun: 11am-7pm.",
  },
];

export default function FAQPage() {
  return (
    <section className="py-32 bg-white">
      <Container className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-black">Vape Shop FAQ</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Find answers to common questions about ordering, shipping, products, and safety.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-white border border-black rounded-xl shadow-sm hover:shadow-md transition"
            >
              <AccordionTrigger className="flex justify-between items-center text-lg font-semibold text-black px-6 py-4 hover:bg-orange-100 rounded-xl transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-800 border-t border-black/20">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-800 mb-4">
            Still have questions? Contact our support team for personalized assistance.
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
