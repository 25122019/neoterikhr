"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Image from "next/image";
import { Review, reviews as mockReviews } from "@/lib/data";

export default function Home() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Mock data is already set, no need to fetch
  }, []);

  const categories = ["All", ...Array.from(new Set(reviews.map(r => r.category)))];

  const filteredReviews = reviews.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || 
                         r.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen relative" data-design-id="home-page">
      <div className="affiliate-bg" data-design-id="affiliate-bg"></div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-primary/10 to-transparent" data-design-id="hero-section">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          data-design-id="hero-content"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight" data-design-id="hero-title">
            {t('welcome')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10" data-design-id="hero-subtitle">
            Discover the best tools, gear, and training for your digital journey. Honest reviews by experts.
          </p>
          
          <div className="max-w-md mx-auto relative" data-design-id="search-container">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              className="pl-10 h-12 rounded-full border-primary/20 focus:border-primary" 
              placeholder={t('search_placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-design-id="search-input"
            />
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-8 border-y bg-muted/30" data-design-id="categories-section">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-2" data-design-id="categories-list">
          {categories.map(cat => (
            <Button 
              key={cat} 
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full"
              data-design-id={`cat-btn-${cat}`}
            >
              {cat === "All" ? t('all_categories') : cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 container mx-auto px-4" data-design-id="reviews-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-design-id="reviews-grid">
          {filteredReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              data-design-id={`review-card-wrapper-${review.id}`}
            >
              <Card className="h-full flex flex-col hover:shadow-xl transition-shadow border-primary/10 overflow-hidden group" data-design-id={`review-card-${review.id}`}>
                <div className="relative h-48 overflow-hidden" data-design-id={`review-img-container-${review.id}`}>
                  <img 
                    src={review.image} 
                    alt={review.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-design-id={`review-img-${review.id}`}
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold flex items-center gap-1" data-design-id={`review-rating-${review.id}`}>
                    <Star className="w-3 h-3 fill-current" />
                    {review.rating}
                  </div>
                </div>
                <CardHeader data-design-id={`review-header-${review.id}`}>
                  <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2" data-design-id={`review-cat-${review.id}`}>{review.category}</div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors" data-design-id={`review-title-${review.id}`}>{review.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow" data-design-id={`review-content-${review.id}`}>
                  <p className="text-muted-foreground text-sm line-clamp-3" data-design-id={`review-desc-${review.id}`}>
                    {review.description}
                  </p>
                </CardContent>
                <CardFooter data-design-id={`review-footer-${review.id}`}>
                  <Link href={`/reviews/${review.slug}`} className="w-full" data-design-id={`review-link-${review.id}`}>
                    <Button className="w-full gap-2" data-design-id={`review-btn-${review.id}`}>
                      {t('read_more')}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="py-12 border-t bg-muted/50" data-design-id="footer">
        <div className="container mx-auto px-4 text-center" data-design-id="footer-container">
          <div className="flex items-center justify-center gap-2 mb-6" data-design-id="footer-logo">
            <Image src="/logo.svg" alt="Logo" width={24} height={24} data-design-id="footer-logo-img" />
            <span className="font-bold text-lg" data-design-id="footer-brand">NeoterikHR</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4" data-design-id="footer-disclosure">
            {t('affiliate_disclosure')}
          </p>
          <p className="text-sm text-muted-foreground" data-design-id="footer-copy">
            {t('footer_text')}
          </p>
        </div>
      </footer>
    </main>
  );
}