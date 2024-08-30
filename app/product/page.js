"use client";

import { useEffect, useState } from 'react';
import useCart from '../(store)/store'; // Adjust path if necessary
import { useRouter } from 'next/navigation';

export default function ProductPage({ searchParams }) {
    const { price_id } = searchParams;
    const [product, setProduct] = useState(null);
    const addItemToCart = useCart(state => state.addItemToCart);
    const router = useRouter();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/product?price_id=${price_id}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product data:', error);
                router.push('/'); // Redirect to home if fetching fails
            }
        }

        if (price_id) {
            fetchProduct();
        }
    }, [price_id, router]);

    if (!product) {
        return <div>Loading...</div>; // Show a loading state while fetching
    }

    const { unit_amount: cost, product: productInfo } = product;
    const { name, description, images } = productInfo;

    function handleAddToCart() {
        const newItem = {
            quantity: 1,
            price_id: price_id,
            name,
            cost
        };
        addItemToCart({ newItem });
    }

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1200px] mx-auto gap-4">
                {/* Image Container */}
                <div className="relative w-full h-full">
                    <img src={images[0]} alt={name} className='w-full h-full object-cover' />
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
    );
}
