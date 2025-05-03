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
    filteredProducts,
    handleSaveProduct,
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
    <div className="py-20 bg-gray-100 min-h-screen">
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

      <div className="max-w-6xl mx-auto px-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-deep-900 font-extrabold text-2xl mb-4 sm:mb-0">
            Productos
          </h1>

          <button
            onClick={() => openModal(ModalIdentifiers.addProduct)}
            aria-label="Agregar producto"
            type="button"
            className="bg-deep-600 text-deep-100 transition font-semibold py-2 px-5 rounded-xl border-2 border-transparent hover:border-2 duration-200 cursor-pointer"
          >
            Agregar producto
          </button>
        </div>

        {/* Filtros y productos */}
        <div className="flex flex-col gap-5">
          {/* Sidebar */}
          <SideBarFilter />

          {/* Lista de productos */}
          <div>
            {/* Loading */}
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center w-full h-64">
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
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {filteredProducts.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-5 w-full hover:shadow-lg transition flex flex-col"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-extrabold">
                        Codigo{" "}
                        <span className="text-deep-600">{product.code}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-deep-900 font-bold text-lg">
                        <div className="flex items-center">
                          {product.name}{" "}
                          <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded-lg text-gray-500">
                            {product.quantity}
                          </span>
                        </div>
                      </h3>

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

                    <div className="text-sm text-deep-600 ">
                      <p className="text-gray-400">{product.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex bg-white justify-center items-center h-64 rounded-xl shadow-md p-5">
                <p className="text-gray-400 font-semibold">
                  Opps, no se encontraron productos.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
