import React from "react";
import { Product } from "../../../../services/products/dto/product.dto";

export interface ProductsContextProps {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  sortBy: keyof Product;
  sort: "asc" | "desc";
  handleSearch: (search: string) => void;
  handleSaveProduct: (product: Product) => void;
  handleSort: <K extends keyof Product>(sortBy: K, sort: "asc" | "desc") => void;
  handleSortBy: (sortBy: keyof Product) => void;
  handleEditProduct: (product: Product) => void;
  handleDeleteProduct: (code: number) => void;
}

export const ProductsContext = React.createContext<ProductsContextProps>({} as ProductsContextProps);
