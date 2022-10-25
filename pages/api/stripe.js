import Stripe from "stripe";     //create secret api key for stripe vdo21:37:17

const data=process.env.STRIPEKEY

const stripe= new Stripe(data);

export default async function handler(req,res){
    if(req.method== 'POST')
    {
        try {
            const params={
                submit_type:'pay',
                mode:"payment",
                payment_method_types:['card'],
                line_items:req.body.map((item)=>{
                    const img=item.image.asset._ref;     //vdo2 1:41:06
                    const newImage=img.replace(
                        "image-","https://cdn.sanity.io/images/c3lmkihf/production/"
                    ).replace('-jpg','.jpg');
                    return{
                        price_data:{
                            currency:'inr',
                            product_data:{
                                name:item.name,
                                images:[newImage],
                            },
                            unit_amount:item.price*100
                        },
                        adjustable_quantity:{
                            enabled:false,
                        },
                        quantity:item.quantity,
                    }
                }),
                success_url:`${req.headers.origin}/success`,
                cancel_url:`${req.headers.origin}/Cart`
            };

            //checkout Session

            const session= await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message)
        }
    }
    else{
        res.seHeader("Allow","POST");
        res.status(405).end("Method Not allowed")
    }
}

