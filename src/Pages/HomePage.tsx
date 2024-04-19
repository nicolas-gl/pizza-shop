import { useEffect } from 'react';
import { Main } from '../Components/Main';
import React from 'react'


export default function HomePage(): React.ReactNode {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <Main />
}
