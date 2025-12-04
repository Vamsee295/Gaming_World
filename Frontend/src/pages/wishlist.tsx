import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, TrendingDown, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WishlistPage() {
  const { items, removeItem, clear, totalItems } = useWishlist();
  const { addItem } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">My Wishlist</h1>
        <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
          <Heart className="h-4 w-4 text-primary" />
          <span className="text-sm text-foreground font-semibold">Saved Items</span>
          <span className="text-sm text-primary">{totalItems}</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border border-border rounded-lg bg-secondary">
          <Heart className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-6">Your wishlist is empty.</p>
          <Link href="/">
            <Button>Browse Games</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 rounded-lg border border-border bg-secondary p-4">
              <div className="relative h-28 w-44 overflow-hidden rounded">
                <Image src={item.image as any} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Base Game</div>
                    <h3 className="text-foreground font-semibold">{item.title}</h3>
                  </div>
                  <div className="text-right">
                    {item.originalPrice && item.originalPrice > item.price ? (
                      <div className="space-y-1">
                        <div className="text-lg font-semibold text-green-500">₹{item.price.toFixed(2)}</div>
                        <div className="text-sm line-through text-muted-foreground">₹{item.originalPrice.toFixed(2)}</div>
                        <Badge className="bg-green-600 text-white text-xs">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          {((1 - item.price / item.originalPrice) * 100).toFixed(0)}% OFF
                        </Badge>
                      </div>
                    ) : (
                      <div className="text-lg font-semibold text-foreground">₹{item.price.toFixed(2)}</div>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-end gap-4">
                  <button onClick={() => removeItem(item.id)} className="text-primary hover:underline">Remove</button>
                  <Button
                    size="sm"
                    onClick={() => {
                      addItem({ id: item.id, title: item.title, price: item.price, image: item.image });
                      removeItem(item.id);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button variant="outline" onClick={clear}>Clear wishlist</Button>
          </div>
        </div>
      )}
    </div>
  );
}




