import G6, { Graph as IGraph, GraphData, GraphOptions, TreeGraphData } from '@antv/g6';
import { Spin } from '@arco-design/web-react';
import { cloneDeep } from 'lodash';
import React from 'react';
import { deepEqual } from '../../utils';
import { ResizeCanvas } from './behaviors';
import './graphin.less';
import GraphinContext from './GraphinContext';
import LayoutController from './layout';
import registerEdge from './shape/edge';
import registerShape from './shape/node';
import { GraphinData, GraphinProps } from './types';

registerShape();
registerEdge();

export interface GraphinState {
  layoutEnd: boolean,
  rendered: boolean,
  context: {
    graph: IGraph;
    // apis: ApisType;
    // theme: ThemeData;
    layout: LayoutController;
    // dragNodes: IUserNode[];
    updateContext: (config: any) => void;
  };
}

export interface RegisterFunction {
  (name: string, options: { [key: string]: any }, extendName?: string): void;
}
class Graphin extends React.PureComponent<GraphinProps, GraphinState> {

  static registerNode: RegisterFunction = (nodeName, options, extendedNodeName) => {
    G6.registerNode(nodeName, options, extendedNodeName);
  }

  static registerEdge: RegisterFunction = (edgeName, options, extendedEdgeName) => {
    G6.registerEdge(edgeName, options, extendedEdgeName);
  };

  static registerCombo: RegisterFunction = (comboName, options, extendedComboName) => {
    G6.registerCombo(comboName, options, extendedComboName);
  };

  static registerBehavior(behaviorName: string, behavior: any) {
    G6.registerBehavior(behaviorName, behavior);
  }

  static registerLayout(layoutName: string, layout: any) {
    G6.registerLayout(layoutName, layout);
  }

  graphDOM: HTMLDivElement | null = null;

  /** G6图实例 */
  graph: IGraph;

  layout: LayoutController;

  /** G6实例中的nodes、edges、combos的model，会比props.data中多一些引用赋值产生的属性，比如node中的x，y */
  data: GraphinData | undefined;

  graphOptions: GraphOptions;

  width: number;

  height: number;

  layoutCache: boolean;

  constructor(props: GraphinProps) {
    super(props);

    const { width, height, layoutCache = true } = props;
    this.graph = {} as IGraph;
    this.layout = {} as LayoutController;
    this.width = Number(width);
    this.height = Number(height);
    this.layoutCache = layoutCache;
    this.graphOptions = {} as GraphOptions;

    this.state = {
      layoutEnd: false, // 初次加载时，显示loading，知道初次布局完成后
      rendered: false, // 图是否已渲染完毕，控制图的更新频率，防止图未更新完毕，下一次数据更新又开始重新计算
      context: {
        graph: {} as IGraph,
        layout: this.layout,
        updateContext: this.updateContext,
      }
    }
  }

  initData = (data: GraphinProps['data']) => {
    // TODO 树图
    this.data = cloneDeep(data);
  }

  /** 初始化状态 */
  initStatus = () => {

  }

  initGraphInstance = () => {

    const { data, width, height, animate } = this.props;

    /** width and height */
    const { clientWidth, clientHeight } = this.graphDOM as HTMLDivElement;
    this.initData(data);

    // 重新计算高度
    this.width = Number(width) || clientWidth || 500;
    // 这里如果完全按照clientHeight设置canvas高度
    this.height = Number(height) || clientHeight || 500;

    // not todo default style

    // not todo different rah type. as TreeGraph or Graph

    this.graphOptions = {
      container: this.graphDOM,
      renderer: 'canvas',
      width: this.width,
      height: this.height,
      animate: animate !== false,
      // fitView: true,
      layout: {
        type: 'force',
        preventOverlap: true,
        linkDistance: 180,
        nodeStrength: -180,
        edgeStrength: 0.15,
        nodeSpacing: 100,
        // workerEnabled: true,
        // workerScriptURL: `${process.env.PUBLIC_URL}/lib/layout.min.js`,
        onLayoutEnd: () => {
          console.log('========= on layout end =========');
          this.setState({ layoutEnd: true });
        }
      },
      defaultNode: {
        // type: 'protect-unit',
        type: 'execute-unit',
        size: 100,
        expand: true,
      },
      defaultEdge: {
        type: 'state-link',
        style: {
          lineWidth: 3.5,
          lineAppendWidth: 5,
        }
      },
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas']
      }
    } as GraphOptions;

    // new Graphin
    this.graph = new G6.Graph(this.graphOptions);

    // 内置事件：afterrender 回调
    this.graph.on('afterrender', () => {
    })

    // this.graph.set('layoutController', null);
    // 装载数据
    this.graph.data(this.data as GraphData | TreeGraphData);
    // 渲染
    this.graph.render();

    // this.layout = new LayoutController(this);
    // this.layout.start();
    // this.graph.fitView();

    // 初始化状态
    this.initStatus();

    // 设置context
    this.setState({
      context: {
        graph: this.graph,
        layout: this.layout,
        updateContext: this.updateContext
      }
    })
  }

  updateContext = (config: any) => {
    this.setState((prevState: any) => ({
      context: {
        ...prevState.context,
        ...config,
      },
    }));
  }

  clear = () => {
    if (this.layout) {
      this.layout.destroy?.();
    }
    this.layout = {} as LayoutController;
    this.graph!.clear();
    this.data = { nodes: [], edges: [], combos: [] };
    this.graph!.destroy();
  }

  shouldUpdate(prevProps: GraphinProps, key: keyof GraphinProps) {
    const prevVal = prevProps[key];
    const currentVal = this.props[key];
    const isEqual = deepEqual(prevVal, currentVal);
    return !isEqual;
  }

  componentDidMount() {
    this.initGraphInstance();
  }

  componentDidUpdate(prevProps: GraphinProps) {
    const isDataChange = this.shouldUpdate(prevProps, 'data');
    const isLayoutChange = this.shouldUpdate(prevProps, 'layout');
    // const isOptionsChange = this.shouldUpdate(prevProps, 'options');

    const { data, layout } = this.props;

    // let newDragNodes: IUserNode[];

    // 数据发生变化
    if (isDataChange) {
      console.log('========== data change ==========')
      this.initData(data);
      // const { context } = this.state;

      // 若dragNodes中的节点已不存在，则从数组中删除
      // newDragNodes = dragNodes.filter(
      //   dNode =>
      //     (this.data as GraphinData)?.nodes && (this.data as GraphinData).nodes.find(node => node.id === dNode.id),
      // );
      // 更新拖拽后的节点的mass（力导参数）到data
      // this.data?.nodes?.forEach(node => {
      //   const dragNode = newDragNodes.find(item => item.id === node.id);
      //   if (dragNode) {
      //     node.layout = {
      //       ...node.layout,
      //       force: {
      //         mass: dragNode.layout?.force?.mass,
      //       },
      //     };
      //   }
      // });

      // 更新图
      this.graph.data(this.data as GraphData | TreeGraphData);
      this.graph.set('layoutController', null);
      this.graph.changeData(this.data as GraphData | TreeGraphData);

      // 由于changeData是将this.data融合到item models上面，因此changeData后models与this.data不是同一个引用了
      // 执行下面一行以保证graph item model中的数据与this.data是同一份
      this.data = this.layout.getDataFromGraph();
      this.layout.changeLayout();

      this.initStatus();
      this.setState(
        (preState: any) => {
          return {
            ...preState,
            context: {
              graph: this.graph,
              // apis: this.apis,
              // theme: this.theme,
              layout: this.layout,
              // dragNodes: newDragNodes || preState.context.dragNodes,
              updateContext: this.updateContext,
            },
          };
        },
        () => {
          // 走G6的layoutController
          this.graph.emit('graphin:datachange');
          if (isLayoutChange) {
            this.graph.emit('graphin:layoutchange', { prevLayout: prevProps.layout, layout });
          }
        },
      );
      return;
    }

    // 布局发生变化
    if (isLayoutChange) {
      console.log('========== layout change ==========');
      this.data = this.layout.getDataFromGraph();
      this.layout.changeLayout();
      this.layout.refreshPosition();
      // 走G6的layoutController
      this.graph.emit('graphin:layoutchange', { prevLayout: prevProps.layout, layout });
    }
  }

  componentWillUnmount() {
    this.clear();
  }

  render(): React.ReactNode {

    const { containerStyle } = this.props;

    const { layoutEnd } = this.state;

    return (
      <GraphinContext.Provider value={this.state.context}>
        <div
          className="graphin-container"
          style={{ ...containerStyle }}
        >
          <Spin dot block loading={!this.state.layoutEnd}>
            <div className="graphin-core" ref={node => this.graphDOM = node} />
            <div className="graphin-components">
              {layoutEnd && (
                <>
                  <ResizeCanvas graphDOM={this.graphDOM as HTMLDivElement} />
                  {this.props.children}
                </>
              )}
            </div>
          </Spin>
        </div>
      </GraphinContext.Provider>
    )
  }
}

export default Graphin;
