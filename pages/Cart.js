import Image from "next/image";
import { useState } from "react";
import toast, {Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import { urlFor } from "../lib/client";
import { useStore } from "../store/store";
import css from "../styles/Cart.module.css";
import OrderModal from "../components/OrderModal";
import { useRouter } from "next/router";
const Cart = () => {
    const CartData=useStore((state)=>state.cart)
    const removePizza=useStore((state)=>state.removePizza)
    const payment=useStore((state)=>state.payment)
    const addPayment=useStore((state)=>state.addPayment)

    const [PaymentMethod, setPaymentMethod] = useState(null)    // this need to make global
    const router=useRouter()
    const [Order, setOrder] = useState(
        typeof window !== 'undefined' && localStorage.getItem('order')
    )

    const handleRemove=(id)=>{
        removePizza(id)
        toast.error("Item Removed");
    }
    const total=()=> CartData.pizzas.reduce((a,b)=>a+b.quantity*b.price,0)
    // Pay on Delivery
    const handleOnDelivery= ()=>{
        setPaymentMethod(0)
        addPayment(0)
        typeof window !== 'undefined' && localStorage.setItem('total',total())  //vdo 2nd 38:30  if browser window is enable then it store the localStorage item 
    }
    //online Payment
    const handleCheckout= async ()=>{
        typeof window !== 'undefined' && localStorage.setItem('total',total())  //if browser window is enable then it store the localStorage item
        setPaymentMethod(1);
        addPayment(1)
        const response= await fetch('/api/stripe/',{
            method:"post",
            headers:{
                'Content-Type':"application/json",
            },
            body:JSON.stringify(CartData.pizzas)
        })
        const data= await response.json()
        toast.loading("Redirecting...");
        router.push(data.url);
        // toast.error("Temporarily suspend this payment method");
    }
  return (
    <Layout>
        <div className={css.container}>
            {/* Details */}
            <div className={css.details}>
                    <table className={css.table}>
                        <thead>
                            <th>Pizza</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </thead>
                        <tbody className={css.tbody}>
                            {
                                CartData.pizzas.length >0 &&
                                CartData.pizzas.map((pizza,id)=>{

                                    const src= urlFor(pizza.image).url() 
                                    return(
                                    <tr key={id}>
                                        <td  className={css.imageTd}>
                                            <Image loader={()=>src} src={src} alt="" objectFit="cover" width={85} height={85}/>
                                        </td>
                                        <td>
                                            {pizza.name}
                                        </td>
                                        <td>
                                            {
                                                pizza.size === 0? "Small" :pizza.size === 1? "Medium" :"Large"
                                            }
                                        </td>
                                        <td>
                                            {pizza.price}
                                        </td>
                                        <td>
                                            {pizza.quantity}
                                        </td>
                                        <td>
                                            {pizza.price*pizza.quantity}
                                        </td>
                                        <td style={{color:"var(--themeRed)",cursor:"pointer"}} onClick={()=>handleRemove(id)}>
                                            x
                                        </td>
                                    </tr>
                                )})
                            }

                        </tbody>
                    </table>
                </div>
                {/* Summery */}
                <div className={css.cart}>
                    <span>Cart</span>
                    <div className={css.CartDetails}>
                        <div >
                            <span>Items</span>
                            <span>{CartData.pizzas.length}</span>
                        </div>
                        <div>
                            <span>Total</span>
                            <span>{total()}</span>
                        </div>
                    </div>
                    {   
                        !Order && CartData.pizzas.length>0 &&
                        (
                            <div className={css.buttons}>
                                <button className="btn" onClick={handleOnDelivery}>Pay on Delivery</button>
                                <button className="btn" onClick={handleCheckout} >Pay Now</button>
                            </div>
                        )
                    }
                    
                </div>
        </div>
        <Toaster/>
        <OrderModal opened={payment == 0} setOpened={addPayment}  PaymentMethod={payment} />
    </Layout>
  )
}

export default Cart;