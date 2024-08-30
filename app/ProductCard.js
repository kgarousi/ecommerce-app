"use client"; // Indicates that this component uses client-side rendering in Next.js

import React from 'react'; // Import React library for building UI components
import { useRouter } from 'next/navigation'; // Import useRouter hook from Next.js for navigation
import { useCart } from './(store)/store'; // Import useCart hook from the Zustand store

// Define the ProductCard functional component
export default function ProductCard(props) {
    // Destructure the product object passed as props
    const { product } = props;
    const { id: price_id, unit_amount: cost, product: productInfo } = product;
    const { name, description } = productInfo;
    
    // Use Zustand store to get the setProduct function
    const setProduct = useCart(state => state.setProduct);
    
    // Get the router object for navigation
    const router = useRouter();
    
    // Function to handle click events on the product card
    function onProductClick() {
        // Create a new product object with the relevant details
        const newProduct = {
            name,
            description,
            price_id,
            cost,
            productInfo
        };
        
        // Update the Zustand store with the new product details
        setProduct({ newProduct });
        
        // Navigate to the product page with the price_id as a query parameter
        router.push('/product?price_id=' + price_id);
    }

    return (
        // The product card container with click handler
        <div 
            onClick={onProductClick} 
            className='flex flex-col shadow bg-white hover:shadow-lg hover:shadow-black cursor-pointer'
        >
            {/* Product image */}
            <img 
                src={productInfo.images[0]} 
                alt={name} 
                className='w-full h-full object-cover'
            />
            {/* Product details */}
            <div className='flex flex-col gap-2 p-4'>
                <div className='flex items-center justify-between'>
                    {/* Product name and price */}
                    <h3>{name}</h3>
                    <p>${cost / 100}</p> {/* Convert cost from cents to dollars */}
                </div>
                <p className='text-sm'>{description}</p> {/* Product description */}
            </div>
        </div>
    );
}
