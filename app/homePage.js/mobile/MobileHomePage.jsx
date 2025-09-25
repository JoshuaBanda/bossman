'use client';
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import styles from '../styles/mobileStyles/mobileHomePage.module.css';
import Logo from "@/components/Logo";
import { Canvas } from "@react-three/fiber";
import CookerScene from "@/components/CookerScene";
import Image from "next/image";
import TextPlugin from "gsap/TextPlugin";
import MobileHeroSection from "./MobileHeroSection";
import MobileMenuList from "./MobileMenuList";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer, TextPlugin, ScrollSmoother);

export default function MobileHomePage() {
  const [canvasKey, setCanvasKey] = useState(0);

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);

  const menuRef = useRef();
  const cookerRef = useRef();
  const logoSectionRef = useRef();

  const [progress, setProgress] = useState(0);
  const [menuProgress, setMenuProgress] = useState(0);
  const [loading, setLoading] = useState(0);
  const [finishLoading, setFinishLoading] = useState(false);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const [useModel, setUseModel] = useState(true);

  const hasLoggedRef = useRef(false);
  const fallbackImageRef = useRef();

  const handleFallback = () => {
    setUseModel(false);
  };

  // scroll lock helpers
  const disableScroll = () => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  };
  const enableScroll = () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  };

  // logo animation logic
  useEffect(() => {
    if (!logoAnimationComplete) {
      disableScroll();
      if (window.ScrollSmootherInstance) window.ScrollSmootherInstance.paused(true);
    }

    if (finishLoading && logoAnimationComplete && !hasLoggedRef.current) {
      hasLoggedRef.current = true;

      const ctx = gsap.context(() => {
        gsap.timeline({ delay: 0.5 })
          .to(logoSectionRef.current, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
              if (logoSectionRef.current) {
                logoSectionRef.current.style.display = 'none';
                ScrollTrigger.refresh();
                enableScroll();
                if (window.ScrollSmootherInstance) window.ScrollSmootherInstance.paused(false);
              }
            }
          });
      }, logoSectionRef);

      return () => ctx.revert();
    }
  }, [finishLoading, logoAnimationComplete]);

  const finishAnimation = () => setLogoAnimationComplete(true);
  const logoLoadingProgress = (p) => setLoading(p);

  useEffect(() => {
    if (loading >= 0.9 && !finishLoading) setFinishLoading(true);
  }, [loading, finishLoading]);

  // --- Initialize ScrollSmoother ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 5,
      effects: true,
      normalizeScroll: true,
    });
    window.ScrollSmootherInstance = smoother;

    return () => {
      smoother.kill();
      window.ScrollSmootherInstance = null;
    };
  }, []);

  // --- Snap scroll logic with ScrollSmoother ---





  useEffect(() => {
    const sections = [
      section1Ref.current,
      section2Ref.current,
      section3Ref.current,
      section4Ref.current,
      section5Ref.current
    ];

    let currentIndex = 0;
    let isAnimating = false;
    let cumulativeDelta = 0; // track scroll distance while pinned
    const SCROLL_THRESHOLD = 300; // adjust this to make scroll harder/easier

    // --- Pin Section 1 ---
    const pin1 = ScrollTrigger.create({
      id: "pin-0",
      trigger: section1Ref.current,
      start: "top top",
      endTrigger: section3Ref.current,
      end: "top top",
      pin: true,
      pinSpacing: true,
    });



    // --- Snap Scroll Observer ---
    const snapToSection = (index) => {
      if (isAnimating || index < 0 || index >= sections.length) return;

      // Only snap if **no pinned section is currently active**
      const activePins = [pin1].filter(pin => pin.isActive);
      if (activePins.length > 0) return;

      isAnimating = true;
      currentIndex = index;

      gsap.to(window, {
        scrollTo: { y: sections[index], autoKill: false },
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => (isAnimating = false)
      });
    };

    Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: 2,
      tolerance: 1,
      preventDefault: false,
      onUp: (self) => {
        const activePins = [pin1].filter(pin => pin.isActive);
        if (activePins.length > 0) {
          cumulativeDelta -= self.deltaY;
          if (cumulativeDelta > SCROLL_THRESHOLD) {
            cumulativeDelta = 0;
            snapToSection(currentIndex + 1);
          }
        } else {
          snapToSection(currentIndex + 1);
        }
      },
      onDown: (self) => {
        const activePins = [pin1].filter(pin => pin.isActive);
        if (activePins.length > 0) {
          cumulativeDelta += self.deltaY;
          if (cumulativeDelta > SCROLL_THRESHOLD) {
            cumulativeDelta = 0;
            snapToSection(currentIndex - 1);
          }
        } else {
          snapToSection(currentIndex - 1);
        }
      }
    });
  }, []);
useEffect(() => {
  window.scrollTo(0, 0);
}, []);




  // --- Scroll-triggered animations ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top 80%",
          end: "top top",
          scrub: 1,
          onUpdate: (self) => setProgress(self.progress),
        },
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top 50%",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => setMenuProgress(self.progress),
        },
      }).to(cookerRef.current, { yPercent: 80, ease: "power1" });

      gsap.to(menuRef.current, {
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top 10%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
        duration: 0.5,
        text: "MENU",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content" className={styles.container}>
        <section className={styles.logoSection} ref={logoSectionRef}>
          <Logo loading={loading} finishLoadingProp={finishLoading} finishAnimationProp={finishAnimation} />
        </section>

        <div className={styles.cookerContainerWrapper}>
          <div className={styles.cookerContainer} ref={cookerRef}>
            {useModel ? (
              <Canvas key={canvasKey}>
                <CookerScene
                  progress={progress}
                  storyTellingProgress={menuProgress}
                  loadingProgress={logoLoadingProgress}
                  onFallback={handleFallback}
                />
              </Canvas>
            ) : (
              <div className={styles.fallBackImage}>
                <div ref={fallbackImageRef}>
                  <Image src="/foodplate.png" alt="fallback" width={250} height={250} />
                </div>
              </div>
            )}
          </div>
        </div>

        <section ref={section1Ref} className={styles.section} >
          <MobileHeroSection logoAnimationCompleteProp={logoAnimationComplete} />
        </section>
        <section ref={section2Ref} className={styles.section} >
          <div className={`${styles.text} styleFont`} id="primaryColorTwo">
            Get the best
          </div>
        </section>
        <section ref={section3Ref} className={`${styles.section}`} >
          <div className={`${styles.menu} styleFont`} ref={menuRef} id="primaryColorTwo" />
        </section>
        <section ref={section4Ref} className={styles.section}>
          <MobileMenuList />
        </section>
        <section ref={section5Ref} className={styles.section}>
          <h1>Section 5</h1>
        </section>
      </div>
    </div>
  );
}
