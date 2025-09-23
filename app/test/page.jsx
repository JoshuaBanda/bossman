'use client';
import SwiperComponent from '@/components/swiper/SwiperComponent'
import React, { useEffect, useRef } from 'react';
import styles from './test.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import Procedures from '../homePage.js/Procedures';

const page = ({}) => {
  const containerRef=useRef();
  const bigTextRef=useRef();
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.timeline({
      })
    });

    return ()=> ctx.revert();
  },[])
  return (
    <div className={styles.container} ref={containerRef}>
      <Procedures/>
    </div>
  )
}

export default page