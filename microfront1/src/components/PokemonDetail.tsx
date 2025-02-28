import classNames from "classnames";
import React, { useRef, useState } from "react";
import { IPokemonDetail } from "../models/pokemon.model";
import { cardColors } from "../utils/colors";
import { FiArrowLeft, FiPause, FiPlay } from "react-icons/fi";
import { capitalizeWord } from "../utils/letter";

interface IProps {
  data: IPokemonDetail;
}
export const PokemonDetail: React.FC<IProps> = ({ data }) => {
  const color = cardColors[data.color as keyof typeof cardColors];
  const name = capitalizeWord(data.name);
  const image =
    data.sprites.other?.dream_world.front_default ||
    data.sprites.other?.["official-artwork"].front_default ||
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png";

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const onClickAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div
      className={classNames(
        "w-full h-full relative mx-auto bg-gradient-to-tr grid grid-cols-1 grid-rows-[auto_1fr] overflow-y-auto",
        color
      )}
    >
      <div className="w-full h-[35%] relative">
        <div className="px-[1rem] md:px-[1.5rem] lg:px-[4rem] pb-[10rem]">
          <div className="h-[3.875rem] flex items-center justify-between">
            <button onClick={() => window.history.back()} className="cursor-pointer">
              <FiArrowLeft size={24} />
            </button>
          </div>
          <div className="w-full h-full flex flex-col gap-[0.5rem]">
            <h1 className="font-bold text-[1.5rem] text-white">{name}</h1>
            <div className="flex items-center justify-start gap-[0.5rem]">
              {data.types.map((type, i) => {
                return (
                  <div
                    key={i}
                    className="px-[1rem] py-[0.25rem] bg-[rgba(255,255,255,0.35)] text-white font-medium text-[0.75rem] rounded-[0.5rem]"
                  >
                    {capitalizeWord(type.type.name)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="absolute top-[2rem] right-[2rem] w-[6rem] h-[6rem] flex justify-center items-center bg-[rgba(255,255,255,0.35)] hover:bg-[rgba(255,255,255,0.45)] cursor-pointer text-white font-medium text-[0.75rem] rounded-full"
          onClick={onClickAudio}
        >
          {isPlaying ? (
            <FiPause size={56} className="" />
          ) : (
            <FiPlay size={56} className="ml-[0.5rem]" />
          )}
          <audio
            onEnded={() => setIsPlaying(false)}
            onPlaying={() => setIsPlaying(true)}
            ref={audioRef}
            src={data.cries.latest}
          />
        </div>
        <div className="w-full relative -mb-[10px]">
          <div className="w-full absolute bottom-[1.25rem] flex justify-center">
            <div className="w-[18.75rem] h-[18.75rem]">
              <img
                src={image}
                alt={data.name}
                className="w-full h-full object-bottom drop-shadow-[0_0px_10px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-white dark:text-dark"
            viewBox="0 0 1440 320"
          >
            <path
              fill="currentColor"
              d="M0,128L120,154.7C240,181,480,235,720,245.3C960,256,1200,224,1320,208L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="w-full relative flex flex-col items-center bg-white dark:bg-dark pt-[20px] px-[1rem] md:px-[1.5rem] lg:px-[4rem] pb-[3.75rem]">
        {!!data.description && (
          <p className="w-full max-w-[40rem] font-normal text-center text-[#262626] text-[1.25rem] dark:text-white">
            "{data.description}"
          </p>
        )}
        <h6 className="font-light text-[1rem] text-[#262626] dark:text-white mt-[24px]">
          Peso: {data.weight}Kg · Altura: {(data.height * 0.1).toFixed(2)}cm
        </h6>

        <div className="w-full max-w-[50rem] mt-[2.5rem] flex flex-col gap-[1rem]">
          <h3 className="font-medium text-[1.2rem] dark:text-white">Evoluciones</h3>
          <div className="w-full snap-x grid grid-cols-[repeat(auto-fill,280px)] grid-flow-col overflow-x-auto gap-[2rem] no-scroll">
            {data.evolution.map((evo, i) => {
              return (
                <div
                  key={i}
                  className="w-full h-[320px] snap-end flex flex-col items-center bg-gray-50 rounded-[1rem]"
                >
                  <div className="w-[280px]">
                    <img
                      src={evo.image}
                      alt={evo.name}
                      className="w-full h-full object-bottom drop-shadow-[0_0px_10px_rgba(0,0,0,0.4)]"
                    />
                  </div>
                  <h6 className="font-medium text-[#262626] text-[1.25rem]">
                    {capitalizeWord(evo.name)}
                  </h6>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full max-w-[50rem] mt-[2.5rem] flex flex-col gap-[1rem]">
          <h3 className="font-medium text-[1.2rem] dark:text-white">Estadísticas</h3>
          <div className="w-full flex flex-col gap-[1rem]">
            {data.stats.map((stat, i) => {
              return (
                <div key={i} className="w-full grid grid-cols-[1fr_2fr] items-center px-[1rem]">
                  <h3 className="font-normal text-gray-400 dark:text-white">
                    {capitalizeWord(stat.stat.name)}
                  </h3>
                  <div className="w-full grid grid-cols-[5rem_1fr] items-center">
                    <h6 className="text-[#262626] dark:text-white">{stat.base_stat}</h6>
                    <div className="w-full relative bg-gray-100 h-[8px] rounded-full overflow-hidden">
                      <div
                        className={classNames(
                          "h-full absolute top-0 left-0 bg-gradient-to-br rounded-full",
                          color
                        )}
                        style={{ width: stat.base_stat + "%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
