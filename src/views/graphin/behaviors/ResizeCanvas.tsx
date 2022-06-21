import * as React from 'react';
import GraphinContext from '../GraphinContext';
import { debounce } from '@antv/util';

export interface ResizeCanvasProps {
  graphDOM: HTMLDivElement;
}

const ResizeCanvas: React.FunctionComponent<ResizeCanvasProps> = (props) => {

  const { graphDOM } = props;
  const graphin = React.useContext(GraphinContext);

  React.useEffect(() => {
    const { graph } = graphin;

    /** 内置 resize */
    const handleResizeEvent = debounce(() => {
      const { clientWidth, clientHeight } = graphDOM;
      graph.set('width', clientWidth);
      graph.set('height', clientHeight);
      const canvas = graph.get('canvas');
      if (canvas) {
        canvas.changeSize(clientWidth, clientHeight);
        graph.autoPaint();
      }
    }, 200);

    /** 内置 drag force node */
    window.addEventListener('resize', handleResizeEvent, false);
    return () => {
      window.removeEventListener('resize', handleResizeEvent, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default ResizeCanvas;
