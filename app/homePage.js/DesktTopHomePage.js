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
const [finishLoading, setFinishLoading] = useState(false);

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
          onUpdate: (self) => setProgress(self.progress),
          delay:5,
        },
      });


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
          onUpdate: (self) => setMenuProgress(self.progress),
        },
      });

      menuTimeline.to(cookerRef.current, {
        yPercent: 100,
        xPercent:-50,
        duration: 1,
        ease: "power2.out",
      });
    }, procedureRef);

    return () => ctx.revert();
  }, []);

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
      <section className={styles.logoSection} >
        <Logo loading={loading} finishLoadingProp={finishLoading}/>
      </section>
      <div ref={contentRef} id="smooth-content" className={styles.content}>

        <section className={`${styles.heroSection} snap-section`}>
          <LessHeroSection/>
        </section>

        <div className={styles.cookerContainerWrapper}>
          <div className={styles.cookerContainer} ref={cookerRef}>
            <Canvas>
              <CookerScene
                progress={progress}
                storyTellingProgress={menuProgress}
                loadingProgress={(p) => logoLoadingProgress(p)}
              />
            </Canvas>
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
          <MenuList/>
        </section>
      </div>
    </div>
  );
};

export default DesktTopHomePage;
