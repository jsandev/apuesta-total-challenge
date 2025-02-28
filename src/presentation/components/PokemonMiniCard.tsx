import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router";

import { IPokemonDetail } from "../../models";

import { cardColors } from "../../config/colors";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  data: IPokemonDetail;
}
export const PokemonMiniCard = React.forwardRef<HTMLDivElement, IProps>(({ data }, ref) => {
  const navigate = useNavigate();

  const color = cardColors[data.color as keyof typeof cardColors];
  const name = data.name.charAt(0).toUpperCase() + data.name.substring(1).toLowerCase();
  const image =
    data.sprites.other?.dream_world.front_default ??
    data.sprites.other?.["official-artwork"].front_default;

  const onClick = () => {
    const newPokemon = {
      id: data.id,
      date: Date.now(),
      name,
      image,
      weight: data.weight,
      height: data.height,
    };

    const lastPokemons = window.localStorage.getItem("pokemons");
    if (lastPokemons) {
      const newData = [...JSON.parse(lastPokemons), newPokemon];
      window.localStorage.setItem("pokemons", JSON.stringify(newData));
    } else {
      window.localStorage.setItem("pokemons", JSON.stringify([newPokemon]));
    }

    navigate(`/pokemon/${data.id}`);
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={classNames(
        "w-full h-[10rem] relative bg-gradient-to-tr rounded-[1.5rem] cursor-pointer",
        color
      )}
    >
      <div className="w-full h-full absolute top-0 left-0 rounded-[1.5rem] bg-gradient-to-br opacity-30 from-black from-50% to-5%% to-white"></div>
      <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center py-[1.5rem]">
        <div className="w-full z-[1] h-[80px] mb-[1rem] p-[0.25rem]">
          <img
            src={image}
            alt={data.name}
            className="w-full h-full object-bottom mix-blend-multiply"
          />
        </div>
        <h3 className="font-bold text-[1rem] text-white text-center px-[1rem]">{name}</h3>
      </div>
    </div>
  );
});
