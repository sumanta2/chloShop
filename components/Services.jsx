import Image from 'next/image';
import React from 'react'
import css from "../styles/Services.module.css";
import s1 from "../assets/s1.png"
import s2 from "../assets/s2.png"
import s3 from "../assets/s3.png"

const Services = () => {
  return (
    <>
    <div className={css.heading}>
        <span>WHAT WE SERVE</span>
        <span>Your Favorite Food</span>
        <span>Delivery Partner</span>
    </div>


    {/* Feature */}

    <div className={css.services}>
        <div className={css.feature}>
            <div className={css.ImageWrapper}>
                <Image src={s1} alt="" objectFit='cover' layout='intrinsic'/>
            </div>
            <span>Easy to Order</span>
            <span>You only need a few steps in food ordering</span>  
        </div>
        <div className={css.feature}>
            <div className={css.ImageWrapper}>
                <Image src={s2} alt="" objectFit='cover' layout='intrinsic'/>
            </div>
            <span>Easy to Order</span>
            <span>Delivery that is always on the even faster</span>  
        </div>
        <div className={css.feature}>
            <div className={css.ImageWrapper}>
                <Image src={s3} alt="" objectFit='cover' layout='intrinsic'/>
            </div>
            <span>Easy to Order</span>
            <span>Not only first for us, quality is also number one</span>  
        </div>
    </div>
    </>
  )
}

export default Services;