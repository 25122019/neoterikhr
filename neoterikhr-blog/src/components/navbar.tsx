"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Globe, LogIn, LogOut, User, Menu, X } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "vi" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md" data-design-id="navbar">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between" data-design-id="navbar-container">
        <Link href="/" className="flex items-center gap-2" data-design-id="navbar-logo-link">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} data-design-id="navbar-logo-img" />
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-design-id="navbar-brand-name">
            NeoterikHR
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6" data-design-id="navbar-desktop-menu">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors" data-design-id="nav-home">{t('home')}</Link>
          <Link href="/reviews" className="text-sm font-medium hover:text-primary transition-colors" data-design-id="nav-reviews">{t('reviews')}</Link>
          
          <div className="flex items-center gap-2 ml-4" data-design-id="navbar-actions">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2" data-design-id="lang-toggle">
              <Globe className="w-4 h-4" />
              {i18n.language.toUpperCase()}
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2" data-design-id="user-actions">
                <span className="text-sm font-medium flex items-center gap-1" data-design-id="user-name">
                  <User className="w-4 h-4" />
                  {user?.name || user?.email}
                </span>
                <Button variant="outline" size="sm" onClick={logout} className="gap-2" data-design-id="logout-btn">
                  <LogOut className="w-4 h-4" />
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <Link href="/login" data-design-id="login-link">
                <Button size="sm" className="gap-2" data-design-id="login-btn">
                  <LogIn className="w-4 h-4" />
                  {t('login')}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} data-design-id="mobile-menu-toggle">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 flex flex-col gap-4" data-design-id="mobile-menu">
          <Link href="/" onClick={() => setIsMenuOpen(false)} data-design-id="mobile-nav-home">{t('home')}</Link>
          <Link href="/reviews" onClick={() => setIsMenuOpen(false)} data-design-id="mobile-nav-reviews">{t('reviews')}</Link>
          <Button variant="ghost" onClick={toggleLanguage} className="justify-start gap-2" data-design-id="mobile-lang-toggle">
            <Globe className="w-4 h-4" />
            {i18n.language.toUpperCase()}
          </Button>
          {isAuthenticated ? (
            <Button variant="outline" onClick={logout} className="justify-start gap-2" data-design-id="mobile-logout-btn">
              <LogOut className="w-4 h-4" />
              {t('logout')}
            </Button>
          ) : (
            <Link href="/login" onClick={() => setIsMenuOpen(false)} data-design-id="mobile-login-link">
              <Button className="w-full gap-2" data-design-id="mobile-login-btn">
                <LogIn className="w-4 h-4" />
                {t('login')}
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}