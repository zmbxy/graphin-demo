import React, { useContext } from "react";
import GraphinContext from "../../GraphinContext";
import Item from "./Item";
import './index.less';

export declare type ToolbarProps = {
  style?: React.CSSProperties,
  direction?: 'vertical' | 'horizontal',
  options?: any[],
  onChange?: (context, option) => void;
  children?: React.ReactNode,
}

const defaultStyle: React.CSSProperties = {
  background: '#fff',
};

const Toolbar = (props: ToolbarProps) => {

  const { children, style = {}, direction = 'horizontal', options, onChange } = props;
  const graphin = useContext(GraphinContext);
  const isHorizontal = direction === 'horizontal';
  const positionStyle: React.CSSProperties = {
    position: 'absolute',
  };

  // 水平方向，默认在右上角
  if (isHorizontal) {
    positionStyle.right = 0;
    positionStyle.top = 0;
  } else {
    // 垂直方向，默认在左下角
    positionStyle.left = 0;
    positionStyle.bottom = 0;
  }

  const handleClick = (option) => {
    try {
      if (onChange) {
        onChange(graphin, option);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (options) {
    return (
      <div
        className="graphin-components-toolbar"
        style={{
          // ...defaultStyle,
          ...positionStyle,
          ...style
        }}
      >
        <ul
          className="graphin-components-toolbar-content"
          style={{ display: isHorizontal ? 'flex' : '' }}
        >
          {options.map(option => {
            const { key, name } = option;
            return (
              <Item
                key={key || name}
                onClick={() => {
                  handleClick(option);
                }}
              >
                {name}
              </Item>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div
      style={{
        ...defaultStyle,
        ...positionStyle,
        ...style
      }}
      className="graphin-components-toolbar"
    >
      <ul
        className="graphin-components-toolbar-content"
        style={isHorizontal ? { display: 'flex' } : {}}
      >
        {children}
      </ul>
    </div>
  )
}

Toolbar.Item = Item;

export default Toolbar;
