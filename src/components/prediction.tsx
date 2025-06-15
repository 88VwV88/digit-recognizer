import Predicted from "@/components/predicted";
import { useLocation } from "react-router";

function Prediction() {
  const location = useLocation();
  const [distrib]: number[][] = location.state.distrib;

  console.log(distrib);

  return <Predicted distrib={distrib} />;
}

export default Prediction;
