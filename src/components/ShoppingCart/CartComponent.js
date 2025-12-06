import { useCart } from "./Shoppingcart.js";
import { GiTrashCan } from "react-icons/gi";
import './CartComponent.css';

const CartComponent = () => {
    const { cart, handleIncreaseQuantity, handleDecreaseQuantity, deleteProduct, calculateTotal } = useCart();
    const updatedCart = cart.map((product) => ({
        ...product,
        quantity: product.quantity || 1
    }));
    const incrementHandler = (productId) => {
        handleIncreaseQuantity(productId);
    };
    const decrementHandler = (productId) => {
        handleDecreaseQuantity(productId)
    };

    const removeProductHandler = (productId) => {
        deleteProduct(productId);
    };

    return (
        <main className="cart flex gap-8 cart-product p-5 mt-[200px]">
            <div className="w-[70%] flex-1">
                <h4 className="ps-5 text-[#ebeefd] text-lg my-5">سبد خرید</h4>
                {updatedCart.map((productCart) => {
                    return (
                        <div key={productCart.product_id}>
                            <div className="cart-items flex flex-col mb-10">
                                <div className="box-product flex text-[#cbcacb]">
                                    <div className="image-wrapper ml-5 flex items-center justify-center w-[160px] h-[160px] overflow-hidden">
                                        {
                                            productCart.images.filter((image) => image.is_main === "1")
                                                .map((image) => {
                                                    return <img key={image.image_id} src={image.image_link} alt="Product" />;
                                                })
                                        }
                                    </div>
                                    <div className="detail-item w-full">
                                        <div className="detail-product">
                                            <div className="name-price flex flex-row justify-between">
                                                <span className="text-base">{productCart.name}</span>
                                                <div className="price mr-auto">
                                                    {
                                                        productCart.features.map((productPrice) => {
                                                            return <p className="font-bold card-text">{Number(productPrice.price).toLocaleString('fa-IR')}</p>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group-btn flex items-center mt-[95px] ml-2">
                                            <button className="text-xl" onClick={() => incrementHandler(productCart.product_id)}>+</button>
                                            <span>{productCart.quantity}</span>
                                            <button className="text-xl" onClick={() => decrementHandler(productCart.product_id)}>-</button>
                                        </div>
                                        <button className="delete-product inline-flex items-center text-2xl text-[#787878]" onClick={() => removeProductHandler(productCart.product_id)}>
                                            <GiTrashCan />
                                            <span className="text-base pt-1">حذف</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    );
                })}
            </div>
            <div className="product-check w-[30%] mt-16">
                <div className="product-checkBox px-1 text-[#b8b8b8]">
                    <div className="sub-price text-sm">
                        <div className="flex flex-row justify-between my-3">
                            <span>جمع کل کالاها</span>
                            <span>{Number(calculateTotal()).toLocaleString('fa-IR')}<small>تومان</small></span>
                        </div>
                        <div className="flex flex-row justify-between my-3">
                            <span>تخفیف کل کالاها</span>
                            <span class="discount-check text-[#ed1ce7]"> 0 <small>تومان</small></span>
                        </div>
                    </div>
                    <div className="box-sub">
                        <div className="show-shopping flex items-center justify-center flex-col text-base gap-4">
                            <h5 className="text-center text-white">جمع سبد خرید</h5>
                            <span>{Number(calculateTotal()).toLocaleString('fa-IR')}<small> تومان</small></span>
                        </div>
                        <button class="btn-continue my-5">ادامه فرآیند خرید</button>
                        <p className="text-sm w-full text-justify">هزینه‌ی ارسال در ادامه بر اساس آدرس، زمان و نحوه‌ی ارسال انتخابی شما‌ محاسبه و به این مبلغ اضافه خواهد شد</p>
                    </div>
                </div>
            </div>
        </main >
    );
};

export default CartComponent;
