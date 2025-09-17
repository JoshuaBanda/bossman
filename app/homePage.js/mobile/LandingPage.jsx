'use client';
import React, { useEffect, useRef } from 'react';
import styles from '../styles/mobileStyles/landingPage.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = ({ brandName = 'Restaurant' }) => {
  const containerRef = useRef();
  const plateRef = useRef();
  const firstLeafRef = useRef();
  const secondLeafRef = useRef();
  const nameRef = useRef();


  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
    scrollTrigger: {
  trigger: containerRef.current,
  start: "bottom 95%",
  end: "bottom top",
   scrub: 3
}
      });

      tl.to(firstLeafRef.current, {
        y: 500,
        x: -30,
        scale: 1.5,
        rotation: "-=90",
        ease: 'power2.out',
        opacity:0,
      })
        .to(secondLeafRef.current, {
          y: 500,
          x: 30,
          scale: 1.5,
          rotation: "+=90",
          ease: 'power2.out',
        opacity:0,
        }, '<')
        .to(nameRef.current, {
          scale: 2.5,
          y: 750,
          ease: 'power2.out',
          color: 'rgba(0,0,0,0.7)',
          duration:1,
          opacity:0,
        }, '<')
        .to(plateRef.current, {
          rotation: 200,
          y: 480,
          ease: 'none'
        }, '<');



    }, containerRef);

    return () => ctx.revert();
  }, []);


  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.brandName} ref={nameRef}>
        {brandName}
      </div>



      <div className={styles.plateContainer} ref={plateRef} >


        <Image
          src="/foodplate.png"
          alt="plate"
          priority
          width={250}
          height={250}
        />
      </div>

      <div className={styles.leavesContainer}>
        <div ref={firstLeafRef}>
          <Image
            src="/chineseLeaf.png"
            alt="leaf1"
            priority
            width={250}
            height={250}
          />
        </div>
        <div ref={secondLeafRef}>
          <Image
            src="/chineseLeaf.png"
            alt="leaf2"
            priority
            width={250}
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
