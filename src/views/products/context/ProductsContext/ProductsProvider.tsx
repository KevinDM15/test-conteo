import React from "react";
import { ProductsContext } from "./ProductsContext";
import { Product } from "../../../../services/products/dto/product.dto";
import { toast } from "sonner";

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sort, setSort] = React.useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = React.useState<keyof Product>("name");

  const handleSearch = (search: string) => {
    const searchLower = search.toLowerCase();

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchLower)
    );

    setFilteredProducts(filteredProducts);
  };

  const handleSort = <K extends keyof Product>(
    sortBy: K,
    sort: "asc" | "desc"
  ) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sort === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

    setSort(sort);
    setSortBy(sortBy);
    setFilteredProducts(sortedProducts);
  };

  const handleSortBy = (sortBy: keyof Product) => {
    setSort(sort);
    setSortBy(sortBy);
  };

  const handleEditProduct = (product: Product) => {
    try {
      // Obtener productos existentes
      const existingProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      ) as Product[];

      // Actualizar producto
      const updatedProducts = existingProducts.map((p: Product) =>
        p.code === product.code ? { ...p, ...product } : p
      );

      // Guardar en localStorage
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // Actualizar estados
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);

      toast.success("Producto actualizado correctamente");
    } catch (error) {
      console.error("Error updating product:", error);

      toast.error("Error al actualizar el producto");
    }
  };

  const handleSaveProduct = (product: Product) => {
    try {
      // Crear nuevo producto con ID
      const newProduct: Product = {
        ...product,
        createdAt: new Date(),
      };

      // Obtener productos existentes
      const existingProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      ) as Product[];

      // Agregar nuevo producto
      const updatedProducts = [...existingProducts, newProduct];

      // Guardar en localStorage
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // Actualizar estados
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);

      toast.success("Producto guardado correctamente");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Error al guardar el producto");
    }
  };

  const handleDeleteProduct = (code: number) => {
    try {
      // Obtener productos existentes
      const existingProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      ) as Product[];

      // Filtrar producto a eliminar
      const updatedProducts = existingProducts.filter(
        (product: Product) => product.code !== code
      );

      // Guardar en localStorage
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // Actualizar estados
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);

      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error removing product:", error);

      toast.error("Error al eliminar el producto");
    }
  };

  React.useEffect(() => {
    try {
      const fetchProducts = () => {
        // Obtener productos de localStorage
        const storedProducts = JSON.parse(
          localStorage.getItem("products") || "[]"
        ) as Product[];

        // Opcional: Validar estructura de datos
        if (!Array.isArray(storedProducts)) {
          throw new Error("Invalid data format in localStorage");
        }

        setProducts(storedProducts);
        setFilteredProducts(storedProducts);
      };

      fetchProducts();
    } catch (error) {
      console.error("Error loading products:", error);
      // Inicializar con array vacío si hay error
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        sortBy,
        sort,
        filteredProducts,
        isLoading,
        handleSearch,
        handleSaveProduct,
        handleSort,
        handleSortBy,
        handleDeleteProduct,
        handleEditProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
