"use client";
import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Modal() {
  const portalRef = useRef(null);

  useEffect(() => {
    // Set the ref to the portal element
    portalRef.current = document.getElementById("portal");
  }, []);

  // Render the modal only if the portalRef has been set
  return portalRef.current ? ReactDOM.createPortal(
    <div className='fixed top-0 left-0 w-screen text-black h-screen z-50'>
      <div className='bg-transparent absolute inset-0'>
      <div className='flex flex-col bg-white absolute right-0 top-0 h-screen w-screen sm:w-96 max-w-screen shadow gap-4 p-6 '>
            <div className='flex items-center justify-between text-xl relative p-4'>
                <h1>Cart</h1>
                <i className='fa-solid fa-xmark'></i>
                <div className='absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-slate-200 w-2/3'></div>
            </div>
        </div> 
      </div>
    </div>,
    portalRef.current
  ) : null;
}

