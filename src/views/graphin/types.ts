import { Graph } from "@antv/g6";

export interface GraphinData {
  nodes: any[];
  edges: any[];
  combos?: any[] | undefined | null;
}

export const LayoutTypeKeys = [
  'force',
  'concentric',
  'grid',
  'radial',
  'dagre',
  'circular',
  'gForce',
  'mds',
  'random'
] as const;

export declare type LayoutTypeKey = typeof LayoutTypeKeys[number];

export interface Layout {
  type?: LayoutTypeKey,
  preset?: Layout,
  [key: string]: any,
}

export interface GraphinProps {
  /** 容器的自定义样式 */
  containerStyle?: React.CSSProperties,
  data: GraphinData,
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 是否开启全局动画 */
  animate?: boolean;
  /** 图布局 */
  layout?: Layout,
  /** 图布局后回调函数 */
  afterLayout?: (graph: Graph) => void;
}