import { useState, useEffect, createContext } from 'react';
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom";

import axios from 'axios';
import styles from './App.module.scss';
import Header from './Components/Header';
import Home from './Pages/Home';
import Cart from './Pages/Cart';

// import NotFound from './Pages/NotFound';



export const AppContext = createContext({});


const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    errorElement:
      <div>ошибка 404. Страница в разработке
        <Link to={`/`}><button>Go to main page</button></Link>
      </div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/sneakers-shop/orders",
        element: <Home />,
      },
    ],
  },
]);


export default function App() {

  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);

  useEffect(() => {
    try {
      axios.get('https://63da6dca2af48a60a7cd9696.mockapi.io/items')
        .then(res => {
          setItems(res.data[0].pizzas.items);
          setItemsLoading(false);
        });
    } catch (error) {
      console.log("не удалось загрузить товары или корзину", error)
    };
  }, []);


  return (
    <AppContext.Provider
      value={{
        pizzas: items,
        itemsLoading
      }}
    >
      {/* <div className={styles.wrapper}>
        <Header /> */}
      {/* <Main
          pizzas={items}
          itemsLoading={itemsLoading}
        /> */}
      {/* <Home
          pizzas={items}
          itemsLoading={itemsLoading}
        /> */}
      {/* <NotFound /> */}

      <RouterProvider
        router={router}
      />


      {/* <Routes>
        <Route path='/' element={<Home
          pizzas={items}
          itemsLoading={itemsLoading} />
        }
        />
      </Routes> */}

      {/* </div> */}
    </AppContext.Provider>
  );
};

function Wrapper() {
  return (
    <div className={styles.wrapper}>
      <Header />
      {/* <Main
          pizzas={items}
          itemsLoading={itemsLoading}
        /> */}
      {/* <Home
          pizzas={items}
          itemsLoading={itemsLoading}
        /> */}
      {/* <NotFound /> */}

      <Outlet
      />


      {/* <Routes>
        <Route path='/' element={<Home
          pizzas={items}
          itemsLoading={itemsLoading} />
        }
        />
      </Routes> */}

    </div>
  )
}
