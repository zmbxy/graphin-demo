import { useContext, useEffect } from "react";
import GraphinContext from "../GraphinContext";

export interface NodeSelectProps {

}

const NodeSelect: React.FunctionComponent<NodeSelectProps> = (props: NodeSelectProps) => {

  const { graph } = useContext(GraphinContext);

  useEffect(() => {

  }, [])

  return null;
}

export default NodeSelect;