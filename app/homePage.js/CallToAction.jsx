'use client';
import SwiperComponent from '@/components/swiper/SwiperComponent'
import React, { useEffect, useRef } from 'react';
import styles from './styles/callToAction.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollToPlugin,TextPlugin)
const CallToAction = ({}) => {
  const containerRef=useRef();
  const bigTextRef=useRef();
  const thePhraseRef=useRef();
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.timeline({
        scrollTrigger:{
            trigger:containerRef.current,
            start:'top 80%',
            end:'top 50%',
            scrub:2,
        }
      })
      .to(thePhraseRef.current,{
        opacity:1,
        scale:1,
        ease:'power1',
        text:'No cooking required, just good food and good times.Browse our menu, discover new favourite dishes, and get them delivered right to your doorstep'
      })
      .to(bigTextRef.current,{
        y:0,
        ease:'power1',
        scale:1,
        opacity:1
      },'<')
    });

    return ()=> ctx.revert();
  },[])
  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.callToActionContainer}>
        <div ref={thePhraseRef}>
        </div>
        <div className={styles.callToActionButton}>
          order now
        </div>
      </div>
      <div className={`${styles.bigText} styleFont`} ref={bigTextRef}>
        NEW FLAVOR
      </div>

 
    </div>
  )
}

export default CallToAction;