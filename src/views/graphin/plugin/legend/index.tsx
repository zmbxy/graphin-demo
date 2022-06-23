import React from "react";

const defaultStyle: React.CSSProperties = {
  position: 'absolute',
  top: '0px',
  right: '0px',
};

const Legend: React.FunctionComponent<any> = (props) => {

  const { children, style } = props;

  return (
    <div
      className="graphin-components-legend"
      style={{
        ...defaultStyle,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default Legend;
