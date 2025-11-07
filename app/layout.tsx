import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { FavoriteProvider } from "@/app/context/FavoriteContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "@/lib/authContext"; // ✅ import auth provider

export const metadata: Metadata = {
  title: {
    template: "%s - Smokin' Paradise",
    default: "Smokin' Paradise",
  },
  description: "Smokin' Paradise online store, Your one stop shop for all your Needs!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-poppins antialiased">
        <FavoriteProvider>
          <CartProvider>
            <AuthProvider> 
              <div className="flex flex-col min-h-screen mt-2">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </AuthProvider>
          </CartProvider>
        </FavoriteProvider>
      </body>
    </html>
  );
}
