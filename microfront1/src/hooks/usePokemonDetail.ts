import { useEffect, useState } from "react";
import axios from "axios";

import { IPokemonDetail } from "../models/pokemon.model";

type IProps = {
  id: string;
};
export const usePokemonDetail = ({ id }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IPokemonDetail | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = data as IPokemonDetail;

        const resSpecies = await fetch(pokemon.species.url);
        const species = await resSpecies.json();
        const evolutionUrl = species.evolution_chain.url;

        const evolutionRes = await fetch(evolutionUrl);
        const evolutionData = await evolutionRes.json();

        const evoChain = [];
        let evo = evolutionData.chain;

        while (evo) {
          evoChain.push({ name: evo.species.name, image: "" });
          evo = evo.evolves_to.length ? evo.evolves_to[0] : null;
        }

        const evoWithImages = await Promise.all(
          evoChain.map(async (evo) => {
            const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo.name}/`);
            const pokemonData = await pokemonRes.json();
            return {
              name: evo.name,
              image: pokemonData.sprites.other["official-artwork"].front_default,
            };
          })
        );

        const description =
          species.flavor_text_entries.find((entry: any) => entry.language.name === "es")
            ?.flavor_text || "";
        setData({ ...pokemon, color: species.color.name, description, evolution: evoWithImages });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  return { isLoading, data };
};
