import d3Force from 'd3-force';

export class ForceLayout {

  // ========== base attribute ==========
  public nodes: any[] | null = [];
  public edges: any[] | null = [];
  public combos: any[] | null = [];
  public comboEdges: any[] | null = [];
  public hiddenNodes: any[] | null = [];
  public hiddenEdges: any[] | null = [];
  public hiddenCombos: any[] | null = [];
  public positions: any[] | null = [];
  public destroyed: boolean = false;
  public onLayoutEnd: () => void = () => { };

  // ========== layout attribute ==========
  /** 节点作用力 */
  public nodeStrength: number | null = null;
  /** 边的作用力, 默认为根据节点的入度出度自适应 */
  public edgeStrength: number | null = null;
  /** 是否防止节点相互覆盖 */
  public preventOverlap: boolean = false;
  /** 默认边长度 */
  public linkDistance: number = 50;
  public minDistance: number = 50;
  public maxDistance: number = 500;
  /** 自定义 force 方法 */
  public forceSimulation: any;
  /** 迭代阈值的衰减率 [0, 1]，0.028 对应最大迭代数为 300 */
  public alphaDecay: number = 0.028;
  /** 停止迭代的阈值 */
  public alphaMin: number = 0.001;
  /** 当前阈值 */
  public alpha: number = 0.3;
  /** 防止重叠的力强度 */
  public collideStrength: number = 1;

  // ========== layout state ==========
  /** 是否正在布局 */
  private ticking: boolean;

  constructor(data: any) {
    this.nodes = data.nodes || [];
    this.edges = data.edges || [];
    this.combos = data.combos || [];
    this.comboEdges = data.comboEdges || [];
    this.hiddenNodes = data.hiddenNodes || [];
    this.hiddenEdges = data.hiddenEdges || [];
    this.hiddenCombos = data.hiddenCombos || [];
    this.ticking = false;
  }

  init(data: any) {
    this.nodes = data.nodes || [];
    const edges = data.nodes || [];

    const expectKeys = ["targetNode", "sourceNode", "startPoint", "endPoint"];
    this.edges = edges.map((edge: any) => {
      const res: any = {};
      Object.keys(edge).forEach((key: string) => {
        if (!(expectKeys.indexOf(key) > -1)) {
          res[key] = edge[key];
        }
      });
      return res;
    })
  }

  execute(reloadData?: boolean): void {
    const nodes = this.nodes;
    const edges = this.edges;

    // 如果正在布局，忽略布局请求
    if (this.ticking) {
      return;
    }

    let simulation = this.forceSimulation;
    const alphaMin = this.alphaMin;
    const alphaDecay = this.alphaDecay;
    const alpha = this.alpha;

    if (!simulation) {
      const nodeForce = d3Force.forceManyBody();
      // 设置最小、最大边距
      nodeForce.distanceMin(this.minDistance);
      nodeForce.distanceMax(this.maxDistance);
      if (this.nodeStrength) {
        nodeForce.strength(this.nodeStrength);
      }
    }
  }
}