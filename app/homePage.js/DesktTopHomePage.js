"use client";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import styles from "./styles/homePage.module.css";
import CookerScene from "@/components/CookerScene";
import { Canvas } from "@react-three/fiber";
import HeroSection from "./HeroSection";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Procedures from "./Procedures";
import Scene from "@/components/Scene";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const DesktTopHomePage = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const procedureRef = useRef();
  const cookerRef = useRef();

  const [progress, setProgress] = useState(0);
const [sceneProgress,setSceneProgress]=useState(0);
  // GSAP animations for Cooker and Procedures
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const procedureTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: procedureRef.current,
          start: "top 40%",
          end: "bottom 90%",
          scrub: true,
          markers: true,
          onUpdate: (self) => setProgress(self.progress), // store progress 0-1
        },
      });

      // Animate cooker Y position and rotation (example)
      procedureTimeline.to(cookerRef.current, {
        rotation: 0.05, // example rotation in radians
        duration: 1,
        ease: "power2.inOut",
      });

      // Optional: separate ScrollTrigger directly on cooker
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
    }, procedureRef);

    return () => ctx.revert();
  }, []);

  // ScrollSmoother setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1,
        effects: true,
      });

      return () => smoother.kill();
    }
  }, []);

  return (
    <div ref={wrapperRef} id="smooth-wrapper" className={styles.wrapper}>
      <div ref={contentRef} id="smooth-content" className={styles.content}>
        <section className={styles.heroSection}>
          <HeroSection />
        </section>

        <div className={styles.cookerContainerWrapper}>
          <div className={styles.cookerContainer} ref={cookerRef}>
            <Canvas>
              <CookerScene progress={progress} />
            </Canvas>
          </div>
        </div>
        
        <section className={styles.painPointsSection} ref={procedureRef}>
          <Procedures />
        </section>
      </div>
    </div>
  );
};

export default DesktTopHomePage;
