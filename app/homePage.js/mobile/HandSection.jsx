'use client';
import React, { useEffect, useRef } from 'react';
import styles from '../styles/mobileStyles/handSection.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger,TextPlugin);

const HandSection = () => {

  const handContainerRef=useRef();
  const handRef=useRef();
  const textRef=useRef();

  
useEffect(()=>{
  const ctx=gsap.context(()=>{

    gsap.to(handRef.current,{
      scrollTrigger:{
        trigger:handContainerRef.current,
        start:'bottom 90%',
        end:'+=500',
        scrub:2,
      },
      x:-300,
      opacity:0,
      ease:'none'
    })
  });

  return ()=> ctx.revert();
},[])
  return (
    <div className={styles.container} ref={handContainerRef}>
      <div className={styles.text} ref={textRef}>
        No cooking required, just good food and good times.Get your meal delivered right to your doorstep
      </div>
        <div className={styles.handContainer} ref={handRef}>
        <Image
          src='/whitehand.png'
          alt='hand'
          width={350}
          height={350}
          priority
        />
      </div>
    </div>
  )
}

export default HandSection