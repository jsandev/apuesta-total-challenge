import { FiArrowLeft } from "react-icons/fi";

import { HistoryItemCard } from "./components/HistoryItemCard";
import { useHistory } from "./hooks/useHistory";

const App = () => {
  const { history } = useHistory();

  return (
    <main className="w-full h-full bg-white dark:bg-dark">
      <div className="w-full h-full max-w-[80rem] flex flex-col items-center md:px-[1.5rem] lg:px-[4rem] overflow-hidden">
        <div className="w-full h-[3.875rem] flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="cursor-pointer text-[#262626] dark:text-white"
          >
            <FiArrowLeft size={24} />
          </button>
          <div className="w-full h-[3.875rem] flex justify-center items-center">
            <h1 className="font-medium text-[1.2rem] text-[#262626] dark:text-white">
              Historial de Pokemones
            </h1>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[1rem] overflow-y-auto py-[2rem] no-scroll">
          {history.map((h, i) => {
            return <HistoryItemCard data={h} key={i} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default App;
