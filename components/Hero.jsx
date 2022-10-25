import css from "../styles/Hero.module.css";
import Cherry from "../assets/Cherry.png";
import HeroImage from "../assets/HeroImage.png";
import Pizza1 from "../assets/p1.jpg";
import {UilPhone} from "@iconscout/react-unicons";


import Image from "next/image";


const Hero = () => {
  return (
    <div className={css.container}>
        {/* Left Side */}
        <div className={css.left}>
       
            <div className={css.cherryDiv}>
                <span>More than Faster</span>
                <Image src={Cherry} alt="" width={40} height={25}/>
            </div>

            <div className={css.heroText}>
                <span>Be The Fastest</span>
                <span>In Delivering</span>
                <span>Your <span style={{color:"var(--themeRed"}}>Pizza</span></span>
            </div>

            <span className={css.miniText}>
                Our Mission is t filling your tummy with delicious food and with fast and free delivery
            </span>

            <button className={`btn ${css.btn}`}> Get Started </button>

        </div>


        {/* Right Side */}
        <div className={css.right}>
            <div className={css.imageContainer}>
                 <Image src={HeroImage} alt="" layout="intrinsic"/>
                {/*When using layout="intrinsic" or layout="fixed" the width property represents the rendered width in pixels, so it will affect how large the image appears */}
            </div>

            <div className={css.ContactUs}>
                <span>Contact us</span>
                <div>
                    <UilPhone color="white"/>
                </div>
            </div>

            <div className={css.Pizza}>
                <div>
                    <Image src={Pizza1} alt="" objectFit="cover" layout="intrinsic" />
                    {/* Object fit cover means if any crop require automatically manage by Image component*/}
                </div>
                <div className={css.details}>
                    <span>Italian Pizza</span>
                    <span><span style={{color:"var(--themeRed)"}}>$</span> 7.49</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero;