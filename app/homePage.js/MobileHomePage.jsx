'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Observer } from 'gsap/Observer';
import { Canvas } from '@react-three/fiber';

import LandingPage from './mobile/LandingPage';
import HandSection from './mobile/HandSection';
import MobileMenuList from './MobileMenuList';
import Logo from '@/components/Logo';
import CookerScene from '@/components/CookerScene';
import styles from './styles/mobileStyles/mobileHomePage.module.css';
import Image from 'next/image';
import Procedures from './Procedures';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);

const MobileHomePage = () => {
  // Refs
  const wrapperRef = useRef();
  const contentRef = useRef();
  const landingRef = useRef();
  const handSectionRef = useRef();
  const threeDLandingSectionRef = useRef();
  const threeDFinalSectionRef = useRef();
  const logoSectionRef = useRef();
  const procedureRef = useRef();
  const cookerRef = useRef();
  const menuRef = useRef();
  const fallbackImageRef = useRef();

  // States
  const [progress, setProgress] = useState(0);
  const [threeDFinalSection, setThreeDFinalSection] = useState(0);
  const [loading, setLoading] = useState(0);
  const [finishLoading, setFinishLoading] = useState(false);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const [useModel, setUseModel] = useState(true);

  const hasLoggedRef = useRef(false);


    const handleFallback = () => {
    console.log("Fallback triggered from child!");
    setUseModel(false);
    // You can also update state, trigger animations, etc.
  };


  /** ------------------------
   * Scroll Smoother + Snap
   ------------------------- */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1,
      smoothTouch: 4,
      effects: true,
    });

    const sections = gsap.utils.toArray('.snap-section');
    let currentIndex = 0;
    let isAnimating = false;

    const snapToSection = (index) => {
      if (isAnimating || index < 0 || index >= sections.length) return;
      isAnimating = true;
      currentIndex = index;

      smoother.scrollTo(sections[index], {
        duration: 2,
        ease: 'power2.inOut',
      });

      gsap.delayedCall(1, () => (isAnimating = false));
    };

    Observer.create({
      target: window,
      type: 'touch,wheel',
      onUp: () => snapToSection(currentIndex + 1),
      onDown: () => snapToSection(currentIndex - 1),
      tolerance: 10,
      preventDefault: true,
      wheelSpeed: 1,
    });

    return () => {
      smoother.kill();
      Observer.getAll().forEach((obs) => obs.kill());
    };
  }, []);

  /** ------------------------
   * Background Animation
   ------------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { backgroundColor: 'orangered' });

      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: landingRef.current,
          start: 'bottom bottom',
          end: 'bottom center',
          scrub: true,
        },
        backgroundColor: 'white',
      });
    });
    return () => ctx.revert();
  }, []);

  /** ------------------------
   * Logo Section Exit
   ------------------------- */
  useEffect(() => {
    if (finishLoading && logoAnimationComplete && !hasLoggedRef.current) {
      hasLoggedRef.current = true;

      const ctx = gsap.context(() => {
        gsap.timeline({ delay: 0.5 }).to(logoSectionRef.current, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            if (logoSectionRef.current) {
              logoSectionRef.current.style.display = 'none';
              ScrollTrigger.refresh();
            }
          },
        });
      }, logoSectionRef);

      return () => ctx.revert();
    }
  }, [finishLoading, logoAnimationComplete]);

  /** ------------------------
   * Loader Helpers
   ------------------------- */
  const finishAnimation = () => setLogoAnimationComplete(true);
  const logoLoadingProgress = (p) => setLoading(p);

  useEffect(() => {
    if (loading >= 0.8 && !finishLoading) setFinishLoading(true);
  }, [loading, finishLoading]);

  /** ------------------------
   * Cooker & Procedure Animations
   ------------------------- */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
    
      gsap.timeline({
        scrollTrigger: {
          trigger: threeDLandingSectionRef.current,
          start: 'top 60%',
          end: 'bottom bottom',
          scrub: 2,
          markers: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });

      if (!useModel) {
        gsap.to(fallbackImageRef.current, {
          rotate: 150,
          duration: 2,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: threeDLandingSectionRef.current,
            start: 'top 60%',
            end: 'bottom bottom',
            scrub: 2,
          },
        });
      }

      
      const menuTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: threeDFinalSectionRef.current,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub:2,
          onUpdate: (self) => setThreeDFinalSection(self.progress),
        },
      });

      if (!useModel) {
        gsap.to(fallbackImageRef.current, {
          rotate: 150,
          duration: 0.5,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: threeDFinalSectionRef.current,
            start: 'top 50%',
            end: 'bottom bottom',
          scrub:2,
          },
        });
      }

      menuTimeline
        .to(cookerRef.current, {
          yPercent: 80,
          duration: 0.2,
          ease: 'power2.inOut',
        });
    }, threeDLandingSectionRef);

    return () => ctx.revert();
  }, [useModel]);

  /** ------------------------
   * Render
   ------------------------- */
  return (
    <div ref={wrapperRef} id="smooth-wrapper" className={styles.wrapper}>
      {/* Logo Section */}
      <section className={styles.logoSection} ref={logoSectionRef}>
        <Logo
          loading={loading}
          finishLoadingProp={finishLoading}
          finishAnimationProp={finishAnimation}
        />
      </section>

      {/* Main Content */}
      <div ref={contentRef} id="smooth-content">
        {/* Cooker Scene / Fallback */}
        <div className={styles.cookerContainerWrapper}>
          <div className={styles.cookerContainer} ref={cookerRef}>
            {useModel ? (
              <Canvas>
                <CookerScene
                  progress={progress}
                  storyTellingProgress={threeDFinalSection}
                  loadingProgress={logoLoadingProgress}
                  onFallback={() => handleFallback}
                />
              </Canvas>
            ) : (
              <div className={styles.fallBackImage}>
                <div ref={fallbackImageRef}>
                  <Image
                    src="/foodplate.png"
                    alt="fallback"
                    width={250}
                    height={250}
                    priority={false}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sections */}
        <section className={`${styles.landingSection} snap-section`} ref={landingRef}>
          <LandingPage />
        </section>

        <section className={`${styles.secondSection} snap-section`} ref={handSectionRef}>
          <HandSection />
        </section>

        <section className={`${styles.thirdSection} snap-section`} ref={menuRef}>
          <MobileMenuList />
        </section>

        <section className={`${styles.threeDLandingSection} snap-section`} ref={threeDLandingSectionRef} >
          
        </section>
        <section className={`${styles.threeDFinalSection} snap-section`} ref={threeDFinalSectionRef}>
          
        </section>

        <section ref={procedureRef} className={`${styles.procedure} snap-section`}>
          <p>
            Procedures
          </p>
          <Procedures/>
        </section>
      </div>
    </div>
  );
};

export default MobileHomePage;
