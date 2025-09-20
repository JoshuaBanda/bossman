'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/selectRelish.module.css';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Image from 'next/image';
// Import Swiper core and required modules
import { EffectCoverflow } from 'swiper/modules';
import Cart from '@/components/cart/Cart';
import { useSearchParams } from 'next/navigation';



gsap.registerPlugin(TextPlugin);

const SelectRelish = () => {

    const searchParams = useSearchParams();
    const data = searchParams.get("data");

    useEffect(() => {
        if (data) {
            try {
                const parsed = JSON.parse(decodeURIComponent(data));
                setMealName(parsed.meal);
            } catch (e) {
                console.error("Failed to parse payload", e);
            }
        }
    }, [data]);
    const [mealName, setMealName] = useState('');
    const relishList = [

        {
            relish: 'Beef',
            price: 4000,
        },
        {
            relish: 'Chicken',
            price: 4000,
        },
        {
            relish: 'Beans',
            price: 4000,
        },
        {
            relish: 'Peans',
            price: 4000,
        },
        {
            relish: 'Chambo',
            price: 4000,
        },
        {
            relish: 'Usipa',
            price: 4000,
        },
        {
            relish: 'Eggs',
            price: 4000,
        },
        {
            relish: 'plain',
            price: 3000,
        },
    ];


    const [meal, setMeal] = useState('Rice');
    const quantityReactionRef = useRef();

    const [mealQuantities, setMealQuantities] = useState(
        relishList.map(() => 0) // start all with quantity 0
    );
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const total = mealQuantities.reduce((sum, q) => sum + q, 0);
        setTotalQuantity(total);
    }, [mealQuantities]);



    const handleMealIncrement = (index) => {
        setMealQuantities((prev) =>
            prev.map((q, i) => {
                if (i === index) {
                    if (q >= 3) {
                        console.log('too many plates');
                        return q;
                    }
                    return q + 1;
                }
                return q;
            })
        );
    };

    const handleMealDecrement = (index) => {
        setMealQuantities((prev) =>
            prev.map((q, i) => {
                if (i === index) {
                    if (q <= 0) {
                        console.log('invalid plates');
                        return q;
                    }
                    return q - 1;
                }
                return q;
            })
        );
    };






    const [selectedRelish, setSelectedRelish] = useState(0);
    const [listItemHeight, setListItemHeight] = useState(0);

    const firstLiRef = useRef();
    const notchRef = useRef();
    const openingTextRef = useRef();

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
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({})
                .to(openingTextRef.current, {
                    text: ' SELECT YOUR RELISH',
                    duration: 2,
                    ease: 'none',
                })
        });

        return () => ctx.revert();
    }, [])


    const handleCardClick = (index) => {
        setSelectedRelish(index);
    };


    return (
        <div className={styles.container}>
            <div className={styles.sideBar}>
                <div className={styles.menu}>
                    <svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z" />
                        <path d="M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12Z" />
                        <path d="M6 20C7.10457 20 8 19.1046 8 18C8 16.8954 7.10457 16 6 16C4.89543 16 4 16.8954 4 18C4 19.1046 4.89543 20 6 20Z" />
                        <path d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z" />
                        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" />
                        <path d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z" />
                        <path d="M18 8C19.1046 8 20 7.10457 20 6C20 4.89543 19.1046 4 18 4C16.8954 4 16 4.89543 16 6C16 7.10457 16.8954 8 18 8Z" />
                        <path d="M20 12C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12Z" />
                        <path d="M18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18C16 19.1046 16.8954 20 18 20Z" />
                    </svg>
                </div>
                <ul>
                    {relishList.map((item, index) => (
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
                    <div className={styles.header} ref={openingTextRef} id='primaryColorTwo' />
                </div>
                <div className={styles.swiperContainer}>

                    <SwiperDisplay
                        relishList={relishList}
                        meal={mealName}
                        mealQuantities={mealQuantities}
                        handleMealIncrement={handleMealIncrement}
                        handleMealDecrement={handleMealDecrement}
                        onCardClick={handleCardClick}
                        selectedRelish={selectedRelish}
                    />

                </div>
                <div className={styles.bottom}>
                    <div className={styles.orderNowContainer}>
                        <svg width="184" height="64" viewBox="0 0 184 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M161.777 1H1V63H161.777L183 32L161.777 1Z" fill="#FF6502" stroke="#FF6502" />
                        </svg>

                        <span className={styles.orderNow}>
                            order now
                        </span>
                    </div>
                    <div className={styles.cartContainer}>
                        <Cart totalQuantity={totalQuantity} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectRelish;



const SwiperDisplay = ({ relishList, meal, mealQuantities, handleMealIncrement, handleMealDecrement, onCardClick,
    selectedRelish, }) => {
    const swiperRef = useRef(null);

    return (
        <Swiper
            modules={[EffectCoverflow]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            effect="coverflow"
            centeredSlides
            loop={false}
            slidesPerView="auto"
            coverflowEffect={{
                rotate: 15,
                stretch: 0,
                modifier: 2.5,
                slideShadows: false,
            }}
            style={{ padding: '0px 0px 60px 20px' }}
        >
            {relishList.map((item, index) => (
                <SwiperSlide key={item.relish} style={{ width: '280px' }}>
                    <SliderDisplayCard
                        relish={item.relish}
                        mealName={meal}
                        price={item.price}
                        quantity={mealQuantities[index]} // now defined
                        onIncrement={() => handleMealIncrement(index)}
                        onDecrement={() => handleMealDecrement(index)}
                        onClick={() => onCardClick(index)}
                        isSelected={selectedRelish === index}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};











const SliderDisplayCard = ({
    mealName,
    relish,
    price = 4000,
    quantity = 1,
    onIncrement,
    onDecrement,
    onClick,
    isSelected
}) => {
    const quantityReactionRef = useRef();
    const [plain, setPlain] = useState(false);
    useEffect(() => {
        if (!quantityReactionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.timeline()
                .set(quantityReactionRef.current, {
                    opacity: 1,
                    text: `${quantity}`,
                    backgroundColor: 'orangered',
                })
                .to(quantityReactionRef.current, { y: -80, opacity: 0, duration: 1.2 })
        }, quantityReactionRef);

        return () => ctx.revert();
    }, [quantity]);

    useEffect(() => {
        if (relish == 'plain') {
            setPlain(true);
            console.log('plain')
        }
    }, [relish])

    return (

        <div
            className={`${styles.sliderDisplayCardContainer} ${isSelected ? styles.selectedCard : ''}`}
            onClick={onClick}
        >
            <div className={styles.likeContainer}>

            </div>
            <div className={styles.imageWrapper}>
                <Image
                    src='/foodplate.png'
                    alt='meal'
                    priority
                    width={150}
                    height={150}
                />
            </div>
            <div className={styles.mealName} id='primaryColorTwo'>
                {mealName} and {relish}
            </div>
            <div className={styles.mealDescription}>
                {plain ? (
                    <>
                        Get your {relish} {mealName} fix in minutes
                    </>
                ) : (
                    <>
                        Get your {mealName} and {relish} fix in minutes
                    </>
                )}
            </div>
            <div className={styles.remaingQuantity}>
                <div className={styles.quantityIcon}>

                    <svg data-name="Layer 1" id="Layer_1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                        width='70%'
                        height='70%'
                    >
                        <path d="M464.57,274a5.69,5.69,0,0,0,5.69-5.69V208.54a5.69,5.69,0,0,0-5.69-5.69H404.8a5.69,5.69,0,0,0,0,11.38h46l-67,67,0,0-52.95,52.94,0,0-30.88,30.88L225.26,290.5l225.05-225v46a5.69,5.69,0,0,0,11.38,0V51.71A5.68,5.68,0,0,0,456,46H396.24a5.69,5.69,0,1,0,0,11.37h46l-225,225.06-51.81-51.81a5.69,5.69,0,0,0-8,0l-114,114a5.69,5.69,0,0,0,8,8.05L161.39,242.72l47.78,47.78L43.41,456.26a5.68,5.68,0,0,0,4,9.71H464.57a5.69,5.69,0,1,0,0-11.37H393.51v-167l65.37-65.38v46A5.69,5.69,0,0,0,464.57,274ZM299.91,378.89a5.69,5.69,0,0,0,4-1.67L329.14,352V454.6h-41.6V368.87l8.35,8.35A5.68,5.68,0,0,0,299.91,378.89ZM276.16,454.6H234.55V315.88l41.61,41.61Zm-53-150.1V454.6h-41.6V334.19l35.65-35.65Zm-53,150.1H128.58V387.18l41.61-41.61Zm-53-56.05V454.6h-56Zm264.92-60.28V454.6H340.52v-114L382.13,299Z" /><path d="M256,57.4h84.05a5.69,5.69,0,1,0,0-11.37H256a5.69,5.69,0,1,0,0,11.37Z" /><path d="M340.05,83H298a5.69,5.69,0,1,0,0,11.38h42a5.69,5.69,0,0,0,0-11.38Z" />
                    </svg>
                </div>
                <div className={styles.quantityDescription}>
                    20 plates remaining
                </div>
            </div>
            <div className={styles.price} id='primaryColorTwo'>
                <span style={{ fontSize: '10px', top: '0px' }}>
                    mk
                </span>
                <span style={{ fontWeight: '900' }}>
                    {price}
                </span>
            </div>
            <div className={styles.orderQuantity}>
                <div className={styles.quantityButton} id="baseBackgroundColor">
                    <div className={styles.subtractButton} onClick={onDecrement}>
                        -
                    </div>
                    <div className={styles.toOrderQuantity}>
                        {quantity}
                    </div>
                    <div className={styles.add} onClick={onIncrement}>
                        +
                    </div>
                </div>
                <div className={styles.qauntityReaction} ref={quantityReactionRef}></div>
            </div>
            <div className={styles.ratings}>
                4.5 ratings
            </div>
        </div>
    )
}
