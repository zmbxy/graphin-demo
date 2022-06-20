import { G6Event, IG6GraphEvent } from "@antv/g6";
import { useContext, useState, useEffect } from "react";
import GraphinContext from "../../GraphinContext";

let timer: number | undefined;

const useTooltip = (props: any) => {

  const { bindType, container } = props;

  const graphin = useContext(GraphinContext);
  const { graph } = graphin;

  const [state, setState] = useState<any>({
    visible: false,
    x: 0,
    y: 0,
    item: null
  });

  const show = (e: IG6GraphEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (timer) {
      window.clearTimeout(timer);
    }

    const point = graph.getPointByClient(e.clientX, e.clientY);
    let { x, y } = graph.getCanvasByPoint(point.x, point.y);
    if (bindType === 'node') {
      // 如果是节点，则x，y指定到节点的中心点
      // eslint-disable-next-line no-underscore-dangle
      if (e.item) {
        const { x: PointX = 0, y: PointY = 0 } = e.item.getModel();
        const CenterCanvas = graph.getCanvasByPoint(PointX, PointY);

        const daltX = e.canvasX - CenterCanvas.x;
        const daltY = e.canvasY - CenterCanvas.y;
        x = x - daltX;
        y = y - daltY;
      }
    }

    /** 设置变量 */
    setState((preState: any) => {
      return {
        ...preState,
        visible: true,
        item: e.item,
        x,
        y,
      };
    });
  }

  const handleClose = () => {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      setState((preState: any) => {
        return {
          ...preState,
          visible: false,
          item: null,
          x: 0,
          y: 0,
        };
      });
    }, 200);
  };
  const handleDragStart = () => {
    setState({
      ...state,
      visible: false,
      x: 0,
      y: 0,
      item: null,
    });
  };
  const handleDragEnd = (e: IG6GraphEvent) => {
    const point = graph.getPointByClient(e.clientX, e.clientY);
    let { x, y } = graph.getCanvasByPoint(point.x, point.y);
    if (bindType === 'node') {
      // 如果是节点，则x，y指定到节点的中心点
      // eslint-disable-next-line no-underscore-dangle
      if (e.item) {
        const { x: PointX = 0, y: PointY = 0 } = e.item.getModel();
        const CenterCanvas = graph.getCanvasByPoint(PointX, PointY);

        const daltX = e.canvasX - CenterCanvas.x;
        const daltY = e.canvasY - CenterCanvas.y;
        x = x - daltX;
        y = y - daltY;
      }
      setState({
        ...state,
        visible: true,
        x,
        y,
        item: e.item,
      });
    }
  };
  const removeTimer = () => {
    clearTimeout(timer);
  };

  useEffect(() => {
    graph.on((`${bindType}:mouseenter` as G6Event), show);
    graph.on((`${bindType}:mouseleave` as G6Event), handleClose);
    graph.on(`afterremoveitem`, handleClose);
    graph.on(`node:dragstart`, handleDragStart);
    graph.on(`node:dragend`, handleDragEnd);
    // graph.on(`${bindType}:mousemove`, handleUpdatePosition);

    container.current?.addEventListener('mouseenter', removeTimer);
    container.current?.addEventListener('mouseleave', handleClose);

    return () => {
      console.log('effect..remove....');
      graph.off(`${bindType}:mouseenter`, show);
      graph.off(`${bindType}:mouseleave`, handleClose);
      graph.off(`afterremoveitem`, handleClose);
      graph.off(`node:dragstart`, handleDragStart);
      graph.off(`node:dragend`, handleDragEnd);
      container.current?.removeEventListener('mouseenter', removeTimer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      container.current?.removeEventListener('mouseleave', handleClose);
      // graph.off(`${bindType}:mousemove`, handleUpdatePosition);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...state }

}

export default useTooltip;
