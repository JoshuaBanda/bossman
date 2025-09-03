"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/menuList.module.css";
import Image from "next/image";

const MenuList = () => {
  const menuList = [
    { name: "Nsima and beef", photo: "/foodAssets/nsimaBeef2.jpg" },
    { name: "Nsima and chicken", photo: "/foodAssets/nsimaChicken.jpg" },
    { name: "Nsima and fish", photo: "/foodAssets/nsimaAndFish.jpg" },
    { name: "Nsima and beans", photo: "/foodAssets/nsimaAndBeans.jpg" },
    { name: "Rice and beef", photo: "/foodAssets/rice.jpg" },
    { name: "Rice and chicken", photo: "/foodAssets/hotMeal1.jpg" },
    { name: "Rice and fish", photo: "/foodAssets/nsimaAndFish.jpg" },
    { name: "Rice and beans", photo: "/foodAssets/nsimaAndBeans.jpg" },
    { name: "Spaghetti and beef", photo: "/foodAssets/rice.jpg" },
    { name: "Spaghetti and chicken", photo: "/foodAssets/hotMeal1.jpg" },
    { name: "Spaghetti and fish", photo: "/foodAssets/nsimaAndFish.jpg" },
    { name: "Spaghetti and beans", photo: "/foodAssets/nsimaAndBeans.jpg" },
    { name: "Chips and beef", photo: "/foodAssets/fries.jpg" },
    { name: "Chips and chicken", photo: "/foodAssets/fries2.jpg" },
    { name: "Chips and fish", photo: "/foodAssets/fries.jpg" },
    { name: "Spaghetti plain", photo: "/foodAssets/fries2.jpg" },
  ];

  const [hoveredItem, setHoveredItem] = useState(null);
  const [prevItem, setPrevItem] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  // config for preview box size
  const followerWidth = 250;
  const followerHeight = 180;

  // track section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // track mouse only if in view
  useEffect(() => {
    const handleMouseMove = (e) => {
      let x = e.clientX;
      let y = e.clientY;

      // clamp Y so follower box stays inside viewport
      const minY = 100;
      const maxY = window.innerHeight - followerHeight - 20;
      y = Math.max(minY, Math.min(y, maxY));

      setPos({ x, y });
    };

    if (isInView) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isInView]);

  const handleHover = (item) => {
    setPrevItem(hoveredItem);
    setHoveredItem(item);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.listItems}>
        <ul>
          {menuList.map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => handleHover(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={styles.name}>
                {item.name}
              </div>
              <div className={styles.arrow}>
                <svg
                  height="60%"
                  width="60%"
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
            </li>
          ))}
        </ul>
      </div>

      {(hoveredItem || prevItem) && (
        <div
          className={styles.mouseFollower}
          style={{
            top: pos.y,
            left: pos.x + 150,
            width: followerWidth,
            height: followerHeight,
          }}
        >
          <div className={styles.imageWrapper}>
            {prevItem && (
              <Image
                key={`prev-${prevItem.photo}`}   // 👈 unique key
                src={prevItem.photo}
                alt={prevItem.name}
                fill
                sizes="250px"
                style={{
                  objectFit: "cover",
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  transition: "opacity 0.4s ease-in-out",
                }}
                onTransitionEnd={() => setPrevItem(null)}
              />
            )}

            {hoveredItem && (
              <Image
                key={`current-${hoveredItem.photo}`}   // 👈 unique key
                src={hoveredItem.photo}
                alt={hoveredItem.name}
                fill
                sizes="250px"
                style={{
                  objectFit: "cover",
                  position: "absolute",
                  inset: 0,
                  opacity: 1,
                  transition: "opacity 0.4s ease-in-out",
                }}
              />
            )}

          </div>
        </div>
      )}
      <div className={styles.restaurantPhotosContainer}>
        <Image
        src='/restuarant.jpg'
        alt="restaurant"
        fill
        priority
        sizes="200px"
        style={{objectFit:'cover'}}
        />
      </div>
    </div>
  );
};

export default MenuList;
