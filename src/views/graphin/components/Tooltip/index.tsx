import { useRef } from "react";
import getContainerStyles from "./getContainerStyles";
import useTooltip from "./useTooltip";
import './index.less';

const defaultStyle: React.CSSProperties = {
  width: '120px',
  boxShadow: '0 4px 12px rgb(0 0 0 / 15%)',
};


const Tooltip: React.FunctionComponent<any> = (props: any) => {

  const container = useRef<HTMLDivElement>(null);

  const { children, bindType = 'node', style, placement = 'top', hasArrow } = props;

  const { x, y, visible, item } = useTooltip({ bindType, container });

  let nodeSize = 40;
  const padding = 12;
  const containerPosition = getContainerStyles({ placement, nodeSize: nodeSize + padding, x, y, bindType, visible });
  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    ...containerPosition,
  };

  const model = (item && !item.destroyed && item.getModel && item.getModel()) || {};
  const id = model.id || '';

  return (
    <div
      ref={container}
      className={`graphin-components-tooltip ${placement}`}
      style={{
        ...defaultStyle,
        ...positionStyle,
        ...style
      }}
    >
      {visible && (
        <div>
          {hasArrow && <div className={`tooltip-arrow ${placement}`} />}
          {children({ item, bindType, model, id })}
        </div>
      )}
    </div>
  )
}

export default Tooltip;
