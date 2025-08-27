
import React from 'react'
import styles from './styles/herosection.module.css';
import Image from 'next/image';
import CartIcon from '@/components/svgs/CartIcon';
import WalletIcon from '@/components/svgs/WalletIcon';
import FilesIcon from '@/components/svgs/FilesIcon';
import FacebookIcon from '@/components/svgs/FaceBookIcon';
import InstagramIcon from '@/components/svgs/InstagramIcon';
import TikTokIcon from '@/components/svgs/TikTokIcon';

const HeroSection = ({ restaurantName = 'Restuarant name' }) => {

    const svgBottonOptions = [{
        name: 'cart',

    }]
    return (
        <div className={styles.container}>
            <div className={styles.sidePhoto}>

                <Image src='/eating.jpg'
                    alt='food'
                    priority
                    fill
                    style={{ objectFit: 'cover' }}
                />
            
            <div className={styles.socialMediaContainer}>
                <span style={{width:'60%'}}>  
                Every one deserves a peace of delicous meal
                </span>
                <div className={styles.socialMediaIcons}>
                    <div className={styles.faceBook}>
                        <FacebookIcon/>
                    </div>
                    <div className={styles.instagram}>
                        <InstagramIcon/>
                    </div>
                    <div className={styles.tiktok}>
                        <TikTokIcon/>
                    </div>
                </div>
            </div>
            </div>
            <div className={styles.leftSide}>

                <div className={styles.brand}>
                    <div className={styles.brandName}>
                        {restaurantName}
                    </div>
                    <div className={styles.motto}>
                        <div className={styles.deliciousFood}>
                            Delicious Food
                        </div>
                        <div className={styles.isWaiting}>
                            <li>
                                is waiting
                            </li>
                            <li className={styles.mottoPhoto}>
                                <Image src='/foodassets/rostedRib.jpg'
                                    alt='food'
                                    priority
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </li>
                        </div>
                        <div className={styles.forYou}>
                            for you
                        </div>
                    </div>
                </div>

                <div className={styles.bottomPhotos}>
                    <div className={styles.bottomSecondPhoto}>
                        <div className={styles.svgContainer}>
                            <div className={styles.buttonContainer}>
                                <div>
                                    <CartIcon />
                                </div>
                                <div>
                                    <WalletIcon />
                                </div>
                                <div>
                                    <FilesIcon />
                                </div>
                            </div>
                            <svg width="100%" height="100%" viewBox="0 0 877 491" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="imageFill" patternUnits="userSpaceOnUse" width="1440" height="1024">
                                        <image
                                            href="/eating.jpg"
                                            width="1440"
                                            height="1024"
                                            preserveAspectRatio="xMidYMid slice"
                                        />
                                    </pattern>
                                    <pattern id="imageFill2" patternUnits="userSpaceOnUse" width="1440" height="1024">
                                        <image
                                            href="/restuarantint2.jpg"
                                            width="1440"
                                            height="1024"
                                            preserveAspectRatio="xMidYMid slice"
                                        />
                                    </pattern>
                                </defs>
                                <rect fill="url(#imageFill)" width="269" height="491" rx="30" />
                                <path
                                    fill="url(#imageFill)" d="M847 0C863.569 1.35295e-06 877 13.4315 877 30V237C877 253.569 863.569 267 847 267H819C802.431 267 789 280.431 789 297V461C789 477.569 775.569 491 759 491H345C328.431 491 315 477.569 315 461V30C315 13.4315 328.431 2.21464e-07 345 0H847Z" />
                            </svg>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection