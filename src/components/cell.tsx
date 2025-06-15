import { memo } from "react";

type CellProps = {
  active: boolean;
  clicked: boolean;
  className: string;
  setCell: () => void;
};

function Cell({ className, active, setCell, clicked }: CellProps) {
  return (
    <button
      className={`w-[15px] h-[15px] hover:bg-amber-400 ${
        active ? "bg-amber-600" : ""
      } ${className} border-[1px] border-neutral-500`}
      onMouseOver={() => {
        if (clicked) setCell();
      }}
    >
      {" "}
    </button>
  );
}

export default memo(Cell);
