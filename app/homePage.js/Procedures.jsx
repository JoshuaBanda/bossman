"use client";
import React, { useLayoutEffect, useRef } from "react";
import styles from "./styles/procedueres.module.css";
import Card from "./card/Card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Procedures = () => {
  const procedureContainerRef = useRef();
  const itemsRef = useRef([]); // array of refs ordered by step

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: procedureContainerRef.current,
          start: "top 30%",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // animate each item with a custom final rotation
      itemsRef.current.forEach((el, i) => {
        let finalRotation;
        
        // define final rotation for each step
        switch (i) {
          case 0: finalRotation = 30; break;
          case 1: finalRotation = -10; break;
          case 2: finalRotation = -10; break;
          case 3: finalRotation = 10; break;
          case 4: finalRotation = 15; break;
          case 5: finalRotation = -10; break;
          default: finalRotation = 0;
        }

        let yPosition;
        switch (i){
          case 0:yPosition=45;break;
          case 1:yPosition=60;break;
          case 2:yPosition=30;break;
          case 3:yPosition=30;break;
          case 4:yPosition=20;break;
          case 5:yPosition=10;break;
          default:yPosition=0;
        }
        tl.to(
          el,
          { opacity: 1, y: yPosition, rotation: finalRotation, duration: 1, ease: "power2.out" }, // end state
          i * 0.3 // stagger-like timeline position
        );
      });
    }, procedureContainerRef);

    return () => ctx.revert();
  }, []);

  const procedureList = [
    { step: 1, procedure: "select meal you want to order" },
    { step: 2, procedure: "select meal you want to order" },
    { step: 3, procedure: "select meal you want to order" },
    { step: 4, procedure: "select meal you want to order" },
    { step: 5, procedure: "select meal you want to order" },
    { step: 6, procedure: "select meal you want to order" },
  ];

  const leftSideCards = procedureList.filter((item) => item.step % 2 !== 0);
  const rightSideCards = procedureList.filter((item) => item.step % 2 === 0);

  return (
    <div className={styles.container} ref={procedureContainerRef}>
      <div className={styles.cardsContainer}>
        <ul className={styles.leftSideCardsDisplay}>
          {leftSideCards.map((item) => (
            <li
              key={item.step}
              ref={(el) => (itemsRef.current[item.step - 1] = el)} // keep step order
              className="procedureItem"
            >
              <Card step={item.step} procedure={item.procedure} />
            </li>
          ))}
        </ul>
        <ul className={styles.rightSideCardsDisplay}>
          {rightSideCards.map((item) => (
            <li
              key={item.step}
              ref={(el) => (itemsRef.current[item.step - 1] = el)} // keep step order
              className="procedureItem"
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
