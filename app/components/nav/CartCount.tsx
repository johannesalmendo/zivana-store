'use client'

import { PiShoppingCart } from "react-icons/pi";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import ShakyCartIcon from '@/utils/ShakyCartIcon';


const CartCount = () => {
    const {cartTotalQty} = useCart()
    const router = useRouter()
    return ( 
        <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
            <div className="text-3xl">
                <ShakyCartIcon/>
            </div>
            <span className="absolute top-[-5px] right-[-4px] bg-red-600 text-white h-4 w-4 rounded-full flex items-center justify-center text-xs ">
                { cartTotalQty ? `${cartTotalQty}` : ''}
            </span>
        </div>
     );
}
 
export default CartCount;