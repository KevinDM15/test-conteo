import { BaseModal } from "../../../core/components/BaseModal";
import { ModalIdentifier } from "../../../hooks/useModal";

type DeleteProductModalProps = {
  isOpen: (id: ModalIdentifier) => boolean;
  onClose: (id: ModalIdentifier) => void;
  onDeleteProduct: (code: number) => void;
  modalIdentifier: ModalIdentifier;
  code: number;
};

export const DeleteProductModal = ({
  isOpen,
  onClose,
  onDeleteProduct,
  modalIdentifier,
  code,
}: DeleteProductModalProps) => {
  return (
    <BaseModal
      isOpen={() => isOpen(modalIdentifier)}
      onClose={() => onClose(modalIdentifier)}
      title="Eliminar Producto"
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
            form="delete-product-form"
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold cursor-pointer"
          >
            Eliminar
          </button>
        </>
      }
    >
      {/* Formulario de eliminación */}
      <form
        id="delete-product-form"
        onSubmit={(e) => {
          e.preventDefault();
          onDeleteProduct(code);
          onClose(modalIdentifier);
        }}
        className="flex flex-col gap-4"
      >
        <p className="text-lg">
          ¿Estás seguro de que deseas eliminar este producto? Esta acción no se
          puede deshacer.
        </p>
      </form>
    </BaseModal>
  );
};
