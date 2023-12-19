import { useState, useEffect, createContext } from 'react';
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPizzas } from "./Redux/Slices/pizzasSlice";
import axios from 'axios';
import styles from './App.module.scss';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CartPage from './Pages/CartPage';


export const AppContext = createContext({});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Content />,
    errorElement:
      <div>ошибка 404. Страница в разработке
        <Link to={`/`}><button>Go to main page</button></Link>
      </div>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);


export function App() {

  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);

  const getItems = async () => {
    dispatch(fetchPizzas());
  }

  useEffect(() => {
    dispatch(fetchPizzas());
    axios.get('https://63da6dca2af48a60a7cd9696.mockapi.io/additional/pizzas')
      .then(res => {
        setCartItems(res.data.cart);
      })
      .catch(error =>
        console.log('error with cart items loading:', error)
      );
  }, []);

  const addToCart = (obj) => {
    let now;
    if (cartItems.find((item) => (item["sku"] === obj["sku"] && item["size"] === obj["size"] && item["dough"] === obj["dough"]))) {
      cartItems[cartItems.findIndex((item) => (item["sku"] === obj["sku"] && item["size"] === obj["size"] && item["dough"] === obj["dough"]))].quantity++;
      now = cartItems;
    } else {
      obj.quantity = 1;
      now = [...cartItems, obj]
    };
    axios.put("https://63da6dca2af48a60a7cd9696.mockapi.io/additional/pizzas", { "cart": now })
      .then(res => {
        setCartItems(res.data.cart);
      })
      .catch(error =>
        console.log('error when adding to cart:', error)
      );
  };

  const decrement = (obj) => {
    cartItems[cartItems.findIndex((item) => (item["sku"] === obj["sku"] && item["size"] === obj["size"] && item["dough"] === obj["dough"]))].quantity--;
    let now = cartItems;
    axios.put("https://63da6dca2af48a60a7cd9696.mockapi.io/additional/pizzas", { "cart": now })
      .then(res => {
        setCartItems(res.data.cart);
      })
      .catch(error =>
        console.log('error when adding to cart:', error)
      );
  };

  const delFromCart = (obj) => {
    let now = obj ? [...cartItems.filter(item => !(item.sku === obj.sku && item.size === obj.size && item.dough === obj.dough))] : [];
    axios.put(`https://63da6dca2af48a60a7cd9696.mockapi.io/additional/${"pizzas"}`, { "cart": now })
      .then(res => {
        setCartItems(res.data.cart);
      })
      .catch(error =>
        console.log('error when deliting from cart:', error)
      );
  };


  return (
    <AppContext.Provider
      value={{
        addToCart,
        delFromCart,
        decrement,
        cartItems,
      }}
    >
      <RouterProvider
        router={router}
      />
    </AppContext.Provider>
  );
};


function Content() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
    </div>
  )
}
