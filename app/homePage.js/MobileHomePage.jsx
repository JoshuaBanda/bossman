'use client';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Observer } from 'gsap/Observer';
import React, { useEffect, useRef, useState } from 'react';

import LandingPage from './mobile/LandingPage';
import HandSection from './mobile/HandSection';
import styles from './styles/mobileStyles/mobileHomePage.module.css';
import MobileMenuList from './MobileMenuList';
// import { Canvas } from '@react-three/fiber';
// import PlateScene from '@/components/PlateScene';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);

const MobileHomePage = () => {
  const landingRef = useRef();
  const handSectionRef = useRef();
  const wrapperRef = useRef();
  const contentRef = useRef();

  const [handProgress, setHandProgress] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);

  // Pin first section
  /* useEffect(() => {
     if (!landingRef.current) return;
 
     const ctx = gsap.context(() => {
       ScrollTrigger.create({
         trigger: landingRef.current,
         start: 'top top',
         end: '+=100%',
         pin: true,
         pinSpacing: false, // allows section 2 to overlap
       });
     });
 
     return () => ctx.revert();
   }, []);*/

  // Hand section scroll animation
  /*useEffect(() => {
    if (!handSectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: handSectionRef.current,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true,
          markers: true,
          onUpdate: (self) => setHandProgress(self.progress),
        },
      });
    });

    return () => ctx.revert();
  }, []);*/

  // ScrollSmoother + Observer Snap
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1,
      effects: true,
      smoothTouch:4,
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
  onUp: () => snapToSection(currentIndex + 1),   // 👈 flip
  onDown: () => snapToSection(currentIndex - 1), // 👈 flip
      tolerance: 10,
      preventDefault: true,
      wheelSpeed: 1,
    });


    return () => {
      smoother.kill();
      Observer.getAll().forEach((obs) => obs.kill());
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.set(contentRef.current, {
        backgroundColor: 'orangered'
      })

      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: landingRef.current,
          start: 'bottom bottom',
          end: 'bottom center',
          scrub: true,
        },
        backgroundColor:'white'
      })


    });


    return () => ctx.revert();
  }, [])

  return (
    <div ref={wrapperRef} id="smooth-wrapper" className={styles.wrapper}>
      <div ref={contentRef} id="smooth-content">
        {/* 3D Scene if needed */}
        {/* <div className={styles.sceneContainer}>
          <Canvas>
            <PlateScene
              progress={handProgress}
              storyTellingProgress={storyProgress}
              loadingProgress={(p) => console.log('Loading:', p)}
            />
          </Canvas>
        </div> */}

        {/* Section 1 */}
        <section
          className={`${styles.landingSection} snap-section`}
          ref={landingRef}
        >
          <LandingPage />
        </section>

        {/* Section 2 */}
        <section
          className={`${styles.secondSection} snap-section`}
          ref={handSectionRef}
        >
          <HandSection />
        </section>

        {/* Section 3 */}
        <section className={`${styles.thirdSection} snap-section`}>
          <MobileMenuList/>
        </section>
      </div>
    </div>
  );
};

export default MobileHomePage;
