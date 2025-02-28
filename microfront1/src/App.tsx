import { useParams } from "react-router";

import { PokemonDetail } from "./components/PokemonDetail";
import { usePokemonDetail } from "./hooks/usePokemonDetail";

const App = () => {
  const { id } = useParams();

  const { isLoading, data } = usePokemonDetail({ id: id! });

  return (
    <main className="w-full h-full">
      {isLoading ? (
        <div className="w-full h-full grid place-content-center">Cargando...</div>
      ) : (
        data !== null && <PokemonDetail data={data} />
      )}
    </main>
  );
};

export default App;
