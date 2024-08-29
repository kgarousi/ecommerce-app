"use client";
import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import useCart from './(store)/store';
import { useRouter } from 'next/navigation'; // Ensure this import is correct

export default function Modal() {
  const portalRef = useRef(null);
  const cartItems = useCart(state => state.cart);
  const { openModal, setOpenModal } = useCart((state) => ({
    openModal: state.openModal,
    setOpenModal: state.setOpenModal,
  }));
  const router = useRouter(); // Call useRouter to get the router object

  useEffect(() => {
    // Set the ref to the portal element
    portalRef.current = document.getElementById("portal");
  }, []);

  // Render the modal only if openModal is true
  if (!openModal) return null;

  async function checkout() {
    const lineItems = cartItems.map(cartItem => ({
      price: cartItem.price_id,
      quantity: 1
    }));
    
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ lineItems }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      router.push(data.session.url);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }

  return portalRef.current ? ReactDOM.createPortal(
    <div className='fixed top-0 left-0 w-screen text-black h-screen z-50'>
      <div 
        onClick={() => setOpenModal()} 
        className='bg-transparent absolute inset-0'
      >
        <div className='flex flex-col bg-white absolute right-0 top-0 h-screen w-screen sm:w-96 max-w-screen shadow gap-4 p-6'>
          <div className='flex items-center justify-between text-xl relative p-4'>
            <h1>Cart</h1>
            <i 
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from propagating to parent div
                setOpenModal();
              }} 
              className='fa-solid fa-xmark cursor-pointer hover:bg-slate-200'
            ></i>
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-slate-200 w-2/3'></div>
          </div>
          <div className="p-4 flex overflow-x-auto flex-1 flex-col gap-4">
            {
              cartItems.length === 0 ? (
                <p>There is nothing in your cart</p>
              ) : (
                <>
                  {cartItems.map((cartItem, itemIndex) => (
                    <div key={itemIndex} className='flex px-2 border-l border-solid border-slate-700 p-2 flex-col gap-2'> 
                      <div className='flex items-center justify-between'>
                        <h2>{cartItem.name}</h2>
                        <p>${cartItem.cost / 100}</p>
                      </div>
                      <p className='text-slate-600 text-sm'>Quantity: 1</p>
                    </div>
                  ))}
                </>
              )
            }
          </div>
          <div 
            onClick={checkout} 
            className='border border-solid border-slate-700 text-xl m-4 p-6 uppercase grid place-items-center hover:opacity-60 cursor-pointer'
          >
            Checkout
          </div>
        </div> 
      </div>
    </div>,
    portalRef.current
  ) : null;
}


