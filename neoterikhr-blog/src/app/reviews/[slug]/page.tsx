"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { useTranslation } from "react-i18next";
import { Star, Calendar, User, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { Review, reviews as mockReviews } from "@/lib/data";

type Lang = "en" | "vi" | "de";

export default function ReviewDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();

  const lang: Lang = useMemo(() => {
    const l = (i18n.language || "en").slice(0, 2).toLowerCase();
    return (l === "vi" || l === "de" || l === "en") ? (l as Lang) : "en";
  }, [i18n.language]);

  // helper: lấy text theo ngôn ngữ, fallback về en
  const pick = (val: unknown): string => {
    if (typeof val === "string") return val;
    if (val && typeof val === "object") {
      const obj = val as Record<string, string>;
      return obj[lang] ?? obj["en"] ?? "";
    }
    return "";
  };

  const [review, setReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const found = mockReviews.find((r: Review) => r.slug === slug);
    setReview(found || null);
    setIsLoading(false);
  }, [slug]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!review)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Review not found
      </div>
    );

  return (
    <main className="min-h-screen relative" data-design-id="review-detail-page">
      <div className="affiliate-bg" data-design-id="affiliate-bg" />
      <Navbar />

      <article
        className="container mx-auto px-4 py-12 max-w-4xl"
        data-design-id="review-article"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          data-design-id="review-header-motion"
        >
          <div
            className="flex items-center gap-2 text-accent font-semibold uppercase tracking-wider mb-4"
            data-design-id="review-meta-cat"
          >
            <Tag className="w-4 h-4" />
            {review.category}
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold mb-6"
            data-design-id="review-title"
          >
            {pick(review.title)}
          </h1>

          <div
            className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 border-y py-4"
            data-design-id="review-meta"
          >
            <div className="flex items-center gap-2" data-design-id="meta-date">
              <Calendar className="w-4 h-4" />
              {review.createdAt
                ? new Date(review.createdAt).toLocaleDateString(lang)
                : "N/A"}
            </div>

            <div className="flex items-center gap-2" data-design-id="meta-author">
              <User className="w-4 h-4" />
              {review.author || "Admin"}
            </div>

            <div
              className="flex items-center gap-1 text-primary font-bold"
              data-design-id="meta-rating"
            >
              <Star className="w-4 h-4 fill-current" />
              {review.rating} / 5.0
            </div>
          </div>

          <div
            className="rounded-2xl overflow-hidden mb-12 shadow-2xl"
            data-design-id="review-img-wrapper"
          >
            <img
              src={review.image}
              alt={pick(review.title)}
              className="w-full h-auto"
              data-design-id="review-main-img"
            />
          </div>

          <div
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-primary prose-a:text-accent"
            dangerouslySetInnerHTML={{ __html: pick(review.content) }}
            data-design-id="review-body-content"
          />

          <div
            className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/10"
            data-design-id="disclosure-box"
          >
            <p className="text-sm text-muted-foreground italic">
              {t("affiliate_disclosure")}
            </p>
          </div>
        </motion.div>
      </article>

      <footer
        className="py-12 border-t bg-muted/50 mt-20"
        data-design-id="footer"
      >
        <div
          className="container mx-auto px-4 text-center"
          data-design-id="footer-container"
        >
          <p className="text-sm text-muted-foreground" data-design-id="footer-copy">
            {t("footer_text")}
          </p>
        </div>
      </footer>
    </main>
  );
}
