import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart, Coins, Info } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function CartPage() {
  const { items, removeItem, clear, totalItems, totalPrice } = useCart();
  const { addItem: addWishlistItem } = useWishlist();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">My Cart</h1>
        <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
          <Coins className="h-4 w-4 text-primary" />
          <span className="text-sm text-foreground font-semibold">Epic Rewards</span>
          <span className="text-sm text-primary">₹0.00</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border border-border rounded-lg bg-secondary">
          <ShoppingCart className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-6">Your cart is empty.</p>
          <Link href="/">
            <Button>Browse Games</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
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
                      <div className="mt-2 inline-flex items-center gap-2">
                        <span className="rounded bg-muted px-2 py-0.5 text-xs text-foreground">T</span>
                        <span className="text-xs text-muted-foreground">Action, Adventure</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-foreground">₹{(item.price * item.quantity).toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded bg-muted/40 px-3 py-2 text-sm text-foreground">
                    <Coins className="h-4 w-4 text-primary" />
                    <span>Earn a boosted <span className="font-semibold">20%</span> back in Epic Rewards</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Info className="h-3.5 w-3.5" />
                    <span>Self-Refundable</span>
                  </div>
                  <div className="mt-3 flex items-center justify-end gap-4">
                    <button onClick={() => removeItem(item.id)} className="text-primary hover:underline">Remove</button>
                    <button
                      className="text-primary/80 hover:underline"
                      onClick={() => {
                        addWishlistItem({ id: item.id, title: item.title, price: item.price, image: item.image });
                        removeItem(item.id);
                      }}
                    >
                      Move to wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-lg border border-border bg-secondary p-6 lg:sticky lg:top-6">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Games and Apps Summary</h2>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Items</span>
              <span className="text-foreground font-medium">{totalItems}</span>
            </div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Price</span>
              <span className="text-foreground font-medium">₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Sale Discount</span>
              <span className="text-green-500 font-medium">₹0.00</span>
            </div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Taxes</span>
              <span className="text-muted-foreground">Calculated at Checkout</span>
            </div>
            <div className="my-4 border-t border-border" />
            <div className="mb-6 flex items-center justify-between text-lg font-semibold text-foreground">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <Button className="mb-3 w-full">Check Out</Button>
            <Button variant="outline" className="w-full" onClick={clear}>Clear cart</Button>
          </div>
        </div>
      )}
    </div>
  );
}


