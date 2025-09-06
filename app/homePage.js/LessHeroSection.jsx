import React, { useEffect, useRef, useState } from 'react'
import styles from './styles/lessHeroSection.module.css';
import Image from 'next/image';
import gsap from 'gsap';

const LessHeroSection = ({ restaurantName = 'RESTAURANT', logoAnimationCompleteProp }) => {


  const videoRef = useRef();
  const phraseRef = useRef();
  const containerRef = useRef();
  const phraseImageRef = useRef();
  const menuNavRef = useRef();
  const deliveryTimeNavRef = useRef();
  useEffect(() => {
    if (!logoAnimationCompleteProp) return; // only run when prop is true

    console.log(logoAnimationCompleteProp)
    console.log('hero......'); // ✅ runs once when logo animation completes

    // You can start your GSAP timeline or other hero animations here

    const ctx = gsap.context(() => {
      gsap.timeline({})
        .fromTo(videoRef.current,
          {
            height: '100vh', width: '100vw',
          },
          {
            height: '50vh',
            duration: 2,
            delay: 4,
            ease: 'power1.in',
            onUpdate: function () {
              const progress = this.progress(); // 0 → 1
              const newWidth = 100 - (100 - 95) * progress; // example shrink formula
              gsap.set('#video', { width: `${newWidth}vw` });
            },
          }
        ).to('#video', {

          borderRadius: '10px',
          duration: 2,
          ease: 'power1.in'
        }, '<0.5')
        .to(videoRef.current, {

          top: '6vh',
          duration: 1,
          ease: 'power1',
        }, '<0.5')
        .to(phraseRef.current, {
          y: 0,
          ease: 'power1.in',
          duration: 1,
        }, '<0.2')
        .to(menuNavRef.current, {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'power1.in'
        }, '<')
        .to(deliveryTimeNavRef.current, {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'power1.in'
        }, '<0.2')
        .to(phraseImageRef.current, {
          rotate: 360,
          duration: 3,
          ease: 'power2.in'
        }, '<')


    });

    return () => ctx.revert();
  }, [logoAnimationCompleteProp]); // dependency on the prop

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Restaurant Name */}
      <div className={styles.RestauratNameContainer}>
        <div className={styles.name}>
          {restaurantName}
        </div>
      </div>

      {/* Hero Video */}
      <div className={styles.heroVideoContainer} ref={videoRef}>
        <video
          id='video'
          className={styles.heroVideo}
          src="/videos/heroSectionVideo.mp4"
          loop
          muted
          autoPlay
          playsInline
        />
      </div>

      <div className={styles.phraseContainer} ref={phraseRef}>
        <div className={styles.borderContainer}>

          <svg
            width="100%"
            height="100%"
            viewBox="0 0 456 351"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M453 82.0884V3H3V348H453V267.666"
              stroke="#FF6502"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>


        </div>
        <div className={styles.phraseCard} >
          <div className={styles.phrase}>
            <p>

              No cooking required, just good food and good times.Browse our menu, discover new favourite dishes, and get them delivered right to your doorstep
            </p>
            <div className={styles.callToAction}>
              <div className={styles.orderNow}>
                order Now
              </div>
              <div className={styles.arrow}>
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: 'rotate(150deg)'
                  }}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    fill="none"
                    stroke="orangered"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="9 15 6 12 9 9"
                    fill="none"
                    stroke="orangered"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="6"
                    y1="12"
                    x2="18"
                    y2="12"
                    fill="none"
                    stroke="orangered"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.phraseFoodImage} ref={phraseImageRef}>
            <Image src='/foodplate.png'
              alt='food'
              priority
              fill
              sizes="(max-width: 768px) 100vw, 250px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      <div className={styles.menuAndTimeContainer} >
        <div className={styles.menuContainer} id='primaryBackgroundColor' ref={menuNavRef}>
          <span>
            MENU
          </span>
        </div>
        <div className={styles.deliveryTime} id='baseBackgroundColor' ref={deliveryTimeNavRef}>
          DELIVERY TIME
        </div>
      </div>
    </div>
  )
}

export default LessHeroSection
