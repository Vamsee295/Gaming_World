import type { AppProps } from 'next/app'
import '../styles/globals.css';
import '../styles/signin.css';
import '../components/LogoLoop.css';
import '../components/SpotlightCard.css';
import { Toaster } from "@/components/ui/toaster"
import { useEffect, useState } from 'react';
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { RewardsProvider } from "@/context/RewardsContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CommunityProvider } from "@/context/CommunityContext";
import { FriendsProvider } from "@/context/FriendsContext";
import { NotificationsProvider } from "@/context/NotificationsContext";
import { ToastProvider } from "@/context/ToastContext";

import ClickSpark from '@/components/ClickSpark';
import LightRays from '@/components/ui/LightRays';

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
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <WishlistProvider>
            <CartProvider>
              <RewardsProvider>
                <CommunityProvider>
                  <FriendsProvider>
                    <NotificationsProvider>
                      <ToastProvider>
                        <ClickSpark
                          sparkColor='#fff'
                          sparkSize={10}
                          sparkRadius={15}
                          sparkCount={8}
                          duration={400}
                        >
                          <div className="min-h-screen relative overflow-x-hidden bg-background">
                            {/* Global LightRays Background Layer */}
                            <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
                              <LightRays
                                raysOrigin="top-center"
                                raysColor="#ffffff"
                                raysSpeed={1}
                                lightSpread={0.5}
                                rayLength={3}
                                followMouse={true}
                                mouseInfluence={0.1}
                                noiseAmount={0}
                                distortion={0}
                                pulsating={false}
                                fadeDistance={1}
                                saturation={1}
                              />
                            </div>
                            {/* Main Content Layer */}
                            <div className="relative z-10 bg-transparent">
                              <Component {...pageProps} />
                            </div>
                            <Toaster />
                          </div>
                        </ClickSpark>
                      </ToastProvider>
                    </NotificationsProvider>
                  </FriendsProvider>
                </CommunityProvider>
              </RewardsProvider>
            </CartProvider>
          </WishlistProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
