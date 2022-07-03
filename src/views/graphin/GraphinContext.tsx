import React from 'react';
import { Graph as IGraph, NodeConfig } from '@antv/g6';

export interface GraphinContextType {
  graph: IGraph; // G6 graph实例
  selectedNodes?: NodeConfig[]; // 选中的节点
  // apis: ApisType;
  // theme: ThemeType;
  // layout: LayoutController;
}

const defaultContext: GraphinContextType = {
  graph: {} as IGraph,
  selectedNodes: [] as NodeConfig[],
  // apis: {} as ApisType,
  // theme: {} as ThemeType,
  // layout: {} as LayoutController,
};

const GraphinContext: React.Context<GraphinContextType> =
  React.createContext(defaultContext);

export default GraphinContext;
