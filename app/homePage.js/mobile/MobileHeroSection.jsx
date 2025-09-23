'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/mobileStyles/mobileHeroSection.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ProcedureScene from '@/components/ProcedureScene';
import { Canvas } from '@react-three/fiber';
import CallToAction from '../CallToAction';
import Procedures from '../Procedures';

gsap.registerPlugin(ScrollToPlugin);
const MobileHeroSection = ({ restaurantName = 'Restaurant', logoAnimationCompleteProp, }) => {
    const containerRef = useRef();
    const landingImageRef = useRef();
    const doorRef = useRef();
    const innerContainerRef = useRef();
    const callToActionRef = useRef();
    const procedureRef = useRef();
    const sceneRef = useRef();

    const [progress, setProgress] = useState(0);



    //dynamic height
    useEffect(() => {
  const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);
  return () => window.removeEventListener('resize', setVh);
}, []);


    /*opening animations */
    useEffect(() => {

        if (!logoAnimationCompleteProp) return; // only run when prop is true


        const ctx = gsap.context(() => {
            gsap.timeline({})
                .to(landingImageRef.current, {
                    y: -400,
                    ease: 'power1',
                    duration: 2,
                    opacity: 1
                }, '<0.5')
        });

        return () => ctx.revert();
    }, [logoAnimationCompleteProp]); // dependency on the prop
    /*first scroll animations*/
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 90%',
                    end: 'bottom 50%',
                    scrub: 2,
                }
            })
                .to(landingImageRef.current, {
                    rotate: '+=100',
                    ease: 'power1',
                    x: 80,
                })
                .to(innerContainerRef.current, { y: -1000, ease: 'power1' }, '<')
                .to(doorRef.current, {
                    scale: 6,
                    ease: 'power1',
                    opacity: 1,
                }, '<')
                .to(callToActionRef.current, {
                    y: 0, ease: 'power1',
                    width: '100vw'
                }, '<')
        });

        return () => ctx.revert();
    }, []);


    /*second scroll animations */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 15%',
                    end: 'bottom -50%',
                    scrub: 2,
                }
            });

            tl.to(landingImageRef.current, {
                y: -1500,
                ease: 'power1',
                opacity: 0,
            })
                .to(callToActionRef.current, {
                    opacity: 0,
                    yPercent: -100,
                    ease: 'power1.out',
                }, '<')
                .to(procedureRef.current, {
                    y: 0,
                    ease: 'power1'
                }, '<0.5')
        });


        return () => ctx.revert();
    }, []);



    /* scene animations */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "bottom 15%",
                    end: "bottom -80%",
                    scrub: 1,
                },
            });

            tl.to(
                sceneRef.current,
                {
                    y: -150,
                    ease: "power1",
                },
                "<"
            );

            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "bottom 50%",
                    end: "bottom -50%",
                    scrub: 1,
                    onUpdate: (self) => {
                        setProgress(self.progress);
                    },
                }
            })
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.innerContainer} ref={innerContainerRef}>
                <div className={`${styles.name} styleFont`}>
                    {restaurantName}
                </div>
            </div>

            <div className={styles.door} ref={doorRef}>
                <svg width="100%" height="100%" viewBox="0 0 333 579" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M166.5 0C258.362 1.25679e-06 332.832 83.2991 332.832 186.054V579H0.167725V186.054C0.167857 83.2991 74.6371 0 166.5 0Z" fill="white" />
                </svg>
            </div>
            <div className={styles.landingImageContainer} ref={landingImageRef}>
                <Image
                    src='/foodPlate.png'
                    alt='food'
                    width={200}
                    height={200}
                    priority
                />
            </div>

            <div className={styles.callToAction} ref={callToActionRef} style={{ width: '20vw', overflow: 'hidden' }}>
                <CallToAction />
            </div>
            <div className={styles.procedures} ref={procedureRef}>
                <Procedures />
            </div>

            <div className={styles.sceneContainer} ref={sceneRef}>
                <Canvas>
                    <ProcedureScene progress={progress} />
                </Canvas>
            </div>
        </div>
    )
}

export default MobileHeroSection