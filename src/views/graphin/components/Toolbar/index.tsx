import { useContext } from "react";
import GraphinContext from "../../GraphinContext";

const Toolbar: React.FunctionComponent<any> = (props) => {

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

  return (
    <></>
  )
}

export default Toolbar;
