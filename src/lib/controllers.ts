const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function makePrediction({ cells }: { cells: boolean[][] }) {
  try {
    const pixels = cells.map((row) => row.map((x) => (x ? 1.0 : 0.0)));

    const distrib = await fetch(`${BACKEND_URL}/predict`, {
      body: JSON.stringify({ pixels }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((_) => _.json());
    return { distrib };
  } catch (error) {
    console.error("[ERROR] Error during predict: %s", error);
  }
}
