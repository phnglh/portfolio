'use client';
import { cn } from '@/stackhub/utils/cn';
import { motion } from 'motion/react';
import { useTranslations } from '@stackhub/i18n/client';
import { useEffect, useState } from 'react';
import Navbar from './navbar';
import Link from 'next/link';
import { animate } from 'animejs';
import LocaleSwitcher from './locale-switcher';
export default function Headers() {
  const t = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    animate('.logo-letter', {
      y: [
        { to: '20px', ease: 'outExpo', duration: 600 },
        { to: 0, ease: 'outBounce', duration: 800, delay: 100 },
      ],
      delay: (_, i) => i * 50,
      ease: 'inOutCirc',
      loopDelay: 1000,
      loop: true,
    });

    const changeBackground = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    document.addEventListener('scroll', changeBackground);

    return () => document.removeEventListener('scroll', changeBackground);
  }, []);

  return (
    <motion.header
      className={cn(
        'bg-background/30 shadow-xs fixed inset-x-0 top-4 z-40 mx-auto flex h-[60px] max-w-5xl items-center justify-between rounded-2xl px-8 saturate-100 backdrop-blur-[10px] transition-colors',
        isScrolled && 'bg-background/80'
      )}
      initial={{
        y: -100,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <a
        href="#skip-nav"
        className="bg-background focus-visible:ring-ring rounded-xs shadow-xs focus-visible:ring-3 fixed left-4 top-4 -translate-y-20 border p-2 font-medium transition-transform focus-visible:translate-y-0 focus-visible:ring-offset-2"
      >
        <span>{t('layout.skip-to-main-content')}</span>
      </a>
      <Link
        href="/"
        className="flex items-center justify-center gap-1"
        aria-label={t('layout.home')}
      >
        {['H', 'e', 'n', 'r', 'y'].map((char, index) => (
          <span className="logo-letter" key={index}>
            {char}
          </span>
        ))}
      </Link>
      <div className="flex items-center gap-2">
        <Navbar />
        <LocaleSwitcher />
      </div>
    </motion.header>
  );
}
