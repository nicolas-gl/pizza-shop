import { useEffect } from 'react';
import FullCard from '../Components/FullCard';

export default function FullCardPage() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <FullCard />
  )
}