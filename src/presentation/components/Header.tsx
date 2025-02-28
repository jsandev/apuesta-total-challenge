import { useDispatch, useSelector } from "../../store";
import { navigationActions } from "../../store/slices/navigation";
import { AppInput } from "./AppInput";

import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { useDarkMode } from "../../hooks/useDarkMode";

export const Header = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.navigation);
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <header className="w-full flex items-center justify-center">
      <div className="w-full h-full max-w-[80rem] mx-auto flex items-center justify-between gap-[0.5rem] px-[1rem] md:px-[1.5rem] lg:px-[4rem]">
        <a
          href="https://portfolio-jsandev.vercel.app/"
          target="_blank"
          className="font-bold text-[1.5rem] text-[#262626] dark:text-white"
        >
          JS.
        </a>

        <div className="w-full hidden md:block max-w-[18.75rem] ml-[4rem]">
          <AppInput
            type="search"
            placeholder="Buscar pokemon..."
            onClick={() => dispatch(navigationActions.showModalSearch())}
          />
        </div>

        <div className="flex items-center justify-center gap-[0.75rem]">
          <p className="font-normal text-[0.875rem] dark:text-white line-clamp-1 hidden md:block">
            Hola, {user}
          </p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-100 hover:bg-gray-200 p-[0.625rem] rounded-[0.5rem] cursor-pointer"
          >
            {darkMode ? (
              <FiSun className="text-slate-800" width={24} height={24} />
            ) : (
              <FiMoon className="text-slate-800" width={24} height={24} />
            )}
          </button>
          <button
            className="bg-gray-100 hover:bg-gray-200 p-[0.625rem] rounded-[0.5rem] cursor-pointer flex items-center text-[12px] gap-[0.25rem]"
            onClick={() => {
              dispatch(navigationActions.setUser(""));
              window.localStorage.removeItem("at-user");
            }}
          >
            <FiLogOut className="text-slate-800" width={24} height={24} />
            Salir
          </button>
        </div>
      </div>
    </header>
  );
};
