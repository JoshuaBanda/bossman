'use client';
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import styles from './styles/mobileStyles/mobileHomePage.module.css';
import Logo from "@/components/Logo";
import { Canvas } from "@react-three/fiber";
import CookerScene from "@/components/CookerScene";
import Image from "next/image";
import TextPlugin from "gsap/TextPlugin";
import MobileHeroSection from "./mobile/MobileHeroSection";
import MobileMenuList from "./MobileMenuList";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer, TextPlugin);

export default function DesktopHomePage() {
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const section4Ref = useRef(null);
    const section5Ref = useRef(null);

    const menuRef = useRef();

    /*
   logo 
   */
    const [progress, setProgress] = useState(0);
    const [menuProgress, setMenuProgress] = useState(0);
    const [loading, setLoading] = useState(0);
    const logoSectionRef = useRef();
    const [finishLoading, setFinishLoading] = useState(false);
    const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
    const hasLoggedRef = useRef(false);

    const cookerRef = useRef();

    const heroSectionRef = useRef();
    //handle fall back

    const [useModel, setUseModel] = useState(true);
    const fallbackImageRef = useRef();
    const handleFallback = () => {
        console.log("Fallback triggered from child!");
        setUseModel(false);
        // You can also update state, trigger animations, etc.
    };

    // helpers
    const disableScroll = () => {
        // lock scroll (desktop + mobile)
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
    };

    const enableScroll = () => {
        // restore scroll
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    };

    useEffect(() => {
        // Disable scroll on mount (before logo finishes)
        disableScroll();

        if (finishLoading && logoAnimationComplete && !hasLoggedRef.current) {
            hasLoggedRef.current = true;

            const ctx = gsap.context(() => {
                gsap.timeline({ delay: 0.5 })
                    .to(logoSectionRef.current, {
                        opacity: 0,
                        duration: 1,
                        onComplete: () => {
                            if (logoSectionRef.current) {
                                logoSectionRef.current.style.display = 'none';
                                ScrollTrigger.refresh();
                                enableScroll(); // ✅ Re-enable scroll AFTER logo animation finishes
                            }
                        }
                    });
            }, logoSectionRef);

            return () => ctx.revert();
        }
    }, [finishLoading, logoAnimationComplete]);


    const finishAnimation = async () => {
        setLogoAnimationComplete(true);
    };
    const logoLoadingProgress = (progress) => {
        setLoading(progress); // normalized 0 → 1
    };

    useEffect(() => {
        if (loading >= 0.8 && !finishLoading) {
            setFinishLoading(true);
            //console.log('finish loading triggered'); // ✅ works
        }
    }, [loading, finishLoading]);


    useEffect(() => {
        const sections = [
            section1Ref.current,
            section2Ref.current,
            section3Ref.current,
            section4Ref.current,
            section5Ref.current
        ];

        let currentIndex = 0;
        let isAnimating = false;
        let cumulativeDelta = 0; // track scroll distance while pinned
        const SCROLL_THRESHOLD = 350; // adjust this to make scroll harder/easier

        // --- Pin Section 1 ---
        const pin1 = ScrollTrigger.create({
            id: "pin-0",
            trigger: section1Ref.current,
            start: "top top",
            endTrigger: section3Ref.current,
            end: "top top",
            pin: true,
            pinSpacing: true,
        });



        // --- Snap Scroll Observer ---
        const snapToSection = (index) => {
            if (isAnimating || index < 0 || index >= sections.length) return;

            // Only snap if **no pinned section is currently active**
            const activePins = [pin1].filter(pin => pin.isActive);
            if (activePins.length > 0) return;

            isAnimating = true;
            currentIndex = index;

            gsap.to(window, {
                scrollTo: { y: sections[index], autoKill: false },
                duration: 1.2,
                ease: "power2.inOut",
                onComplete: () => (isAnimating = false)
            });
        };

        Observer.create({
            target: window,
            type: "wheel,touch,pointer",
            wheelSpeed: 1,
            tolerance: 0,
            preventDefault: false,
            onUp: (self) => {
                const activePins = [pin1].filter(pin => pin.isActive);
                if (activePins.length > 0) {
                    cumulativeDelta -= self.deltaY;
                    if (cumulativeDelta > SCROLL_THRESHOLD) {
                        cumulativeDelta = 0;
                        snapToSection(currentIndex + 1);
                    }
                } else {
                    snapToSection(currentIndex + 1);
                }
            },
            onDown: (self) => {
                const activePins = [pin1].filter(pin => pin.isActive);
                if (activePins.length > 0) {
                    cumulativeDelta += self.deltaY;
                    if (cumulativeDelta > SCROLL_THRESHOLD) {
                        cumulativeDelta = 0;
                        snapToSection(currentIndex - 1);
                    }
                } else {
                    snapToSection(currentIndex - 1);
                }
            }
        });
    }, []);

    //refresh
    useEffect(() => {
        // Always reset scroll to top on mount
        window.history.scrollRestoration = "manual"; // disable auto-restore
        window.scrollTo(0, 0);

        // reset GSAP/ScrollTrigger positions too
        ScrollTrigger.refresh();
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        const context = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: section2Ref.current,
                    start: 'top 80%',
                    end: 'top top',
                    scrub: 1,
                    onUpdate: (self) => setProgress(self.progress)
                }
            });


            gsap.timeline({
                scrollTrigger: {
                    trigger: section3Ref.current,
                    start: 'top 50%',
                    end: 'bottom bottom',
                    scrub: 1,
                    onUpdate: (self) => setMenuProgress(self.progress)
                }
            }).to(cookerRef.current, {
                yPercent: 80,
                ease: 'power1'
            })
            gsap.to(menuRef.current, {
                scrollTrigger: {
                    trigger: section3Ref.current,
                    start: 'top 20%',
                    end: 'bottom bottom',
                    scrub: 1,
                },
                text: 'MENU'
            })




        });

        return () => context.revert();
    }, [])
    return (
        <div className={styles.container}>

            <section className={styles.logoSection} ref={logoSectionRef}>
                <Logo loading={loading} finishLoadingProp={finishLoading} finishAnimationProp={finishAnimation} />
            </section>
            <div className={styles.cookerContainerWrapper}>
                <div className={styles.cookerContainer} ref={cookerRef}>
                    {useModel ? (
                        <Canvas>
                            <CookerScene
                                progress={progress}
                                storyTellingProgress={menuProgress}
                                loadingProgress={(p) => logoLoadingProgress(p)}
                                onFallback={handleFallback}
                            />
                        </Canvas>
                    ) : (
                        <div className={styles.fallBackImage}>
                            <div
                                ref={fallbackImageRef}>

                                <Image
                                    src='/foodplate.png'
                                    alt='fallback'
                                    width={250}
                                    height={250}
                                />
                            </div>
                        </div>)}
                </div>
            </div>

            <section ref={section1Ref} className={styles.section}>
                <MobileHeroSection logoAnimationCompleteProp={logoAnimationComplete} />
            </section>
            <section ref={section2Ref} className={styles.section}>
                <div className={`${styles.text}  styleFont`}>
                    Get the best
                </div>
            </section>
            <section ref={section3Ref} className={`${styles.section}`}>
                
                <div className={`${styles.menu} styleFont`} ref={menuRef} />
                
            </section>
            <section ref={section4Ref} className={styles.section}>
                <MobileMenuList/>
            </section>
            <section ref={section5Ref} className={styles.section}>
                <h1>Section 5</h1>
            </section>
        </div>
    );
}
