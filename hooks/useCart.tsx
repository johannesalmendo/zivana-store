/* eslint-disable react-hooks/exhaustive-deps */
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { toast } from "react-hot-toast";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null
  handleSetPaymentIntent : (val: string | null) => void
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("zivCart");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    const zivPaymentIntent:any = localStorage.getItem('zivPaymentIntent')
    const paymentIntent: string | null = JSON.parse(zivPaymentIntent)

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent)
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.qty;
            acc.total += itemTotal;
            acc.qty += item.qty;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );

        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);



  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
        setCartTotalQty(prev.length + 1);
      } else {
        updatedCart = [product];
      }
      toast.success("Berhasil");
      localStorage.setItem("zivCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(filteredProducts);
        toast.success("Berhasil dihapus");
        localStorage.setItem("zivCart", JSON.stringify(filteredProducts));
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.qty == 30) {
        return toast.error("Maaf, Sudah Batas Maksimum");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id == product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].qty = ++updatedCart[existingIndex].qty;
          setCartProducts(updatedCart);
          localStorage.setItem("zivCart", JSON.stringify(updatedCart));
        }
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.qty == 1) {
        return toast.error("Maaf, Sudah Batas Minimum");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id == product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].qty = --updatedCart[existingIndex].qty;
          setCartProducts(updatedCart);
          localStorage.setItem("zivCart", JSON.stringify(updatedCart));
        }
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("zivCart", JSON.stringify(null));
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback((val: string | null) =>{
    setPaymentIntent(val)
    localStorage.setItem("zivPaymentIntent", JSON.stringify(val))
  }, [paymentIntent])

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context == null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
