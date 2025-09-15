'use client';
import React, { useState } from 'react'
import styles from './styles/orderMeal.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading/Loading';

const page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const mealQuery = {
        mealName: 'Rice and chicken',
        photo: '/foodplate.png',
        quantity: 2,
        price: 4000,
    };

    const user = {
        firstName: 'Joshua',
        lastName: 'Banda',
        email: 'bsc-inf-04-22@unima.ac.mw'
    }

    const handleOrderNowButton = () => {
        setIsLoading(true);
        const payload = {
            meal: mealQuery,
            user,
        };

        const encoded = encodeURIComponent(JSON.stringify(payload));
        router.push(`/confirmDeliveryOptions?data=${encoded}`);
    }

    const otherMeals = [
        {
            meal: 'Nsima and Chicken',
            price: 4000,
            photo: '/foodplate.png'
        }, {
            meal: 'Nsima and Beef',
            price: 4000,
            photo: '/foodplate.png'
        }, {
            meal: 'Nsima and Beans',
            price: 4000,
            photo: '/foodplate.png'
        }
    ];
    const otherMealsListDisplay = otherMeals.map((item, index) => {
        return (
            <li key={index}>
                <div className={styles.otherMealImage}>
                    <Image
                        src={item.photo}
                        alt={item.meal}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className={styles.otherMealName}>
                    {item.meal}
                </div>
                <div className={styles.otherMealPrice} id='primaryColorTwo'>
                    Mk  {item.price}
                </div>
            </li>
        )
    })
    return (
        <div className={styles.container}>
            {isLoading ?
                (
                    <div>
                        <Loading />
                    </div>
                ) : (
                    <>
                        <div className={styles.orderItemContainer}>
                            <div className={styles.decolativeStyles}>
                                <div className={styles.topShape}>
                                    <svg width="100%" height="100%" viewBox="0 0 352 525"  xmlns="http://www.w3.org/2000/svg">
                                        <path d="M-6.80157 5.123C-68.0016 -16.077 -169.635 33.623 -212.802 61.123C-292.69 101.294 -249.516 275.76 -213.679 420.576L-212.802 424.123C-176.802 569.623 -136.802 514.123 -121.302 514.123C-105.802 514.123 -56.3016 419.623 76.1984 482.623C208.698 545.623 334.198 406.123 349.698 330.123C365.198 254.123 271.198 182.123 197.198 173.123C123.198 164.123 69.6984 31.623 -6.80157 5.123Z" fill="#FF6502" />
                                    </svg>

                                </div>
                            </div>
                            <div className={styles.orderItemImage}>
                                <Image
                                    src='/foodplate.png'
                                    alt='food'
                                    width={350}
                                    height={350}
                                />

                            </div>
                            <div className={styles.orderItemInfomation}>
                                <div className={styles.mealName}>
                                    Rice and Chicken
                                </div>
                                <div className={styles.mealInfo}>
                                    Get your rice and chicken meal fix in minutes.
                                </div>
                                <div className={styles.ratingsContainer}>
                                    * * * 4.3 ratings
                                </div>
                                <div className={styles.reviewsContainer}>
                                    <div className={styles.seeReview}>
                                        See reviews..
                                    </div>
                                    <div className={styles.arrow}>
                                        <svg
                                            height="24"
                                            width="24"
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
                                </div>
                                <div className={styles.likeAndAvailabilityContainer}>
                                    <div className={styles.like}>
                                        like
                                    </div>
                                    <div className={styles.availability}>
                                        <div className={styles.availabilityIcon}>
                                            <svg height='60%' width='60%' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M464.57,274a5.69,5.69,0,0,0,5.69-5.69V208.54a5.69,5.69,0,0,0-5.69-5.69H404.8a5.69,5.69,0,0,0,0,11.38h46l-67,67,0,0-52.95,52.94,0,0-30.88,30.88L225.26,290.5l225.05-225v46a5.69,5.69,0,0,0,11.38,0V51.71A5.68,5.68,0,0,0,456,46H396.24a5.69,5.69,0,1,0,0,11.37h46l-225,225.06-51.81-51.81a5.69,5.69,0,0,0-8,0l-114,114a5.69,5.69,0,0,0,8,8.05L161.39,242.72l47.78,47.78L43.41,456.26a5.68,5.68,0,0,0,4,9.71H464.57a5.69,5.69,0,1,0,0-11.37H393.51v-167l65.37-65.38v46A5.69,5.69,0,0,0,464.57,274ZM299.91,378.89a5.69,5.69,0,0,0,4-1.67L329.14,352V454.6h-41.6V368.87l8.35,8.35A5.68,5.68,0,0,0,299.91,378.89ZM276.16,454.6H234.55V315.88l41.61,41.61Zm-53-150.1V454.6h-41.6V334.19l35.65-35.65Zm-53,150.1H128.58V387.18l41.61-41.61Zm-53-56.05V454.6h-56Zm264.92-60.28V454.6H340.52v-114L382.13,299Z" />
                                                <path d="M256,57.4h84.05a5.69,5.69,0,1,0,0-11.37H256a5.69,5.69,0,1,0,0,11.37Z" />
                                                <path d="M340.05,83H298a5.69,5.69,0,1,0,0,11.38h42a5.69,5.69,0,0,0,0-11.38Z" /></svg>
                                        </div>
                                        <div className={styles.availabilityInfo}>
                                            20 plates remaining
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.action}>
                                <div className={styles.helpContainer}>
                                    <div className={styles.help}>
                                        ?
                                    </div>
                                    <div className={styles.helpInfo}>
                                        Help
                                    </div>
                                </div>
                                <div className={styles.price} id='primaryColorTwo'>
                                    Mk 4000
                                </div>
                                <div className={styles.quantity} id='baseBackgroundColor'>
                                    <div className={styles.quantityAdded}>
                                        1 Plate added
                                    </div>
                                    <div className={styles.subtractButton}>
                                        -
                                    </div>
                                    <div className={styles.addButton}>
                                        +
                                    </div>
                                </div>
                                <div className={styles.orderNow} id='primaryBackgroundColorTwo' onClick={() => { handleOrderNowButton() }}>
                                    Order now
                                </div>
                            </div>
                        </div>
                        <div className={styles.recommendationsContainer}>
                            <div className={styles.youMayLike}>
                                You may also like
                            </div>
                            <div className={styles.otherMeals}>
                                <ul className={styles.otherMealsList}>
                                    {otherMealsListDisplay}
                                </ul>
                            </div>
                        </div>
                    </>
                )}

        </div>
    )
}

export default page