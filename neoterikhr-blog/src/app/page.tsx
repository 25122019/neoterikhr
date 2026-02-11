"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Search, Filter, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Review, reviews as mockReviews } from "@/lib/data";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const lang = (i18n.language?.slice(0, 2) as "en" | "vi" | "de") || "en";

const pick = (val: string | Record<"en" | "vi" | "de", string>) =>
  typeof val === "string" ? val : (val[lang] ?? val.en);

const norm = (val: string | Record<"en" | "vi" | "de", string>) =>
  pick(val).toLowerCase();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = ["All", ...Array.from(new Set(mockReviews.map(r => r.category)))];

const filteredReviews = reviews.filter((r) => {
  const q = search.toLowerCase();

  const matchesSearch =
    norm(r.title).includes(q) || norm(r.description).includes(q);

  const matchesCategory =
    selectedCategory === "All" || r.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

  return (
    <main className="min-h-screen relative bg-[#fafafa]" data-design-id="home-page">
      <div className="affiliate-bg" data-design-id="affiliate-bg"></div>
      <Navbar />
      
      {/* Modern Minimalist Hero */}
      <section className="pt-24 pb-16 px-4" data-design-id="hero-section">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12" data-design-id="hero-flex">
            <div className="flex-1 text-left" data-design-id="hero-text">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4" data-design-id="hero-badge">
                  #1 Affiliate Resource 2026
                </span>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-slate-900" data-design-id="hero-title">
                  Expert <span className="text-primary">Reviews</span> for Smart Choices.
                </h1>
                <p className="text-xl text-slate-600 mb-8 max-w-lg" data-design-id="hero-subtitle">
                  We test, you thrive. Get unbiased insights into the tools that power the digital economy.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4" data-design-id="hero-actions">
                  <div className="relative flex-grow max-w-md" data-design-id="search-wrapper">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input 
                      className="pl-12 h-14 rounded-2xl border-slate-200 shadow-sm focus:ring-primary" 
                      placeholder={t('search_placeholder')}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      data-design-id="search-input"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div 
              className="flex-1 hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              data-design-id="hero-image-container"
            >
              <div className="relative" data-design-id="hero-img-wrapper">
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl" data-design-id="hero-blur"></div>
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                  alt="Hero" 
                  className="relative rounded-3xl shadow-2xl border-8 border-white"
                  data-design-id="hero-main-img"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Refined Filter Bar */}
      <section className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-y py-4" data-design-id="filter-bar">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4" data-design-id="filter-container">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar" data-design-id="cat-list">
            <Filter className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                data-design-id={`cat-btn-${cat}`}
              >
                {cat === "All" ? t('all_categories') : cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center bg-slate-100 p-1 rounded-xl" data-design-id="view-toggle">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-primary" : "text-slate-400"}`}
              data-design-id="view-grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-primary" : "text-slate-400"}`}
              data-design-id="view-list"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Redesigned Content Area */}
      <section className="py-16 container mx-auto px-4" data-design-id="content-section">
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" 
          : "flex flex-col gap-6 max-w-4xl mx-auto"
        } data-design-id="reviews-container">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                data-design-id={`review-item-${review.id}`}
              >
                {viewMode === "grid" ? (
                  <Link href={`/reviews/${review.slug}`} className="group block h-full" data-design-id={`link-grid-${review.id}`}>
                    <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col" data-design-id={`card-grid-${review.id}`}>
                      <div className="relative h-64 overflow-hidden" data-design-id={`img-grid-wrapper-${review.id}`}>
                        <img 
                          src={review.image} 
                          alt={review.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          data-design-id={`img-grid-${review.id}`}
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary" data-design-id={`badge-grid-${review.id}`}>
                          {review.category}
                        </div>
                        <div className="absolute bottom-4 right-4 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1" data-design-id={`rating-grid-${review.id}`}>
                          <Star className="w-3 h-3 fill-primary text-primary" />
                          {review.rating}
                        </div>
                      </div>
                      <div className="p-8 flex flex-col flex-grow" data-design-id={`info-grid-${review.id}`}>
                        <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-primary transition-colors line-clamp-2" data-design-id={`title-grid-${review.id}`}>
                          {review.title}
                        </h3>
                        <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow" data-design-id={`desc-grid-${review.id}`}>
                          {review.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50" data-design-id={`footer-grid-${review.id}`}>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest" data-design-id={`read-grid-${review.id}`}>{t('read_more')}</span>
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors" data-design-id={`icon-grid-${review.id}`}>
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link href={`/reviews/${review.slug}`} className="group block" data-design-id={`link-list-${review.id}`}>
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-8 items-center" data-design-id={`card-list-${review.id}`}>
                      <div className="w-full md:w-48 h-32 shrink-0 rounded-2xl overflow-hidden" data-design-id={`img-list-wrapper-${review.id}`}>
                        <img src={review.image} alt={review.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-design-id={`img-list-${review.id}`} />
                      </div>
                      <div className="flex-grow" data-design-id={`info-list-${review.id}`}>
                        <div className="flex items-center gap-3 mb-2" data-design-id={`meta-list-${review.id}`}>
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary" data-design-id={`cat-list-${review.id}`}>{review.category}</span>
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-900" data-design-id={`rating-list-${review.id}`}>
                            <Star className="w-3 h-3 fill-primary text-primary" />
                            {review.rating}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-2" data-design-id={`title-list-${review.id}`}>{review.title}</h3>
                        <p className="text-slate-500 text-sm line-clamp-2" data-design-id={`desc-list-${review.id}`}>{review.description}</p>
                      </div>
                      <div className="shrink-0" data-design-id={`action-list-${review.id}`}>
                        <Button variant="ghost" className="rounded-full group-hover:bg-primary group-hover:text-white" data-design-id={`btn-list-${review.id}`}>
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-20 bg-slate-900 text-white" data-design-id="footer">
        <div className="container mx-auto px-4" data-design-id="footer-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16" data-design-id="footer-grid">
            <div data-design-id="footer-brand-col">
              <div className="flex items-center gap-2 mb-6" data-design-id="footer-logo">
                <Image src="/logo.svg" alt="Logo" width={32} height={32} data-design-id="footer-logo-img" />
                <span className="font-black text-2xl tracking-tighter">NEOTERIK<span className="text-primary">HR</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed" data-design-id="footer-desc">
                The ultimate destination for affiliate marketers and digital entrepreneurs seeking honest, data-driven reviews.
              </p>
            </div>
            <div data-design-id="footer-links-col">
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-primary" data-design-id="footer-links-title">Quick Links</h4>
              <ul className="space-y-4 text-sm text-slate-400" data-design-id="footer-links-list">
                <li><Link href="/" className="hover:text-white transition-colors" data-design-id="f-link-home">{t('home')}</Link></li>
                <li><Link href="/reviews" className="hover:text-white transition-colors" data-design-id="f-link-reviews">{t('reviews')}</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors" data-design-id="f-link-about">{t('about')}</Link></li>
              </ul>
            </div>
            <div data-design-id="footer-newsletter-col">
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-primary" data-design-id="footer-newsletter-title">Newsletter</h4>
              <div className="flex gap-2" data-design-id="newsletter-form">
                <Input className="bg-slate-800 border-none text-white rounded-xl" placeholder="Email address" data-design-id="newsletter-input" />
                <Button className="rounded-xl" data-design-id="newsletter-btn">Join</Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center" data-design-id="footer-bottom">
            <p className="text-xs text-slate-500 mb-4" data-design-id="footer-disclosure">
              {t('affiliate_disclosure')}
            </p>
            <p className="text-xs text-slate-500" data-design-id="footer-copy">
              {t('footer_text')}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
