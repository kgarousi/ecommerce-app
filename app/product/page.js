"use client"
import useCart from "../(store)/store"

export default function ProductPage(props) {
    const {searchParams} = props
    const {price_id} = props
    const product = useCart(state => state.product)
    const {cost, productInfo, name, description} = product
    const addItemToCart = useCart(state => state.addItemToCart)

    function handleAddToCart() {
        const newItem = {
            quantity: 1,
            price_id: price_id,
            name,
            cost
        }
        addItemToCart({newItem})
    }

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1500px] mx-auto gap-4">
                {/* Image Container */}
                <div className="relative w-full h-full">
                    <img src={productInfo.images[0]} alt={name} className='w-full h-full object-cover' />
                </div>
                {/* Text Container */}
                <div className="flex flex-col gap-4 p-4">
                    <h3 className="text-2xl font-bold">{name}</h3>
                    <p className="text-lg font-semibold">${cost / 100}</p>
                    <p className="text-sm flex-1">{description}</p>
                    <button onClick={handleAddToCart} className="bg-slate-700 text-white hover:bg-slate-500 cursor-pointer ml-auto px-4 py-2">Add to Cart</button>
                </div>
            </div>
        </div>
    )
} 