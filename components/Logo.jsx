'use client';
import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import styles from './styles/logo.module.css';
import gsap from 'gsap';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Logo = ({ restaurantName = 'Restaurant', loading = 0, finishLoadingProp, finishAnimationProp }) => {
  const lettersRef = useRef(null);
  const loadingRef = useRef(null); // loading bar fill
  const handRef = useRef(null);
  const plateRef = useRef(null);
  const ridRef = useRef(null);
  const subContainerRef = useRef(null);
  const spoonRef = useRef();
  const folkRef = useRef();
  const knifeRef = useRef();
  const upperHandRef = useRef();
  const chefHatContainerRef = useRef();

  const [animationComplete, setAnimationComplete] = useState(false);



  // Run finish callback when animation completes
  useLayoutEffect(() => {
    if (animationComplete) {
      finishAnimationProp();
    }
  }, [animationComplete]);

  // Animate loading bar independently
  useEffect(() => {
    if (loadingRef.current) {
      gsap.to(loadingRef.current, {
        width: `${loading * 100}%`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [loading]);

  // Logo animation
  useLayoutEffect(() => {
    if (!finishLoadingProp) return;
    const ctx = gsap.context(() => {
      const logoTimeline = gsap.timeline({
        onComplete: () => setAnimationComplete(true),
      });

      // Animate container fade in
      logoTimeline.to(handRef.current, {
        y: -130,
        opacity: 1,
        duration: 1.5,
        rotate: 0,
        scale: 0.5,
        ease: 'power1.in',
      },)
        .to(subContainerRef.current, {
          opacity: 1,
          y: 0,
          duration: 2, scale: 1,
          ease: 'power1.in',
        }, '<');

      // Animate text stroke independently
      const textEl = lettersRef.current;
      if (textEl) {
        const length = textEl.getComputedTextLength();
        gsap.set(textEl, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

      }

      // Animate shapes after text
      logoTimeline.to(plateRef.current, {
        y: -65,
        opacity: 1,
        duration: 2,
        ease: 'power1.inOut',
      }, '<')
        .to(ridRef.current, {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'power1.inOut',
        }, '<')
        .to(spoonRef.current, {
          y: -5,
          opacity: 1,
          duration: 2,
          ease: 'power2.in'
        }, '<').to(folkRef.current, {
          y: -5,
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut'
        }, '<').to(knifeRef.current, {
          y: -5,
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut'
        }, '<')
        .to(textEl, {
          strokeDashoffset: 0,
          duration: 5,
          ease: 'power2.inOut',
        }, '<0.5')// independent, not on timeline
        .to(subContainerRef.current, {
          backgroundColor: 'transparent',
          duration: 3,
          ease: 'power1.out',
        }, '<2')
        .to(textEl, {
          stroke: 'black',
          duration: 1,
          ease: 'power1.out',
        }, '<0.5')
        .to('#hand', {
          fill: 'black',
          ease: 'power1.out',
          duration: 0.5,
        }, '<')
        .to('#plate', {
          fill: 'black',
          ease: 'power1.out',
          duration: 0.5,
        }, '<')
        .to('#rid', {
          fill: 'black',
          ease: 'power1.out',
          duration: 0.5,
        }, '<')
        .to('#folk', {
          fill: 'black',
          ease: 'power1.out',
          duration: 0.5,
        }, '<')
        .to('#knife', {
          fill: 'black',
          ease: 'power1.out',
          duration: 0.5,
        }, '<')
        .to('#spoon', {
          fill: 'black',
          ease: 'power1.out',
          duration: 0.5,
        }, '<')

        .to(upperHandRef.current, {
          y: -40,
          x: 20,
          rotate: '-=20',
          ease: 'power2.inOut',
          duration: 1,
          opacity: 1,
        }, '<')
        .to(upperHandRef.current, { y: -90, x: 40, opacity: 0, rotate: '+=20', ease: 'power1.out' }, '>')
        .to(ridRef.current, { y: -100, x: 20, rotate: '+=45', ease: 'power1.out', opacity: 0 }, '<')
        .to(folkRef.current, { scale: 3, y: -30, ease: 'power1.out', duration: 1, x: -20 }, '<')
        .to(spoonRef.current, { scale: 2.5, y: -22, ease: 'power1.out', duration: 1, x: -2 }, '<0.5')
        .to(knifeRef.current, { scale: 2, y: -15, ease: 'power1.out', duration: 1 }, '<0.2')
        .to(plateRef.current, { scale: 1.5, ease: 'power1.out', duration: 1 }, '<')
        .to(chefHatContainerRef.current, {
          rotate: '-=40',
          duration: 4,
          y: -50,
          x: -130,
          scale: 1,
          opacity: 1,
          ease: 'elastic.out'
        }, '<')
        .to(textEl, { scale: 1.3, x: -50, ease: 'power1.in', duration: 1 }, '<')
    });

    return () => ctx.revert();
  }, [finishLoadingProp]);

  return (
    <div className={styles.mainLogoContainer}>
      <div className={styles.logoSubContainer} ref={subContainerRef}>
        {/* Shapes container */}
        <div className={styles.shapes}>
          <div className={styles.folkAndSpoons}>
            <div className={styles.folkContainer} ref={folkRef}>
              <svg width="100%" height="100%" viewBox="0 0 1080 1080">
                <path id="folk" d="M550.194,450.181s16.9,396.222,20.28,434.906,14.647,93.14,4.507,112.67-28.167,35.683-42.815,29.293-30.42-34.176-33.8-49.574,6.76-56.711,6.76-76.615,23.66-428.522,24.787-437.16,3.38-58.964-11.267-67.6-39.435-4.883-38.308-69.855S491.605,53.582,491.605,53.582h6.761s-3.381,251.254-2.254,256.888-0.564,24.787,9.014,24.788h2.253s8.45,1.125,9.013-6.761S513.576,51.892,520.9,51.329s6.76,2.254,6.76,2.254L532.166,328.5s6.2,15.21,15.774,2.254V328.5l4.507-277.168h6.76l6.76,277.168s1.127,8.45,6.761,9.014S583.431,333,584,326.244s0-272.662,0-272.662H588.5S600.9,309.906,599.768,330.751s-0.563,38.307-6.76,42.814-17.464,14.083-27.041,18.027-15.773,20.281-15.773,20.281v38.308Z" />
              </svg>
            </div>
            <div className={styles.spoonContainer} ref={spoonRef}>
              <svg width="100%" height="100%" viewBox="0 0 1080 1080">
                <path id="spoon" d="M546.53,501.372s30.121,412.4,31.237,417.235,13.387,73.257-8.925,89.243-49.087,29.75-66.936-17.845,24.543-256.96,24.543-390.46,6.693-172.175,0-182.959-10.04-12.643-37.93-31.236-41.278-12.645-46.856-87.017,12.272-234.649,91.479-240.97S623.506,171.9,620.16,146.611s39.045,173.662,6.693,205.271-63.59,45.367-69.167,53.549-7.809,13.014-8.925,46.854S546.53,501.372,546.53,501.372Z" />
              </svg>
            </div>
            <div className={styles.knifeContainer} ref={knifeRef}>
              <svg width="100%" height="100%" viewBox="0 0 1080 1080">
                <path id="knife" d="M567.71,496.05l-2.252,69.813s69.812,468.417-2.252,461.657-50.67-99.084-33.78-218.44,21.394-231.958,11.26-247.722-47.292-64.182-51.8-72.064S464.117,72.672,565.458,52.4Z" />
              </svg>
            </div>
          </div>



          <div className={styles.ridContainer} ref={ridRef}>
            <svg width="100%" height="100%" viewBox="0 0 1080 1080">
              <path id="rid" className={styles.rid} d="M598.2,330.442s322.605,48.5,400.62,347.906,27.408,105.427,27.408,105.427l-14.76,2.108H969.3s-23.194-337.364-352.124-400.62-10.543-2.108-10.543-2.108,303.628,90.666,305.737,402.728H37.334s25.3-411.162,438.574-455.441l29.519-2.109s-4.217-46.387-29.519-63.256,54.821-42.17,82.232-25.3,18.977,21.085,18.977,21.085-27.411,31.628-27.411,65.365Z" />
            </svg>
          </div>

          <div className={styles.plateContainer} ref={plateRef}>
            <svg width="100%" height="100%" viewBox="0 0 1080 1080">
              <path id="plate" d="M518.762,540.427h440.39s31.087,10.263-16.236,13.691-78.133,2.416-78.133,2.416l-24.354,12.081H231.6s-7.1-10.47-49.721-12.081-61.9-3.221-61.9-3.221-28.412-12.886,20.294-12.081S518.762,540.427,518.762,540.427Z" />
            </svg>
          </div>

          <div className={styles.handContainer} ref={handRef}>
            <svg width="100%" height="100%" viewBox="0 0 1080 1080" stroke='black'>
              <path id="hand" d="M434.9,686.448S749.316,480.61,823.1,385.086s157.775-124.113,170.261-131.1,47.1-18.551,0-32.349-94.211,15.5-108.967,22.133S676.1,395.479,600.054,395.3s-82.294-21.956-110.67-73.213-61.862-117.3-112.373-103.859-2.27,35.932,6.811,59.592,23.269,49.553,15.323,91.941-3.973,44.445-3.4,61.294,6.243,64.877-74.915,107.264l6.811,18.729-28.945,15.324s1.135-16.849-8.513-17.026-158.343,69.806-158.343,69.806,106.7,170.439,114.075,229.853c0,0-10.783,20.609,27.242-3.4s125.993-78.32,125.993-78.32S386.659,734.3,378.714,713.69s5.108-32.349,5.108-32.349,11.35,8.69,17.026,17.026S434.9,686.448,434.9,686.448Z" />
            </svg>
          </div>
        </div>

        <div className={styles.upperHandContainer} ref={upperHandRef}>
          <svg width="100%" height="100%" viewBox="0 0 1080 1080" stroke='orange'>
            <path id="upperHand" d="M434.9,686.448S749.316,480.61,823.1,385.086s157.775-124.113,170.261-131.1,47.1-18.551,0-32.349-94.211,15.5-108.967,22.133S676.1,395.479,600.054,395.3s-82.294-21.956-110.67-73.213-61.862-117.3-112.373-103.859-2.27,35.932,6.811,59.592,23.269,49.553,15.323,91.941-3.973,44.445-3.4,61.294,6.243,64.877-74.915,107.264l6.811,18.729-28.945,15.324s1.135-16.849-8.513-17.026-158.343,69.806-158.343,69.806,106.7,170.439,114.075,229.853c0,0-10.783,20.609,27.242-3.4s125.993-78.32,125.993-78.32S386.659,734.3,378.714,713.69s5.108-32.349,5.108-32.349,11.35,8.69,17.026,17.026S434.9,686.448,434.9,686.448Z" />
          </svg>
        </div>
        <div className={styles.chefHatContainer} ref={chefHatContainerRef}>
          <Image
            src='/logo/chefhat.png'
            alt='hat'
            width={100}
            height={100}
          />
        </div>

        {/* Brand Name */}
        <div className={styles.brandName}>
          <svg width="100%" height="150" viewBox="0 0 800 200">
            <text
              ref={lettersRef}
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              stroke="white"
              fill="transparent"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              fontSize="100px"
            >
              {restaurantName}
            </text>
          </svg>
        </div>
      </div>

      {/* Loading bar */}
      <div className={styles.loadingContainer}>
        <div className={styles.loadingBar}>
          <div ref={loadingRef} className={styles.loadingFill} />
        </div>

        <div className={styles.loading}>
          {finishLoadingProp ? <p>welcome</p> : <div style={{
            display:'flex',
          justifyContent:'center'
          }}>
          
          <div>
            Loading
          </div>
            <motion.div
              initial={{ x: 0, y: 10 }}
              animate={{ x: 10 }}
              transition={{
                duration: 0.5,     // how long one cycle takes
                repeat: Infinity,  // loop forever
                repeatType: "reverse" // this is the "yoyo" effect
              }}
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "black"
              }}
            />

          </div>}
        </div>
      </div>
    </div>
  );
};

export default Logo;
