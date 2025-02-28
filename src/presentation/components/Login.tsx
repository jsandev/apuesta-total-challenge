import { useState } from "react";
import { useDispatch } from "../../store";
import { navigationActions } from "../../store/slices/navigation";
import { AppInput } from "./AppInput";
import { FiSun, FiMoon, FiLogIn } from "react-icons/fi";
import { useDarkMode } from "../../hooks/useDarkMode";

export const Login = () => {
  const dispatch = useDispatch();
  const { darkMode, setDarkMode } = useDarkMode();

  const [input, setInput] = useState("");

  const login = () => {
    dispatch(navigationActions.setUser(input));
    setInput("");
  };

  return (
    <div className="w-full h-full bg-white dark:bg-dark flex flex-col justify-center items-center">
      <div className="w-full max-w-[22.5rem] bg-white flex flex-col gap-[1rem] items-center shadow-2xl rounded-[1rem] p-[1.5rem]">
        <p className="font-light text-[0.75rem]">Conoce mi portafolio antes de ingresar</p>
        <a
          href="https://portfolio-jsandev.vercel.app/"
          target="_blank"
          className="font-bold text-[5rem] text-[#262626]"
        >
          JS.
        </a>

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

        <div className="w-full">
          <AppInput
            type="text"
            placeholder="Ingresa tu nombre"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              localStorage.setItem("at-user", e.target.value);
            }}
            onKeyDown={(e) => e.key.toLowerCase() === "enter" && login()}
          />
        </div>

        <button
          className="w-full flex justify-center items-center bg-gray-100 hover:bg-gray-200 p-[0.625rem] rounded-[0.5rem] cursor-pointer text-[0.875rem] gap-[0.25rem]"
          onClick={login}
        >
          <FiLogIn className="text-slate-800" width={24} height={24} />
          Ingresar
        </button>
      </div>
    </div>
  );
};
