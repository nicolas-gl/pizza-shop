import { useState, useEffect, createContext, useContext, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useAppDispatch } from './hooks.ts';
import { fetchPizzas } from "./Redux/Slices/pizzasSlice";
import styles from './App.module.scss';
import Header from './Components/Header';

const HomePage = lazy(() => import(/* webpackChunkName: "HomePage" */ './Pages/HomePage'));
const CartPage = lazy(() => import(/* webpackChunkName: "CartPage" */ './Pages/CartPage'));
const FullCardPage = lazy(() => import(/* webpackChunkName: "FullCardPage" */ './Pages/FullCardPage'));
const NotFoundPage = lazy(() => import(/* webpackChunkName: "NotFoundPage" */ './Pages/NotFoundPage'));


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
    element: <Suspense fallback={<div>Loading...</div>}> <Content /> </Suspense>,
    errorElement:
      <NotFoundPage />
    ,
    children: [
      {
        index: true,
        element: <HomePage />,
        // element: <Suspense fallback={<div>Loading...</div>}>
        //   <HomePage />
        // </Suspense>,

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
    let cartItemsJSON = window.localStorage.getItem('cartItems')
    if (cartItemsJSON) {
      setCartItems(JSON.parse(cartItemsJSON))
    }
  }, [dispatch]);

  useEffect(() => {
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems]);

  const addToCart = (obj: CartPizza) => {
    let addingPizza = cartItems.find((item) => (item["sku"] === obj["sku"] && item["size"] === obj["size"] && item["dough"] === obj["dough"]))
    if (addingPizza) {
      addingPizza["quantity"]++
      setCartItems([...cartItems])
    } else {
      obj["quantity"] = 1;
      setCartItems(prev => [...prev, obj])
    };
  };

  const decrement = (obj: CartPizza) => {
    let nowItems = [...cartItems]
    nowItems[nowItems.findIndex((item) => (item["sku"] === obj["sku"] && item["size"] === obj["size"] && item["dough"] === obj["dough"]))].quantity--;
    setCartItems([...nowItems]);
  };

  const delFromCart = (obj: CartPizza) => {
    setCartItems(prev => [...prev.filter(item => !(item.sku === obj.sku && item.size === obj.size && item.dough === obj.dough))])
  };

  const clearCart = () => {
    setCartItems([]);
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
