import { Product } from "../../services/products/dto/product.dto";
import { useProductsContext } from "../../views/products/hooks/useProductsContext";

export const SideBarFilter = () => {
  const { sortBy, sort, handleSearch, handleSort } = useProductsContext();

  return (
    <div className="flex flex-col md:flex-row gap-5 rounded-lg px-4 py-4 bg-white shadow-md">
      <div className="flex flex-col md:w-1/2">
        <label
          htmlFor="sort"
          className="text-gray-500 font-light text-sm mb-1"
        >
          Filtrar por
        </label>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Buscar..."
            onChange={(e) => handleSearch(e.target.value)}
            className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-deep-800 transition duration-200"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="sort"
          className="text-gray-500 font-light text-sm mb-1"
        >
          Ordenar por
        </label>

        <div className="flex">
          <div className="relative">
            <select
              id="sort"
              onChange={(e) => {
                handleSort(e.target.value as keyof Product, "asc");
              }}
              defaultValue={sortBy}
              className="appearance-none w-full bg-white border border-gray-300 text-deep-900 rounded-md px-4 py-3 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-deep-800 transition hover:shadow-lg"
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
              className="ml-4 appearance-none bg-white border border-gray-300 text-deep-900 rounded-md px-4 py-3 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-deep-800 transition hover:shadow-lg"
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
      </div>
    </div>
  );
};
