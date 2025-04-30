import { useState } from "react";
import { SideBarFilter } from "../../../core/components/SideBarFilter";
import { ModalIdentifiers, useModal } from "../../../hooks/useModal";
import { Product } from "../../../services/products/dto/product.dto";
import { useProductsContext } from "../hooks/useProductsContext";
import { AddProductModal } from "./AddProductModal";
import { DeleteProductModal } from "./DeleteProduct";

export const Products = () => {
  const {
    isLoading,
    sortBy,
    sort,
    filteredProducts,
    handleSearch,
    handleSaveProduct,
    handleSort,
    handleDeleteProduct,
    handleEditProduct,
  } = useProductsContext();
  const { isModalOpen, closeModal, openModal } = useModal();
  const [productSelected, setProductToDelete] = useState<Product | null>(null);

  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    openModal(ModalIdentifiers.deleteProduct);
  };

  const handleEdit = (product: Product) => {
    setProductToDelete(product);
    openModal(ModalIdentifiers.editProduct);
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      {isModalOpen(ModalIdentifiers.addProduct) && (
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => closeModal(ModalIdentifiers.addProduct)}
          onAddProduct={handleSaveProduct}
          modalIdentifier={ModalIdentifiers.addProduct}
        />
      )}

      {isModalOpen(ModalIdentifiers.editProduct) && (
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => closeModal(ModalIdentifiers.editProduct)}
          onAddProduct={handleEditProduct}
          modalIdentifier={ModalIdentifiers.editProduct}
          initialData={productSelected}
        />
      )}

      {isModalOpen(ModalIdentifiers.deleteProduct) && (
        <DeleteProductModal
          isOpen={isModalOpen}
          onClose={() => closeModal(ModalIdentifiers.deleteProduct)}
          onDeleteProduct={handleDeleteProduct}
          modalIdentifier={ModalIdentifiers.deleteProduct}
          code={productSelected?.code || 0}
        />
      )}

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-deep-900 font-extrabold text-4xl mb-4 sm:mb-0">
            Productos
          </h1>

          <button
            onClick={() => openModal(ModalIdentifiers.addProduct)}
            aria-label="Agregar producto"
            type="button"
            className="bg-deep-600 text-deep-100 hover:bg-deep-100 hover:text-deep-900 hover:border-deep-900 transition font-semibold py-2 px-5 rounded-xl border-2 border-transparent hover:border-2 duration-200 cursor-pointer"
          >
            Agregar producto
          </button>
        </div>

        {/* Filtros y productos */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="bg-white rounded-xl shadow-md p-4 w-full md:w-1/3 lg:w-1/4 h-full">
            <SideBarFilter handleSearch={handleSearch} />
          </div>

          {/* Lista de productos */}
          <div className="flex-1">
            {/* Ordenamiento */}
            <div className="flex items-center mb-4">
              <label htmlFor="sort" className="text-deep-900 font-medium mr-2">
                Ordenar por
              </label>
              <div className="relative">
                <select
                  id="sort"
                  onChange={(e) => {
                    handleSort(e.target.value as keyof Product, "asc");
                  }}
                  defaultValue={sortBy}
                  className="appearance-none w-full bg-white text-deep-900 rounded-md px-4 py-2 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-deep-600 transition hover:shadow-lg"
                >
                  <option value="name">Nombre</option>
                  <option value="quantity">Cantidad</option>
                  <option value="createdAt">Fecha de creación</option>
                </select>
                <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-deep-900">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  id="order"
                  className="ml-4 appearance-none bg-white text-deep-900 rounded-md px-4 py-2 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-deep-600 transition hover:shadow-lg"
                  onChange={(e) =>
                    handleSort(sortBy, e.target.value as "asc" | "desc")
                  }
                  defaultValue={sort}
                >
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </select>

                <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-deep-900">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Loading */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <svg
                  className="animate-spin h-10 w-10 text-deep-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-5 my-4 hover:shadow-lg transition flex flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                  <div>
                    <h3 className="text-deep-900 font-bold text-lg">
                      {product.name}
                    </h3>
                    <p className="text-deep-700">{product.description}</p>

                    <div>
                      <p className="text-deep-600 font-semibold mt-2">
                        Cantidad: {product.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-deep-600 mt-4 sm:mt-0 sm:text-right">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 bg-deep-100 hover:bg-deep-200 rounded-lg transition-colors duration-200 cursor-pointer"
                        aria-label="Editar producto"
                      >
                        <svg
                          className="w-5 h-5 text-deep-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors duration-200 cursor-pointer"
                        aria-label="Eliminar producto"
                      >
                        <svg
                          className="w-5 h-5 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-deep-900 font-semibold">
                  No se encontraron productos.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
