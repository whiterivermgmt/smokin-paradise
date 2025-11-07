'use client';

import React from "react";
import Container from "@/components/ui/Container";

const policySections = [
  {
    id: "info",
    title: "Information We Collect",
    content:
      "We may collect personal information such as your name, email address, phone number, billing and shipping addresses, and payment information when you place an order or sign up for our newsletter.",
  },
  {
    id: "use",
    title: "How We Use Your Information",
    content:
      "We use your information to process orders, provide customer support, send promotional emails (if you opt in), and improve our services. We do not sell your personal information to third parties.",
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    content:
      "Our website may use cookies and similar technologies to enhance your browsing experience, remember preferences, and analyze site traffic. You can manage cookie settings in your browser.",
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    content:
      "We may use third-party services for payment processing, shipping, analytics, and marketing. These providers have their own privacy policies and are only granted access to your data as necessary.",
  },
  {
    id: "security",
    title: "Data Security",
    content:
      "We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction.",
  },
  {
    id: "rights",
    title: "Your Rights",
    content:
      "You have the right to access, correct, or request deletion of your personal information. You may also opt out of marketing communications at any time by clicking unsubscribe or contacting us directly.",
  },
  {
    id: "children",
    title: "Children’s Privacy",
    content:
      "Our website and products are not directed to individuals under 18. We do not knowingly collect personal information from children.",
  },
  {
    id: "international",
    title: "International Users",
    content:
      "If you access our website from outside the United States, your data may be transferred and stored in the U.S. By using our website, you consent to this transfer.",
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. Changes will be posted on this page. We encourage you to review it periodically.",
  },
  {
    id: "contact",
    title: "Contact Us",
    content:
      "For questions about this Privacy Policy or our data practices, contact us:\n\nEmail: mgmt@escosgreen.com\nPhone: (812) 765-1300\nAddress: 2700 John A Williams Blvd, Bedford, IN 47421",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="py-32 bg-white">
      <Container className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-black">
            Privacy Policy
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you shop with us.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
          <h2 className="text-xl font-bold text-black mb-4">Table of Contents</h2>
          <ul className="space-y-2 list-disc list-inside">
            {policySections.map((section, idx) => (
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

        {/* Policy Sections */}
        <div className="space-y-8">
          {policySections.map((section, idx) => (
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
