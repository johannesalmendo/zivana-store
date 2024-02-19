/* eslint-disable @next/next/no-img-element */
'use client'
import { formatRupiah } from "@/utils/formatPrice";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps{
    currentUser: SafeUser | null
}

const CartClient: React.FC<CartClientProps> = ({currentUser}) => {
    const {cartProducts, handleClearCart, cartTotalAmount} = useCart()

    const router= useRouter()

    if(!cartProducts || cartProducts.length == 0){
        return(
            <div className="flex flex-col items-center">
                <div className="text-2xl">Keranjangnya Kosong😔</div>
            <div className="">
                <Link className="text-slate-500 flex items-center gap-1 mt-8" href={"/"}>
                <MdArrowBack/>
                <span>Belanja Dulu</span>
                </Link>
            </div>
            </div>
        )
    }

    return ( 
        <div className="mb-2">
            <Heading title="KERANJANG BELANJA" center/>
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-5">
                <div className="col-span-2 justify-self-start">Barang</div>
                <div className="justify-self-center">Harga</div>
                <div className="justify-self-center">Jumlah</div>
                <div className="justify-self-end">Total</div>
            </div>
            <hr/>
            <div className="">
            {cartProducts && cartProducts.map((item) => {
                return (
                    <ItemContent key={ item.id } item={item}/>
                )
            })}
            </div>
            <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
                <div className="max-w-[120px] ">
                    <Button small outline label="Bersihkan Keranjang" onClick={() => {handleClearCart()}}/>
                </div>
                <div className="text-sm flex flex-col gap-1 items-start">
                    <div className="flex justify-between text-base font-semibold w-[300px]">
                        <span className="">Total: </span>
                        <span>{formatRupiah(cartTotalAmount)}</span>
                    </div>
                    <Button 
                    label={currentUser ? "Beli" : "Login terlebih dahulu"} 
                    outline = {currentUser ? false : true}
                    onClick={() => {currentUser ?  router.push('/checkout') : router.push('/login')}}/>
                    <Link className="text-slate-500 flex items-center gap-1 mt-3" href={"/"}>
                        <MdArrowBack/>
                        <span>Belanja Lagi</span>
                    </Link>
                </div>
            </div>
        </div>
     );
}
 
export default CartClient;