"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Globe, 
  BookOpen, 
  UserRound, 
  Sparkles, 
  Mail,
  Home,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { NavigationProps } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SocialLinks } from "./SocialLinks";
import { NavItem } from './NavItem';
import { useSafeLanguage } from "@/hooks/useSafeLanguage";

interface MobileNavigationProps extends NavigationProps {
  isMenuOpen: boolean | string;
  setIsMenuOpen: (value: boolean | string) => void;
  headerHeight: number;
}

export function MobileNavigation({ 
  isMenuOpen, 
  setIsMenuOpen, 
  headerHeight, 
  books, 
  services, 
  onBookClick,
  onServiceClick
}: MobileNavigationProps) {
  const { language, setLanguage } = useSafeLanguage();
  const pathname = usePathname();
  const translate = (bgText: string, enText: string) => language === 'en' ? enText : bgText;

  const navItems = [
    { href: "/", label: translate("Начало", "Home"), icon: Home },
    { href: "/about", label: translate("За Мен", "About"), icon: UserRound },
    { id: "books", label: translate("Книги", "Books"), icon: BookOpen },
    { id: "services", label: translate("Услуги", "Services"), icon: Sparkles },
    { href: "/blog", label: translate("Блог", "Blog"), icon: Mail },
    { href: "/contact", label: translate("Контакти", "Contact"), icon: Mail },
    { href: "/shop", label: translate("Магазин", "Shop"), icon: ShoppingBag }
  ];

  const mobileMenuStyle = {
    top: `${headerHeight}px`,
    height: `calc(100vh - ${headerHeight}px)`
  };

  const toggleLanguage = () => {
    if (setLanguage) {
        setLanguage(language === 'en' ? 'bg' : 'en');
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } }
  };
  
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <>
      <div className="flex items-center lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle menu"
          className="rounded-lg text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary-foreground"
          onClick={() => setIsMenuOpen(isMenuOpen ? false : true)}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.div>
        </Button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            aria-label="Main Navigation"
            style={mobileMenuStyle}
            className="fixed inset-x-0 bottom-0 z-40 flex flex-col bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 lg:hidden overflow-y-auto rounded-t-xl"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {isMenuOpen === true && (
              <motion.div 
                variants={listVariants} 
                initial="hidden" 
                animate="visible"
                className="border-b border-gray-200 dark:border-gray-700"
              >
                {navItems.map((item) => (
                  <motion.div key={item.href || item.id} variants={itemVariants} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <NavItem
                      href={item.href}
                      label={item.label}
                      icon={item.icon}
                      onClick={item.href ? undefined : () => setIsMenuOpen(item.id!)}
                    >
                      {!item.href && <ChevronRight className="h-4 w-4 text-gray-400" />}
                    </NavItem>
                  </motion.div>
                ))}
                
                <motion.div variants={itemVariants} className="px-6 py-4 flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:text-primary active:bg-primary/20"
                  >
                    <Globe className="h-5 w-5" />
                    <span className="text-base">
                      {language === "en" ? "Български" : "English"}
                    </span>
                  </Button>
                  <ThemeToggle />
                </motion.div>
                
                <motion.div 
                  variants={itemVariants} 
                  className="p-6 flex justify-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <SocialLinks />
                </motion.div>
              </motion.div>
            )}
            
            {/* Books Submenu */}
            {isMenuOpen === "books" && (
              <motion.div variants={listVariants} initial="hidden" animate="visible">
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 sticky top-0">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsMenuOpen(true)} 
                    className="text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:text-primary active:bg-primary/20"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    {translate("Назад", "Back")}
                  </Button>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {translate("Книги", "Books")}
                  </h3>
                </div>
                {books.map((book) => (
                  <motion.div key={book.id} variants={itemVariants}>
                    <Link
                      href={book.href}
                      onClick={() => onBookClick(book)}
                      className="group flex w-full items-center gap-4 border-b border-gray-200 dark:border-gray-700 px-4 py-3 text-left hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200"
                    >
                      <div className="relative w-12 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={book.image}
                          alt={book.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-0.5 group-hover:text-primary dark:group-hover:text-primary-foreground transition-colors">
                          {book.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {book.description}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="text-xs px-1.5 py-0.5 border-primary/20 dark:border-primary/30 text-primary dark:text-primary-foreground bg-primary/5 dark:bg-primary/10 self-start"
                      >
                        {book.price.toFixed(2)} лв
                      </Badge>
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants} className="p-4 bg-gray-50 dark:bg-gray-800/50">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-center text-primary hover:text-primary dark:text-primary-foreground dark:hover:text-primary-foreground rounded-lg transition-all duration-200 hover:bg-primary/10 active:bg-primary/20"
                    asChild
                  >
                    <Link href="/shop">
                      {translate('Разгледай всички книги', 'Browse all books')}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
            
            {/* Services Submenu */}
            {isMenuOpen === "services" && (
              <motion.div variants={listVariants} initial="hidden" animate="visible">
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 sticky top-0">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsMenuOpen(true)} 
                    className="text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:text-primary active:bg-primary/20"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    {translate("Назад", "Back")}
                  </Button>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {translate("Услуги", "Services")}
                  </h3>
                </div>
                {services.map((service) => (
                  <motion.div key={service.id} variants={itemVariants}>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => onServiceClick(service, e)}
                      className="group flex w-full items-center gap-4 border-b border-gray-200 dark:border-gray-700 px-4 py-3 text-left hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-0.5 group-hover:text-primary dark:group-hover:text-primary-foreground transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {service.description}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="text-xs px-1.5 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground self-start"
                      >
                        {service.duration}
                      </Badge>
                    </motion.button>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants} className="p-4 bg-gray-50 dark:bg-gray-800/50">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-center text-primary hover:text-primary dark:text-primary-foreground dark:hover:text-primary-foreground rounded-lg transition-all duration-200 hover:bg-primary/10 active:bg-primary/20"
                    asChild
                  >
                    <Link href="/services">
                      {translate('Виж всички услуги', 'View all services')}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 