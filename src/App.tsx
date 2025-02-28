import { ListOfCategory } from "./presentation/components/ListOfCategory";
import { ModalSearch } from "./presentation/components/ModalSearch";
import { MainLayout } from "./presentation/shared/MainLayout";
import { Toast } from "./presentation/components/Toast";
import { AppInput } from "./presentation/components/AppInput";
import { Login } from "./presentation/components/Login";

import { useDispatch, useSelector } from "./store";
import { navigationActions } from "./store/slices/navigation";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.navigation);

  useEffect(() => {
    dispatch(navigationActions.setUser(localStorage.getItem("at-user") || ""));
  }, [dispatch]);

  if (user.length === 0) {
    return <Login />;
  }

  return (
    <MainLayout>
      <section className="w-full max-w-[80rem] mx-auto flex flex-col gap-[4rem] px-[1rem] md:px-[1.5rem] lg:px-[4rem] pt-[2rem] md:pt-[4rem] overflow-x-hidden pb-[7.5rem] no-scroll">
        <div className="w-full flex flex-col gap-[0.75rem] md:hidden">
          <p className="font-normal text-[0.875rem] block md:hidden dark:text-white line-clamp-1">
            Hola, {user}
          </p>
          <AppInput
            type="search"
            placeholder="Buscar pokemon..."
            onClick={() => dispatch(navigationActions.showModalSearch())}
          />
        </div>
        <ListOfCategory category={"fire"} title="Fuego" />
        <ListOfCategory category={"water"} title="Agua" />
        <ListOfCategory category={"electric"} title="Eléctrico" />
        <ListOfCategory category={"dragon"} title="Dragón" />
        <ListOfCategory category={"ghost"} title="Fantasma" />
      </section>

      <Toast />
      <ModalSearch />
    </MainLayout>
  );
}

export default App;
