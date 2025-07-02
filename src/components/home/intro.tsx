'use client';
import { useTranslations } from '@stackhub/i18n/client';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

const TEXTS = [
  {
    key: 'fast',
    className:
      'bg-clip-text text-center text-transparent bg-linear-to-r from-[#ff1835] to-[#ffc900]',
  },
  {
    key: 'scalable',
    className:
      'bg-clip-text text-center text-transparent bg-linear-to-r from-[#0077ff] to-[#00e7df]',
  },
  {
    key: 'maintainable',
    className:
      'bg-clip-text text-center text-transparent bg-linear-to-r from-[#7f00de] to-[#ff007f]',
  },
  {
    key: 'stunning',
    className:
      'bg-clip-text text-center text-transparent bg-linear-to-r from-[#2ecc70] to-[#1ca085]',
  },
] as const;

const SPEED = 2;

const variants = {
  enter: {
    y: 100,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -100,
    opacity: 0,
  },
};

const useAnimateText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TEXTS.length);
    }, SPEED * 1000);

    return () => clearInterval(interval);
  }, []);

  const textItem = TEXTS[currentIndex];

  return { textItem: textItem ?? TEXTS[0], currentIndex };
};

export default function Intro() {
  const { textItem, currentIndex } = useAnimateText();
  const t = useTranslations();

  return (
    <div className="isolate">
      <div id="hero" className="min-h-96 pt-16 [&>canvas]:pointer-events-none">
        <div className="@container w-full flex">
          <div className="flex gap-14 items-center flex-col @xl:flex-row">
            <motion.div
              className="group select-none mr-10"
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <img
                src="/me/look.jpg"
                alt="Look like this"
                className="block rounded-lg w-36 rotate-3 group-hover:rotate-0 group-hover:scale-110 scale-3d transition-transform duration-200"
              />
            </motion.div>
            <motion.div className="max-w-2xl lg:hidden">
              <h2 className="text-3xl italic">Hello,</h2>
              <p className="text-xl ">
                My name is <em>Phong &ldquo;Henry&quot; Le Hong</em>.
                <br />
                <span className="text-primary/60">
                  Man proposes god deposes
                </span>
              </p>
            </motion.div>
            <div className="max-w-2xl hidden lg:block">
              <motion.h2
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: 'easeOut' }}
                className="text-4xl "
                dangerouslySetInnerHTML={{
                  __html: t.markup('homepage.intro.title-top', {
                    em: (chunks) => `<em>${chunks}</em>`,
                  }),
                }}
              />
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: 'easeOut' }}
                className="flex gap-2 text-4xl "
                layout="position"
              >
                <motion.h2
                  layout
                  key="title-middle-left"
                  className="leading-[30px] sm:leading-[45px]"
                >
                  {t('homepage.intro.title-middle-left')}
                </motion.h2>
                <div className="relative overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.h2
                      key={currentIndex}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      layout
                      transition={{
                        type: 'tween',
                        duration: 0.3,
                      }}
                      className="inline-flex items-center justify-center leading-[30px] sm:leading-[45px]"
                    >
                      <span className={textItem.className}>
                        {t(`homepage.intro.${textItem.key}`)}
                      </span>
                    </motion.h2>
                  </AnimatePresence>
                </div>
                <motion.h2
                  layout
                  key="title-middle-right"
                  className="leading-[30px] sm:leading-[45px]"
                >
                  {t('homepage.intro.title-middle-right')}
                </motion.h2>
              </motion.div>
              <motion.h2
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: 'easeOut' }}
                className="text-4xl"
              >
                {t('homepage.intro.title-bottom')}
              </motion.h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
