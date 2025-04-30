import { Toaster } from "sonner";
import { Products } from "./views/products/components/Products";
import { ProductsProvider } from "./views/products/context/ProductsContext/ProductsProvider";

const App = () => {
  return (
    <div className="flex flex-col h-screen bg-deep-100">
      {/* Notificaciones */}
      <Toaster richColors position="top-right" />

      <div className="w-full bg-gray-200">
        <h1 className="flex justify-center my-10 text-deep-900 font-extrabold text-7xl">
          Test Conteo
        </h1>
      </div>

      <ProductsProvider>
        <Products />
      </ProductsProvider>
      ?
    </div>
  );
};

export default App;
