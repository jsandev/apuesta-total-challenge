import classNames from "classnames";

import { AppInput } from "./AppInput";
import { PokemonMiniCard } from "./PokemonMiniCard";
import { PokemonCard } from "./PokemonCard";

import { useModalSearch } from "../../hooks/useModalSearch";

import { useSelector } from "../../store";

import { FiX } from "react-icons/fi";

export const ModalSearch = () => {
  const { modalSearchVisible } = useSelector((state) => state.navigation);

  const {
    onClose,
    search,
    setSearch,
    uniquePokemon,
    debounceValue,
    pokemons,
    isLoading,
    isLoadingSearch,
    searchInputRef,
    lastItemRef,
  } = useModalSearch();

  return (
    <div
      className={classNames(
        "w-full h-full z-[2] fixed top-0 left-0 bg-[rgba(0,0,0,0.85)] flex justify-center items-center p-0 sm:p-[1.5rem] transition-[opacity_visibility] duration-[250ms]",
        modalSearchVisible ? "opacity-100 visible" : "opacity-0 invisible"
      )}
      onClick={onClose}
    >
      <div
        className="w-full relative h-full max-w-[34rem] bg-white flex flex-col gap-[1.5rem] p-[1.5rem] sm:rounded-[1.5rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-[-1rem] right-[-1rem] hidden md:flex items-center outline-none font-medium bg-gray-50 hover:bg-gray-200 text-[1rem] text-[#262626] gap-[0.25rem] cursor-pointer p-[0.5rem] rounded-[0.5rem]"
        >
          <FiX size={24} />
        </button>

        <div className="w-full grid grid-cols-[1fr_auto] gap-[0.75rem]">
          <AppInput
            ref={searchInputRef}
            type="search"
            placeholder="Busca tu pokemon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={onClose}
            className="flex md:hidden items-center outline-none font-medium bg-gray-50 hover:bg-gray-200 text-[1rem] text-[#262626] gap-[0.25rem] cursor-pointer p-[0.5rem] rounded-[0.5rem]"
          >
            <FiX size={24} />
          </button>
        </div>

        {debounceValue.length === 0 ? (
          <div className="w-full h-full relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 overflow-y-auto no-scroll gap-[1rem]">
            {pokemons.map((pokemon, i) => {
              return (
                <PokemonMiniCard
                  key={i}
                  ref={i === pokemons.length - 1 ? lastItemRef : null}
                  data={pokemon}
                />
              );
            })}

            {isLoading && (
              <div className="col-span-1 sm:col-span-2 md:col-span-3 font-medium text-[#262626] text-[1rem] text-center">
                Cargando más pokemons...
              </div>
            )}
          </div>
        ) : (
          <>
            {isLoadingSearch ? (
              <div className="w-full h-full flex justify-center items-center font-medium text-[#262626]">
                Un momento por favor...
              </div>
            ) : (
              <>
                {uniquePokemon === null ? (
                  <p className="w-full h-full flex justify-center items-center text-[#262626] font-medium text-center px-[1.5rem]">
                    No existe el pokemon que estás buscando
                  </p>
                ) : (
                  <div className="w-full h-full overflow-y-auto flex justify-center items-center">
                    <PokemonCard data={uniquePokemon} />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
