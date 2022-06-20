import { LayoutTypeKey } from "../types";

export type LayoutType = {
  type: LayoutTypeKey;
  title: string;
  options?: {
    [key: string]: any
  };
}

export type LayoutOptions = {
  [key in LayoutTypeKey]: LayoutType
}

export const layouts: LayoutType[] = [
  {
    type: 'force',
    title: 'D3力导',
    options: {
      preventOverlap: true,
      linkDistance: 200,
      nodeStrength: -200,
      // edgeStrength: 1,
      nodeSpacing: 100,
      workerEnabled: true,
    },
  },
  {
    type: 'concentric',
    title: '同心圆布局',
    options: {
      minNodeSpacing: 60, // 可选，边长
      preventOverlap: true, // 可选，必须配合 nodeSize
      nodeSize: 60,
    },
  },
  {
    type: 'grid',
    options: {},
    title: '网格布局',
  },
  {
    type: 'radial',
    options: {},
    title: '辐射布局',
  },
  {
    type: 'dagre',
    title: '层次布局',
    options: {},
  },
  {
    type: 'circular',
    options: {},
    title: '环形布局',
  },

  {
    type: 'gForce',
    options: {
      linkDistance: () => 200,
      preventOverlap: true,
    },
    title: 'G6力导',
  },
  {
    type: 'mds',
    options: {},
    title: '降维布局',
  },
  {
    type: 'random',
    options: {},
    title: '随机布局',
  },
];

const options: Partial<LayoutOptions> = layouts
  .map(c => {
    const { type, options } = c;
    return {
      type,
      ...options,
    };
  })
  .reduce((acc, curr) => {
    return {
      ...acc,
      [curr.type]: curr,
    };
  }, {});

export default options;
