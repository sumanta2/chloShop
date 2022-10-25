import Layout from "../components/Layout";
import OrderModal from "../components/OrderModal"
import { useStore } from "../store/store";


const Success = () => {
   const payment=useStore((state)=>state.payment)
   const addPayment=useStore((state)=>state.addPayment)
  //  console.log(payment)
  return (
    <Layout>
        <OrderModal opened={payment==1} setOpened={addPayment}  PaymentMethod={payment}/>
   </Layout>
  )
}

export default Success;