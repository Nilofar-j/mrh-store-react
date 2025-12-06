import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        alert("این محصول به سبدخریدشمااضافه شد.");
        setCart((prevCart) => {
            const isInCart = prevCart.find(item => item.product_id === product.product_id);
            if (isInCart) {
                return prevCart.map(item =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const handleIncreaseQuantity = (productId) => {
        setCart(cart.map((product) => {
            return product.product_id === productId
                ? { ...product, quantity: (product.quantity || 1) + 1 }
                : product;
        }));
    };

    const handleDecreaseQuantity = (productId) => {
        setCart(cart.map((product) => {
            return product.product_id === productId
                ? { ...product, quantity: Math.max((product.quantity || 1) - 1, 1) }
                : product;
        }));
    };

    const deleteProduct = (productId) => {
        alert('محصول باموفقیت حذف شد.');
        setCart((prevCart) => {
            const newCart = [...prevCart];
            const findProductIndex = newCart.findIndex((item) => item.product_id === productId);
            if (findProductIndex !== -1) {
                newCart.splice(findProductIndex, 1);
            };
            return newCart;
        });
    };


    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const productPrice = item.features.find((feature) => feature.price);
            if (productPrice) {
                return total + productPrice.price * item.quantity;
            };
            return total;
        }, 0);
    };
    return (
        <CartContext.Provider value={{ cart, addToCart, handleIncreaseQuantity, handleDecreaseQuantity, deleteProduct, calculateTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
