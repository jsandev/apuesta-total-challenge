import React from "react";

import { PokemonCard } from "./PokemonCard";

import { useListOfCategory } from "../../hooks/useListOfCategory";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface IProps {
  title: string;
  category: string;
}
export const ListOfCategory: React.FC<IProps> = ({ title, category }) => {
  const { scrollLeft, scrollRight, scrollRef, data } = useListOfCategory({ category });

  return (
    <div className="w-full flex flex-col gap-[1rem]">
      <div className="w-full flex justify-between items-center">
        <h3 className="font-medium text-[1.25rem] dark:text-white">{title}</h3>
        <div className="flex items-center gap-[0.75rem]">
          <button
            onClick={scrollLeft}
            className="flex items-center outline-none font-medium bg-gray-50 hover:bg-gray-200 text-[1rem] text-[#262626] gap-[0.25rem] cursor-pointer p-[0.5rem] rounded-[0.5rem]"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={scrollRight}
            className="flex items-center outline-none font-medium bg-gray-50 hover:bg-gray-200 text-[1rem] text-[#262626] gap-[0.25rem] cursor-pointer p-[0.5rem] rounded-[0.5rem]"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="w-full snap-x grid grid-cols-[repeat(auto-fit,280px)] grid-flow-col-dense overflow-x-auto gap-[3rem] no-scroll"
      >
        {data.map((pokemon) => {
          return <PokemonCard key={pokemon.id} data={pokemon} />;
        })}
      </div>
    </div>
  );
};
