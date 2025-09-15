'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/selectRelish.module.css';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const Page = () => {
  const sideBarRelishList = [
    { relish: 'Chicken',
      price:4000,
     },
    { relish: 'Beef' ,
      price:4000,},
    { relish: 'Beans' ,
      price:4000,},
    { relish: 'Peans' ,
      price:4000,},
    { relish: 'Chambo',
      price:4000, },
    { relish: 'Usipa',
      price:4000, },
    { relish: 'Eggs',
      price:4000, },
    { relish: 'none' ,
      price:3000,},
  ];

  const [selectedRelish, setSelectedRelish] = useState(0);
  const [listItemHeight, setListItemHeight] = useState(0);

  const firstLiRef = useRef();
  const notchRef = useRef();
  const openingTextRef=useRef();

  // Measure first <li> height
  useEffect(() => {
    if (firstLiRef.current) {
      const bounds = firstLiRef.current.getBoundingClientRect();
      setListItemHeight(bounds.height);
    }
  }, []);

  // Animate notch
  useEffect(() => {
    if (!listItemHeight) return;

    // select all li elements
    const liElements = document.querySelectorAll('ul li');

    gsap.timeline({})
      // Move notch
      .to(notchRef.current, {
        y: selectedRelish * listItemHeight,
        duration: 0.5,
        ease: 'power2.out',
      })
      // Change color of selected li
      .to(
        liElements,
        {
          color: (i, target) =>
            i === selectedRelish ? 'black' : 'white', // selected red, others black
          duration: 0.2,
        },
        0 // run at the same time as previous animation start
      );
  }, [selectedRelish, listItemHeight]);

  const handleSideRelishClick = (index) => {
    setSelectedRelish(index);
  };


  //main content
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.timeline({})
      .to(openingTextRef.current,{
        text:' SELECT YOUR RELISH',
        duration:2,
        ease:'none',
      })
    });

    return ()=> ctx.revert();
  },[])
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <div className={styles.menu}>
          <svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z" />
          <path d="M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12Z"/>
          <path d="M6 20C7.10457 20 8 19.1046 8 18C8 16.8954 7.10457 16 6 16C4.89543 16 4 16.8954 4 18C4 19.1046 4.89543 20 6 20Z"/>
          <path d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z"/>
          <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"/>
          <path d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z"/>
          <path d="M18 8C19.1046 8 20 7.10457 20 6C20 4.89543 19.1046 4 18 4C16.8954 4 16 4.89543 16 6C16 7.10457 16.8954 8 18 8Z"/>
          <path d="M20 12C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12Z"/>
          <path d="M18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18C16 19.1046 16.8954 20 18 20Z"/>
          </svg>
        </div>
        <ul>
          {sideBarRelishList.map((item, index) => (
            <li
              key={index}
              ref={index === 0 ? firstLiRef : null} // only first li
              onClick={() => handleSideRelishClick(index)}
            >
              <span>{item.relish}</span>
            </li>
          ))}

          <div
            ref={notchRef}
            style={{
              width: '50px',
              height: `${listItemHeight}px`, // match li height
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >

            <div className={styles.selectedContainerSvg} >
              <div style={{ position: 'absolute', width: '80%', height: '100%', right: '0px', backgroundColor: 'white' }} />
              <svg width="100%" height="80%" viewBox="0 0 154 303" fill="none" xmlns="http://www.w3.org/2000/svg">

                <path d="M114 45C114 56.0457 105.046 65 94 65H39.9502C28.9045 65 19.9502 73.9543 19.9502 85V218C19.9502 229.046 28.9045 238 39.9502 238H94C105.046 238 114 246.954 114 258V283C114 294.046 105.046 303 94 303H20C8.9543 303 0 294.046 0 283V20C0 8.95431 8.95431 0 20 0H94C105.046 0 114 8.95431 114 20V45Z" fill="orangered" />
              </svg>
            </div>
          </div>
        </ul>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.headerContainer}>
          <div className={styles.header} ref={openingTextRef} id='primaryColorTwo'/>

        </div>
        <div className={styles.swiperContainer}>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
