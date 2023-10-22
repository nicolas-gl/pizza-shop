import { useEffect } from 'react';
import Main from '../Components/Main';


export default function Home() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Main />
  )
}
