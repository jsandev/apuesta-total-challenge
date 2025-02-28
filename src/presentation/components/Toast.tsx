import { useDispatch, useSelector } from "../../store";
import { FiArrowRight, FiX } from "react-icons/fi";
import { navigationActions } from "../../store/slices/navigation";
import classNames from "classnames";
import { useEffect } from "react";
import { ILastPokemon } from "../../models";
import { useNavigate } from "react-router";

export const Toast = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lastPokemon } = useSelector((state) => state.navigation);

  useEffect(() => {
    const lastPokemons = window.localStorage.getItem("pokemons");
    if (lastPokemons) {
      const pokemons = JSON.parse(lastPokemons) as ILastPokemon[];
      const pokemonsSorted = pokemons.sort((a, b) => b.date - a.date);

      dispatch(navigationActions.setLastPokemon(pokemonsSorted[0]));
    }
  }, [dispatch]);

  return (
    <div
      className={classNames(
        "w-full z-[2] fixed left-0 px-[1.5rem] pb-[1rem] flex justify-center items-center transition-[bottom] duration-[250ms]",
        lastPokemon === null ? "bottom-[-100%]" : "bottom-[0%]"
      )}
    >
      <div className="w-full relative h-auto sm:h-[6rem] max-w-[26rem] bg-white grid grid-cols-[5rem_1fr] rounded-[1rem] shadow-2xl border border-gray-100 px-[1rem] py-[0.625rem]">
        <button
          onClick={() => dispatch(navigationActions.setLastPokemon(null))}
          className="absolute top-[-1rem] right-[-1rem] flex items-center outline-none font-medium bg-gray-50 hover:bg-gray-200 text-[1rem] text-[#262626] gap-[0.25rem] cursor-pointer p-[0.5rem] rounded-[0.5rem]"
        >
          <FiX size={24} />
        </button>
        <div className="w-full h-[5rem]">
          <img
            src={lastPokemon?.image}
            alt={lastPokemon?.name}
            className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_0px_10px_rgba(0,0,0,0.4)]"
          />
        </div>
        <div className="w-full h-full flex flex-col items-start justify-center px-[1rem]">
          <h3 className="font-normal text-[#262626] text-[12px]">
            Tu última visualización fue el pokemon <strong>{lastPokemon?.name}</strong> ·{" "}
            {lastPokemon?.date &&
              new Date(lastPokemon.date).toLocaleDateString("es-PE", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </h3>
          <p
            onClick={() => navigate("history")}
            className="font-normal flex items-center gap-[0.25rem] text-[#262626] text-[0.75rem] mt-[0.5rem] cursor-pointer hover:underline"
          >
            Conoce tu historial
            <FiArrowRight size={16} />
          </p>
        </div>
      </div>
    </div>
  );
};
