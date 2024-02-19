/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Button from "@/app/components/Button";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle, MdArrowBack } from "react-icons/md"



interface ProductDetailsProps{
    product : any;
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    // selectedImg: SelectedImgType,
    qty: number,
    price: number,
    images: string;

}

// export type SelectedImgType = {
//     image: string
// }

const Horizontal = () =>{
    return <hr className="w-[30%] my-2"/>
}


const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const {handleAddProductToCart, cartProducts} = useCart()
    const [isProductInCart, setIsProductInCart] =  useState(false)
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        // selectedImg: {...product.images[0]},
        qty: 1,
        price: product.price,
        images: product.images,

    })
    console.log('product>>',  product)
    

    const router = useRouter()

    console.log(cartProducts)
 
    useEffect(() => {
        setIsProductInCart(false)
        if (cartProducts){
            const existingIndex = cartProducts.findIndex((item) => item.id == product.id);

            if(existingIndex > -1){
                setIsProductInCart(true)
            }
        }
    }, [cartProducts])

    const productRating = 
    product.reviews.reduce((acc:number, item:any) => 
    item.rating + acc, 0) / 
    product.reviews.length;

    const handleQtyIncrease = useCallback(() => {
        setCartProduct((prev) => {
            return { ...prev, qty: prev.qty + 1};
        });
    }, [cartProduct]);

    const handleQtyDecrease = useCallback(() => {

        if(cartProduct.qty == 1){
            return 
        }

        setCartProduct((prev) => {
            return { ...prev, qty: prev.qty - 1 };
        });
    }, [cartProduct]);

    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
            <Image className="relative aspect-square" src={product.images} alt={product.name} width={500} height={500} />
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly/>
                    <div className="">{product.reviews.length} reviews</div>
                </div>
                <Horizontal/>
                <div className="text-justify">
                    {product.description}
                </div>
                <Horizontal/>
                <div className="">
                    <span className="font-semibold">
                        KATEGORI:
                    </span> {product.category}
                </div>
                <div className={product.inStock ? "text-green-500" :"text-rose-500"}>
                    {product.inStock ? 'Stok Tersedia' : 'Stok Kosong'}
                </div>
                <Horizontal/>

                {isProductInCart ? 
                <>
                    <p className="mb-2 text-slate-500 flex items-center gap-1">
                        <MdCheckCircle className="text-teal-400" size={20}/>
                        <span>Sudah di Keranjang</span>
                    </p>
                    <div className="max-w-[300px]">
                        <Button label="Lihat Keranjang" outline onClick={()=>{ router.push ('/cart') }} />
                    </div>
                    <Link className="text-slate-500 flex items-center gap-1 mt-3" href={"/"}>
                        <MdArrowBack/>
                        <span>Belanja Lagi</span>
                    </Link>
                </> : 
                <>
                <SetQuantity
                 cartProduct={cartProduct}
                 handleQtyIncrease={handleQtyIncrease}
                 handleQtyDecrease={handleQtyDecrease}
                 />
                <Horizontal/>
                <div className="max-w-[300px]">
                    <Button
                    outline
                    label="Masukan Keranjang"
                    onClick={() => handleAddProductToCart(cartProduct)}
                    />
                </div>
                </>}


            </div>
        </div>
     );
}
 
export default ProductDetails;