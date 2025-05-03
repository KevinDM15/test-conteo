import { Toaster } from "sonner";
import { Products } from "./views/products/components/Products";
import { ProductsProvider } from "./views/products/context/ProductsContext/ProductsProvider";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Notificaciones */}
      <Toaster richColors position="top-right" />
      <div className="bg-deep-900">
        <div className="w-full flex flex-col md:flex-row items-center justify-between py-12 px-10 max-w-6xl mx-auto">
          <h1 className="flex text-deep-100 font-extrabold text-4xl break-words text-center md:text-left">
            Productos - Test Conteo
          </h1>

          {/* Iconos de login */}
          <div className="mt-10 md:mt-0 flex items-center gap-5">
            <a
              href="#"
              className="flex items-center border border-deep-100 py-2 text-deep-100 hover:text-deep-200 hover:bg-gray-200 hover:text-deep-900 px-5 rounded-lg transition duration-200"
            >
              <span className="text-sm">Iniciar sesión</span>
            </a>
          </div>
        </div>
      </div>
      <ProductsProvider>
        <Products />
      </ProductsProvider>
    </div>
  );
};

export default App;
