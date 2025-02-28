import { useEffect, useState } from "react";

import { IHistory } from "../components/HistoryItemCard";

export const useHistory = () => {
  const [history, setHistory] = useState<IHistory[]>([]);

  useEffect(() => {
    const lastPokemons = window.localStorage.getItem("pokemons");
    if (lastPokemons) {
      const pokemons = JSON.parse(lastPokemons) as IHistory[];
      const pokemonsSorted = pokemons.sort((a, b) => b.date - a.date);

      setHistory(pokemonsSorted);
    }
  }, []);

  return { history };
};
