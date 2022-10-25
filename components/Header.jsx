import Image from "next/image";
import css from "../styles/Header.module.css";
import Logo from "../assets/Logo.png";
import {UilShoppingBag,UilReceipt} from "@iconscout/react-unicons";
import {useStore} from "../store/store";
import Link from "next/link";
import { useState ,useEffect} from "react";
const Header = () => {


    const data=useStore((state)=>state)
    const [Order, setOrder] = useState("second")
    const length=useStore((state)=>state.cart.pizzas.length)
    useEffect(()=>{
        setOrder(localStorage.getItem("order"))
    },[])
  return (
    <div className={css.header}>
        <div className={css.logo}>
            <Image src={Logo} alt="" width={50} height={50} />
            <span>SUDO</span>
        </div>


        {/* Menu side */}
        <ul className={css.menu}>
            <li>
                <Link href="../">Home</Link>
            </li>
            <li>Menu</li>
            <li>Contact</li>
        </ul>

        {/* Right Side */}
        <div className={css.rightSide}>
            <Link href="/Cart">
                <div className={css.cart}>
                    <UilShoppingBag size={35} color="#2E2E2E"/>
                    <div className={css.badge}>{length}</div>
                </div>
            </Link>
            {Order && (
                <Link href={`/order/${Order}`} >
                    <div className={css.cart}>
                        <UilReceipt size={35} color="#2E2E2E"/>
                        {Order != "" && <div className={css.badge}> 1</div>}
                    </div>
                </Link>
            )}
        </div>

        
    </div>
  )
}

export default Header;