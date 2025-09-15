'use client';
import React, { useEffect, useRef } from 'react'
import styles from './styles/mobileStyles/mobileMenuList.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger,TextPlugin);
const MobileMenuList = () => {

    const menuListContainerRef=useRef();
    const headerTextRef=useRef();
    const firstMealRef=useRef();
    const secondMealRef=useRef();
    const thirdMealRef=useRef();
    const fourthMealRef=useRef();
    const fifthMealRef=useRef();


    useEffect(()=>{
        const ctx=gsap.context(()=>{

            //animate header
            gsap.timeline({scrollTrigger:{
                trigger:menuListContainerRef.current,
                start:'top 50%',
                end:'bottom bottom',
                markers:true,
            }})
            .to(headerTextRef.current,{
                text:'Browse our menu, get new favorite dishes',
                ease:'none',
                duration:2,
            })
            .to(firstMealRef.current,{
                duration:1,
                y:0,
                opacity:1,
                ease:'none'
            },'<0.5')
            .to(secondMealRef.current,{
                duration:1,
                y:0,
                opacity:1,
                ease:'none'
            },'<0.1')
            .to(thirdMealRef.current,{
                duration:1,
                y:0,
                opacity:1,
                ease:'none'
            },'<0.1')
            .to(fourthMealRef.current,{
                duration:1,
                y:0,
                opacity:1,
                ease:'none'
            },'<0.1')
            .to(fifthMealRef.current,{
                duration:1,
                y:0,
                opacity:1,
                ease:'power2.inOut'
            },'<0.1')
        });

        return ()=> ctx.revert();
    },[])


  return (
    <div className={styles.container} ref={menuListContainerRef}>
        <div className={styles.headerContainer} >
            <div className={styles.header} ref={headerTextRef}>
            </div>
        </div>
        <div className={styles.mainContent}>
            {/* meal list */}
            <ul>
                <li className={styles.firstMeal} ref={firstMealRef}>
                    <div className={styles.imageWrapper}>
                        <Image
                        src='/foodplate.png'
                        alt='meal'
                        width={120}
                        height={120}
                        priority
                        />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.ratingsContainer}>
                            <div className={styles.ratings} id='primaryBackgroundColorTwo'>
                                * * * 4.5
                            </div>
                            <div className={styles.mealNameContainer}>
                                Rice
                            </div>
                        </div>
                    </div>
                </li>
                <li className={styles.secondMeal} ref={secondMealRef}>
                    <div className={styles.imageWrapper}>
                        <Image
                        src='/foodplate.png'
                        alt='meal'
                        width={100}
                        height={100}
                        priority
                        />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.ratingsContainer}>
                            <div className={styles.ratings} id='primaryBackgroundColorTwo'>
                                * * * 4.5
                            </div>
                            <div className={styles.mealNameContainer}>
                                Rice
                            </div>
                        </div>
                    </div>
                </li>
                <li className={styles.thirdMeal} ref={thirdMealRef}>
                    <div className={styles.imageWrapper}>
                        <Image
                        src='/foodplate.png'
                        alt='meal'
                        width={120}
                        height={120}
                        priority
                        />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.ratingsContainer}>
                            <div className={styles.ratings} id='primaryBackgroundColorTwo'>
                                * * * 4.5
                            </div>
                            <div className={styles.mealNameContainer}>
                                Rice
                            </div>
                        </div>
                    </div>
                </li>
                <li className={styles.fourthMeal} ref={fourthMealRef}>
                    <div className={styles.imageWrapper}>
                        <Image
                        src='/foodplate.png'
                        alt='meal'
                        width={100}
                        height={100}
                        priority
                        />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.ratingsContainer}>
                            <div className={styles.ratings} id='primaryBackgroundColorTwo'>
                                * * * 4.5
                            </div>
                            <div className={styles.mealNameContainer}>
                                Rice
                            </div>
                        </div>
                    </div>
                </li>


                <li className={styles.fifthMeal} ref={fifthMealRef}>
                    <div className={styles.imageWrapper}>
                        <div style={{width:'60px',height:'60px',color:'white',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',fontSize:'25px'}} id='primaryBackgroundColorTwo'>
                            +
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.ratingsContainer}>
                            <div className={styles.mealNameContainer}>
                                Custome meal
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default MobileMenuList