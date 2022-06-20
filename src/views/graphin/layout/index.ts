import G6, { Graph } from "@antv/g6";
import Graphin from "../Graphin";
import { LayoutTypeKeys } from "../types";
import defaultOptions, { LayoutType } from './options';

// const FORCE_LAYOUTS = ['force', 'graphin-force', 'g6force', 'gForce', 'comboForce'];

class LayoutController {
  graph: Graph;
  graphin: Graphin;
  presetLayout: any; // 前置预设布局
  prevOptions: any;
  options: any;
  instance: any;

  constructor(context: Graphin) {
    this.graphin = context;
    this.graph = this.graphin.graph;
    this.presetLayout = null;
    this.prevOptions = {};
    this.init();
  }

  /** 
   * 是否每个节点都有位置信息
   */
  hasPosition() {
    const { graphin } = this;
    const { data } = graphin;
    // 若收到一个空数组，Array.prototype.every()方法在任何情况下都会返回true
    if (data == null || !data.nodes) {
      return false;
    }
    if (data.nodes.length === 0) {
      return false;
    }
    return data.nodes.every((node) => !isNaN(Number(node.x)) && !isNaN(Number(node.y)))
  }

  /**
   * 初始化布局
   */
  init() {
    // 更新布局参数
    this.updateOptions();
    const { graphin, options } = this;
    const { data } = graphin;
    const { type } = options;

    // 力导布局特殊处理
    this.processForce();

    const Layout = G6.Layout[type] || G6.Layout.force;
    this.graph.emit('beforelayout');
    // 实例化Layout实例
    this.instance = new Layout(this.options);
    // 初始化Layout
    this.instance.init(data);
  }

  start() {
    const { type } = this.options;
    this.instance.execute();

    if ((type === 'force' || type === 'g6force' || type === 'gForce' || type === 'comboCombined')) {
      // emit afterlayout on options.layoutEnd()
      return;
    }

    this.refreshPosition();
    this.graph.emit('afterlayout');
  }

  changeLayout() {
    const { graph, data, layoutCache } = this.graphin;
    if (
      !graph ||
      graph.destroyed ||
      !data ||
      !data.nodes ||
      !data.nodes.length ||
      (layoutCache && this.hasPosition())
    ) {
      return false;
    }
    if (LayoutTypeKeys.indexOf(this.options.type) !== -1) {
      this.destroy();
    }
    /** 设置前置布局参数 */
    this.prevOptions = { ...this.options };
    /** 重新走初始化流程 */
    this.init();
    this.start();
  }

  updateOptions() {
    const DEFAULT_LAYOUT = { type: 'force' } as LayoutType;

    const { width, height, props } = this.graphin;
    const { layout = DEFAULT_LAYOUT } = props;

    const { type = 'force' } = layout;

    // 通用布局参数
    const commonLayoutParams = {
      width,
      height,
      center: [width / 2, height / 2],
    };

    this.options = {
      ...commonLayoutParams,
      ...(defaultOptions[type] || {}),
      ...layout,
    }
  }

  processForce() {
    const { options, graphin } = this;
    const { graph } = graphin;
    const { type } = options;

    if (type === 'force' || type === 'g6force' || type === 'gForce' || type === 'comboCombined') {
      const { onTick } = this.options;
      const tick = () => {
        if (onTick) {
          onTick();
        }
      };

      this.options.tick = tick;
      const { onLayoutEnd } = this.options;
      this.options.onLayoutEnd = () => {
        this.refreshPosition();
        onLayoutEnd?.();
        graph.emit('afterlayout');
      };
    }

    // const isForceLayout = {
    //   prev: FORCE_LAYOUTS.indexOf(this.prevOptions.type) !== -1,
    //   current: FORCE_LAYOUTS.indexOf(this.options.type) !== -1,
    // };
    // const isSameLayoutType = this.options.type === this.prevOptions.type;
    // if (isEmpty(graphin.data)) {
    //   return;
    // }

    // if (isForceLayout.current && !isSameLayoutType) {
    //   /**
    //    * 当前布局为force，且两次布局类型不一致
    //    * 应当设置当前布局的preset为前一个布局
    //    */
    //   // const { preset } = this.options;
    //   // this.presetLayout = new G6.Layout['force']({ ...preset } || {});
    //   // this.presetLayout.init(graphin.data);
    //   // this.presetLayout.execute();
    //   // this.presetLayout.data = { ...graphin.data };
    // }

    // if (isForceLayout.current && isForceLayout.prev && !this.hasPosition()) {
    //   /**
    //    * 当前布局类型为force， 前一次布局也为force
    //    * 渐进布局
    //    * 不满足每个节点都有位置信息时才计算初始位置
    //    */
    //   let prevData: GraphData = this.graph.save(); // 必须从graph上取数据的原因是，用户可能拖拽改变数据
    //   // const { preset } = this.options;
    //   // if (isEmpty(prevData)) {
    //   //   // preset.type = 'grid';
    //   //   this.presetLayout = new G6.Layout[preset.type]({ ...preset } || {});
    //   //   this.presetLayout.init(graphin.data);
    //   //   this.presetLayout.execute();
    //   //   prevData = graphin.data as GraphData;
    //   // }
    //   graphin.data = tweak(graphin.data as GraphinData, prevData as GraphinData);
    // }
  }

  refreshPosition = () => {
    const { graphin } = this;
    const { animate } = graphin.graphOptions;
    // const { type } = this.options;

    console.log('layout controller: animate => %s', animate);
    const animateCfg = this.graph.get('animateCfg');

    if (animate) {
      // TODO 暂时判断下graph中的cfg是否已赋值。后续需要排查下为何graph实例的positionsAnimate方法被调用了两次，为什么第一次graph的cfg未赋值
      // 实际中，G6中的 positionsAnimate 方法执行了两次，而第一次因为尚未给graph的cfg赋值，获取不到animateCfg，导致控制台报错
      animateCfg && this.graph.positionsAnimate(false);
    } else {
      this.graph.refreshPositions(false);
    }
  }

  destroy() {

  }

  getDataFromGraph() {
    const nodes = [];
    const edges = [];
    const combos = [];
    const comboEdges = [];
    const nodeItems = this.graph.getNodes();
    const edgeItems = this.graph.getEdges();
    const comboItems = this.graph.getCombos();
    const nodeLength = nodeItems.length;

    for (let i = 0; i < nodeLength; i++) {
      const nodeItem = nodeItems[i];
      if (nodeItem && nodeItem.isVisible()) {
        const model = nodeItem.getModel();
        nodes.push(model);
      }
    }

    const edgeLength = edgeItems.length;
    for (let i = 0; i < edgeLength; i++) {
      const edgeItem = edgeItems[i];
      if (edgeItem && edgeItem.isVisible()) {
        const model = edgeItem.getModel();
        if (!model.isComboEdge) {
          edges.push(model);
        } else {
          comboEdges.push(model);
        }
      }
    }

    const comboLength = comboItems.length;
    for (let i = 0; i < comboLength; i++) {
      const comboItem = comboItems[i];
      if (comboItem && comboItem.isVisible()) {
        const model = comboItem.getModel();
        combos.push(model);
      }
    }
    return { nodes, edges, combos, comboEdges };
  }
}

export default LayoutController;
