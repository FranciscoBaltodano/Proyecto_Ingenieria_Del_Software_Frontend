import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export const AdmisionesLayout = ({children}) => {
  return (
    <>
        <Navbar />
        {children}
        <Footer />
    </>
  )
}
