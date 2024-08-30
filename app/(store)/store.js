import { create } from 'zustand';

// Create a Zustand store to manage the cart and related state.
export const useCart = create(
  (set, get) => ({
    // The initial state of the cart, product, and modal visibility.
    cart: [], // Array to hold items added to the cart.
    product: {}, // Object to store the current product details.
    openModal: false, // Boolean to manage the visibility of the modal.

    // Function to toggle the visibility of the modal.
    setOpenModal: () => {
      set((state) => ({
        ...state,
        openModal: !state.openModal // Toggle the boolean value to open or close the modal.
      }));
    },

    // Function to set the current product in the state.
    setProduct: (params) => {
      const { newProduct } = params; // Destructure the new product from parameters.
      set((state) => ({
        ...state,
        product: newProduct // Update the product state with the new product.
      }));
    },

    // Function to add a new item to the cart.
    addItemToCart: (params) => {
      const { newItem } = params; // Destructure the new item from parameters.
      set((state) => {
        const newCart = [...state.cart, newItem]; // Create a new cart array with the new item added.
        return {
          ...state,
          cart: newCart // Update the cart state with the new cart array.
        };
      });
    },

    // Function to remove an item from the cart based on its index.
    removeItemFromCart: (params) => {
      const { itemIndex } = params; // Destructure the index of the item to be removed.
      set((state) => {
        const newCart = state.cart.filter((element, elementIndex) => 
          elementIndex !== itemIndex // Filter out the item at the specified index.
        );
        return {
          ...state,
          cart: newCart // Update the cart state with the filtered cart array.
        };
      });
    },

    // Function to empty the cart by clearing all items.
    emptyCart: () => {
      set(() => ({
        cart: [] // Reset the cart state to an empty array.
      }));
    }
  })
);

export default useCart;
