import React from 'react'
import styles from './styles/lessHeroSection.module.css';
import Image from 'next/image';

const LessHeroSection = ({ restaurantName = 'RESTAURANT' }) => {
  return (
    <div className={styles.container}>
      {/* Restaurant Name */}
      <div className={styles.RestauratNameContainer}>
        <div className={styles.name}>
          {restaurantName}
        </div>
      </div>

      {/* Hero Video */}
      <div className={styles.heroVideoContainer}>
        <video
          className={styles.heroVideo}
          src="/videos/heroSectionVideo.mp4"   // 👈 put your video file in /public/videos/
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      
      <div className={styles.phraseContainer}>
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
        <div className={styles.phraseCard}>
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
          <div className={styles.phraseFoodImage}>
            <Image src='/foodplate.png'
              alt='food'
              priority
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessHeroSection
