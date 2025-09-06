"use client";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import styles from "./styles/homePage.module.css";
import CookerScene from "@/components/CookerScene";
import { Canvas } from "@react-three/fiber";
import HeroSection from "./HeroSection";
import Procedures from "./Procedures";
import Menu from "./Menu";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import MenuList from "./MenuList";
import LessHeroSection from "./LessHeroSection";
import Logo from "@/components/Logo";
import { useSurfaceSampler } from "@react-three/drei";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);

const DesktTopHomePage = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const procedureRef = useRef();
  const cookerRef = useRef();
  const menuRef = useRef();

  const [progress, setProgress] = useState(0);
  const [menuProgress, setMenuProgress] = useState(0);
  const [loading, setLoading] = useState(0);
  const logoSectionRef = useRef();
  const [finishLoading, setFinishLoading] = useState(false);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const hasLoggedRef = useRef(false);

  const heroSectionRef = useRef();
  //handle fall back

  const [useModel, setUseModel] = useState(true);
  const fallbackImageRef = useRef();
  const handleFallback = () => {
    console.log("Fallback triggered from child!");
    setUseModel(false);
    // You can also update state, trigger animations, etc.
  };


  useEffect(() => {
    if (finishLoading && logoAnimationComplete && !hasLoggedRef.current) {
      hasLoggedRef.current = true; // prevent running again
      console.log('done.........');

      const ctx = gsap.context(() => {
        gsap.timeline({ delay: 2 })
          .to(logoSectionRef.current, {
            yPercent: -100,
            opacity: 0,
            duration: 2,
            onComplete: () => {
              // optional: remove from DOM
              if (logoSectionRef.current) {
                logoSectionRef.current.style.display = 'none';
                ScrollTrigger.refresh();
              }
            }
          });
      }, logoSectionRef); // scope context to your ref

      return () => ctx.revert(); // cleanup on unmount
    }
  }, [finishLoading, logoAnimationComplete]);


  const finishAnimation = async () => {
    setLogoAnimationComplete(true);
  };
  const logoLoadingProgress = (progress) => {
    setLoading(progress); // normalized 0 → 1
  };

  useEffect(() => {
    if (loading >= 0.8 && !finishLoading) {
      setFinishLoading(true);
      console.log('finish loading triggered'); // ✅ works
    }
  }, [loading, finishLoading]);



  // Cooker & Procedures animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Procedures Timeline
      const procedureTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: procedureRef.current,
          start: "top 60%",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            setProgress(self.progress);

          },
          delay: useModel ? 5 : 0,
        },
      });

      if (!useModel) {
        gsap.to(fallbackImageRef.current, {
          rotate: 150,
          duration: 2,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: procedureRef.current,
            start: "top 60%",
            end: "bottom bottom",
            scrub: true,
          }
        })
      }
      gsap.to(cookerRef.current, {
        y: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: procedureRef.current,
          start: "top 50%",
          end: "bottom 90%",
        },
      });

      // Menu Timeline
      const menuTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: menuRef.current,
          start: "top 80%",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            setMenuProgress(self.progress);
          },
        },
      });


      if (!useModel) {
        gsap.to(fallbackImageRef.current, {
          rotate: 150,
          duration: 2,
          y: 100,
          ease: 'power1.inOut',
          scrollTrigger: {

            trigger: menuRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: true,
          }
        })
      }
      menuTimeline.to(cookerRef.current, {
        yPercent: 100,
        xPercent: -50,
        duration: 1,
        ease: "power2.out",
      });
    }, procedureRef);

    return () => ctx.revert();
  }, [useModel]);

  // ScrollSmoother + Observer Snap
  useEffect(() => {
    if (typeof window === "undefined") return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1,
      effects: true,
    });

    //const sections = gsap.utils.toArray(".snap-section");
    const sections = gsap.utils.toArray(".snap-section");
    // now includes heroSection, painPointsSection, menuSection, menuListSection

    let currentIndex = 0;
    let isAnimating = false;

    const snapToSection = (index) => {
      if (isAnimating || index < 0 || index >= sections.length) return;
      isAnimating = true;
      currentIndex = index;
      smoother.scrollTo(sections[index], {
        duration: 1,
        ease: "power1.out",
      });

      gsap.delayedCall(1, () => (isAnimating = false));
    };

    Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      onUp: () => snapToSection(currentIndex - 1),
      onDown: () => snapToSection(currentIndex + 1),
      tolerance: 10,
      preventDefault: true,
      wheelSpeed: 0.2,
    });

    return () => {
      smoother.kill();
      Observer.getAll().forEach((obs) => obs.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} id="smooth-wrapper" className={styles.wrapper}>
      <section className={styles.logoSection} ref={logoSectionRef}>
        <Logo loading={loading} finishLoadingProp={finishLoading} finishAnimationProp={finishAnimation} />
      </section>
      <div ref={contentRef} id="smooth-content" className={styles.content}>

        <section className={`${styles.heroSection} snap-section`} ref={heroSectionRef}>
          <LessHeroSection logoAnimationCompleteProp={logoAnimationComplete} />
        </section>

        <div className={styles.cookerContainerWrapper}>
          <div className={styles.cookerContainer} ref={cookerRef}>
            {useModel ? (
              <Canvas>
                <CookerScene
                  progress={progress}
                  storyTellingProgress={menuProgress}
                  loadingProgress={(p) => logoLoadingProgress(p)}
                  onFallback={handleFallback}
                />
              </Canvas>
            ) : (
              <div className={styles.fallBackImage}>
                <div
                  ref={fallbackImageRef}>

                  <Image
                    src='/foodplate.png'
                    alt='fallback'
                    width={250}
                    height={250}
                  />
                </div>
              </div>)}
          </div>
        </div>

        <section
          className={`${styles.painPointsSection} snap-section`}
          ref={procedureRef}
        >
          <Procedures />
        </section>

        <section className={`${styles.menuSection} snap-section`} ref={menuRef}>
          <Menu />
        </section>
        <section className={`${styles.menuListSection} snap-section`}>
          <MenuList />
        </section>
      </div>
    </div>
  );
};

export default DesktTopHomePage;
