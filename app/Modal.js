"use client"; // Indicates that this component uses client-side rendering in Next.js

import React, { useRef, useEffect } from 'react'; // Import React and necessary hooks
import ReactDOM from 'react-dom'; // Import ReactDOM for portal rendering
import useCart from './(store)/store'; // Import Zustand store hook for cart state
import { useRouter } from 'next/navigation'; // Import useRouter hook for navigation

// Define the Modal component
export default function Modal() {
  // Create a ref to hold the portal element
  const portalRef = useRef(null);
  
  // Get cart items and modal state from the Zustand store
  const cartItems = useCart(state => state.cart);
  const { openModal, setOpenModal } = useCart((state) => ({
    openModal: state.openModal,
    setOpenModal: state.setOpenModal,
  }));

  // Get the router object for navigation
  const router = useRouter();

  // Use useEffect to set the portal ref when the component mounts
  useEffect(() => {
    // Set the ref to the portal element
    portalRef.current = document.getElementById("portal");
  }, []);

  // If the modal is not open, return null to render nothing
  if (!openModal) return null;

  // Function to handle the checkout process
  async function checkout() {
    // Map cart items to the format required for the checkout API
    const lineItems = cartItems.map(cartItem => ({
      price: cartItem.price_id,
      quantity: 1
    }));
    
    try {
      // Send a POST request to the checkout API
      const res = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ lineItems }), // Include line items in the request body
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
      });

      // Check if the response is OK
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response JSON
      const data = await res.json();
      // Redirect to the checkout session URL
      router.push(data.session.url);
    } catch (error) {
      // Log any errors during the checkout process
      console.error('Error during checkout:', error);
    }
  }

  // Render the modal using React portals
  return portalRef.current ? ReactDOM.createPortal(
    <div className='fixed top-0 left-0 w-screen text-black h-screen z-50'>
      {/* Background overlay for the modal */}
      <div 
        onClick={() => setOpenModal()} // Close the modal when clicking on the overlay
        className='bg-transparent absolute inset-0'
      >
        {/* Modal content container */}
        <div className='flex flex-col bg-white absolute right-0 top-0 h-screen w-screen sm:w-96 max-w-screen shadow gap-4 p-6'>
          {/* Modal header with title and close button */}
          <div className='flex items-center justify-between text-xl relative p-4'>
            <h1>Cart</h1>
            {/* Close button */}
            <i 
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from propagating to parent div
                setOpenModal(); // Close the modal
              }} 
              className='fa-solid fa-xmark cursor-pointer hover:bg-slate-200'
            ></i>
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-slate-200 w-2/3'></div>
          </div>
          {/* Modal body displaying cart items */}
          <div className="p-4 flex overflow-x-auto flex-1 flex-col gap-4">
            {
              cartItems.length === 0 ? (
                <p>There is nothing in your cart</p> // Message when cart is empty
              ) : (
                <>
                  {/* Map through cart items and display each item */}
                  {cartItems.map((cartItem, itemIndex) => (
                    <div key={itemIndex} className='flex px-2 border-l border-solid border-slate-700 p-2 flex-col gap-2'> 
                      <div className='flex items-center justify-between'>
                        <h2>{cartItem.name}</h2>
                        <p>${cartItem.cost / 100}</p> {/* Convert cost from cents to dollars */}
                      </div>
                      <p className='text-slate-600 text-sm'>Quantity: 1</p>
                    </div>
                  ))}
                </>
              )
            }
          </div>
          {/* Checkout button */}
          <div 
            onClick={checkout} 
            className='border border-solid border-slate-700 text-xl m-4 p-6 uppercase grid place-items-center hover:opacity-60 cursor-pointer'
          > Checkout
          </div>
        </div> 
      </div>
    </div>,
    portalRef.current // Render the modal into the portal element
  ) : null;
}
