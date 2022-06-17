import React from 'react';
import { Graph as IGraph } from '@antv/g6';

const defaultContext = {
  graph: {} as IGraph,
  // apis: {} as ApisType,
  // theme: {} as ThemeType,
  // layout: {} as LayoutController,
};

export interface GraphinContextType {
  graph: IGraph;
  // apis: ApisType;
  // theme: ThemeType;
  // layout: LayoutController;
}

const GraphinContext: React.Context<GraphinContextType> = React.createContext(defaultContext);

export default GraphinContext;
