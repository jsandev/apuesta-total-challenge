import { Header } from "../components/Header";

interface IProps {
  children: React.ReactNode;
}
export const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <main className="w-full h-full bg-white dark:bg-dark grid grid-rows-[62px_1fr]">
      <Header />
      {children}
    </main>
  );
};
