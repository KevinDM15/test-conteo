import React from "react";
import { ProductsContext } from "../context/ProductsContext/ProductsContext";

export const useProductsContext = () => {
  const context = React.useContext(ProductsContext);
  if (!context) {
    throw new Error("useProductsContext must be used within a ProductsProvider");
  }
  return context;
}
