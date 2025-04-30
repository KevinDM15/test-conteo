type SideBarFilterProps = {
  handleSearch: (searchTerm: string) => void;
}

export const SideBarFilter = ({ handleSearch }:  SideBarFilterProps) => {
  return (
    <div className="flex flex-col rounded-lg p-5">
      <div className="">
        <h2 className="text-deep-900 text-lg font-extrabold">Filtrar por</h2>

        <div className="flex flex-col mt-5">
          <label className="text-deep-900 text-sm mb-2 font-light">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Buscar..."
            onChange={(e) => handleSearch(e.target.value)}
            className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-deep-800 transition duration-200"
          />
        </div>
      </div>
    </div>
  );
};
