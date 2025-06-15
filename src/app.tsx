import { useCallback, useState, useTransition } from "react";

import Cell from "@/components/cell";
import Prediction from "@/components/predicted";
import { makePrediction } from "@/lib/controllers";

const rows: number = 28;
const cols: number = 28;

export default function App() {
  const [isPending, startTransition] = useTransition();

  const [cells, setCells] = useState<boolean[][]>(() => {
    const cells: boolean[][] = new Array<boolean[]>(rows);
    for (let i = 0; i < rows; ++i) {
      cells[i] = new Array(cols);
      cells[i].fill(false);
    }
    return cells;
  });
  const [clicked, setClicked] = useState<boolean>(false);
  const [predictionDistrib, setPredictionDistrib] = useState<number[] | null>(
    null
  );
  const [showPrediction, setShowPrediction] = useState<boolean>(false);

  function setCell(row: number, col: number) {
    const newCells = [...cells];
    newCells[row][col] = true;
    setCells(newCells);
  }
  const reset = useCallback(() => {
    startTransition(() => {
      const newCells = new Array<boolean[]>(rows);
      for (let i = 0; i < rows; ++i) {
        newCells[i] = new Array<boolean>(cols);
        newCells[i].fill(false);
      }
      setShowPrediction(false);

      setPredictionDistrib(null);
      setCells(newCells);
    });
  }, []);
  const handlePredict = async () => {
    startTransition(async () => {
      const state = await makePrediction({ cells });
      if (state && state.distrib) {
        const [distrib]: number[][] = state.distrib;
        setPredictionDistrib(distrib);

        setShowPrediction(true);
      }
    });
  };
  return (
    <div className="flex justify-center items-center w-full">
      <div
        className={`flex-col transition-all duration-500 ease-out transform ${
          showPrediction ? "-translate-x-12" : "translate-x-0"
        } ${isPending ? "animate-pulse" : ""}`}
      >
        <div
          className={`grid grid-rows-${rows} grid-cols-${cols}`}
          onMouseDown={() => setClicked(true)}
          onMouseUp={() => setClicked(false)}
        >
          {cells.map((row, i) =>
            row.map((cellActive, j) => (
              <Cell
                key={`${i},${j}`}
                className={`row-start-${i + 1} col-start-${j + 1}`}
                clicked={clicked}
                active={cellActive}
                setCell={() => setCell(i, j)}
              />
            ))
          )}
        </div>
        <button
          type="button"
          className="mt-3 w-full text-center p-2 transition-colors hover:bg-neutral-700 hover:text-white bg-white text-neutral-950 rounded-md"
          onClick={handlePredict}
        >
          Submit
        </button>
        <button
          type="button"
          className="mt-2 w-full text-center p-2 transition-colors hover:bg-neutral-700 hover:text-white bg-white text-neutral-950 rounded-md"
          onClick={reset}
        >
          Reset
        </button>
      </div>{" "}
      {predictionDistrib && (
        <div
          className={`ml-12 transition-all duration-500 ease-in-out transform ${
            showPrediction && !isPending
              ? "translate-x-0 opacity-100 scale-100"
              : "translate-x-12 opacity-0 scale-95"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Prediction Results</h3>
          <Prediction distrib={predictionDistrib} />
        </div>
      )}
    </div>
  );
}
