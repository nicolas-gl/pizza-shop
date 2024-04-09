import { useEffect } from 'react';
import Cart from '../Components/Cart'


export default function CartPage() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Cart />
  )
}
