import React from "react";

export type IHistory = {
  id: number;
  date: number;
  name: string;
  image: string;
  weight: number;
  height: number;
};

interface IProps {
  data: IHistory;
}
export const HistoryItemCard: React.FC<IProps> = ({ data }) => {
  return (
    <div className="w-full h-[6rem] max-w-[26rem] mx-auto bg-white grid grid-cols-[5rem_1fr] rounded-[1rem] shadow-2xl border border-gray-100 px-[1rem]">
      <div className="w-full h-[5rem]">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_0px_10px_rgba(0,0,0,0.4)]"
        />
      </div>
      <div className="w-full h-full flex flex-col items-start justify-center px-[1rem]">
        <h3 className="font-normal text-[#262626] text-[12px]">
          Pokemon: <strong>{data.name}</strong>
          <br />
          Última visualización:{" "}
          {data.date &&
            new Date(data.date).toLocaleDateString("es-PE", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
        </h3>
      </div>
    </div>
  );
};
