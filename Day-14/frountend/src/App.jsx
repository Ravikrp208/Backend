import React from 'react'
import { RouterProvider } from 'react-router'
import AppRouters from "./AppRoutes"


function App() {
  return (
    <AuthProvider>
      <AppRouters />
    </AuthProvider>
  );
}

export default App