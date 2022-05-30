import React from "react";
import { AxiosInstanceProvider } from './Context/AxiosInstanceProvider'
import { MainLayout } from "./Components/";

export const App = () => {
  return <AxiosInstanceProvider>
    <MainLayout />
  </AxiosInstanceProvider>
}