"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { useTranslation } from "react-i18next";
import {
  Star,
  Calendar,
  User,
  Tag,
  ExternalLink,
  CreditCard,
  Cookie,
  BadgePercent,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Review, reviews as mockReviews } from "@/lib/data";
import { Button } from "@/components/ui/button";

type Lang = "en" | "vi" | "de";
type LocalizedString = Record<Lang, string>;
type MaybeLocalized = string | LocalizedString;
type MaybeLocalizedArray = Array<string | LocalizedString>;

function pickLang(val: MaybeLocalized | undefined, lang: Lang): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val[lang] ?? val.en ?? Object.values(val)[0] ?? "";
}

function pickLangArray(val: MaybeLocalizedArray | undefined, lang: Lang): string[] {
  if (!val) return [];
  return val.map((x) => (typeof x === "string" ? x : (x[lang] ?? x.en ?? Object.values(x)[0] ?? "")));
}


export default function ReviewDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();

  const lang = ((i18n.language?.slice(0, 2) as Lang) || "en") as Lang;

  const [review, setReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const s = Array.isArray(slug) ? slug[0] : slug;
    const found = mockReviews.find((r) => r.slug === s);
    setReview(found || null);
    setIsLoading(false);
  }, [slug]);

  const view = useMemo(() => {
    if (!review) return null;

    const title = pickLang(review.title, lang);
    const description = pickLang(review.description, lang);
    const content = pickLang(review.content, lang);
    const pros = pickLangArray(review.pros, lang);
    const cons = pickLangArray(review.cons, lang);


    return { title, description, content, pros, cons };
  }, [review, lang]);

  if (isLoading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!review || !view)
    return <div className="min-h-screen flex items-center justify-center">Review not found</div>;

  const rating = Number(review.rating ?? 0);
  const ratingText = `${rating.toFixed(1)}/5`;

  return (
    <main className="min-h-screen bg-[#fafafa]" data-design-id="review-detail-page">
      <Navbar />

      {/* Top header */}
      <section className="pt-24 pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider mb-4">
            <Tag className="w-4 h-4" />
            <span>{review.category}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
            {view.title}
          </h1>

          {view.description ? (
            <p className="text-slate-600 max-w-3xl text-lg leading-relaxed mb-6">
              {view.description}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-6 text-slate-500 border-y py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "N/A"}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {review.author || "Admin"}
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span>{ratingText}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Body + Sidebar */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
            {/* Left */}
            <article className="min-w-0">
              {/* Hero image */}
              <div className="rounded-3xl overflow-hidden shadow-xl border bg-white mb-10">
                <div className="relative w-full aspect-[16/9] bg-slate-100">
                  <img
                    src={review.image}
                    alt={view.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Main content */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: view.content }}
              />

              {/* Pros / Cons */}
              {(view.pros.length > 0 || view.cons.length > 0) && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                    <div className="flex items-center gap-2 font-black text-green-700 mb-4">
                      <CheckCircle2 className="w-5 h-5" />
                      Pros
                    </div>
                    <ul className="space-y-2 text-slate-700">
                      {view.pros.map((p, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                    <div className="flex items-center gap-2 font-black text-red-700 mb-4">
                      <XCircle className="w-5 h-5" />
                      Cons
                    </div>
                    <ul className="space-y-2 text-slate-700">
                      {view.cons.map((c, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Disclosure */}
              <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-sm text-slate-600 italic">{t("affiliate_disclosure")}</p>
              </div>
            </article>

            {/* Right sidebar */}
            <aside className="lg:sticky lg:top-24 space-y-6">
              {/* Quick Verdict */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6">
                <div className="text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                  Quick Verdict
                </div>
                <div className="flex items-end gap-2 mb-4">
                  <div className="text-4xl font-black text-slate-900">{rating.toFixed(1)}</div>
                  <div className="text-slate-500 font-semibold">/ 5</div>
                </div>

                {view.description ? (
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">{view.description}</p>
                ) : null}

                {review.affiliateUrl ? (
                  <Button asChild className="w-full h-12 rounded-2xl font-bold">
                    <a href={review.affiliateUrl} target="_blank" rel="noopener noreferrer">
                      Get Started <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                ) : (
                  <Button disabled className="w-full h-12 rounded-2xl font-bold">
                    No affiliate link
                  </Button>
                )}

                {review.affiliateUrl ? (
                  <p className="mt-3 text-xs text-slate-500 italic text-center">
                    * This is an affiliate link. We may earn a commission.
                  </p>
                ) : null}
              </div>

              {/* Affiliate details */}
              {(review.commission || review.cookieTime || (review.paymentMethods?.length ?? 0) > 0) && (
                <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6">
                  <div className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">
                    Affiliate Details
                  </div>

                  <div className="space-y-3 text-sm text-slate-700">
                    {review.commission && (
                      <div className="flex items-start gap-3">
                        <BadgePercent className="w-4 h-4 mt-0.5 text-primary" />
                        <div>
                          <div className="font-bold text-slate-900">Commission</div>
                          <div className="text-slate-600">{review.commission}</div>
                        </div>
                      </div>
                    )}

                    {review.cookieTime && (
                      <div className="flex items-start gap-3">
                        <Cookie className="w-4 h-4 mt-0.5 text-primary" />
                        <div>
                          <div className="font-bold text-slate-900">Cookie</div>
                          <div className="text-slate-600">{review.cookieTime}</div>
                        </div>
                      </div>
                    )}

                    {review.paymentMethods?.length ? (
                      <div className="flex items-start gap-3">
                        <CreditCard className="w-4 h-4 mt-0.5 text-primary" />
                        <div>
                          <div className="font-bold text-slate-900">Payout</div>
                          <div className="text-slate-600">{review.paymentMethods.join(", ")}</div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}

              {/* Back */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6">
                <div className="text-sm text-slate-600 mb-4">
                  Want to compare more tools?
                </div>
                <Button asChild variant="outline" className="w-full h-11 rounded-2xl font-bold">
                  <Link href="/reviews">Browse all reviews</Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
