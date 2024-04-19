import { useState, useEffect, createContext, useContext } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useAppDispatch } from './hooks.ts';
import { fetchPizzas } from "./Redux/Slices/pizzasSlice";
import axios from 'axios';
import styles from './App.module.scss';
import Header from './Components/Header.tsx';
import HomePage from './Pages/HomePage.tsx';
import CartPage from './Pages/CartPage.tsx';
import FullCardPage from './Pages/FullCardPage.tsx';
import NotFoundPage from './Pages/NotFoundPage.tsx';


export type CartPizza = {
  id: number
  title: string,
  sku: number,
  size: number,
  price: number,
  imgUrl: string,
  imgAlt: string,
  dough: string,
  quantity: number
};

type CartContextType = {
  cartItems: CartPizza[],
  addToCart: (obj: CartPizza) => void,
  delFromCart: (obj: CartPizza) => void,
  decrement: (obj: CartPizza) => void,
  clearCart: () => void
};

export const CartContext = createContext<CartContextType | null>(null);

export const useGetCartContext = () => {
  const object = useContext(CartContext);
  if (!object) { throw new Error("useGetCartContext must be used within a Provider") }
  return object;
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Content />,
    errorElement:
      <NotFoundPage />
    ,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/pizzas/:id",
        element: <FullCardPage />,
      }
    ],
  },
]);



export default function App() {

  const [cartItems, setCartItems] = useState<CartPizza[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPizzas());
    axios.get('https://63da6dca2af48a60a7cd9696.mockapi.io/additional/pizzas')
      .then(res => {
        setCartItems(res.data.cart);
      })
      .catch(error =>
        console.log('error with cart items loading: ', error)
      );
  }, [dispatch]);


  const addToCart = (obj: CartPizza) => {
    let now = cartItems;
    let addingPizza2 = cartItems.find((item) => (item["sku"] === obj["sku"] && item["size"] === obj["size"] && item["dough"] === obj["dough"]))

    if (addingPizza2) {
      addingPizza2["quantity"]++
    } else {
      obj["quantity"] = 1;
      now = [...cartItems, obj]
    };

    axios.put("https://63da6dca2af48a60a7cd9696.mockapi.io/additional/pizzas", { "cart": now })
      .then(res => {
        setCartItems(res.data.cart);
      })
      .catch(error =>
        console.log('error when adding to cart: ', error)
      );
  };


  const decrement = (obj: CartPizza) => {
    cartItems[cartItems.findIndex((item) => (item["sku"] === obj["sku"] && item["size"] === obj["size"] && item["dough"] === obj["dough"]))].quantity--;
    let now = cartItems;
    axios.put("https://63da6dca2af48a60a7cd9696.mockapi.io/additional/pizzas", { "cart": now })
      .then(res => {
        setCartItems(res.data.cart);
      })
      .catch(error =>
        console.log('error when adding to cart: ', error)
      );
  };

  const delFromCart = (obj: CartPizza) => {
    let now = [...cartItems.filter(item => !(item.sku === obj.sku && item.size === obj.size && item.dough === obj.dough))];
    axios.put(`https://63da6dca2af48a60a7cd9696.mockapi.io/additional/${"pizzas"}`, { "cart": now })
      .then(res => {
        setCartItems(res.data.cart);
      })
      .catch(error =>
        console.log('error when deliting from cart: ', error)
      );
  };

  const clearCart = () => {
    axios.put(`https://63da6dca2af48a60a7cd9696.mockapi.io/additional/${"pizzas"}`, { "cart": [] })
      .then(res => {
        setCartItems(res.data.cart);
      })
      .catch(error =>
        console.log('error when clearing cart: ', error)
      );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        delFromCart,
        decrement,
        clearCart
      }}
    >
      <RouterProvider
        router={router}
      />
    </CartContext.Provider>
  )
};


function Content() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
    </div>
  )
}
