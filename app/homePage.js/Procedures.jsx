"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./styles/procedueres.module.css";
import Card from "./card/Card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Procedures = () => {
  const procedureContainerRef = useRef();
  const itemsRef = useRef([]);
  const headerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: procedureContainerRef.current,
          start: "top -50%",
          end: "bottom bottom",
          toggleActions:'play none none reverse',
        },
      });

      // Animate header text
      tl.to(headerRef.current, {
        text: "How to order",
        duration: 1.2,
        ease: "power1.inOut",
      });

      // Animate items with stagger
      tl.to(itemsRef.current, {
        opacity: 1,
        y: 60,
        duration: 1.5,
        ease: "power1.out",
        stagger: 0.3, // handles sequencing
      });
    }, procedureContainerRef);

    return () => ctx.revert();
  }, []);

  const procedureList = [
    { step: 1, procedure: "select the meal you want to order" },
    { step: 2, procedure: "confirm your meal choice" },
    { step: 3, procedure: "add meal to cart" },
    { step: 4, procedure: "enter delivery details" },
    { step: 5, procedure: "make payment" },
    { step: 6, procedure: "wait for delivery" },
  ];

  const leftSideCards = procedureList.filter((item) => item.step % 2 !== 0);
  const rightSideCards = procedureList.filter((item) => item.step % 2 === 0);

  return (
    <div className={styles.container} ref={procedureContainerRef}>
      <div className={styles.cardsContainer}>
        <div className={`${styles.header} styleFont`} ref={headerRef}/>

        <ul className={styles.leftSideCardsDisplay}>
          {leftSideCards.map((item) => (
            <li
              key={item.step}
              ref={(el) => (itemsRef.current[item.step - 1] = el)}
              className={styles.procedureItem}
            >
              <Card step={item.step} procedure={item.procedure} />
            </li>
          ))}
        </ul>

        <ul className={styles.rightSideCardsDisplay}>
          {rightSideCards.map((item) => (
            <li
              key={item.step}
              ref={(el) => (itemsRef.current[item.step - 1] = el)}
              className={styles.procedureItem}
            >
              <Card step={item.step} procedure={item.procedure} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Procedures;
