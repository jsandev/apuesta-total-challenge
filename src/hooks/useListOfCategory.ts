import { useCallback, useEffect, useRef, useState } from "react";
import { IPokemonDetail } from "../models";
import { categoryService } from "../services/category";

interface IProps {
  category: string;
}
export const useListOfCategory = ({ category }: IProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [data, setdata] = useState<IPokemonDetail[]>([]);

  const getPokemonsByCategory = useCallback(async (type: string) => {
    const { data } = await categoryService.getPokemonsByCategory(type);
    const pokemonsFiltered = data.pokemon.sort(() => Math.random() - 0.5).slice(0, 10);

    const pokemonsData = await Promise.all(
      pokemonsFiltered.map(async (p) => {
        const res = await fetch(p.pokemon.url);
        const pokemon = (await res.json()) as IPokemonDetail;

        const resColor = await fetch(pokemon.species.url);
        const color = await resColor.json();
        return { ...pokemon, color: color.color.name };
      })
    );

    return pokemonsData;
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const categories = await getPokemonsByCategory(category);
        setdata(categories);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [category, getPokemonsByCategory]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return { scrollLeft, scrollRight, data, scrollRef };
};
