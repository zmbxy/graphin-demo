import { IG6GraphEvent, NodeConfig } from '@antv/g6';
import { cloneDeep } from 'lodash';
import * as React from 'react';
import GraphinContext from '../GraphinContext';
import useBehavior from './useBehavior';

const defaultConfig = {
  /**
   * @description 是否禁用该功能
   * @default false
   */
  disabled: false,
  /**
   * @description 是否在拖拽节点时更新所有与之相连的边，默认为 true
   * @default true
   */
  updateEdge: true,
  /**
   * @description 节点拖拽时的绘图属性
   * @default { strokeOpacity: 0.6, fillOpacity: 0.6 }
   */
  delegateStyle: {},
  /**
   * @description 是否开启delegate
   * @default false
   */
  enableDelegate: false,
  /**
   * @description 拖动节点过程中是否只改变 Combo 的大小，而不改变其结构
   * @default false
   */
  onlyChangeComboSize: false,
  /**
   * @description 拖动过程中目标 combo 状态样式
   * @default ''
   */
  comboActiveState: '',
  /**
   * @description 选中样式
   * @default selected
   */
  selectedState: 'selected',
};

export type DragNodeProps = Partial<typeof defaultConfig>;

const DragNode: React.FunctionComponent<DragNodeProps> = (props) => {

  const { graph } = React.useContext(GraphinContext);

  useBehavior({
    type: 'drag-node',
    userProps: props,
    defaultConfig,
  });

  React.useEffect(() => {
    const handleNodeDragStart = (e: IG6GraphEvent) => {
      console.log('========== node drag start log start ==========');
      const item = e.item;
      if (item) {
        const model = item.getModel() as NodeConfig;
        if (!!model.vx) {
          model.vx = 0;
        }
        if (!!model.vy) {
          model.vy = 0;
        }
        if (!!model.fx) {
          model.fx = model.x;
        }
        if (!!model.fy) {
          model.fy = model.y;
        }
      }
      console.log('========== node drag start log end ==========')
    };

    const handleNodeDragEnd = (e: IG6GraphEvent) => {
      const item = e.item;
      if (item) {
        const model = item.getModel() as NodeConfig;
        console.log(model);
        // force 、Fruchterman布局
        model.fx = model.x;
        model.fy = model.y;
        // force布局
        if (!!model.vx) {
          model.vx = 0;
        }
        if (!!model.vy) {
          model.vy = 0;
        }
      }
    }

    graph.on('node:dragstart', handleNodeDragStart);
    graph.on('node:dragend', handleNodeDragEnd);
    return () => {
      graph.off('node:dragstart', handleNodeDragStart);
      graph.off('node:dragend', handleNodeDragEnd);
    };

  }, [graph]);

  return null;
};

export default DragNode;
