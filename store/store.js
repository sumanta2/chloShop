import create from 'zustand';

export const useStore=create(
    (set)=>({
        cart:{
            pizzas:[],
        },
        payment:1,

        //Add pizza in cart

        addPizza: (data)=>
            set((state)=>({
                cart:{
                    pizzas:[...state.cart.pizzas,data]
                }
            })),
        
        //Remove Pizza
        removePizza:(index)=>
            set((state)=>({
                cart:{
                    pizzas:state.cart.pizzas.filter((data,id)=>id != index)
                }
            })),
        resetCart:()=>
        set(()=>({

            cart:{
                pizzas:[]
            }
        })),
        //Add Payment Method

        addPayment: (data)=>
            set((state)=>({
                    payment:data
            })),
        
    })
)