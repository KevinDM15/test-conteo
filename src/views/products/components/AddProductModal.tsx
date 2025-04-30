import { useForm } from "react-hook-form";
import { BaseModal } from "../../../core/components/BaseModal";
import { Product } from "../../../services/products/dto/product.dto";
import { ModalIdentifier } from "../../../hooks/useModal";

type AddProductModalProps = {
  isOpen: (id: ModalIdentifier) => boolean;
  onClose: (id: ModalIdentifier) => void;
  onAddProduct: (product: Product) => void;
  modalIdentifier: ModalIdentifier;
  initialData?: Product | null;
};

export const AddProductModal = ({
  isOpen,
  onClose,
  onAddProduct,
  modalIdentifier,
  initialData,
}: AddProductModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: initialData || undefined,
  });

  const buildFormData = (data: Product) => {
    return {
      code: Math.floor(100000000 + Math.random() * 900000000), // Genera un código aleatorio de 9 dígitos
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      createdAt: new Date(),
    };
  };

  return (
    <BaseModal
      isOpen={() => isOpen(modalIdentifier)}
      onClose={() => onClose(modalIdentifier)}
      title={`${initialData ? "Editar Producto" : "Nuevo Producto"}`}
      size="lg"
      actions={
        <>
          <button
            onClick={() => onClose(modalIdentifier)}
            className="px-4 py-2 bg-gray-300 rounded-lg font-semibold cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="add-product-form"
            className="px-4 py-2 bg-deep-600 text-white rounded-lg font-semibold cursor-pointer"
          >
            {initialData ? "Actualizar" : "Agregar"}
          </button>
        </>
      }
    >
      <form
        id="add-product-form"
        onSubmit={handleSubmit((data) => {
          const formData = buildFormData(data);
          onAddProduct(formData);
          reset();
          onClose(modalIdentifier);
        })}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            {...register("name", { required: "Nombre requerido" })}
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full border p-4 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-deep-600 focus:border-deep-600"
          />
          {errors.name && (
            <span className="text-red-600 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            {...register("description", { required: "Descripción requerida" })}
            id="description"
            name="description"
            rows={3}
            className="mt-1 block w-full border p-4 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-deep-600 focus:border-deep-600"
          ></textarea>
          {errors.description && (
            <span className="text-red-600 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Cantidad
          </label>
          <input
            {...register("quantity", {
              required: "Cantidad requerida",
              valueAsNumber: true,
              validate: (value) =>
                value > 0 || "La cantidad debe ser mayor a 0",
            })}
            type="number"
            id="quantity"
            name="quantity"
            className="mt-1 block w-full border p-4 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-deep-600 focus:border-deep-600"
          />
          {errors.quantity && (
            <span className="text-red-600 text-sm">
              {errors.quantity.message}
            </span>
          )}
        </div>
      </form>
    </BaseModal>
  );
};
