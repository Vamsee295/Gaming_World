import React, { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

// Images reused from the store
import homeImg from "@/components/Images/Store Images/HOME SCREEN.jpg";
import spidermanHome from "@/components/Images/Store Images/SPIDERMAN HOMEPAGE.jpg";
import nfsHome from "@/components/Images/Store Images/NFS HOMESCREEN.jpg";
import img3 from "@/components/Images/Store Images/image 3.webp";
import img5 from "@/components/Images/Store Images/image 5.webp";
import img6 from "@/components/Images/Store Images/image 6.webp";
import img7 from "@/components/Images/Store Images/image 7.webp";
import img8 from "@/components/Images/Store Images/image 8.webp";

type Deal = {
  id: number;
  title: string;
  price: string;
  discount?: number;
  image: any;
  releaseDate: string;
  tags: string[];
};

const dealsData: Deal[] = [
  { id: 1, title: "Cyberpunk 2077", price: "$59.99", discount: 20, image: homeImg, releaseDate: "Dec 2020", tags: ["RPG", "Action"] },
  { id: 2, title: "EA SPORTS FC™ 26", price: "$49.99", discount: 50, image: spidermanHome, releaseDate: "Sep 2025", tags: ["Sports", "Multiplayer"] },
  { id: 3, title: "Grand Theft Auto 6", price: "$39.99", image: img3, releaseDate: "2025", tags: ["Action", "Open World"] },
  { id: 4, title: "Need For Speed", price: "$59.99", discount: 30, image: nfsHome, releaseDate: "Nov 2019", tags: ["Racing", "Action"] },
  { id: 5, title: "The Last Of Us", price: "$0.00", image: img5, releaseDate: "Mar 2023", tags: ["Story Rich", "Survival"] },
  { id: 6, title: "Detroit : Become Human", price: "$44.99", discount: 25, image: img6, releaseDate: "May 2018", tags: ["Narrative", "Adventure"] },
  { id: 7, title: "A Way Out", price: "$29.99", image: img7, releaseDate: "Mar 2018", tags: ["Co-op", "Adventure"] },
  { id: 8, title: "Black Myth Wukong", price: "$0.00", image: img8, releaseDate: "2024", tags: ["Action", "RPG"] },
];

function parsePrice(p: string) {
  return p === "$0.00" ? 0 : parseFloat(p.slice(1));
}

export default function DealsPage() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceMax, setPriceMax] = useState<number>(100);
  const [onlyDiscounts, setOnlyDiscounts] = useState<boolean>(true);
  const [hideFree, setHideFree] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const map = new Map<string, number>();
    dealsData.forEach(d => d.tags.forEach(t => map.set(t, (map.get(t) || 0) + 1)));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const filtered = useMemo(() => {
    let list = dealsData.filter(d => parsePrice(d.price) <= priceMax);
    if (onlyDiscounts) list = list.filter(d => (d.discount || 0) > 0);
    if (hideFree) list = list.filter(d => parsePrice(d.price) > 0);
    if (query.trim()) list = list.filter(d => d.title.toLowerCase().includes(query.toLowerCase()));
    if (selectedTags.length) list = list.filter(d => selectedTags.every(t => d.tags.includes(t)));
    switch (sortBy) {
      case "discount":
        list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "price":
        list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "date":
        list.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
        break;
      default:
        break;
    }
    return list;
  }, [query, sortBy, priceMax, onlyDiscounts, hideFree, selectedTags]);

  return (
    <>
      <Head>
        <title>Specials - Deals</title>
      </Head>
      <div className="min-h-screen bg-background">
        {/* Header bar with search */}
        <div className="border-b border-border bg-secondary/30">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">SPECIALS</h1>
              <span className="text-muted-foreground">All Products</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Input
                placeholder="enter search term or tag"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full sm:w-[320px]"
              />
              <Button variant="outline" className="gap-2"><Search className="h-4 w-4"/>Search</Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]"><SelectValue placeholder="Sort" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="discount">Discount</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="date">Release Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left - deals list */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs text-muted-foreground mb-2">
              {filtered.length} results match your search.
            </div>

            {filtered.map(deal => {
              const priceNum = parsePrice(deal.price);
              const effective = deal.discount ? priceNum * (1 - deal.discount / 100) : priceNum;
              return (
                <Link key={deal.id} href={`/game/${deal.id}`}>
                  <Card className="p-3 hover:border-primary transition-colors">
                    <div className="grid grid-cols-[120px_1fr_160px] items-center gap-4">
                      <div className="relative h-[70px] w-[120px] overflow-hidden rounded">
                        <Image src={deal.image} alt={deal.title} fill className="object-cover" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{deal.releaseDate}</span>
                        </div>
                        <div className="text-foreground font-semibold">{deal.title}</div>
                        <div className="flex items-center gap-2">
                          {deal.tags.slice(0,3).map(t => (
                            <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-3">
                        {deal.discount && (
                          <Badge className="bg-green-600 text-white">-{deal.discount}%</Badge>
                        )}
                        <div className="text-right">
                          {deal.discount ? (
                            <>
                              <div className="text-xs line-through text-muted-foreground">{deal.price}</div>
                              <div className="text-sm font-bold text-green-500">${effective.toFixed(2)}</div>
                            </>
                          ) : (
                            <div className="text-sm font-bold text-foreground">{priceNum === 0 ? "Free" : deal.price}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Right - filters */}
          <div className="space-y-6">
            <Card className="p-4 space-y-4">
              <h3 className="font-semibold text-foreground">Narrow by Price</h3>
              <div className="text-sm text-muted-foreground">Any Price</div>
              <Slider value={[priceMax]} onValueChange={(v) => setPriceMax(v[0])} min={0} max={100} step={1} />
            </Card>

            <Card className="p-4 space-y-3">
              <h3 className="font-semibold text-foreground">Narrow by preferences</h3>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={onlyDiscounts} onChange={e => setOnlyDiscounts(e.target.checked)} />
                Discounts & Events
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={hideFree} onChange={e => setHideFree(e.target.checked)} />
                Hide free to play items
              </label>
            </Card>

            <Card className="p-4 space-y-3">
              <h3 className="font-semibold text-foreground">Narrow by tag</h3>
              <div className="space-y-2">
                {allTags.map(([tag, count]) => (
                  <label key={tag} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={(e) => {
                          setSelectedTags(prev => e.target.checked ? [...prev, tag] : prev.filter(t => t !== tag));
                        }}
                      />
                      {tag}
                    </span>
                    <span className="text-muted-foreground">{count}</span>
                  </label>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

