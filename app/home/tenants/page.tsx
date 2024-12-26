"use client";
import { TenantCards } from "@/components/AllTenants";
import { setHeader } from "@/redux/services/header";
import React from "react";
import { useDispatch } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  dispatch(setHeader("Tenants"));
  return (
    <>
      <TenantCards />
    </>
  );
};

export default page;
