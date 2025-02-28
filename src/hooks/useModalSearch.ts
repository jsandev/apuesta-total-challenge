import { AxiosError } from "axios";
import { useState, useRef, useCallback, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { IPokemonDetail } from "../models";
import { pokemonService } from "../services/pokemon";
import { navigationActions } from "../store/slices/navigation";
import { useDispatch, useSelector } from "../store";

export const useModalSearch = () => {
  const dispatch = useDispatch();
  const { modalSearchVisible } = useSelector((state) => state.navigation);

  const [limit, setLimit] = useState(30);
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<IPokemonDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [uniquePokemon, setUniquePokemon] = useState<IPokemonDetail | null>(null);

  const [search, setSearch] = useState("");
  const [debounceValue] = useDebounce(search, 500);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const getPokemons = useCallback(async () => {
    try {
      const { data } = await pokemonService.filter({ limit, offset });

      const pokemonsData = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          const pokemon = (await res.json()) as IPokemonDetail;

          const resColor = await fetch(pokemon.species.url);
          const color = await resColor.json();
          return { ...pokemon, color: color.color.name };
        })
      );

      setPokemons((prev) => [...prev, ...pokemonsData]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [limit, offset]);

  useEffect(() => {
    (async () => {
      if (!modalSearchVisible) return;
      await getPokemons();

      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    })();
  }, [getPokemons, modalSearchVisible]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 750));
          setOffset((o) => o + 30);
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    if (lastItemRef.current) {
      observerRef.current.observe(lastItemRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [pokemons, uniquePokemon]);

  useEffect(() => {
    if (debounceValue.length === 0) {
      setUniquePokemon(null);
    } else {
      (async () => {
        try {
          setIsLoadingSearch(true);
          await new Promise((resolve) => setTimeout(resolve, 750));

          const { data } = await pokemonService.searchByName(debounceValue.trim().toLowerCase());
          const resColor = await fetch(data.species.url);
          const color = await resColor.json();
          const info = { ...data, color: color.color.name };

          setUniquePokemon(info);
        } catch (error) {
          const e = error as AxiosError;
          if (e.status === 404) {
            setUniquePokemon(null);
          }
        } finally {
          setIsLoadingSearch(false);
        }
      })();
    }
  }, [debounceValue]);

  const onClose = () => {
    dispatch(navigationActions.hideModalSearch());
    setLimit(30);
    setOffset(0);
    setPokemons([]);
    lastItemRef.current = null;

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  };

  return {
    onClose,
    isLoading,
    isLoadingSearch,
    uniquePokemon,
    search,
    setSearch,
    debounceValue,
    pokemons,
    searchInputRef,
    lastItemRef,
  };
};
