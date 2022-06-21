import { G6Event, IG6GraphEvent, Item } from "@antv/g6";
import React from "react";
import GraphinContext from "../../GraphinContext";

declare type RenderChildren = () => React.ReactNode;
declare type ChildrenType = RenderChildren | React.ReactNode;

interface ContextMenuProps {
  children?: ChildrenType;
  style?: React.CSSProperties;
  bindType: 'node' | 'edge' | 'canvas';
}

interface ContextMenuState {
  /** 当前状态 */
  visible: boolean;
  x: number;
  y: number;
  /** 触发的元素 */
  item?: IG6GraphEvent['item'];
}

let container: HTMLDivElement | null;

const ContextMenu: React.FunctionComponent<ContextMenuProps> = (props) => {

  const { children, bindType, style } = props;
  const graphin = React.useContext(GraphinContext);

  const { graph } = graphin;

  const [state, setState] = React.useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  const handleShow = (e: IG6GraphEvent) => {
    console.log(`handler ${bindType} contextmenu`, (e.item as Item));
    e.preventDefault();
    e.stopPropagation();

    const width: number = graph.get('width');
    const height: number = graph.get('height');

    const bbox = (container as HTMLDivElement).getBoundingClientRect();

    const offsetX = graph.get('offsetX') || 0;
    const offsetY = graph.get('offsetY') || 0;

    const graphTop = graph.getContainer().offsetTop;
    const graphLeft = graph.getContainer().offsetLeft;

    let x = e.canvasX + graphLeft + offsetX;
    let y = e.canvasY + graphTop + offsetY;

    // when the menu is (part of) out of the canvas

    if (x + bbox.width > width) {
      x = e.canvasX - bbox.width - offsetX + graphLeft;
    }
    if (y + bbox.height > height) {
      y = e.canvasY - bbox.height - offsetY + graphTop;
    }

    if (bindType === 'node') {
      // 如果是节点，则x，y指定到节点的中心点
      // eslint-disable-next-line no-underscore-dangle
      const { x: PointX, y: PointY } = (e.item && e.item.getModel()) as { x: number; y: number };
      const CenterCanvas = graph.getCanvasByPoint(PointX, PointY);

      const daltX = e.canvasX - CenterCanvas.x;
      const daltY = e.canvasY - CenterCanvas.y;
      x = x - daltX;
      y = y - daltY;
    }

    // 设置变量
    setState((preState: any) => {
      return {
        ...preState,
        visible: true,
        x,
        y,
        item: e.item,
      };
    });
  };

  const handleClose = () => {
    setState((preState: any) => {
      if (preState.visible) {
        return {
          ...preState,
          visible: false,
          x: 0,
          y: 0,
        };
      }
      return preState;
    });
  };

  React.useEffect(() => {
    graph.on((`${bindType}:contextmenu`) as G6Event, handleShow);
    graph.on('canvas:click', handleClose);
    graph.on('canvas:drag', handleClose);
    graph.on('wheelzoom', handleClose);
    return () => {
      graph.off(`${bindType}:contextmenu`, handleShow);
      graph.off('canvas:click', handleClose);
      graph.off('canvas:drag', handleClose);
      graph.off('wheelzoom', handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { x, y, visible, item } = state;
  const id = (item && !item.destroyed && item.getModel && item.getModel().id) || '';

  let menu: React.ReactNode;
  if (typeof children === 'function') {
    menu = children();
  } else {
    menu = children;
  }

  return (
    <div
      ref={node => container = node}
      className="graphin-components-contextmenu"
      style={{
        ...style,
        position: 'absolute',
        left: x,
        top: y,
        width: 200,
        background: '#fff',
      }}
      key={id}
    >
      {visible && menu}
    </div>
  )
}

export default ContextMenu;
