"use client";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const GlobalProviders = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <NextUIProvider>{children}</NextUIProvider>
    </Provider>
  );
};

export default GlobalProviders;
