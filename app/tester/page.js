'use client';
import Image from 'next/image';
import styles from './logo.module.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import TextPlugin from 'gsap/TextPlugin';
import mainStyles from './landingPage.module.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import FryingPan from "@/components/FryingPan";
import RiceImage from "@/components/RiceImage";
import Scene from './Scene';
import CookerScene from './CookerScene';
import useScreenWidth from '@/components/screenWidth/useScreenWidth';
import useBreakpoint from '@/components/screenWidth/useScreenWidth';

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);




const Logo = () => {
  const handRef = useRef();
  const plateLogoRef = useRef();
  const hotAirRef = useRef();
  const ridRef = useRef();
  const logoContainer = useRef();
  const logoPlate = useRef();
  const mainContainer = useRef();

  const logoSection = useRef();
  const heroSection = useRef();
  const restaurantViewSectionRef = useRef();
  const underImageReferencePointDetails = useRef();
  const logoNameRef = useRef();


  const orderNow = useRef();
  const cameraRef = useRef();


  const restaurantName = 'Vine Yard';

  const platform = useBreakpoint();
  //console.log('...............',platform.isLargeScreen  );

  useLayoutEffect(() => {

    const logoAnimatition = gsap.timeline({
      pin: true,
      delay: 2,

      invalidateOnRefresh: true,
    });
    //animate hand up
    logoAnimatition.fromTo(handRef.current, {
      scale: 0.2,
      opacity: 100,
      x: -50, y: 150,
      rotate: 70,
      opacity: 0
    }, {
      scale: 1,
      rotate: 0,
      opacity: 1,
      x: 0, y: 0,
      duration: 0.5,
    })
      //animate plate and rid up
      .fromTo(plateLogoRef.current, {
        scale: 0.5,
        y: 100,
        opacity: 0
      }, {
        scale: 1,
        y: 0,
        duration: 2,
        ease: 'elastic',
        opacity: 1
      })
      //hot air evaporates
      .to(hotAirRef.current, { opacity: 0, y: -200, ease: 'power2.out', duration: 1 })
      //open rid up
      .to(ridRef.current, {
        rotate: -50, duration: 0.3, ease: 'power2.in',
        x: -100,
        y: -40,
      }, '<')
      //push text back
      .to(logoNameRef.current, { x: -200, y: 10 }, '<')

      //push plate and hand to create a spring effect when animating the name
      .to(logoPlate.current, { y: 10, duration: 0.3 }, '>')
      .to(handRef.current, { y: 10, duration: 0.2 }, '<')


      .to(logoPlate.current, { y: 100, duration: 1, ease: 'elastic' }, '<')
      .fromTo(handRef.current, { rotate: 40, y: 20 }, { rotate: 0, y: 0, ease: 'elastic', duration: 1.5 }, '<')
      .to(logoPlate.current, { rotate: 0, y: 0, ease: 'elastic', duration: 1.5 }, '<')

      //translatex the name
      .to(logoNameRef.current, { x: 0, ease: 'power2.inOut', duration: 1, opacity: 1 }, '<')
      //close rid
      .to(ridRef.current, { rotate: 0, x: 0, y: 0, ease: 'power2.inOut', duration: 1 }, '<')
      //hot air
      .to(hotAirRef.current, { opacity: 1, duration: 0.1, ease: 'power2.inOut', y: 0 }, '<')


    //animate the name in between plate and rid
    logoAnimatition.to(logoPlate.current, { scale: 0.5, duration: 1, ease: 'none' })
      .to(ridRef.current, { scale: 0.5, duration: 1, ease: 'power1.in' }, '<')
      .to(logoNameRef.current, { scale: 0.5, xPercent: -116, yPercent: 10, ease: 'power2.inOut', duration: 0.5 }, '<0.45')
      .to('#chefHat', {
        x: -125,
        opacity: 1,
        scale: 1.5,
        rotate: -70,
        y: -10,
        duration: 3,
        ease: 'elastic'
      }, '<0.5')
      //animate logo out
      .to(logoSection.current, {
        height: 0,
        duration: 2,
        ease: 'power2.inOut',
        onStart: () => {
          gsap.to('#logo', { yPercent: -100, duration: 4, ease: 'power1' });
        },
        onUpdate: ScrollTrigger.refresh, // ✅ efficient
        onComplete: () => {
          logoSection.current.style.display = 'none';
          ScrollTrigger.refresh(); // ✅ final layout recalculation
          
        }
      },'>')
      .to(sceneRef.current,{opacity:1,y:0,duration:2,delay:1.5,rotate:0,ease:'power2.inOut'},'<')
      .to(nameContainerRef.current,{y:0,duration:1.5,ease:'power1.out',scale:1,opacity:1},'<')

      //.to(mainContainer.current, { backgroundColor: '#111' }, '<')



    // First scroll-triggered animation (pinned)
    const rotateTrigger = ScrollTrigger.create({
      trigger: heroSection.current,
      start: 'top -1%', //or top
      end: 'bottom 40%',
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
      animation: gsap.timeline()
        /*.to(heroImagesReferencePointRef.current,{
          rotate:360,
          duration:1,
          ease:'power2.inOut'
        })*/
        /*
                .to(beefRef.current, {
                  x:platform.isLargeScreen?200: 100,
                  duration: 1,
                  ease: 'power2.inOut'
                }, '<')
                .to(tomatoRef.current, {
                  x:platform.isLargeScreen?200: 100,
                  duration: 1,
                  ease: 'power2.inOut'
                }, '<')
                .to(vegRef.current, {
                  x:platform.isLargeScreen?200: 100,
                  duration: 1,
                  ease: 'power2.inOut'
                }, '<')*/
        .to(heroImagesReferencePointRondBorderRef.current, {
          scale: 1.2,
          duration: 2,
          opacity: 0,
          ease: 'power2.inOut',
        }, '<')
        .to(orderNow.current, {
          yPercent: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        }, '<')
        .to(sceneRef.current, {
          yPercent: -10, // 🔄 use yPercent instead of y: 100
          ease: 'power2.inOut',
          duration: 1,
        }, '<').to(sceneRef.current, {
          yPercent: 51,
          ease: 'power2.inOut',
          duration: 2,
        }, '>')
        .to(cookerSceneRef.current, {
          yPercent: -30,
          ease: 'power2.inOut',
          duration: 2,
        }, '<')
        .to(heroJoinNowRef.current, {
          xPercent: -100,
          opacity: 0,
          duration: 2,
          ease: 'power3.inOut'
        }, '<')

    });


    return () => {
      logoAnimatition.kill();
    }

  }, []);

  //heroSection
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.timeline({
        scrollTrigger:{
          trigger:mainContainer.current,
          start:'top 1%',
          end:'+=100',
          markers:true,
          scrub:true,
          pin:true,
        }
      }).to(nameContainerRef.current, {
  scale: 0.3,
  duration: 0.2,
  ease: "power1.in",
  height: "100%",
  y:-200,
  // Additional recommended properties:
  transformOrigin: "center center", // Explicitly set transform origin
  overwrite: "auto", // Prevents animation conflicts
  onComplete: () => console.log("Animation finished") // Optional callback
})
.to(whyUsContainerRef.current,{
  x:0,
  duration:0.2,
  ease:'power1.in',

},'<').to(ourServicesContainerRef.current,{
  x:0,
  duration:0.2,
  ease:'power1.in',

},'<')
    })
  },[])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: restaurantViewSectionRef.current,
          start: 'top 60%',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          markers: true,
          onUpdate: (self) => {
            setCookerProgress(self.progress);
          },
        },
      })
        .to('#hotMeal', {
          text: 'Hungry? No time to cook or queue? We deliver delicious meals straight to your doorstep. Order in seconds, eat in minutes',
          duration: 4,
          ease: 'power2.inOut',
        }, '<')

        .to('#hotMeal', {
          opacity: 0,
          ease: 'power2.inOut',
          duration: 1,
          delay: 1,
        }, '>')
        .to(cookerSceneRef.current, {
          x: () => {
            let cookerSceneBounds = cookerSceneRef.current.getBoundingClientRect();
            return -cookerSceneBounds.width/2;
          },
          duration: 1,
          ease: 'power2.out',
        }, '<').to(sceneRef.current, {
          x: () => {
            let sceneBounds = sceneRef.current.getBoundingClientRect();
            return -sceneBounds.width/2;
          },
          duration: 1,
          ease: 'power2.out',
        }, '<')

        .to(in30Minutes.current, {
          text: 'Taste the best that surprises you',
          duration: 2,
          ease: 'power2.inOut',
          opacity: 1,
        })

    });

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  useLayoutEffect(() => {
    //colors
    gsap.to(mainContainer.current, {
      //backgroundColor: '#111',
      scrollTrigger: {
        trigger: heroSection.current,
        start: 'top top',

      }
    })
  }, [])
  const sceneRef = useRef();
  const cookerSceneRef = useRef();
  const [progress, setProgress] = useState(0);
  const [cookerProgress, setCookerProgress] = useState(0);
  const [cookerStoryTellingProgress, setCookerStoryTellingProgress] = useState(0);
  const storyTellingRef = useRef();
  const in30Minutes = useRef();
  const heroImagesReferencePointRef = useRef();
  const vegRef = useRef();
  const tomatoRef = useRef();
  const beefRef = useRef();
  const heroImagesReferencePointRondBorderRef = useRef();
  const heroJoinNowRef = useRef();
  const menuRef = useRef();
  const nameContainerRef=useRef();
  const ourServicesContainerRef=useRef();
  const whyUsContainerRef=useRef()
  useLayoutEffect(() => {
    const ctx = gsap.timeline({
      scrollTrigger: {
        trigger: menuRef.current,
        start: 'top 90%',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => { setCookerStoryTellingProgress(self.progress) }
      }
    })

      .to(sceneRef.current, {
        opacity: 0,
        duration: 0.1,
        xPercent: -100,
        ease: 'power2.inOut',
      }, '<')
      .to(cookerSceneRef.current, {
        yPercent: 100,
        duration: 1,
        ease: 'power2.out',
      })
  }, [])


  //content story telling
  useLayoutEffect(() => {
    const contents = gsap.utils.toArray('.content');
    const storyTrack = storyTellingRef.current.querySelector(`.${mainStyles.storyTrack}`);

    gsap.to(storyTrack, {
      xPercent: -100 * (contents.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: storyTellingRef.current,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        end: () => `+=${storyTellingRef.current.offsetWidth}`,
      }
    });
  }, []);


  const [menuImageSize, setMenuImageSize] = useState(300); // Default to mobile size

  useEffect(() => {
    // Only calculate screen size on client side
    setMenuImageSize(window.innerWidth >= 800 ? 300 : 250);
  }, []);

  return (
    <div className={mainStyles.container} ref={mainContainer}>
      <section className={mainStyles.logoSection} ref={logoSection}>
        <div className={styles.container} ref={logoContainer}>
          <div className={styles.logo} id='logo'>

            <div className={styles.plateRid} ref={plateLogoRef}>
              <div className={styles.hotAir} ref={hotAirRef}>

                <Image
                  src='/logo/hotAir.png'
                  alt='hand'
                  width={200}
                  height={50}
                  priority
                />
              </div>
              <div className={styles.ridContainer}>
                <div className={styles.rid} ref={ridRef}>
                  <Image
                    src='/logo/rid.png'
                    alt='hand'
                    width={200}
                    height={100}
                    priority
                  />
                </div>
                <div className={styles.name} ref={logoNameRef} id='primaryColorOne'>
                  <div className={styles.chefHat} id='chefHat'>

                    <Image
                      src='/logo/chefhat.png'
                      alt='hand'
                      width={100}
                      height={100}
                      priority
                    />
                  </div>
                  {restaurantName}
                </div>
              </div>
              <div className={styles.logoPlate} ref={logoPlate}>
                <Image
                  src='/logo/platelogo.png'
                  alt='hand'
                  fill
                  style={{
                    objectFit: 'cover',
                  }}
                  priority
                />
              </div>
            </div>

            <div className={styles.hand} ref={handRef}>
              <Image
                src='/logo/hand.png'
                alt='hand'
                fill
                style={{
                  objectFit: 'cover',
                }}
                priority
              />
            </div>
          </div>
        </div>
      </section>


      <section className={mainStyles.heroSection} ref={heroSection}>
        <div className={mainStyles.whyUsContainer} ref={whyUsContainerRef}>
          <div className={mainStyles.whyUs}>
            <h4>
              WHY US
            </h4>
            <ul>
              <li>
                fast delivery
              </li>
              
              <li>
                mobile payment
              </li>
              
              <li>
                hot meals
              </li>
            </ul>
          </div>
          <div className={mainStyles.whyUsImages}>
            <Image
            src='/foodAssets/darkRestaurant.jpg'
            alt='whyus'
            fill
            priority
            style={{objectFit:'cover'}}
            />
          </div>
        </div>
        <div className={mainStyles.nameContainer} ref={nameContainerRef}>
          {restaurantName}
        </div>
        <div className={mainStyles.ourServicesContainer} ref={ourServicesContainerRef}>
          
        </div>
        <div className={mainStyles.threeDContainer} ref={sceneRef}>

          <Canvas>
            <Scene progress={progress} />
          </Canvas>
        </div>
      </section>




      <section className={mainStyles.restaurantViewSection} ref={restaurantViewSectionRef}>
        <div className={mainStyles.getHotMeal} id='hotMeal' />
        <div className={mainStyles.in30Minutes} ref={in30Minutes} />

        <div className={mainStyles.cookerSceneContainer} ref={cookerSceneRef}>
          <Canvas>
            <CookerScene progress={cookerProgress} storyTellingProgress={cookerStoryTellingProgress} />
          </Canvas>
        </div>
      </section>
      <section className={mainStyles.menu} ref={menuRef}>
        <div className={`${mainStyles.menuItem}`}>
          <div className={mainStyles.riceTextContainer}>
            <h2 className={mainStyles.riceName}>
              Rice
            </h2>
            <div className={mainStyles.description}>
              description
            </div>
            <div className={mainStyles.orderRice} id='primaryBackGroundColorTwo'>
              order now
            </div>
          </div>
          <div className={mainStyles.riceContainer}>
            <Image
              src='/plate2.png'
              alt='riceplate'
              priority
              height={menuImageSize}
              width={menuImageSize}
            />
          </div>
        </div>
        <div className={`${mainStyles.menuItem}`}>

          <div className={mainStyles.riceTextContainer}>
            <h2 className={mainStyles.riceName}>
              Rice
            </h2>
            <div className={mainStyles.description}>
              description
            </div>
            <div className={mainStyles.orderRice} id='primaryBackGroundColorTwo'>
              order now
            </div>
          </div>
          <div className={mainStyles.riceContainer}>
            <Image
              src='/plate2.png'
              alt='riceplate'
              priority
              height={menuImageSize}
              width={menuImageSize}
            />
          </div>
        </div>
        <div className={`${mainStyles.menuItem}`}>

          <div className={mainStyles.riceTextContainer}>
            <h2 className={mainStyles.riceName}>
              Rice
            </h2>
            <div className={mainStyles.description}>
              description
            </div>
            <div className={mainStyles.orderRice} id='primaryBackGroundColorTwo'>
              order now
            </div>
          </div>
          <div className={mainStyles.riceContainer}>
            <Image
              src='/plate2.png'
              alt='riceplate'
              priority
              height={menuImageSize}
              width={menuImageSize}
            />
          </div>
        </div>
        <div className={`${mainStyles.menuItem}`}>

          <div className={mainStyles.riceTextContainer}>
            <h2 className={mainStyles.riceName}>
              Rice
            </h2>
            <div className={mainStyles.description}>
              description
            </div>
            <div className={mainStyles.orderRice} id='primaryBackGroundColorTwo'>
              order now
            </div>
          </div>
          <div className={mainStyles.riceContainer}>
            <Image
              src='/plate2.png'
              alt='riceplate'
              priority
              height={menuImageSize}
              width={menuImageSize}
            />
          </div>
        </div>
      </section>
      <section className={mainStyles.storyTelling} ref={storyTellingRef}>
        <div className={mainStyles.storyTrack}>

          <div className={`${mainStyles.content} content`}>
            <div className={mainStyles.behindTheSceneContainer} >
              <div className={mainStyles.behindTheSceneImage}>
                <Image
                  src='/behindScenes.jpg'
                  alt='behindscenes'
                  priority
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
          <div className={`${mainStyles.content} content`}>2</div>
          <div className={`${mainStyles.content} content`}>3</div>
          <div className={`${mainStyles.content} content`}>4</div>
        </div>
      </section>
    </div>
  );
}

export default Logo;



{/**<div className={`${mainStyles.heroImagesReferencePointRondBorder} primaryBorder`} ref={heroImagesReferencePointRondBorderRef} />
        <div className={mainStyles.threeDContainer} ref={sceneRef}>

          <Canvas>
            <Scene progress={progress} />
          </Canvas>
          <div className={mainStyles.underSceneTag}>
            <div className={mainStyles.orderNowContainer} ref={orderNow} id='primaryBackGroundColorTwo'>
              <div className={mainStyles.orderNow}>
                order now
              </div>
            </div>
          </div>
        </div>
 */}