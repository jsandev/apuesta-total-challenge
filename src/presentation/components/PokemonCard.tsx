import classNames from "classnames";

import { IPokemonDetail } from "../../models";

import { cardColors } from "../../config/colors";
import { useNavigate } from "react-router";
import { useDispatch } from "../../store";
import { navigationActions } from "../../store/slices/navigation";

interface IProps {
  data: IPokemonDetail;
}
export const PokemonCard: React.FC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const color = cardColors[data.color as keyof typeof cardColors];
  const name = data.name.charAt(0).toUpperCase() + data.name.substring(1).toLowerCase();
  const image =
    data.sprites.other?.dream_world.front_default ||
    data.sprites.other?.["official-artwork"].front_default ||
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png";

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

    dispatch(navigationActions.setLastPokemon(null));
    navigate(`/pokemon/${data.id}`);
  };

  return (
    <div
      className="w-[18.125rem] snap-start sm:snap-center flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full z-[1] h-[300px] -mb-[8rem] p-[1rem]">
        <img
          src={image}
          alt={data.name}
          className="w-full h-full object-bottom mix-blend-multiply drop-shadow-[0_0px_10px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_0px_10px_rgba(255,255,255,0.4)]"
        />
      </div>
      <div
        className={classNames(
          "w-full h-[13rem] relative bg-gradient-to-tr rounded-[1.5rem]",
          color
        )}
      >
        <div className="w-full h-full absolute top-0 left-0 rounded-[1.5rem] bg-gradient-to-tr opacity-20 from-black from-5% to-white"></div>
        <div className="w-full h-full absolute top-0 left-0 flex flex-col justify-end pb-[1.5rem] px-[1rem]">
          <p className="font-light text-white text-[0.75rem]">#{data.id}</p>
          <h3 className="font-bold text-[1.25rem] text-white">{name}</h3>
          <h6 className="font-light text-[0.75rem] text-white opacity-75">
            Peso: {data.weight}Kg · Altura: {(data.height * 0.1).toFixed(2)}cm
          </h6>
        </div>
      </div>
    </div>
  );
};
