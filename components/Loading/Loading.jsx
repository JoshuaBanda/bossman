'use client';
import React, { useEffect, useRef } from 'react';
import styles from './styles/loading.module.css';
import gsap from 'gsap';

const Loading = () => {
    const ballsRef = useRef([]);
    const spinBallContainerRef = useRef();
    useEffect(() => {
        ballsRef.current = ballsRef.current.slice(0, 3);

        gsap.to(ballsRef.current, {
            scale: 0.7,
            duration: 0.5,
            ease: "power1.inOut",
            stagger: 0.2,
            yoyo: true,
            repeat: -1,
            opacity:0.75
        });
        gsap.to(spinBallContainerRef.current, {
            rotate: 360, // rotate alone doesn't work on HTML
            duration: 2,
            repeat: -1,
            ease: 'linear',
            transformOrigin: '50% 50%', // make sure it spins around center
        });
    }, []);


    return (
        <div className={styles.container}>
            <div className={styles.loaderContainer}>
                <ul className={styles.spinBallContainer} ref={spinBallContainerRef}>
                    {[0, 1, 2].map((_, i) => (
                        <li
                            key={i}
                            ref={(el) => (ballsRef.current[i] = el)}
                            className={styles.spinBall}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Loading;
