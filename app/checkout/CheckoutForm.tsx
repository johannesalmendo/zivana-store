'use client'

import { useCart } from "@/hooks/useCart";
import { formatRupiah } from "@/utils/formatPrice";
import { useStripe, useElements, PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps{
    clientSecret: string,
    handleSetPaymentSuccess: (value: boolean) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({clientSecret, handleSetPaymentSuccess}) => {
    const {cartTotalAmount, handleClearCart, handleSetPaymentIntent} =useCart()
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false);
    const formattedPrice = formatRupiah(cartTotalAmount)

    useEffect (() => {
        if(!stripe){
            return
        }
        if(!clientSecret){
            return
        }
        handleSetPaymentSuccess(false)
    },[stripe])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        setIsLoading(true)

        stripe.confirmPayment({
            elements, redirect :'if_required'
        }).then(result =>{
            if(!result.error){
                toast.success('Pembayaran berhasil!')

                handleClearCart()
                handleSetPaymentSuccess(true)
                handleSetPaymentIntent(null)
            }

            setIsLoading(false)
        })
    } 

    return ( 
      <form onSubmit={handleSubmit} id="payment-form" className="mb-6">
        <div className="mb-6">
            <Heading title="Isi detail"/>
        </div>
        <h2 className="font-semibold mb-2">Informasi Pengiriman</h2>
        <AddressElement options={{ mode: "shipping",  }}/>
        <h2 className="font-semibold mt-4 mb-2">Informasi Pembayaran</h2>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }}/>
        <div className="py-4 text-center text-black text-xl font-bold">
            Total : {formattedPrice}
        </div>
        <Button label={isLoading ? 'Memproses' : "Bayar"} disabled={isLoading || !stripe || !elements} onClick={() => {}}/>
      </form>
     );
}
 
export default CheckoutForm;