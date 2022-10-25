import { useState } from 'react';
import { Modal,useMantineTheme} from '@mantine/core';
import css from "../styles/OrderModal.module.css";
import { createOrder } from '../lib/orderHandler';
import  toast ,{Toaster} from 'react-hot-toast';
import { useStore } from '../store/store';
import { useRouter } from 'next/router';



const OrderModal = ({opened,setOpened,PaymentMethod}) => {
    const theme= useMantineTheme()
    const [FormData, setFormData] = useState({})
    const resetCart=useStore((state)=>state.resetCart)
    const total= typeof window !== 'undefined' && localStorage.getItem('total')
    const router=useRouter()

    // payOnDelivery=0
    // onlinePayment=1


    const handleInput=(e)=>{
        setFormData({...FormData,[e.target.name]:e.target.value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        // console.log(FormData);
        const id = await createOrder({...FormData,total,PaymentMethod})
        toast.success("Order Placed");
        resetCart();
        {
          typeof window !== 'undefined' && localStorage.setItem('order',id)
        }
        setOpened(null);
        router.push(`order/${id}`)
    }
  return (
    <div>
        <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={()=>setOpened(null)}
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input onChange={handleInput} type="text" name='name' required placeholder='Name' />
        <input onChange={handleInput} type="text" name='phone' required placeholder='Phone Number' />
        <textarea onChange={handleInput} name="address" rows={3} placeholder="Address"></textarea>
        {
          PaymentMethod===0? <span> You will pay<span> ₹{total}</span> on delivery</span>: PaymentMethod===1? <span> You already pay<span> ₹{total}</span> on Order time.</span>:" "

        }
        
        <button type='submit' className='btn'>Place Order</button>
      </form>
    </Modal>
    <Toaster/>
    </div>
  )
}

export default OrderModal;