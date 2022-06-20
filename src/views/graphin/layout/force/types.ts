export type PointTuple = [number, number];

export interface ForceLayoutOptions {
  type: "force";
  center?: PointTuple;
  linkDistance?: number | ((d?: any) => number) | undefined;
  edgeStrength?: number | ((d?: any) => number) | undefined;
  nodeStrength?: number | ((d?: any) => number) | undefined;
  preventOverlap?: boolean;
  collideStrength?: number;
  nodeSize?: number | number[] | ((d?: any) => number) | undefined;
  nodeSpacing?: number | number[] | ((d?: any) => number) | undefined;
  alpha?: number;
  alphaDecay?: number;
  alphaMin?: number;
  clustering?: boolean;
  clusterNodeStrength?: number;
  clusterEdgeStrength?: number;
  clusterEdgeDistance?: number;
  clusterNodeSize?: number;
  clusterFociStrength?: number;
  forceSimulation?: any;
  tick?: () => void;
  onLayoutEnd?: () => void;
  workerEnabled?: boolean;
}