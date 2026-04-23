"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'

const Authprovier = ({children}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default Authprovier