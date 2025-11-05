import type { AppProps } from 'next/app'
import '../styles/globals.css';
import '../styles/signin.css';
import { Toaster } from "@/components/ui/toaster"
import { useEffect, useState } from 'react';
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { WishlistProvider } from "@/context/WishlistContext";

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get the color-scheme value from :root
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const colorScheme = computedStyle.getPropertyValue('--mode').trim().replace(/"/g, '');
    if (colorScheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
    setMounted(true);
  }, []);

  // Prevent flash while theme loads
  if (!mounted) {
    return null;
  }

  return (
    <UserProvider>
      <WishlistProvider>
        <CartProvider>
          <div className="min-h-screen">
            <Component {...pageProps} />
            <Toaster />
          </div>
        </CartProvider>
      </WishlistProvider>
    </UserProvider>
  )
}